/**
 * Заявки с сайта → Telegram-группа → Google-таблица лидов (CR Logistics).
 *
 * Как устроено:
 *   - заявка с сайта приходит в группу карточкой CR-0211-01 (дата + номер за день) с кнопкой «🙋 Взяти заявку»;
 *   - взял → в карточке «Взяв: Іван», строка сама появляется в таблице «Ліди», менеджеру пинг в личку;
 *   - дальше менеджер работает в таблице: статус, клиент, перевозчик, цена, оплата…;
 *     статус из таблицы бот сам подтягивает в карточку в группе;
 *   - «🔄 Передати» в группе (может тот, кто взял, и админ) → новому менеджеру пинг в личку;
 *   - личка менеджера с ботом = только контроль: напоминания и утренний список его заявок;
 *   - «💬 Коментар» или ответ (Reply) на сообщение бота про заявку → коментар в карточку и в таблицу;
 *   - «⏰ Нагадати» → только в личке с ботом (из группы кнопка открывает личку на этой заявке);
 *   - номер заявки в личку боту (CR-0211-01) → бот показывает заявку с кнопками.
 *
 * Это Google Apps Script в Google-аккаунте Александра, токен бота в репозиторий не попадает.
 * «Свойства скрипта»:
 *   TG_TOKEN        — токен от @BotFather
 *   TG_CHAT_ID      — id группы (или нескольких через запятую), куда падают новые заявки
 *   TG_ADMIN_ID     — id админов через запятую (могут передавать любые заявки)
 *   LEADS_SHEET_ID  — id таблицы «Ліди CR Logistics» (кусок ссылки между /d/ и /edit)
 *   TG_HOOK_KEY     — создаётся сам функцией setup(), руками не трогать
 *   ANTHROPIC_API_KEY — ключ ИИ (console.anthropic.com), необязательно: без него ИИ просто выключен
 *   AI_MODEL, AI_DAILY_LIMIT — необязательно: модель (по умолчанию claude-haiku-5-5) и лимит запросов в день (300)
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
    if (digits.length < 8 || digits.length > 15) return json_({ ok: false, error: 'phone' });
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
      id: newId_(now),
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
      msgs: [], // [chatId, messageId, вид] сообщения бота про эту заявку: ответ на них = коментар
      rem: [], // личные напоминания: {at, uid, name, note}
      comments: [], // коментарі до того, как появилась строка в таблице
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

/** Номер заявки для людей: CR-ДДММ-NN (дата + порядковый за день). У старых заявок был #0001. */
function idOf_(lead) {
  return lead.id || num_(lead.n);
}

function newId_(now) {
  var day = Utilities.formatDate(new Date(now), TIMEZONE, 'yyyyMMdd');
  var key = 'seq_' + day;
  var n = Number(props_().getProperty(key) || 0) + 1;
  props_().setProperty(key, String(n));
  return 'CR-' + day.slice(6, 8) + day.slice(4, 6) + '-' + ('0' + n).slice(-2);
}

function route_(lead) {
  return lead.f.from + ' → ' + lead.f.to;
}

function cardText_(lead) {
  var st = STATUS[lead.status];
  var text = '🚚 <b>Заявка ' + idOf_(lead) + '</b> · ' + st.icon + ' <b>' + st.label + '</b>\n';
  text += lead.mgr ? '👷 Взяв: <b>' + esc_(lead.mgr.name) + '</b>' : '👷 Ще ніхто не взяв';
  text += '\n\n' + bodyHtml_(lead.f);
  if (lead.log.length) text += '\n\n<i>' + lead.log.slice(-5).map(esc_).join('\n') + '</i>';
  // Коментарі целиком. Не влезают в лимит Telegram (4096) → старые прячем, они все есть в таблице.
  var notes = (lead.notes || []).map(function (c) {
    return '\n<b>' + esc_(c.name) + '</b> <i>' + esc_(c.t) + '</i>\n' + esc_(c.text);
  });
  var hidden = 0;
  while (notes.length && (text + '\n\n💬 <b>Коментарі</b>' + notes.join('\n')).length > 3900) {
    notes.shift();
    hidden++;
  }
  if (notes.length || hidden) {
    text += '\n\n💬 <b>Коментарі</b>' + (hidden ? ' <i>(ще ' + hidden + ' раніших у таблиці)</i>' : '') + notes.join('\n');
  }
  return text;
}

function keyboard_(lead) {
  if (!lead.mgr) return { inline_keyboard: [[{ text: '🙋 Взяти заявку', callback_data: 'take:' + lead.n }]] };
  var row = [];
  if (!FINAL[lead.status]) row.push({ text: '🔄 Передати', callback_data: 'tr:' + lead.n });
  var link = rowLink_(lead);
  if (link) row.push({ text: '📋 Таблиця', url: link });
  var rows = row.length ? [row] : [];
  rows.push(noteButtons_(lead, true));
  return { inline_keyboard: rows };
}

/** inGroup: в группе «⏰» ведёт в личку с ботом (напоминания ставятся только там). */
function noteButtons_(lead, inGroup) {
  var row = [{ text: '💬 Коментар', callback_data: 'cm:' + lead.n }];
  if (!inGroup) {
    row.push({ text: '⏰ Нагадати', callback_data: 'rm:' + lead.n });
  } else {
    var link = privateLink_(lead);
    if (link) row.push({ text: '⏰ Нагадати (в особистих)', url: link });
  }
  return row;
}

/** Ссылка t.me/бот?start=l12: открывает личку с ботом сразу на этой заявке. */
function privateLink_(lead) {
  var name = props_().getProperty('BOT_USERNAME');
  if (!name) {
    try {
      name = tg_('getMe', {}).result.username;
      props_().setProperty('BOT_USERNAME', name);
    } catch (err) {
      console.error(err);
      return '';
    }
  }
  return 'https://t.me/' + name + '?start=l' + lead.n;
}

/** Кнопки под сообщением бота в личке: ссылки на строку и карточку + коментар/напоминание. */
function dmKeyboard_(lead) {
  var links = [];
  var link = rowLink_(lead);
  if (link) links.push({ text: '📋 Рядок у таблиці', url: link });
  var g = groupLink_(lead);
  if (g) links.push({ text: '💬 Заявка в групі', url: g });
  var rows = links.length ? [links] : [];
  rows.push(noteButtons_(lead));
  return { inline_keyboard: rows };
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
  row[COL.num - 1] = idOf_(lead);
  row[COL.created - 1] = new Date(lead.created);
  row[COL.taken - 1] = new Date();
  row[COL.mgr - 1] = lead.mgr.name;
  row[COL.status - 1] = STATUS.calc.label;
  row[COL.phone - 1] = lead.f.phone;
  row[COL.from - 1] = lead.f.from;
  row[COL.to - 1] = lead.f.to;
  row[COL.cargo - 1] = lead.f.cargo || '';
  row[COL.client - 1] = lead.f.name || '';
  var notes = lead.f.date ? ['Бажана дата з сайту: ' + fmtSiteDate_(lead.f.date)] : [];
  row[COL.comment - 1] = notes.concat(lead.comments || []).join('\n');
  row[COL.source - 1] = lead.f.src || '';
  row[COL.updated - 1] = new Date();
  var at = Math.max(sh.getLastRow(), 1) + 1;
  sh.getRange(at, COL.phone).setNumberFormat('@'); // телефон как текст, чтобы не съелся «+»
  sh.getRange(at, 1, 1, NCOL).setValues([row]);
  lead.row = at;
  props_().setProperty('LEADS_SHEET_GID', String(sh.getSheetId()));
}

function findRow_(sh, lead) {
  var last = sh.getLastRow();
  if (last < 2) return 0;
  var nums = sh.getRange(2, COL.num, last - 1, 1).getValues();
  var want = idOf_(lead);
  for (var i = 0; i < nums.length; i++) if (String(nums[i][0]).trim() === want) return i + 2;
  return 0;
}

function setCell_(lead, col, value) {
  var sh = sheet_();
  var r = findRow_(sh, lead);
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
      var hit = byNum[idOf_(lead)];
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
  if (!m.from || m.from.is_bot) return;
  var text = String(m.text || '').trim();
  var isPrivate = m.chat.type === 'private';
  // Любое сообщение боту в личку (обычно /start) = менеджер зарегистрирован.
  // В список менеджеров (кому можно передать заявку) попадают только свои.
  if (isPrivate && isTeam_(m.from.id)) registerManager_(m.from);

  // Ответ на сообщение бота про заявку = коментар (или время напоминания).
  if (text && m.reply_to_message && onReply_(m, text)) {
    if (pendingAi_) {
      var job = pendingAi_;
      pendingAi_ = null;
      aiFillFromComment_(job);
    }
    return;
  }
  if (!isPrivate) return;

  var deep = text.match(/^\/start\s+l(\d+)$/);
  var id = deep ? '' : parseLeadId_(text);
  // Заявки с телефонами клиентов показываем только своим: админам и участникам группы.
  if ((deep || id || (text && !/^\//.test(text))) && !isTeam_(m.from.id)) {
    return safeSend_({ chat_id: m.chat.id, text: 'Цей бот тільки для команди CR Logistics.' });
  }
  if (deep) return showLead_(m.chat.id, '', Number(deep[1]));
  if (id) return showLead_(m.chat.id, id);
  if (text && !/^\//.test(text) && props_().getProperty('ANTHROPIC_API_KEY')) return aiAnswer_(m.chat.id, m.from, text);

  tg_('sendMessage', {
    chat_id: m.chat.id,
    text: /^\/start/.test(text)
      ? 'Привіт, ' + esc_(m.from.first_name || '') + '! 👋\n' +
        'Сюди я буду писати нагадування по твоїх заявках і зранку список того, що в роботі. ' +
        'Самі заявки береш у групі, дані вносиш у таблицю.\n\n' + HELP_TEXT_
      : HELP_TEXT_,
    parse_mode: 'HTML',
  });
}

/* ═════════════ ИИ (Claude): разбор коментарів і відповіді в личці ═════════════ */

var AI_MODEL_DEFAULT = 'claude-haiku-5-5';
var AI_DAILY_LIMIT_DEFAULT = 300; // запросов к ИИ в день, чтобы случайно не потратить много
var pendingAi_ = null;

/**
 * Один запрос к Claude. Ключ в свойстве ANTHROPIC_API_KEY (не в репо).
 * schema → ответ строго JSON по схеме. Возвращает текст / объект или null, если ИИ недоступен.
 */
function ai_(system, userText, schema, maxTokens) {
  var p = props_();
  var key = p.getProperty('ANTHROPIC_API_KEY');
  if (!key) return null;
  var dayKey = 'ai_' + dayKey_(Date.now());
  var used = Number(p.getProperty(dayKey) || 0);
  if (used >= Number(p.getProperty('AI_DAILY_LIMIT') || AI_DAILY_LIMIT_DEFAULT)) {
    console.error('ИИ: дневной лимит запросов исчерпан');
    return null;
  }
  p.setProperty(dayKey, String(used + 1));

  var body = {
    model: p.getProperty('AI_MODEL') || AI_MODEL_DEFAULT,
    max_tokens: maxTokens || 4000,
    system: system,
    messages: [{ role: 'user', content: userText }],
    output_config: { effort: 'low' },
  };
  if (schema) body.output_config.format = { type: 'json_schema', schema: schema };

  var res = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post',
    contentType: 'application/json',
    headers: { 'x-api-key': key, 'anthropic-version': '2026-10-21' },
    payload: JSON.stringify(body),
    muteHttpExceptions: true,
  });
  var raw = res.getContentText() || '{}';
  if (res.getResponseCode() !== 200) {
    console.error('ИИ ' + res.getResponseCode() + ': ' + raw.slice(0, 300));
    return null;
  }
  var j = JSON.parse(raw);
  // Отказ или обрезанный ответ — считаем, что ИИ не ответил (ответ читаем только после этой проверки).
  if (j.stop_reason === 'refusal' || j.stop_reason === 'max_tokens') {
    console.error('ИИ: stop_reason ' + j.stop_reason);
    return null;
  }
  var text = (j.content || [])
    .filter(function (b) { return b.type === 'text'; })
    .map(function (b) { return b.text; })
    .join('');
  if (!schema) return text.trim();
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error('ИИ: не JSON ' + text.slice(0, 200));
    return null;
  }
}

// Колонки, которые ИИ может заполнить из коментаря (только пустые; то, что вписал менеджер, не трогает).
var AI_FIELDS_ = [
  ['cargo', 'Вантаж', 'що везуть і умови перевезення коротко: температура, документи, митниця, ADR тощо'],
  ['weight', 'Вага / обʼєм', 'вага, обʼєм, кількість палет'],
  ['loadDate', 'Дата завантаження', 'дата завантаження у форматі YYYY-MM-DD'],
  ['carrier', 'Перевізник', 'назва або імʼя перевізника'],
  ['priceClient', 'Ціна клієнту', 'ціна для клієнта з валютою, як написано'],
  ['priceCarrier', 'Ціна перевізнику', 'ціна перевізнику з валютою, як написано'],
  ['payTerms', 'Умови оплати', 'одне зі значень списку'],
  ['payDate', 'Термін оплати', 'дата оплати у форматі YYYY-MM-DD'],
  ['client', 'Клієнт / компанія', 'назва компанії або імʼя клієнта'],
  ['business', 'Про бізнес', 'чим займається клієнт'],
];
var PAY_TERMS_ = ['Передоплата', 'При завантаженні', 'При вивантаженні', 'Відстрочка', 'Готівка'];

function aiFillFromComment_(job) {
  try {
    var lead = loadLead_(job.n);
    if (!lead || !lead.mgr || !props_().getProperty('ANTHROPIC_API_KEY')) return;
    var sh = sheet_();
    var r = findRow_(sh, lead);
    if (!r) return;
    var row = sh.getRange(r, 1, 1, NCOL).getValues()[0];

    var props = {};
    AI_FIELDS_.forEach(function (fd) {
      props[fd[0]] = fd[0] === 'payTerms'
        ? { type: 'string', enum: [''].concat(PAY_TERMS_), description: fd[2] }
        : { type: 'string', description: fd[2] };
    });
    var schema = {
      type: 'object',
      properties: props,
      required: AI_FIELDS_.map(function (fd) { return fd[0]; }),
      additionalProperties: false,
    };
    var now = Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd');
    var known = AI_FIELDS_.map(function (fd) {
      var v = row[COL[fd[0]] - 1];
      if (v && typeof v.getTime === 'function') v = Utilities.formatDate(v, TIMEZONE, 'yyyy-MM-dd');
      return fd[1] + ': ' + (String(v || '').trim() || '—');
    }).join('\n');

    var out = ai_(
      'Ти помічник логістичної компанії CR Logistics. З коментаря менеджера до заявки на перевезення витягни дані для таблиці. ' +
        'Заповнюй поле тільки якщо це прямо сказано в коментарі, інакше залиш порожній рядок. Нічого не вигадуй. ' +
        'Пиши коротко, мовою коментаря. Сьогодні ' + now + ' (Київ); відносні дати («завтра», «в пʼятницю») переводь у YYYY-MM-DD.',
      'Заявка ' + idOf_(lead) + ': ' + route_(lead) + '\nЗараз у таблиці:\n' + known + '\n\nКоментар:\n' + job.text,
      schema,
      3000
    );
    if (!out) return;

    var filled = [];
    withLock_(function () {
      var r2 = findRow_(sh, lead);
      if (!r2) return;
      var cur = sh.getRange(r2, 1, 1, NCOL).getValues()[0];
      AI_FIELDS_.forEach(function (fd) {
        var val = String(out[fd[0]] || '').trim();
        if (!val) return;
        var col = COL[fd[0]];
        var have = String(cur[col - 1] || '').trim();
        // Пустую клетку заполняем; груз и имя с сайта можно уточнить (менеджер их ещё не трогал).
        var fromSite = (fd[0] === 'cargo' && have === String(lead.f.cargo || '').trim()) ||
          (fd[0] === 'client' && have === String(lead.f.name || '').trim());
        if (have && !fromSite) return;
        if (have === val) return;
        var cellValue = val;
        if (fd[0] === 'loadDate' || fd[0] === 'payDate') {
          var m = val.match(/^(\d{4})-(\d{2})-(\d{2})$/);
          if (!m) return;
          cellValue = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
        } else if (/^[=+\-@]/.test(val)) {
          cellValue = "'" + val; // чтобы таблица не приняла текст за формулу
        }
        sh.getRange(r2, col).setValue(cellValue);
        filled.push(fd[1] + ': ' + val);
      });
      if (filled.length) sh.getRange(r2, COL.updated).setValue(new Date());
    });
    if (filled.length) {
      safeSend_({
        chat_id: job.chat,
        reply_to_message_id: job.mid,
        text: '🤖 Заповнив у таблиці:\n' + filled.map(function (x) { return '• ' + x; }).join('\n'),
      });
    }
  } catch (err) {
    console.error(err);
  }
}

/** Вопрос менеджера в личке («що в мене висить?») → ответ ИИ по таблице лидов. */
function aiAnswer_(chat, from, question) {
  try {
    tg_('sendChatAction', { chat_id: chat, action: 'typing' });
  } catch (err) {
    console.error(err);
  }
  var data = '';
  try {
    data = leadsDigest_();
  } catch (err) {
    console.error(err);
  }
  var now = Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd HH:mm, EEEE');
  var answer = ai_(
    'Ти помічник менеджерів логістичної компанії CR Logistics у Telegram. Нижче таблиця заявок (лідів). ' +
      'Відповідай тільки за цими даними; якщо в них немає відповіді, так і скажи. Не вигадуй цифр. ' +
      'Відповідай коротко і по-людськи, тією мовою, якою питають. Без markdown і таблиць: звичайний текст, списки через «•». ' +
      'Номери заявок пиши як у таблиці (CR-0311-02). Питає менеджер: ' + personName_(from) + '. Зараз: ' + now + ' (Київ).\n\n' +
      'ТАБЛИЦЯ ЗАЯВОК:\n' + data,
    question,
    null,
    4000
  );
  safeSend_({
    chat_id: chat,
    text: answer ? answer.slice(0, 4000) : 'ИИ зараз не відповів 😕 Спробуй ще раз пізніше або пошукай у таблиці на листі «Пошук».\n\n' + HELP_TEXT_.replace(/<[^>]+>/g, ''),
  });
}

/** Сжатая выгрузка для ИИ: последние строки таблицы + ещё не взятые заявки. */
function leadsDigest_() {
  var lines = [];
  var sh = sheet_();
  var last = sh.getLastRow();
  if (last >= 2) {
    var from = Math.max(2, last - 299);
    var head = sh.getRange(1, 1, 1, NCOL).getValues()[0];
    lines.push(head.join(' | '));
    sh.getRange(from, 1, last - from + 1, NCOL).getValues().forEach(function (r) {
      if (!String(r[0]).trim()) return;
      lines.push(r.map(function (v) {
        if (v && typeof v.getTime === 'function') return Utilities.formatDate(v, TIMEZONE, 'dd.MM.yyyy HH:mm');
        return String(v).replace(/\s+/g, ' ').trim().slice(0, 300);
      }).join(' | '));
    });
  }
  var fresh = allLeads_().filter(function (l) { return !l.mgr; });
  if (fresh.length) {
    lines.push('', 'ЩЕ НЕ ВЗЯТІ (є тільки в групі): ');
    fresh.forEach(function (l) {
      lines.push(idOf_(l) + ' | ' + Utilities.formatDate(new Date(l.created), TIMEZONE, 'dd.MM HH:mm') + ' | ' + route_(l) + ' | ' + (l.f.cargo || ''));
    });
  }
  return lines.join('\n');
}

/** Свой: админ или участник группы заявок. Ответ кешируем на 6 часов. */
function isTeam_(userId) {
  if (admins_().indexOf(String(userId)) >= 0) return true;
  var cache = CacheService.getScriptCache();
  var key = 'team_' + userId;
  var hit = cache.get(key);
  if (hit) return hit === '1';
  var ok = false;
  groups_().forEach(function (g) {
    if (ok || !/^-/.test(String(g))) return;
    try {
      var st = tg_('getChatMember', { chat_id: g, user_id: userId }).result;
      ok = ['creator', 'administrator', 'member'].indexOf(st.status) >= 0 || (st.status === 'restricted' && st.is_member);
    } catch (err) {
      console.error(err);
    }
  });
  cache.put(key, ok ? '1' : '0', 21600);
  return ok;
}

/** Проверка ИИ из редактора: запусти testAI, в журнале будет ответ. */
function testAI() {
  if (!props_().getProperty('ANTHROPIC_API_KEY')) throw new Error('Добавь ANTHROPIC_API_KEY в свойства скрипта');
  var out = ai_('Відповідай одним реченням українською.', 'Скажи, що ИИ для CR Logistics підключено.', null, 2000);
  console.log(out ? '✅ ' + out : '❌ ИИ не ответил, смотри ошибку выше');
}

var HELP_TEXT_ =
  '🔎 Напиши номер заявки, наприклад <code>CR-0211-01</code>, і я покажу її.\n' +
  '💬 Щоб додати коментар, відповідай (Reply) на моє повідомлення про заявку або натисни «💬 Коментар».\n' +
  '⏰ «Нагадати» під заявкою поставить тобі нагадування сюди.\n' +
  '🤖 Або просто спитай, наприклад: «що в мене без ціни?», «всі заявки по Польщі за тиждень».';

function onButton_(q) {
  var parts = String(q.data || '').split(':');
  var action = parts[0];
  var n = Number(parts[1]);
  if (!n) return answer_(q, 'Ця кнопка застаріла.', true);

  registerManager_(q.from);

  withLock_(function () {
    var lead = loadLead_(n);
    if (!lead) return answer_(q, 'Заявку не знайдено (можливо, вже в архіві).', true);
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
      refresh_(lead);
      var dmOk = dm_(lead.mgr, '✅ Ти взяв заявку <b>' + idOf_(lead) + '</b> (' + esc_(route_(lead)) + ').\n' +
        'Внеси в таблицю: клієнт, вага/обʼєм, дата завантаження, перевізник, ціна, оплата.', lead);
      saveLead_(lead);
      if (!sheetOk) return answer_(q, 'Заявка твоя, але в таблицю не записалась. Скажи адміну.', true);
      return answer_(q, dmOk ? 'Заявка твоя 👍' : NO_START_TEXT_, !dmOk);
    }

    // Коментар и напоминание может любой участник группы.
    if ((action === 'rm' || action === 'rt' || action === 'rc') && q.message.chat.type !== 'private') {
      return answer_(q, 'Нагадування ставляться тільки в особистих з ботом: натисни «⏰ Нагадати (в особистих)» під заявкою.', true);
    }

    if (action === 'cm' || action === 'rc') {
      var ask = action === 'cm'
        ? '💬 Коментар до <b>' + idOf_(lead) + '</b> (' + esc_(route_(lead)) + '): напиши його відповіддю на це повідомлення.'
        : '⏰ Коли нагадати по <b>' + idOf_(lead) + '</b>? Напиши відповіддю, наприклад:\n' +
          '<code>16:30</code>, <code>завтра 10:00</code>, <code>05.11 9:00</code>, <code>через 2 год</code>\n' +
          'Після часу можна дописати, про що нагадати.';
      var sent = tg_('sendMessage', {
        chat_id: q.message.chat.id,
        text: ask,
        parse_mode: 'HTML',
        reply_markup: { force_reply: true, input_field_placeholder: action === 'cm' ? 'Коментар' : 'завтра 10:00' },
      });
      trackMsg_(lead, q.message.chat.id, sent.result.message_id, action === 'cm' ? 'c' : 'r');
      saveLead_(lead);
      if (action === 'rc') restoreKeyboard_(lead, q.message);
      return answer_(q, '');
    }

    if (action === 'rm') {
      tg_('editMessageReplyMarkup', {
        chat_id: q.message.chat.id,
        message_id: q.message.message_id,
        reply_markup: {
          inline_keyboard: [
            [
              { text: '30 хв', callback_data: 'rt:' + n + ':m30' },
              { text: '1 год', callback_data: 'rt:' + n + ':h1' },
              { text: '3 год', callback_data: 'rt:' + n + ':h3' },
            ],
            [
              { text: 'Завтра 9:00', callback_data: 'rt:' + n + ':t9' },
              { text: 'Завтра 14:00', callback_data: 'rt:' + n + ':t14' },
            ],
            [
              { text: '✍️ Свій час', callback_data: 'rc:' + n },
              { text: '✖️ Скасувати', callback_data: 'back:' + n },
            ],
          ],
        },
      });
      return answer_(q, 'Нагадаю тобі в особисті. Коли?');
    }

    if (action === 'rt') {
      var at = quickTime_(parts[2], Date.now());
      if (!at) return answer_(q, 'Ця кнопка застаріла.', true);
      addReminder_(lead, me, at, '');
      saveLead_(lead);
      restoreKeyboard_(lead, q.message);
      return answer_(q, '⏰ Нагадаю ' + fmtWhen_(at) + ' в особисті з ботом.');
    }

    if (action === 'back') {
      restoreKeyboard_(lead, q.message);
      return answer_(q, '');
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
      return answer_(q, 'Кому передати ' + idOf_(lead) + '?');
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
      refresh_(lead);
      var ok = dm_(lead.mgr, '🔄 Тобі передали заявку <b>' + idOf_(lead) + '</b> (' + esc_(route_(lead)) + ')' +
        (old ? ' від ' + esc_(old.name) : '') + '. Подивись таблицю і продовжуй.', lead);
      if (old && String(old.id) !== String(q.from.id)) {
        dm_(old, '↪️ Заявку <b>' + idOf_(lead) + '</b> передали: ' + esc_(target.name) + '.', lead);
      }
      saveLead_(lead);
      return answer_(q, ok ? 'Передано ' + target.name : target.name + ' не натиснув Start у боті, пінг не дійшов.', !ok);
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

/* ═════════════ Коментарі, нагадування, пошук по номеру ═════════════ */

/** Запоминаем сообщение бота про заявку, чтобы ответ на него попал в эту заявку. */
function trackMsg_(lead, chat, mid, kind) {
  lead.msgs = (lead.msgs || []).concat([[String(chat), mid, kind || '']]).slice(-60);
}

function leadByMessage_(chat, mid) {
  chat = String(chat);
  var leads = allLeads_();
  for (var i = 0; i < leads.length; i++) {
    var l = leads[i];
    for (var j = 0; j < l.copies.length; j++) {
      if (String(l.copies[j][0]) === chat && l.copies[j][1] === mid) return { lead: l, kind: '' };
    }
    var msgs = l.msgs || [];
    for (var k = 0; k < msgs.length; k++) {
      if (msgs[k][0] === chat && msgs[k][1] === mid) return { lead: l, kind: msgs[k][2] };
    }
  }
  return null;
}

/** Ответ на сообщение бота. true — если это было про заявку и мы его обработали. */
function onReply_(m, text) {
  return withLock_(function () {
    var hit = leadByMessage_(m.chat.id, m.reply_to_message.message_id);
    if (!hit) return false;
    var lead = hit.lead;
    var me = { id: m.from.id, name: personName_(m.from) };

    var wantsReminder = hit.kind === 'r' || /^(нагадай|напомни|⏰)/i.test(text);
    if (wantsReminder && m.chat.type !== 'private') {
      var pl = privateLink_(lead);
      safeSend_({
        chat_id: m.chat.id,
        reply_to_message_id: m.message_id,
        text: 'Нагадування тепер тільки в особистих з ботом 🙂',
        reply_markup: { inline_keyboard: pl ? [[{ text: '⏰ Поставити в особистих', url: pl }]] : [] },
      });
      return true;
    }
    if (wantsReminder) {
      var when = parseWhen_(text, Date.now());
      if (!when) {
        var again = tg_('sendMessage', {
          chat_id: m.chat.id,
          reply_to_message_id: m.message_id,
          text: 'Не зрозумів час 🤔 Напиши відповіддю так: <code>16:30</code>, <code>завтра 10:00</code>, ' +
            '<code>05.11 9:00</code> або <code>через 2 год</code>.',
          parse_mode: 'HTML',
          reply_markup: { force_reply: true, selective: true },
        });
        trackMsg_(lead, m.chat.id, again.result.message_id, 'r');
        saveLead_(lead);
        return true;
      }
      addReminder_(lead, me, when.at, when.note);
      saveLead_(lead);
      safeSend_({
        chat_id: m.chat.id,
        reply_to_message_id: m.message_id,
        text: '⏰ Нагадаю ' + fmtWhen_(when.at) + ' в особисті з ботом.',
      });
      return true;
    }

    addComment_(lead, me, text);
    saveLead_(lead);
    refresh_(lead);
    react_(m.chat.id, m.message_id);
    // ИИ разложит коментар по колонкам таблицы — уже после снятия блокировки (запрос к ИИ идёт пару секунд).
    if (lead.mgr) pendingAi_ = { n: lead.n, text: text, chat: m.chat.id, mid: m.message_id };
    return true;
  });
}

function addComment_(lead, who, text) {
  text = clean_(text, 1000);
  var line = stamp_() + ' ' + who.name + ': ' + text;
  lead.notes = (lead.notes || []).concat([{ t: stamp_(), name: who.name, text: text }]);
  // Память скрипта: до 9 КБ на заявку. Старые коментарі забываем (в таблице остаются все).
  while (lead.notes.length > 1 && JSON.stringify(lead.notes).length > 4500) lead.notes.shift();
  var inSheet = false;
  if (lead.mgr) {
    try {
      var sh = sheet_();
      var r = findRow_(sh, lead);
      if (r) {
        lead.row = r;
        var cell = sh.getRange(r, COL.comment);
        var cur = String(cell.getValue() || '').trim();
        cell.setValue(cur ? cur + '\n' + line : line);
        sh.getRange(r, COL.updated).setValue(new Date());
        inSheet = true;
      }
    } catch (err) {
      console.error(err);
    }
  }
  if (!inSheet) {
    lead.comments = (lead.comments || []).concat([line]);
    while (lead.comments.length > 1 && JSON.stringify(lead.comments).length > 2000) lead.comments.shift();
  }
  // Написал не менеджер заявки (например, админ) → менеджеру пинг в личку.
  if (lead.mgr && String(lead.mgr.id) !== String(who.id)) {
    dm_(lead.mgr, '💬 <b>' + esc_(who.name) + '</b> до <b>' + esc_(idOf_(lead)) + '</b> (' + esc_(route_(lead)) + '):\n' +
      esc_(text), lead);
  }
}

function addReminder_(lead, who, at, note) {
  // В карточку не пишем: напоминание личное, а лог карточки нужен для коментарів і статусов.
  lead.rem = (lead.rem || []).concat([{ at: at, uid: who.id, name: who.name, note: clean_(note, 300) }]).slice(-30);
}

/** Срабатывание личных напоминаний (из таймера раз в 5 минут). */
function firePersonalReminders_() {
  var now = Date.now();
  withLock_(function () {
    allLeads_().forEach(function (lead) {
      var list = lead.rem || [];
      var due = list.filter(function (r) { return r.at <= now; });
      if (!due.length) return;
      lead.rem = list.filter(function (r) { return r.at > now; });
      var st = STATUS[lead.status];
      due.forEach(function (r) {
        dm_({ id: r.uid, name: r.name },
          '⏰ <b>Нагадування: ' + esc_(idOf_(lead)) + '</b> (' + esc_(route_(lead)) + ')\n' +
          st.icon + ' ' + st.label + (lead.mgr ? ' · 👷 ' + esc_(lead.mgr.name) : '') +
          (r.note ? '\n📝 ' + esc_(r.note) : ''), lead);
      });
      saveLead_(lead);
    });
  });
}

/** Возвращает кнопки на место: в карточке группы — полную клавиатуру, в личке — кнопки лички. */
function restoreKeyboard_(lead, msg) {
  var isCard = lead.copies.some(function (c) {
    return String(c[0]) === String(msg.chat.id) && c[1] === msg.message_id;
  });
  if (isCard) return refresh_(lead);
  try {
    tg_('editMessageReplyMarkup', {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
      reply_markup: dmKeyboard_(lead),
    });
  } catch (err) {
    if (String(err).indexOf('message is not modified') < 0) console.error(err);
  }
}

/** Номер из текста: CR-0211-01, cr 0211 1, 0211-01 или старый #0001. */
function parseLeadId_(text) {
  var t = String(text || '').trim();
  var m = t.match(/(?:^|[^a-zа-яіїє])(?:cr|ср)[\s#№-]*(\d{4})[\s-]+(\d{1,3})(?!\d)/i) || t.match(/^(\d{4})[\s-](\d{1,3})$/);
  if (m) return 'CR-' + m[1] + '-' + ('0' + Number(m[2])).slice(-2);
  m = t.match(/^[#№](\d{1,4})$/);
  if (m) return num_(Number(m[1]));
  return '';
}

/** Показ заявки в личке: по номеру (CR-0211-01) или по внутреннему n (ссылка из группы). */
function showLead_(chat, id, n) {
  withLock_(function () {
    var found = n
      ? loadLead_(n)
      : allLeads_()
          .filter(function (l) { return idOf_(l).toUpperCase() === id.toUpperCase(); })
          .sort(function (a, b) { return b.created - a.created; })[0];
    if (!id && found) id = idOf_(found);
    if (!found) {
      var sid = props_().getProperty('LEADS_SHEET_ID');
      safeSend_({
        chat_id: chat,
        text: 'Заявки ' + id + ' нема в памʼяті бота (закриті я забуваю через ' + KEEP_CLOSED_DAYS + ' днів). ' +
          'Знайди її в таблиці на листі «Пошук».',
        reply_markup: sid
          ? { inline_keyboard: [[{ text: '🔎 Пошук у таблиці', url: 'https://docs.google.com/spreadsheets/d/' + sid + '/edit' }]] }
          : { inline_keyboard: [] },
      });
      return;
    }
    var res = tg_('sendMessage', {
      chat_id: chat,
      text: cardText_(found) + '\n\n<i>Відповідай на це повідомлення, щоб додати коментар. ⏰ — поставити собі нагадування.</i>',
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      reply_markup: dmKeyboard_(found),
    });
    trackMsg_(found, chat, res.result.message_id, '');
    saveLead_(found);
  });
}

function react_(chat, mid) {
  try {
    tg_('setMessageReaction', { chat_id: chat, message_id: mid, reaction: [{ type: 'emoji', emoji: '👍' }] });
  } catch (err) {
    safeSend_({ chat_id: chat, reply_to_message_id: mid, text: '✅ Записав' });
  }
}

/* ── Время по Киеву ── */

/** Момент времени для даты и часа по Киеву (учитывает летнее/зимнее время). */
function kyivTime_(y, mo, d, h, mi) {
  var guess = Date.UTC(y, mo - 1, d, h, mi);
  var z = Utilities.formatDate(new Date(guess), TIMEZONE, 'Z'); // +0200 / +0300
  var off = (z.charAt(0) === '-' ? -1 : 1) * (Number(z.slice(1, 3)) * 60 + Number(z.slice(3, 5)));
  return guess - off * 60000;
}

/** Сегодняшняя дата по Киеву + сдвиг в днях, в час:мин. */
function kyivDay_(now, plusDays, h, mi) {
  var p = Utilities.formatDate(new Date(now), TIMEZONE, 'yyyy-MM-dd').split('-');
  return kyivTime_(Number(p[0]), Number(p[1]), Number(p[2]) + plusDays, h, mi);
}

function quickTime_(code, now) {
  if (code === 'm30') return now + 30 * 60000;
  if (code === 'h1') return now + 3600000;
  if (code === 'h3') return now + 3 * 3600000;
  if (code === 't9') return kyivDay_(now, 1, 9, 0);
  if (code === 't14') return kyivDay_(now, 1, 14, 0);
  return 0;
}

/**
 * Разбирает «16:30», «завтра 10:00», «завтра», «05.11 9:00», «через 2 год», «30 хв» (+ текст после времени).
 * Возвращает {at, note} или null.
 */
function parseWhen_(raw, now) {
  var s = String(raw || '').trim().replace(/^(?:нагадай(?:те)?|напомни(?:те)?|⏰)[\s,:]*/i, '');
  var low = s.toLowerCase();
  var END = '(?=[\\s,.!:;—-]|$)';
  var m, at = 0;

  if ((m = low.match(new RegExp('^через\\s+(годину|годинку|час|пів\\s*години|півгодини|полчаса|пол\\s*часа|день|добу)' + END)))) {
    at = now + (/^(пів|пол)/.test(m[1]) ? 1800000 : /^(день|добу)/.test(m[1]) ? 86400000 : 3600000);
  } else if ((m = low.match(new RegExp('^(?:через\\s+)?(\\d{1,3})\\s*(хв[а-яіїє]*|мин[а-я]*|min|m|год[а-яіїє]*|час[а-я]*|h|дн[а-яіїє]*|день|d)\\.?' + END)))) {
    var u = m[2].charAt(0);
    var mult = /[хмm]/.test(u) ? 60000 : /[гчh]/.test(u) ? 3600000 : 86400000;
    at = now + Number(m[1]) * mult;
  } else if ((m = low.match(new RegExp('^(\\d{1,2})\\.(\\d{1,2})(?:\\.(\\d{2,4}))?(?:\\s*(?:о|об|в|на)?\\s*(\\d{1,2})(?:[:.](\\d{2}))?)?' + END))) &&
      Number(m[2]) >= 1 && Number(m[2]) <= 12) {
    var y = m[3] ? (m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3])) : Number(Utilities.formatDate(new Date(now), TIMEZONE, 'yyyy'));
    var h = m[4] ? Number(m[4]) : 9;
    var mi = m[5] ? Number(m[5]) : 0;
    if (h > 23 || mi > 59) return null;
    at = kyivTime_(y, Number(m[2]), Number(m[1]), h, mi);
    if (!m[3] && at < now) at = kyivTime_(y + 1, Number(m[2]), Number(m[1]), h, mi);
  } else if ((m = low.match(new RegExp('^(завтра|післязавтра|послезавтра|сьогодні|сегодня)(?:\\s*(?:о|об|в|на)?\\s*(\\d{1,2})(?:[:.](\\d{2}))?)?' + END)))) {
    var plus = /^(після|после)/.test(m[1]) ? 2 : /^завтра/.test(m[1]) ? 1 : 0;
    var hh = m[2] ? Number(m[2]) : 9;
    var mm = m[3] ? Number(m[3]) : 0;
    if (hh > 23 || mm > 59) return null;
    at = kyivDay_(now, plus, hh, mm);
  } else if ((m = low.match(new RegExp('^(?:о|об|в|на)?\\s*(\\d{1,2})[:.](\\d{2})' + END)))) {
    if (Number(m[1]) > 23 || Number(m[2]) > 59) return null;
    at = kyivDay_(now, 0, Number(m[1]), Number(m[2]));
    if (at <= now) at = kyivDay_(now, 1, Number(m[1]), Number(m[2]));
  } else {
    return null;
  }
  if (!at || at <= now || at - now > 366 * 86400000) return null;
  var note = s.slice(m[0].length).replace(/^[\s,.!:;—-]+/, '').trim();
  return { at: at, note: note };
}

function fmtWhen_(t) {
  var day = dayKey_(t);
  var now = Date.now();
  var hm = Utilities.formatDate(new Date(t), TIMEZONE, 'HH:mm');
  if (day === dayKey_(now)) return 'сьогодні о ' + hm;
  if (day === dayKey_(now + 86400000)) return 'завтра о ' + hm;
  return Utilities.formatDate(new Date(t), TIMEZONE, 'dd.MM') + ' о ' + hm;
}

/* ═════════════ Личка менеджера: пинги ═════════════ */

/** Пишет менеджеру в личку. Если он не нажимал Start, пишет в группу с его именем. */
function dm_(mgr, html, lead) {
  var payload = {
    text: html,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    reply_markup: lead ? dmKeyboard_(lead) : { inline_keyboard: [] },
  };
  if (mgr && mgr.id) {
    try {
      payload.chat_id = mgr.id;
      var res = tg_('sendMessage', payload);
      if (lead) trackMsg_(lead, mgr.id, res.result.message_id, '');
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
  try {
    firePersonalReminders_();
  } catch (err) {
    console.error(err);
  }
  var now = Date.now();
  var today = dayKey_(now);
  allLeads_().forEach(function (lead) {
    var r = lead.reminded || {};
    var s = lead.sheet || {};
    var name = idOf_(lead) + ' (' + route_(lead) + ')';
    var hours = (now - lead.statusAt) / 3600000;
    var touched = false;

    if (lead.status === 'new' && !r.new && now - lead.created > REMIND_NEW_MIN * 60000) {
      lead.copies.forEach(function (c) {
        safeSend_({
          chat_id: c[0],
          reply_to_message_id: c[1],
          text: '⏰ Заявка ' + idOf_(lead) + ' без менеджера вже ' + ago_(lead.created) + '. Хто бере?',
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
            text: '⏰ ' + idOf_(lead) + ' на прорахунку вже ' + ago_(lead.statusAt) + ' (' + lead.mgr.name + ').',
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
      lines.push(st.icon + ' ' + idOf_(l) + ' ' + esc_(route_(l)) + ' · ' + st.label);
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
      stuck.push(idOf_(l) + ' ' + STATUS[l.status].label + (l.mgr ? ' (' + l.mgr.name + ')' : ''));
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
    if (/^(stat|ai)_/.test(k) && k.slice(k.indexOf('_') + 1) < oldest) props_().deleteProperty(k);
    if (/^seq_/.test(k) && k.slice(4) < Utilities.formatDate(new Date(now - 2 * 86400000), TIMEZONE, 'yyyyMMdd')) {
      props_().deleteProperty(k);
    }
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
