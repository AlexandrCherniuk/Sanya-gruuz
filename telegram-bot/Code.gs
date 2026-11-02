/**
 * Заявки с сайта → мини-CRM в Telegram (CR Logistics).
 *
 * Что умеет:
 *   - заявка с сайта приходит в группу карточкой с номером #0001 и кнопкой «Взяти заявку»;
 *   - менеджер берёт заявку → карточка прилетает ему в личку с ботом («рабочее окно»);
 *   - статусы: Нова → Прорахунок → В планах → В роботі → Закрита / Відмова;
 *   - передача заявки другому менеджеру;
 *   - напоминания: заявку не взяли за 15 минут, висит на «Прорахунок» больше суток;
 *   - сводка в группу каждое утро в 9:00.
 *
 * Это Google Apps Script в Google-аккаунте Александра, токен бота в репозиторий не попадает.
 * «Свойства скрипта»:
 *   TG_TOKEN     — токен от @BotFather
 *   TG_CHAT_ID   — id группы (или нескольких через запятую), куда падают новые заявки
 *   TG_ADMIN_ID  — id админов через запятую (могут менять любые заявки); если пусто,
 *                  админами считаются личные чаты из TG_CHAT_ID
 *   TG_HOOK_KEY  — создаётся сам функцией setup(), руками не трогать
 *
 * Как поставить и обновить: см. telegram-bot/README.md
 */

// Адрес этого скрипта (веб-приложения). Не секрет: он и так виден в коде сайта.
// Если когда-нибудь сделаешь НОВОЕ развертывание с другим адресом, поменяй тут и в src/lead.ts.
var WEBAPP_URL =
  'https://script.google.com/macros/s/AKfycbzor-XjnKoMRX8Jdtw7YBHb2y29GEvo1WzsmSBIcVVOe4AtsKteb_yzYuxrA1oZXrbM/exec';

var TIMEZONE = 'Europe/Kyiv';
var REMIND_NEW_MIN = 15; // заявку не взяли за столько минут → пинг в группу
var REMIND_CALC_HOURS = 24; // висит на «Прорахунок» столько часов → напоминание
var SUMMARY_HOUR = 9; // утренняя сводка
var KEEP_CLOSED_DAYS = 14; // закрытые и отказы храним столько дней, потом чистим

var STATUS = {
  new: { icon: '🆕', label: 'Нова' },
  calc: { icon: '🧮', label: 'Прорахунок' },
  plan: { icon: '📅', label: 'В планах' },
  work: { icon: '🚚', label: 'В роботі' },
  done: { icon: '🏁', label: 'Закрита' },
  lost: { icon: '❌', label: 'Відмова' },
};
var FINAL = { done: true, lost: true };

var MAX = { name: 100, phone: 20, from: 200, to: 200, cargo: 500, date: 20, page: 300, lang: 5 };
var ATTR_KEYS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function doPost(e) {
  // События Telegram (кнопки, сообщения боту) приходят на адрес с секретным ключом ?tg=...
  if (e && e.parameter && e.parameter.tg) return handleTelegram_(e);
  return handleSiteLead_(e);
}

// Чтобы открыть ссылку скрипта в браузере и увидеть, что он живой.
function doGet() {
  return json_({ ok: true, service: 'leads' });
}

/* ═════════════ Заявка с сайта ═════════════ */

function handleSiteLead_(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Ловушка для ботов: поле website люди не видят. Если заполнено, молча «принимаем».
    if (data.website) return json_({ ok: true });

    var lead = {};
    Object.keys(MAX).forEach(function (k) {
      lead[k] = clean_(data[k], MAX[k]);
    });

    var digits = lead.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) return json_({ ok: false, error: 'phone' });
    if (!lead.from || !lead.to) return json_({ ok: false, error: 'route' });

    if (isFlood_(digits)) return json_({ ok: true });

    var lines = [
      '📞 <b>' + esc_(lead.phone) + '</b>',
      '📍 ' + esc_(lead.from) + ' → ' + esc_(lead.to),
    ];
    if (lead.cargo) lines.push('📦 ' + esc_(lead.cargo));
    if (lead.date) lines.push('📅 ' + esc_(lead.date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3.$2.$1')));
    if (lead.name) lines.push('👤 ' + esc_(lead.name));
    if (lead.lang === 'ru') lines.push('🌐 RU версія сайту');

    var attr = ATTR_KEYS.filter(function (k) { return data[k]; })
      .map(function (k) { return k + '=' + esc_(clean_(data[k], 200)); });
    if (attr.length) lines.push('🎯 ' + attr.join(' · '));
    if (lead.page) lines.push('🔗 ' + esc_(lead.page));

    createLead_(lines.join('\n'), 'сайт');
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server' });
  }
}

/* ═════════════ Хранилище заявок ═════════════ */

function props_() {
  return PropertiesService.getScriptProperties();
}

function loadLead_(n) {
  var raw = props_().getProperty('lead_' + n);
  return raw ? JSON.parse(raw) : null;
}

function saveLead_(lead) {
  props_().setProperty('lead_' + lead.n, JSON.stringify(lead));
}

function allLeads_() {
  var all = props_().getProperties();
  return Object.keys(all)
    .filter(function (k) { return /^lead_\d+$/.test(k); })
    .map(function (k) { return JSON.parse(all[k]); });
}

function withLock_(fn) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

function createLead_(body, source) {
  return withLock_(function () {
    var n = Number(props_().getProperty('LEAD_SEQ') || 0) + 1;
    props_().setProperty('LEAD_SEQ', String(n));
    var now = Date.now();
    var lead = {
      n: n,
      body: body,
      source: source,
      status: 'new',
      mgr: null,
      created: now,
      statusAt: now,
      copies: [], // [chatId, messageId] в группах
      dm: null, // [chatId, messageId] карточка в личке менеджера
      log: [],
      reminded: {},
    };
    groups_().forEach(function (chat) {
      var res = tg_('sendMessage', cardPayload_(lead, chat, false));
      lead.copies.push([chat, res.result.message_id]);
    });
    saveLead_(lead);
    bumpStat_('new');
    return lead;
  });
}

/* ═════════════ Карточка ═════════════ */

function num_(n) {
  return '#' + ('000' + n).slice(-4);
}

function cardText_(lead) {
  var st = STATUS[lead.status];
  var head = '🚚 <b>Заявка ' + num_(lead.n) + '</b> · ' + st.icon + ' <b>' + st.label + '</b>';
  var who = lead.mgr ? '👷 Менеджер: <b>' + esc_(lead.mgr.name) + '</b>' : '👷 Менеджер: ще ніхто не взяв';
  var text = head + '\n' + who + '\n\n' + lead.body;
  if (lead.log.length) text += '\n\n<i>' + lead.log.slice(-6).map(esc_).join('\n') + '</i>';
  return text;
}

function keyboard_(lead, inDm) {
  var n = lead.n;
  var rows = [];
  if (!lead.mgr) {
    rows.push([{ text: '🙋 Взяти заявку', callback_data: 'take:' + n }]);
  } else if (FINAL[lead.status]) {
    rows.push([{ text: '↩️ Відкрити знову', callback_data: 'st:' + n + ':calc' }]);
  } else {
    var order = ['calc', 'plan', 'work'];
    rows.push(order.filter(function (s) { return s !== lead.status; }).map(function (s) {
      return { text: STATUS[s].icon + ' ' + STATUS[s].label, callback_data: 'st:' + n + ':' + s };
    }));
    rows.push([
      { text: '🏁 Закрита', callback_data: 'st:' + n + ':done' },
      { text: '❌ Відмова', callback_data: 'st:' + n + ':lost' },
      { text: '🔄 Передати', callback_data: 'tr:' + n },
    ]);
  }
  if (inDm) {
    var link = groupLink_(lead);
    if (link) rows.push([{ text: '↩️ До заявки в групі', url: link }]);
  }
  return { inline_keyboard: rows };
}

function cardPayload_(lead, chat, inDm) {
  return {
    chat_id: chat,
    text: cardText_(lead),
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    reply_markup: keyboard_(lead, inDm),
  };
}

/** Ссылка на сообщение работает только в «большой» группе (супергруппе, id начинается с -100). */
function groupLink_(lead) {
  for (var i = 0; i < lead.copies.length; i++) {
    var chat = String(lead.copies[i][0]);
    if (chat.indexOf('-100') === 0) return 'https://t.me/c/' + chat.slice(4) + '/' + lead.copies[i][1];
  }
  return '';
}

/** Перерисовать карточку везде: в группах и в личке менеджера. */
function refresh_(lead) {
  lead.copies.forEach(function (c) { editCard_(lead, c, false); });
  if (lead.dm) editCard_(lead, lead.dm, true);
}

function editCard_(lead, where, inDm) {
  var p = cardPayload_(lead, where[0], inDm);
  p.message_id = where[1];
  try {
    tg_('editMessageText', p);
  } catch (err) {
    if (String(err).indexOf('message is not modified') < 0) console.error(err);
  }
}

/** Отправить карточку менеджеру в личку. false, если менеджер не нажимал Start у бота. */
function sendToDm_(lead) {
  try {
    var res = tg_('sendMessage', cardPayload_(lead, lead.mgr.id, true));
    lead.dm = [lead.mgr.id, res.result.message_id];
    return true;
  } catch (err) {
    console.error(err);
    lead.dm = null;
    return false;
  }
}

/** Старую карточку в личке прошлого менеджера закрываем (без кнопок). */
function closeOldDm_(lead, text) {
  if (!lead.dm) return;
  try {
    tg_('editMessageText', {
      chat_id: lead.dm[0],
      message_id: lead.dm[1],
      text: cardText_(lead) + '\n\n' + text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });
  } catch (err) {
    console.error(err);
  }
  lead.dm = null;
}

/* ═════════════ События Telegram ═════════════ */

function handleTelegram_(e) {
  var key = props_().getProperty('TG_HOOK_KEY');
  // Чужие запросы без правильного ключа игнорируем.
  if (!key || e.parameter.tg !== key) return tgOk_();

  try {
    var update = JSON.parse((e.postData && e.postData.contents) || '{}');

    // Telegram может прислать одно и то же событие повторно: второй раз не обрабатываем.
    var cache = CacheService.getScriptCache();
    if (update.update_id != null) {
      var seenKey = 'u' + update.update_id;
      if (cache.get(seenKey)) return tgOk_();
      cache.put(seenKey, '1', 21600);
    }

    if (update.my_chat_member) rememberChat_(update.my_chat_member.chat);
    if (update.message) onMessage_(update.message);
    if (update.callback_query) onButton_(update.callback_query);
  } catch (err) {
    console.error(err);
  }
  return tgOk_();
}

function onMessage_(m) {
  rememberChat_(m.chat);
  if (m.chat.type !== 'private' || !m.from) return;
  // Любое сообщение боту в личку (обычно /start) = менеджер зарегистрирован.
  registerManager_(m.from);
  tg_('sendMessage', {
    chat_id: m.chat.id,
    text:
      'Привіт, ' + esc_(m.from.first_name || '') + '! 👋\n' +
      'Це твоє робоче вікно. Заявки, які ти візьмеш або які тобі передадуть, будуть приходити сюди, ' +
      'тут же змінюй статус.',
    parse_mode: 'HTML',
  });
}

function onButton_(q) {
  var parts = String(q.data || '').split(':');
  var action = parts[0];
  var n = Number(parts[1]);
  if (!n) return answer_(q, 'Ця кнопка застаріла.', true);

  registerManager_(q.from);

  withLock_(function () {
    var lead = loadLead_(n);
    if (!lead) return answer_(q, 'Заявку ' + num_(n) + ' не знайдено (можливо, вже в архіві).', true);
    var me = { id: q.from.id, name: personName_(q.from) };

    if (action === 'take') {
      if (lead.mgr) return answer_(q, 'Цю заявку вже взяв ' + lead.mgr.name + '.', true);
      lead.mgr = me;
      lead.takenAt = Date.now();
      setStatus_(lead, 'calc', me.name + ' взяв');
      var dmOk = sendToDm_(lead);
      saveLead_(lead);
      refresh_(lead);
      return answer_(q, dmOk ? 'Заявка твоя 👍 Картка в особистих з ботом.' : NO_START_TEXT_, !dmOk);
    }

    if (!canEdit_(lead, q.from.id)) {
      return answer_(q, 'Це заявка ' + (lead.mgr ? lead.mgr.name : 'іншого менеджера') + '. Змінювати може він або адмін.', true);
    }

    if (action === 'st') {
      var to = parts[2];
      if (!STATUS[to] || to === lead.status) return answer_(q, '');
      var wasFinal = FINAL[lead.status];
      setStatus_(lead, to, me.name + ': ' + STATUS[to].label);
      if (to === 'work') onWork_(lead);
      if (FINAL[to]) bumpStat_(to);
      if (wasFinal && !lead.dm) sendToDm_(lead);
      saveLead_(lead);
      refresh_(lead);
      return answer_(q, STATUS[to].icon + ' ' + STATUS[to].label);
    }

    if (action === 'tr') {
      // Показать список менеджеров вместо кнопок этой карточки.
      var list = managers_().filter(function (m) { return String(m.id) !== String(lead.mgr && lead.mgr.id); });
      if (!list.length) {
        return answer_(q, 'Нема кому передати: інші менеджери мають один раз натиснути Start у боті.', true);
      }
      var rows = list.map(function (m) { return [{ text: '👷 ' + m.name, callback_data: 'to:' + n + ':' + m.id }]; });
      rows.push([{ text: '✖️ Скасувати', callback_data: 'back:' + n }]);
      tg_('editMessageReplyMarkup', {
        chat_id: q.message.chat.id,
        message_id: q.message.message_id,
        reply_markup: { inline_keyboard: rows },
      });
      return answer_(q, 'Кому передати ' + num_(n) + '?');
    }

    if (action === 'to') {
      var target = managers_().filter(function (m) { return String(m.id) === parts[2]; })[0];
      if (!target) return answer_(q, 'Менеджера не знайдено.', true);
      var from = lead.mgr ? lead.mgr.name : '—';
      closeOldDm_(lead, '↪️ <b>Передано: ' + esc_(target.name) + '</b>');
      lead.mgr = { id: target.id, name: target.name };
      lead.log.push(stamp_() + ' передано: ' + from + ' → ' + target.name);
      lead.log = lead.log.slice(-20);
      var ok = sendToDm_(lead);
      saveLead_(lead);
      refresh_(lead);
      return answer_(q, ok ? 'Передано ' + target.name : target.name + ' не натиснув Start у боті: картку в особисті не надіслано.', !ok);
    }

    if (action === 'back') {
      refresh_(lead);
      return answer_(q, '');
    }

    return answer_(q, '');
  });
}

var NO_START_TEXT_ =
  'Заявка твоя, але в особисті картку не надіслано: відкрий бота і натисни Start, далі все буде приходити туди.';

function setStatus_(lead, status, logText) {
  lead.status = status;
  lead.statusAt = Date.now();
  lead.reminded = {};
  lead.log.push(stamp_() + ' ' + logText);
  lead.log = lead.log.slice(-20);
}

function canEdit_(lead, userId) {
  if (lead.mgr && String(lead.mgr.id) === String(userId)) return true;
  return admins_().indexOf(String(userId)) >= 0;
}

/**
 * Сюда потом подключим главную Google-таблицу: вызывается, когда заявку переводят «В роботі».
 * Пока ничего не делает.
 */
function onWork_(lead) {}

/* ═════════════ Менеджеры ═════════════ */

function registerManager_(u) {
  if (!u || u.is_bot) return;
  var all = JSON.parse(props_().getProperty('MANAGERS') || '{}');
  var name = personName_(u);
  if (all[u.id] === name) return;
  all[u.id] = name;
  props_().setProperty('MANAGERS', JSON.stringify(all));
}

function managers_() {
  var all = JSON.parse(props_().getProperty('MANAGERS') || '{}');
  return Object.keys(all).map(function (id) { return { id: id, name: all[id] }; });
}

function personName_(u) {
  var name = [u.first_name, u.last_name].filter(Boolean).join(' ') || 'Менеджер';
  return u.username ? name + ' (@' + u.username + ')' : name;
}

/* ═════════════ Напоминания и сводка (запускаются по таймеру) ═════════════ */

function checkReminders() {
  var now = Date.now();
  allLeads_().forEach(function (lead) {
    if (lead.status === 'new' && !lead.reminded.new && now - lead.created > REMIND_NEW_MIN * 60000) {
      lead.copies.forEach(function (c) {
        safeSend_({
          chat_id: c[0],
          reply_to_message_id: c[1],
          text: '⏰ Заявка ' + num_(lead.n) + ' без менеджера вже ' + minutesAgo_(lead.created) + '. Хто бере?',
        });
      });
      lead.reminded.new = true;
      saveLead_(lead);
    }
    if (lead.status === 'calc' && !lead.reminded.calc && now - lead.statusAt > REMIND_CALC_HOURS * 3600000) {
      var text = '⏰ Заявка ' + num_(lead.n) + ' висить на «Прорахунок» вже ' + minutesAgo_(lead.statusAt) +
        '. ' + (lead.mgr ? lead.mgr.name + ', що по ній?' : '');
      if (lead.dm) safeSend_({ chat_id: lead.dm[0], reply_to_message_id: lead.dm[1], text: text });
      lead.copies.forEach(function (c) { safeSend_({ chat_id: c[0], reply_to_message_id: c[1], text: text }); });
      lead.reminded.calc = true;
      saveLead_(lead);
    }
  });
}

function dailySummary() {
  var leads = allLeads_();
  var y = Utilities.formatDate(new Date(Date.now() - 86400000), TIMEZONE, 'yyyy-MM-dd');
  var stats = JSON.parse(props_().getProperty('stat_' + y) || '{}');

  var byStatus = {};
  var byMgr = {};
  var stuck = [];
  var now = Date.now();
  leads.forEach(function (l) {
    if (FINAL[l.status]) return;
    byStatus[l.status] = (byStatus[l.status] || 0) + 1;
    if (l.mgr) {
      byMgr[l.mgr.name] = byMgr[l.mgr.name] || {};
      byMgr[l.mgr.name][l.status] = (byMgr[l.mgr.name][l.status] || 0) + 1;
    }
    if ((l.status === 'new' && now - l.created > REMIND_NEW_MIN * 60000) ||
        (l.status === 'calc' && now - l.statusAt > REMIND_CALC_HOURS * 3600000)) {
      stuck.push(num_(l.n) + ' ' + STATUS[l.status].label + (l.mgr ? ' (' + l.mgr.name + ')' : ''));
    }
  });

  var lines = ['📊 <b>Зведення за ' + Utilities.formatDate(new Date(now - 86400000), TIMEZONE, 'dd.MM') + '</b>'];
  lines.push('Нових: ' + (stats.new || 0) + ' · Закрито: ' + (stats.done || 0) + ' · Відмов: ' + (stats.lost || 0));
  lines.push('', '<b>Зараз у роботі:</b>');
  ['new', 'calc', 'plan', 'work'].forEach(function (s) {
    lines.push(STATUS[s].icon + ' ' + STATUS[s].label + ': ' + (byStatus[s] || 0));
  });
  var names = Object.keys(byMgr);
  if (names.length) {
    lines.push('', '<b>По менеджерах:</b>');
    names.forEach(function (name) {
      var parts = ['calc', 'plan', 'work'].filter(function (s) { return byMgr[name][s]; })
        .map(function (s) { return STATUS[s].icon + byMgr[name][s]; });
      lines.push('👷 ' + esc_(name) + ': ' + parts.join(' '));
    });
  }
  if (stuck.length) lines.push('', '⏰ <b>Зависли:</b>', esc_(stuck.join('\n')));

  groups_().forEach(function (chat) {
    safeSend_({ chat_id: chat, text: lines.join('\n'), parse_mode: 'HTML' });
  });
  cleanup_();
}

/** Удаляем из памяти давно закрытые заявки и старую статистику, чтобы не упереться в лимит. */
function cleanup_() {
  var now = Date.now();
  allLeads_().forEach(function (l) {
    if (FINAL[l.status] && now - l.statusAt > KEEP_CLOSED_DAYS * 86400000) props_().deleteProperty('lead_' + l.n);
  });
  var all = props_().getProperties();
  var oldest = Utilities.formatDate(new Date(now - 31 * 86400000), TIMEZONE, 'yyyy-MM-dd');
  Object.keys(all).forEach(function (k) {
    if (/^stat_/.test(k) && k.slice(5) < oldest) props_().deleteProperty(k);
  });
}

function bumpStat_(what) {
  var key = 'stat_' + Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd');
  var s = JSON.parse(props_().getProperty(key) || '{}');
  s[what] = (s[what] || 0) + 1;
  props_().setProperty(key, JSON.stringify(s));
}

/* ═════════════ Ручные функции (запускать из редактора) ═════════════ */

/** Включает всё: кнопки, напоминания, утреннюю сводку. Запусти один раз после обновления кода. */
function setup() {
  var p = props_();
  var key = p.getProperty('TG_HOOK_KEY');
  if (!key) {
    key = Utilities.getUuid().replace(/-/g, '');
    p.setProperty('TG_HOOK_KEY', key);
  }
  tg_('setWebhook', {
    url: WEBAPP_URL + '?tg=' + key,
    allowed_updates: ['callback_query', 'message', 'my_chat_member'],
    drop_pending_updates: true,
  });

  ScriptApp.getProjectTriggers().forEach(function (t) {
    var f = t.getHandlerFunction();
    if (f === 'checkReminders' || f === 'dailySummary') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('checkReminders').timeBased().everyMinutes(5).create();
  ScriptApp.newTrigger('dailySummary').timeBased().atHour(SUMMARY_HOUR).everyDays(1).inTimezone(TIMEZONE).create();

  console.log('Готово: кнопки, нагадування і зведення о ' + SUMMARY_HOUR + ':00 увімкнені.');
  console.log('Групи для нових заявок: ' + groups_().join(', '));
  console.log('Адміни: ' + (admins_().join(', ') || 'НЕМАЄ, додай TG_ADMIN_ID'));
}

// Старое имя, чтобы прошлые инструкции тоже работали.
function setupButtons() {
  setup();
}

/** Проверка: доходят ли нажатия кнопок до скрипта. */
function checkButtons() {
  var info = tg_('getWebhookInfo', {}).result;
  console.log('Адрес задан: ' + (info.url ? 'так' : 'НІ, запусти setup'));
  console.log('Чекають обробки: ' + info.pending_update_count);
  console.log('Остання помилка: ' + (info.last_error_message || 'немає'));
  console.log('Менеджери, що натиснули Start: ' + (managers_().map(function (m) { return m.name; }).join(', ') || 'нікого'));
}

/** Выключает кнопки и таймеры (заявки продолжат приходить, просто без кнопок). */
function disableButtons() {
  tg_('deleteWebhook', { drop_pending_updates: true });
  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });
  console.log('Кнопки і таймери вимкнені.');
}

/** Тестовая заявка: придёт в группу с номером и кнопкой. */
function testTelegram() {
  createLead_('🧪 <b>Тестова заявка</b>\n📞 +380000000000\n📍 Київ → Варшава', 'тест');
}

/** Показывает в журнале id чатов. Сначала добавь бота в группу или напиши ему в личку. */
function findChatId() {
  var token = props_().getProperty('TG_TOKEN');
  if (!token) throw new Error('Сначала добавь TG_TOKEN в свойства скрипта');
  var seen = {};
  var res = JSON.parse(
    UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/getUpdates', { muteHttpExceptions: true }).getContentText()
  );
  (res.result || []).forEach(function (u) {
    var m = u.message || u.channel_post || u.my_chat_member;
    if (m && m.chat) seen[m.chat.id] = m.chat.title || m.chat.first_name || m.chat.type;
  });
  // Когда кнопки включены, Telegram шлёт события сразу в скрипт, и чаты запоминаются тут.
  var known = JSON.parse(props_().getProperty('TG_SEEN_CHATS') || '{}');
  Object.keys(known).forEach(function (id) { seen[id] = known[id]; });

  var ids = Object.keys(seen);
  if (!ids.length) console.log('Пусто. Напиши боту сообщение (группа: добавь в неё бота заново) и запусти ещё раз.');
  ids.forEach(function (id) { console.log('chat id: ' + id + '  (' + seen[id] + ')'); });
}

/* ═════════════ Служебное ═════════════ */

function groups_() {
  var list = (props_().getProperty('TG_CHAT_ID') || '')
    .split(',')
    .map(function (c) { return c.trim(); })
    .filter(String);
  if (!list.length) throw new Error('Не задан TG_CHAT_ID в свойствах скрипта');
  return list;
}

function admins_() {
  var raw = props_().getProperty('TG_ADMIN_ID');
  if (raw) return raw.split(',').map(function (s) { return s.trim(); }).filter(String);
  // По умолчанию админ = личные чаты из TG_CHAT_ID (у личного чата id положительный).
  return (props_().getProperty('TG_CHAT_ID') || '').split(',')
    .map(function (s) { return s.trim(); })
    .filter(function (s) { return /^\d+$/.test(s); });
}

function rememberChat_(chat) {
  if (!chat) return;
  var known = JSON.parse(props_().getProperty('TG_SEEN_CHATS') || '{}');
  var name = chat.title || chat.first_name || chat.type;
  if (known[chat.id] === name) return;
  known[chat.id] = name;
  props_().setProperty('TG_SEEN_CHATS', JSON.stringify(known));
}

function answer_(q, text, alert) {
  try {
    tg_('answerCallbackQuery', { callback_query_id: q.id, text: text || '', show_alert: Boolean(alert) });
  } catch (err) {
    console.error(err);
  }
}

function safeSend_(payload) {
  try {
    tg_('sendMessage', payload);
  } catch (err) {
    console.error(err);
  }
}

function stamp_() {
  return Utilities.formatDate(new Date(), TIMEZONE, 'dd.MM HH:mm');
}

function minutesAgo_(t) {
  var min = Math.round((Date.now() - t) / 60000);
  if (min < 60) return min + ' хв';
  var h = Math.round(min / 60);
  return h < 48 ? h + ' год' : Math.round(h / 24) + ' дн';
}

function tg_(method, payload) {
  var token = props_().getProperty('TG_TOKEN');
  if (!token) throw new Error('Не задан TG_TOKEN в свойствах скрипта');
  var res = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/' + method, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
  var body = JSON.parse(res.getContentText() || '{}');
  if (res.getResponseCode() !== 200 || !body.ok) {
    throw new Error('Telegram ' + method + ': ' + res.getResponseCode() + ' ' + res.getContentText());
  }
  return body;
}

// Не больше 3 заявок с одного номера за 10 минут, чтобы не заспамили.
function isFlood_(digits) {
  var cache = CacheService.getScriptCache();
  var key = 'p' + digits;
  var n = Number(cache.get(key) || 0);
  if (n >= 3) return true;
  cache.put(key, String(n + 1), 600);
  return false;
}

function clean_(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
}

function esc_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Ответ Telegram'у. Именно HtmlService: ответ ContentService Google отдаёт через редирект 302,
// а Telegram редиректы не понимает и считает доставку неудачной.
function tgOk_() {
  return HtmlService.createHtmlOutput('ok');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
