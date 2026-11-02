/**
 * Заявки с сайта → Telegram-группа → Google-таблица лидов (CR Logistics).
 *
 * Как устроено:
 *   - заявка с сайта приходит в группу карточкой #0001 с кнопкой «🙋 Взяти заявку»;
 *   - взял → в карточке «Взяв: Іван», строка сама появляется в таблице «Ліди», менеджеру пинг в личку;
 *   - дальше менеджер работает в таблице: статус, клиент, перевозчик, цена, оплата…;
 *     статус из таблицы бот сам подтягивает в карточку в группе;
 *   - «🔄 Передати» в группе (может тот, кто взял, и админ) → новому менеджеру пинг в личку;
 *   - личка менеджера с ботом = только контроль: напоминания и утренний список его заявок.
 *
 * Это Google Apps Script в Google-аккаунте Александра, токен бота в репозиторий не попадает.
 * «Свойства скрипта»:
 *   TG_TOKEN        — токен от @BotFather
 *   TG_CHAT_ID      — id группы (или нескольких через запятую), куда падают новые заявки
 *   TG_ADMIN_ID     — id админов через запятую (могут передавать любые заявки)
 *   LEADS_SHEET_ID  — id таблицы «Ліди CR Logistics» (кусок ссылки между /d/ и /edit)
 *   TG_HOOK_KEY     — создаётся сам функцией setup(), руками не трогать
 *
 * Как поставить и обновить: см. telegram-bot/README.md
 */

// Адрес этого скрипта (веб-приложения). Не секрет: он и так виден в коде сайта.
// Если когда-нибудь сделаешь НОВОЕ развертывание с другим адресом, поменяй тут и в src/lead.ts.
var WEBAPP_URL =
  'https://script.google.com/macros/s/AKfycbzor-XjnKoMRX8Jdtw7YBHb2y29GEvo1WzsmSBIcVVOe4AtsKteb_yzYuxrA1oZXrbM/exec';

var TIMEZONE = 'Europe/Kyiv';
var SHEET_NAME = 'Ліди';

// Контроль
var REMIND_NEW_MIN = 15; // заявку не взяли за столько минут → пинг в группу
var REMIND_CALC_HOURS = 2; // взяли, а цены клиенту нет столько часов → напоминание менеджеру
var ESCALATE_CALC_HOURS = 24; // всё ещё «Прорахунок» без цены → напоминание + в группу
var WORK_OVERDUE_DAYS = 3; // «В роботі», а с даты загрузки прошло столько дней → «закрий або онови»
var SUMMARY_HOUR = 9; // утренние сводки
var KEEP_CLOSED_DAYS = 14; // закрытые и отказы бот забывает через столько дней (в таблице остаются)

var STATUS = {
  new: { icon: '🆕', label: 'Нова' },
  calc: { icon: '🧮', label: 'Прорахунок' },
  plan: { icon: '📅', label: 'В планах' },
  work: { icon: '🚚', label: 'В роботі' },
  done: { icon: '🏁', label: 'Закрита' },
  lost: { icon: '❌', label: 'Відмова' },
};
var FINAL = { done: true, lost: true };

// Колонки таблицы «Ліди» (номер колонки, A = 1)
var COL = {
  num: 1, created: 2, taken: 3, mgr: 4, status: 5, phone: 6, from: 7, to: 8, cargo: 9,
  client: 10, business: 11, weight: 12, loadDate: 13, carrier: 14, priceClient: 15,
  priceCarrier: 16, payTerms: 17, payDate: 18, comment: 19, source: 20, updated: 21,
};
var NCOL = 21;

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

    var f = {};
    Object.keys(MAX).forEach(function (k) {
      f[k] = clean_(data[k], MAX[k]);
    });

    var digits = f.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) return json_({ ok: false, error: 'phone' });
    if (!f.from || !f.to) return json_({ ok: false, error: 'route' });

    if (isFlood_(digits)) return json_({ ok: true });

    var attr = ATTR_KEYS.filter(function (k) { return data[k]; })
      .map(function (k) { return k + '=' + clean_(data[k], 200); });
    // Не украинская версия сайта: менеджер видит, на каком языке отвечать (EN/PL/SL/RU).
    var lang = /^[a-z]{2}$/.test(f.lang) && f.lang !== 'ua' && f.lang !== 'uk' ? f.lang.toUpperCase() : '';
    f.langTag = lang;
    f.src = 'сайт' + (lang ? ' ' + lang : '') + (attr.length ? ' · ' + attr.join(' · ') : '');

    createLead_(f);
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server' });
  }
}

function bodyHtml_(f) {
  var lines = [
    '📞 <b>' + esc_(f.phone) + '</b>',
    '📍 ' + esc_(f.from) + ' → ' + esc_(f.to),
  ];
  if (f.cargo) lines.push('📦 ' + esc_(f.cargo));
  if (f.date) lines.push('📅 ' + esc_(fmtSiteDate_(f.date)));
  if (f.name) lines.push('👤 ' + esc_(f.name));
  if (f.langTag) lines.push('🌐 ' + f.langTag + ' версія сайту');
  if (f.src) lines.push('🎯 ' + esc_(f.src));
  return lines.join('\n');
}

function fmtSiteDate_(d) {
  return String(d).replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3.$2.$1');
}

/* ═════════════ Хранилище заявок (память скрипта) ═════════════ */

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
  lock.waitLock(25000);
  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

function createLead_(f) {
  return withLock_(function () {
    var n = Number(props_().getProperty('LEAD_SEQ') || 0) + 1;
    props_().setProperty('LEAD_SEQ', String(n));
    var now = Date.now();
    var lead = {
      n: n,
      f: f,
      status: 'new',
      mgr: null,
      created: now,
      statusAt: now,
      row: 0,
      copies: [], // [chatId, messageId] карточки в группах
      sheet: {}, // последнее, что видели в таблице: цена, перевозчик, оплата, дата загрузки
      log: [],
      reminded: {},
    };
    // Ошибка в одной из групп не должна валить заявку: иначе карточка уже ушла в Telegram,
    // а сайт показывает клиенту «не удалось отправить».
    var lastErr = null;
    groups_().forEach(function (chat) {
      try {
        var res = tg_('sendMessage', cardPayload_(lead, chat));
        lead.copies.push([chat, res.result.message_id]);
      } catch (err) {
        console.error(err);
        lastErr = err;
      }
    });
    if (!lead.copies.length) throw lastErr || new Error('Заявка не ушла ни в одну группу');
    try {
      saveLead_(lead);
      bumpStat_('new');
    } catch (err) {
      console.error(err);
    }
    return lead;
  });
}

/* ═════════════ Карточка в группе ═════════════ */

function num_(n) {
  return '#' + ('000' + n).slice(-4);
}

function route_(lead) {
  return lead.f.from + ' → ' + lead.f.to;
}

function cardText_(lead) {
  var st = STATUS[lead.status];
  var text = '🚚 <b>Заявка ' + num_(lead.n) + '</b> · ' + st.icon + ' <b>' + st.label + '</b>\n';
  text += lead.mgr ? '👷 Взяв: <b>' + esc_(lead.mgr.name) + '</b>' : '👷 Ще ніхто не взяв';
  text += '\n\n' + bodyHtml_(lead.f);
  if (lead.log.length) text += '\n\n<i>' + lead.log.slice(-5).map(esc_).join('\n') + '</i>';
  return text;
}

function keyboard_(lead) {
  if (!lead.mgr) return { inline_keyboard: [[{ text: '🙋 Взяти заявку', callback_data: 'take:' + lead.n }]] };
  var row = [];
  if (!FINAL[lead.status]) row.push({ text: '🔄 Передати', callback_data: 'tr:' + lead.n });
  var link = rowLink_(lead);
  if (link) row.push({ text: '📋 Таблиця', url: link });
  return { inline_keyboard: row.length ? [row] : [] };
}

function cardPayload_(lead, chat) {
  return {
    chat_id: chat,
    text: cardText_(lead),
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    reply_markup: keyboard_(lead),
  };
}

function refresh_(lead) {
  lead.copies.forEach(function (c) {
    var p = cardPayload_(lead, c[0]);
    p.message_id = c[1];
    try {
      tg_('editMessageText', p);
    } catch (err) {
      if (String(err).indexOf('message is not modified') < 0) console.error(err);
    }
  });
}

/** Ссылка на сообщение в группе работает только в супергруппе (id начинается с -100). */
function groupLink_(lead) {
  for (var i = 0; i < lead.copies.length; i++) {
    var chat = String(lead.copies[i][0]);
    if (chat.indexOf('-100') === 0) return 'https://t.me/c/' + chat.slice(4) + '/' + lead.copies[i][1];
  }
  return '';
}

function rowLink_(lead) {
  var id = props_().getProperty('LEADS_SHEET_ID');
  if (!id || !lead.row) return '';
  var gid = props_().getProperty('LEADS_SHEET_GID') || '0';
  return 'https://docs.google.com/spreadsheets/d/' + id + '/edit#gid=' + gid + '&range=A' + lead.row;
}

/* ═════════════ Таблица ═════════════ */

function sheet_() {
  var id = props_().getProperty('LEADS_SHEET_ID');
  if (!id) throw new Error('Не задан LEADS_SHEET_ID в свойствах скрипта');
  var sh = SpreadsheetApp.openById(id).getSheetByName(SHEET_NAME);
  if (!sh) throw new Error('В таблице нет листа «' + SHEET_NAME + '»');
  return sh;
}

function appendRow_(lead) {
  var sh = sheet_();
  var row = new Array(NCOL);
  for (var i = 0; i < NCOL; i++) row[i] = '';
  row[COL.num - 1] = num_(lead.n);
  row[COL.created - 1] = new Date(lead.created);
  row[COL.taken - 1] = new Date();
  row[COL.mgr - 1] = lead.mgr.name;
  row[COL.status - 1] = STATUS.calc.label;
  row[COL.phone - 1] = lead.f.phone;
  row[COL.from - 1] = lead.f.from;
  row[COL.to - 1] = lead.f.to;
  row[COL.cargo - 1] = lead.f.cargo || '';
  row[COL.client - 1] = lead.f.name || '';
  row[COL.comment - 1] = lead.f.date ? 'Бажана дата з сайту: ' + fmtSiteDate_(lead.f.date) : '';
  row[COL.source - 1] = lead.f.src || '';
  row[COL.updated - 1] = new Date();
  var at = Math.max(sh.getLastRow(), 1) + 1;
  sh.getRange(at, COL.phone).setNumberFormat('@'); // телефон как текст, чтобы не съелся «+»
  sh.getRange(at, 1, 1, NCOL).setValues([row]);
  lead.row = at;
  props_().setProperty('LEADS_SHEET_GID', String(sh.getSheetId()));
}

function findRow_(sh, n) {
  var last = sh.getLastRow();
  if (last < 2) return 0;
  var nums = sh.getRange(2, COL.num, last - 1, 1).getValues();
  var want = num_(n);
  for (var i = 0; i < nums.length; i++) if (String(nums[i][0]).trim() === want) return i + 2;
  return 0;
}

function setCell_(lead, col, value) {
  var sh = sheet_();
  var r = findRow_(sh, lead.n);
  if (!r) return;
  lead.row = r;
  sh.getRange(r, col).setValue(value);
  sh.getRange(r, COL.updated).setValue(new Date());
}

/**
 * Подтягиваем из таблицы статус, менеджера и поля для напоминаний.
 * Запускается при каждой правке таблицы и раз в 5 минут.
 */
function syncFromSheet() {
  withLock_(function () {
    var leads = allLeads_().filter(function (l) { return l.mgr; });
    if (!leads.length) return;
    var sh = sheet_();
    var last = sh.getLastRow();
    if (last < 2) return;
    var values = sh.getRange(2, 1, last - 1, NCOL).getValues();
    var byNum = {};
    values.forEach(function (r, i) { byNum[String(r[COL.num - 1]).trim()] = { row: i + 2, v: r }; });
    var labelToCode = {};
    Object.keys(STATUS).forEach(function (k) { labelToCode[STATUS[k].label] = k; });
    var mgrs = managers_();

    leads.forEach(function (lead) {
      var hit = byNum[num_(lead.n)];
      if (!hit) return;
      var v = hit.v;
      var changed = lead.row !== hit.row;
      lead.row = hit.row;

      var code = labelToCode[String(v[COL.status - 1]).trim()];
      if (code && code !== lead.status) {
        if (FINAL[code]) bumpStat_(code);
        setStatus_(lead, code, STATUS[code].label + ' (таблиця)');
        changed = true;
      }

      var mgrName = String(v[COL.mgr - 1]).trim();
      if (mgrName && mgrName !== lead.mgr.name) {
        var m = mgrs.filter(function (x) { return x.name === mgrName; })[0];
        lead.log.push(stamp_() + ' менеджер у таблиці: ' + mgrName);
        lead.mgr = m ? { id: m.id, name: m.name } : { id: null, name: mgrName };
        lead.reminded = {};
        changed = true;
      }

      lead.sheet = {
        price: String(v[COL.priceClient - 1]).trim(),
        carrier: String(v[COL.carrier - 1]).trim(),
        pay: String(v[COL.payTerms - 1]).trim(),
        client: String(v[COL.client - 1]).trim(),
        loadDate: v[COL.loadDate - 1] && typeof v[COL.loadDate - 1].getTime === 'function' ? v[COL.loadDate - 1].getTime() : null,
      };
      saveLead_(lead);
      if (changed) refresh_(lead);
    });
  });
}

/** Ставит «Оновлено» в строке, которую поправили руками, и синхронизирует статусы. */
function onSheetEdit(e) {
  try {
    var r = e && e.range;
    if (r && r.getSheet().getName() === SHEET_NAME && r.getRow() > 1 && r.getColumn() !== COL.updated) {
      r.getSheet().getRange(r.getRow(), COL.updated, r.getNumRows(), 1).setValue(new Date());
    }
  } catch (err) {
    console.error(err);
  }
  syncFromSheet();
}

/**
 * Сюда потом можно подключить главную таблицу компании: вызывается, когда заявку переводят «В роботі».
 * Пока ничего не делает.
 */
function onWork_(lead) {}

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
      'Сюди я буду писати нагадування по твоїх заявках і зранку список того, що в роботі. ' +
      'Самі заявки береш у групі, дані вносиш у таблицю.',
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
      var sheetOk = true;
      try {
        appendRow_(lead);
      } catch (err) {
        console.error(err);
        sheetOk = false;
      }
      saveLead_(lead);
      refresh_(lead);
      var dmOk = dm_(lead.mgr, '✅ Ти взяв заявку <b>' + num_(n) + '</b> (' + esc_(route_(lead)) + ').\n' +
        'Внеси в таблицю: клієнт, вага/обʼєм, дата завантаження, перевізник, ціна, оплата.', lead);
      if (!sheetOk) return answer_(q, 'Заявка твоя, але в таблицю не записалась. Скажи адміну.', true);
      return answer_(q, dmOk ? 'Заявка твоя 👍' : NO_START_TEXT_, !dmOk);
    }

    if (!canEdit_(lead, q.from.id)) {
      return answer_(q, 'Передати може ' + (lead.mgr ? lead.mgr.name : 'менеджер заявки') + ' або адмін.', true);
    }

    if (action === 'tr') {
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
      var old = lead.mgr;
      lead.mgr = { id: target.id, name: target.name };
      lead.reminded = {};
      lead.log.push(stamp_() + ' передано: ' + (old ? old.name : '—') + ' → ' + target.name);
      lead.log = lead.log.slice(-20);
      try {
        setCell_(lead, COL.mgr, target.name);
      } catch (err) {
        console.error(err);
      }
      saveLead_(lead);
      refresh_(lead);
      var ok = dm_(lead.mgr, '🔄 Тобі передали заявку <b>' + num_(n) + '</b> (' + esc_(route_(lead)) + ')' +
        (old ? ' від ' + esc_(old.name) : '') + '. Подивись таблицю і продовжуй.', lead);
      if (old && String(old.id) !== String(q.from.id)) {
        dm_(old, '↪️ Заявку <b>' + num_(n) + '</b> передали: ' + esc_(target.name) + '.', lead);
      }
      return answer_(q, ok ? 'Передано ' + target.name : target.name + ' не натиснув Start у боті, пінг не дійшов.', !ok);
    }

    if (action === 'back') {
      refresh_(lead);
      return answer_(q, '');
    }

    return answer_(q, '');
  });
}

var NO_START_TEXT_ =
  'Заявка твоя 👍 Але нагадування тобі не прийдуть, поки не відкриєш бота і не натиснеш Start.';

function setStatus_(lead, status, logText) {
  if (status === 'work' && lead.status !== 'work') onWork_(lead);
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

/* ═════════════ Личка менеджера: пинги ═════════════ */

/** Пишет менеджеру в личку. Если он не нажимал Start, пишет в группу с его именем. */
function dm_(mgr, html, lead) {
  var buttons = [];
  if (lead) {
    var link = rowLink_(lead);
    if (link) buttons.push({ text: '📋 Рядок у таблиці', url: link });
    var g = groupLink_(lead);
    if (g) buttons.push({ text: '💬 Заявка в групі', url: g });
  }
  var payload = {
    text: html,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    reply_markup: { inline_keyboard: buttons.length ? [buttons] : [] },
  };
  if (mgr && mgr.id) {
    try {
      payload.chat_id = mgr.id;
      tg_('sendMessage', payload);
      return true;
    } catch (err) {
      console.error(err);
    }
  }
  // Запасной путь: в группу, ответом на карточку заявки.
  if (lead && lead.copies.length) {
    payload.chat_id = lead.copies[0][0];
    payload.reply_to_message_id = lead.copies[0][1];
    payload.text = (mgr ? esc_(mgr.name) + ', ' : '') + html;
    safeSend_(payload);
  }
  return false;
}

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
  return [u.first_name, u.last_name].filter(Boolean).join(' ') || u.username || 'Менеджер';
}

/* ═════════════ Напоминания (таймер раз в 5 минут) ═════════════ */

function checkReminders() {
  try {
    syncFromSheet();
  } catch (err) {
    console.error(err);
  }
  var now = Date.now();
  var today = dayKey_(now);
  allLeads_().forEach(function (lead) {
    var r = lead.reminded || {};
    var s = lead.sheet || {};
    var name = num_(lead.n) + ' (' + route_(lead) + ')';
    var hours = (now - lead.statusAt) / 3600000;
    var touched = false;

    if (lead.status === 'new' && !r.new && now - lead.created > REMIND_NEW_MIN * 60000) {
      lead.copies.forEach(function (c) {
        safeSend_({
          chat_id: c[0],
          reply_to_message_id: c[1],
          text: '⏰ Заявка ' + num_(lead.n) + ' без менеджера вже ' + ago_(lead.created) + '. Хто бере?',
        });
      });
      r.new = touched = true;
    }

    if (lead.status === 'calc' && !s.price) {
      if (!r.calc && hours >= REMIND_CALC_HOURS) {
        dm_(lead.mgr, '⏰ <b>' + esc_(name) + '</b>: зроби прорахунок і впиши ціну в таблицю.', lead);
        r.calc = touched = true;
      }
      if (!r.calc24 && hours >= ESCALATE_CALC_HOURS) {
        dm_(lead.mgr, '⏰ <b>' + esc_(name) + '</b> висить на прорахунку вже ' + ago_(lead.statusAt) + '. Що по ній?', lead);
        lead.copies.forEach(function (c) {
          safeSend_({
            chat_id: c[0],
            reply_to_message_id: c[1],
            text: '⏰ ' + num_(lead.n) + ' на прорахунку вже ' + ago_(lead.statusAt) + ' (' + lead.mgr.name + ').',
          });
        });
        r.calc24 = touched = true;
      }
    }

    if (lead.status === 'work' && r['fill_' + today] !== true) {
      var missing = [];
      if (!s.carrier) missing.push('перевізник');
      if (!s.price) missing.push('ціна');
      if (!s.pay) missing.push('умови оплати');
      if (!s.client) missing.push('клієнт');
      if (missing.length && hours >= 1) {
        dm_(lead.mgr, '📝 <b>' + esc_(name) + '</b> в роботі, але в таблиці порожньо: ' + missing.join(', ') + '.', lead);
        r['fill_' + today] = touched = true;
      }
    }

    if (s.loadDate) {
      var loadDay = dayKey_(s.loadDate);
      var tomorrow = dayKey_(now + 86400000);
      if (lead.status === 'plan' && loadDay === tomorrow && !r.planTomorrow) {
        dm_(lead.mgr, '📅 Завтра завантаження по <b>' + esc_(name) + '</b>. Все підтверджено з перевізником і клієнтом?', lead);
        r.planTomorrow = touched = true;
      }
      if (lead.status === 'plan' && loadDay < today && !r['planPast_' + today]) {
        dm_(lead.mgr, '📅 Дата завантаження по <b>' + esc_(name) + '</b> вже минула, а статус «В планах». Онови статус.', lead);
        r['planPast_' + today] = touched = true;
      }
      var overdue = dayKey_(s.loadDate + WORK_OVERDUE_DAYS * 86400000);
      if (lead.status === 'work' && overdue <= today && !r['workOver_' + today]) {
        dm_(lead.mgr, '🏁 <b>' + esc_(name) + '</b> в роботі вже ' + ago_(s.loadDate) + ' від завантаження. Закрий або онови статус.', lead);
        r['workOver_' + today] = touched = true;
      }
    }

    if (touched) {
      lead.reminded = r;
      saveLead_(lead);
    }
  });
}

/* ═════════════ Утренние сводки (таймер в 9:00) ═════════════ */

function dailySummary() {
  try {
    syncFromSheet();
  } catch (err) {
    console.error(err);
  }
  var leads = allLeads_();
  var now = Date.now();
  var yKey = dayKey_(now - 86400000);
  var stats = JSON.parse(props_().getProperty('stat_' + yKey) || '{}');

  // 1) Каждому менеджеру в личку: его открытые заявки.
  var mine = {};
  leads.forEach(function (l) {
    if (!l.mgr || FINAL[l.status]) return;
    var k = String(l.mgr.id || l.mgr.name);
    (mine[k] = mine[k] || { mgr: l.mgr, list: [] }).list.push(l);
  });
  Object.keys(mine).forEach(function (k) {
    var g = mine[k];
    var lines = ['☀️ <b>Доброго ранку! Твої заявки:</b>'];
    g.list.sort(function (a, b) { return a.n - b.n; }).forEach(function (l) {
      var st = STATUS[l.status];
      lines.push(st.icon + ' ' + num_(l.n) + ' ' + esc_(route_(l)) + ' · ' + st.label);
    });
    dm_(g.mgr, lines.join('\n'), null);
  });

  // 2) В группу: общая сводка.
  var byStatus = {};
  var byMgr = {};
  var stuck = [];
  leads.forEach(function (l) {
    if (FINAL[l.status]) return;
    byStatus[l.status] = (byStatus[l.status] || 0) + 1;
    if (l.mgr) {
      byMgr[l.mgr.name] = byMgr[l.mgr.name] || {};
      byMgr[l.mgr.name][l.status] = (byMgr[l.mgr.name][l.status] || 0) + 1;
    }
    if ((l.status === 'new' && now - l.created > REMIND_NEW_MIN * 60000) ||
        (l.status === 'calc' && now - l.statusAt > ESCALATE_CALC_HOURS * 3600000)) {
      stuck.push(num_(l.n) + ' ' + STATUS[l.status].label + (l.mgr ? ' (' + l.mgr.name + ')' : ''));
    }
  });

  var lines = ['📊 <b>Зведення за ' + Utilities.formatDate(new Date(now - 86400000), TIMEZONE, 'dd.MM') + '</b>'];
  lines.push('Нових: ' + (stats.new || 0) + ' · Закрито: ' + (stats.done || 0) + ' · Відмов: ' + (stats.lost || 0));
  lines.push('', '<b>Зараз відкриті:</b>');
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

/** Забываем давно закрытые заявки и старую статистику (в таблице всё остаётся). */
function cleanup_() {
  var now = Date.now();
  allLeads_().forEach(function (l) {
    if (FINAL[l.status] && now - l.statusAt > KEEP_CLOSED_DAYS * 86400000) props_().deleteProperty('lead_' + l.n);
  });
  var all = props_().getProperties();
  var oldest = dayKey_(now - 31 * 86400000);
  Object.keys(all).forEach(function (k) {
    if (/^stat_/.test(k) && k.slice(5) < oldest) props_().deleteProperty(k);
  });
}

function bumpStat_(what) {
  var key = 'stat_' + dayKey_(Date.now());
  var s = JSON.parse(props_().getProperty(key) || '{}');
  s[what] = (s[what] || 0) + 1;
  props_().setProperty(key, JSON.stringify(s));
}

/* ═════════════ Ручные функции (запускать из редактора) ═════════════ */

/** Включает всё: кнопки, связь с таблицей, напоминания, сводки. Запусти после каждого обновления кода. */
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

  var sh = sheet_(); // заодно проверяем доступ к таблице
  p.setProperty('LEADS_SHEET_GID', String(sh.getSheetId()));

  ScriptApp.getProjectTriggers().forEach(function (t) {
    var f = t.getHandlerFunction();
    if (f === 'checkReminders' || f === 'dailySummary' || f === 'onSheetEdit') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('checkReminders').timeBased().everyMinutes(5).create();
  ScriptApp.newTrigger('dailySummary').timeBased().atHour(SUMMARY_HOUR).everyDays(1).inTimezone(TIMEZONE).create();
  ScriptApp.newTrigger('onSheetEdit').forSpreadsheet(p.getProperty('LEADS_SHEET_ID')).onEdit().create();

  console.log('Готово: кнопки, таблиця, нагадування і зведення о ' + SUMMARY_HOUR + ':00 увімкнені.');
  console.log('Групи для нових заявок: ' + groups_().join(', '));
  console.log('Адміни: ' + (admins_().join(', ') || 'НЕМАЄ, додай TG_ADMIN_ID'));
}

// Старое имя, чтобы прошлые инструкции тоже работали.
function setupButtons() {
  setup();
}

/** Проверка: доходят ли нажатия кнопок, видна ли таблица, кто из менеджеров нажал Start. */
function checkButtons() {
  var info = tg_('getWebhookInfo', {}).result;
  console.log('Адреса для кнопок: ' + (info.url ? 'так' : 'НІ, запусти setup'));
  console.log('Чекають обробки: ' + info.pending_update_count);
  console.log('Остання помилка Telegram: ' + (info.last_error_message || 'немає'));
  try {
    console.log('Таблиця: ' + sheet_().getParent().getName() + ', рядків: ' + sheet_().getLastRow());
  } catch (err) {
    console.log('Таблиця: ПОМИЛКА ' + err);
  }
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
  createLead_({ phone: '+380000000000', from: 'Київ', to: 'Варшава', cargo: 'Тест', name: '', date: '', src: 'тест' });
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

function dayKey_(t) {
  return Utilities.formatDate(new Date(t), TIMEZONE, 'yyyy-MM-dd');
}

function ago_(t) {
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
