/**
 * Приём заявок с сайта → сообщение в Telegram, с кнопкой «Взяти заявку» для менеджеров.
 *
 * Это Google Apps Script. Он живёт в Google-аккаунте Александра, а не на сайте,
 * поэтому токен бота никогда не попадает в публичный репозиторий.
 * Настройки хранятся в «Свойствах скрипта»:
 *   TG_TOKEN    — токен от @BotFather
 *   TG_CHAT_ID  — id чата или группы, куда слать заявки (можно несколько через запятую)
 *   TG_HOOK_KEY — создаётся сам функцией setupButtons(), руками не трогать
 *
 * Как поставить и обновить: см. telegram-bot/README.md
 */

// Адрес этого скрипта (веб-приложения). Не секрет: он и так виден в коде сайта.
// Если когда-нибудь сделаешь НОВОЕ развертывание с другим адресом, поменяй тут и в src/lead.ts.
var WEBAPP_URL =
  'https://script.google.com/macros/s/AKfycbzor-XjnKoMRX8Jdtw7YBHb2y29GEvo1WzsmSBIcVVOe4AtsKteb_yzYuxrA1oZXrbM/exec';

var TIMEZONE = 'Europe/Kyiv';
var TAKE_BUTTON = '🙋 Взяти заявку';

var MAX = { name: 100, phone: 20, from: 200, to: 200, cargo: 500, date: 20, page: 300, lang: 5 };
var ATTR_KEYS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function doPost(e) {
  // Нажатия кнопок приходят от Telegram на адрес с секретным ключом ?tg=...
  if (e && e.parameter && e.parameter.tg) return handleTelegram_(e);
  return handleLead_(e);
}

// Чтобы открыть ссылку скрипта в браузере и увидеть, что он живой.
function doGet() {
  return json_({ ok: true, service: 'leads' });
}

/* ───────────── Заявка с сайта ───────────── */

function handleLead_(e) {
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
      '🚚 <b>Нова заявка з сайту</b>',
      '',
      '📞 <b>' + esc_(lead.phone) + '</b>',
      '📍 ' + esc_(lead.from) + ' → ' + esc_(lead.to),
    ];
    if (lead.cargo) lines.push('📦 ' + esc_(lead.cargo));
    if (lead.date) lines.push('📅 ' + esc_(lead.date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3.$2.$1')));
    if (lead.name) lines.push('👤 ' + esc_(lead.name));
    if (lead.lang === 'ru') lines.push('🌐 RU версія сайту');

    var attr = ATTR_KEYS.filter(function (k) { return data[k]; })
      .map(function (k) { return k + '=' + esc_(clean_(data[k], 200)); });
    if (attr.length) lines.push('', '🎯 ' + attr.join(' · '));
    if (lead.page) lines.push('🔗 ' + esc_(lead.page));

    sendLead_(lines.join('\n'));
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server' });
  }
}

/** Шлёт заявку во все чаты с кнопкой и запоминает, где лежат копии, чтобы потом отметить «взяв». */
function sendLead_(html) {
  var id = Utilities.getUuid().replace(/-/g, '').slice(0, 12);
  var copies = [];
  chats_().forEach(function (chat) {
    var res = tg_('sendMessage', {
      chat_id: chat,
      text: html,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      reply_markup: { inline_keyboard: [[{ text: TAKE_BUTTON, callback_data: 'take:' + id }]] },
    });
    copies.push([chat, res.result.message_id]);
  });
  PropertiesService.getScriptProperties().setProperty('lead_' + id, JSON.stringify({ html: html, copies: copies }));
}

/* ───────────── Нажатия кнопок в Telegram ───────────── */

function handleTelegram_(e) {
  var props = PropertiesService.getScriptProperties();
  var key = props.getProperty('TG_HOOK_KEY');
  // Чужие запросы без правильного ключа игнорируем.
  if (!key || e.parameter.tg !== key) return tgOk_();

  try {
    var update = JSON.parse((e.postData && e.postData.contents) || '{}');

    // Telegram может прислать одно и то же событие повторно: второй раз не обрабатываем.
    var cache = CacheService.getScriptCache();
    var seenKey = 'u' + update.update_id;
    if (update.update_id != null) {
      if (cache.get(seenKey)) return tgOk_();
      cache.put(seenKey, '1', 21600);
    }

    var m = update.message || update.my_chat_member;
    if (m && m.chat) rememberChat_(m.chat);

    var q = update.callback_query;
    if (q && /^take:/.test(q.data || '')) takeLead_(q, q.data.slice(5));
    else if (q) tg_('answerCallbackQuery', { callback_query_id: q.id });
  } catch (err) {
    console.error(err);
  }
  return tgOk_();
}

function takeLead_(q, id) {
  var props = PropertiesService.getScriptProperties();
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var saved = props.getProperty('lead_' + id);
    if (!saved) {
      tg_('answerCallbackQuery', { callback_query_id: q.id, text: 'Цю заявку вже взяли.', show_alert: true });
      return;
    }
    var lead = JSON.parse(saved);
    var who = managerName_(q.from);
    var when = Utilities.formatDate(new Date(), TIMEZONE, 'dd.MM HH:mm');
    var html = lead.html + '\n\n✅ <b>Взяв: ' + esc_(who) + '</b> · ' + when;

    lead.copies.forEach(function (c) {
      try {
        tg_('editMessageText', {
          chat_id: c[0],
          message_id: c[1],
          text: html,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        });
      } catch (err) {
        console.error(err); // копию могли удалить, остальные всё равно обновим
      }
    });
    props.deleteProperty('lead_' + id);
    tg_('answerCallbackQuery', { callback_query_id: q.id, text: 'Заявка твоя 👍' });
  } finally {
    lock.releaseLock();
  }
}

function managerName_(u) {
  var name = [u.first_name, u.last_name].filter(String).join(' ') || 'Менеджер';
  return u.username ? name + ' (@' + u.username + ')' : name;
}

/* ───────────── Ручные функции (запускать из редактора) ───────────── */

/** Включает кнопки: говорит Telegram, куда слать нажатия. Запусти один раз после обновления кода. */
function setupButtons() {
  var props = PropertiesService.getScriptProperties();
  var key = props.getProperty('TG_HOOK_KEY');
  if (!key) {
    key = Utilities.getUuid().replace(/-/g, '');
    props.setProperty('TG_HOOK_KEY', key);
  }
  tg_('setWebhook', {
    url: WEBAPP_URL + '?tg=' + key,
    allowed_updates: ['callback_query', 'message', 'my_chat_member'],
    drop_pending_updates: true,
  });
  console.log('Готово: кнопки включены. Проверь через testTelegram и нажми кнопку в Телеге.');
}

/** Проверка кнопок: в журнале будет, доходят ли нажатия до скрипта. */
function checkButtons() {
  var info = tg_('getWebhookInfo', {}).result;
  console.log('Адрес задан: ' + (info.url ? 'да' : 'НЕТ, запусти setupButtons'));
  console.log('Ждут обработки: ' + info.pending_update_count);
  console.log('Последняя ошибка: ' + (info.last_error_message || 'нет'));
}

/** Выключает кнопки (заявки продолжат приходить, просто без кнопки «Взяти»). */
function disableButtons() {
  tg_('deleteWebhook', { drop_pending_updates: true });
  console.log('Кнопки выключены.');
}

/** Тестовая заявка с кнопкой: в Telegram должно прийти сообщение, кнопку можно нажать. */
function testTelegram() {
  sendLead_('✅ <b>Тест.</b> Бот заявок підключено. Натисни кнопку нижче, щоб перевірити.');
}

/** Показывает в журнале id чатов. Сначала напиши боту (или в группе, куда добавлен бот). */
function findChatId() {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('TG_TOKEN');
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
  var known = JSON.parse(props.getProperty('TG_SEEN_CHATS') || '{}');
  Object.keys(known).forEach(function (id) { seen[id] = known[id]; });

  var ids = Object.keys(seen);
  if (!ids.length) console.log('Пусто. Напиши боту сообщение (группа: добавь в неё бота заново) и запусти ещё раз.');
  ids.forEach(function (id) { console.log('chat id: ' + id + '  (' + seen[id] + ')'); });
}

/* ───────────── Служебное ───────────── */

function rememberChat_(chat) {
  var props = PropertiesService.getScriptProperties();
  var known = JSON.parse(props.getProperty('TG_SEEN_CHATS') || '{}');
  known[chat.id] = chat.title || chat.first_name || chat.type;
  props.setProperty('TG_SEEN_CHATS', JSON.stringify(known));
}

function chats_() {
  var list = (PropertiesService.getScriptProperties().getProperty('TG_CHAT_ID') || '')
    .split(',')
    .map(function (c) { return c.trim(); })
    .filter(String);
  if (!list.length) throw new Error('Не задан TG_CHAT_ID в свойствах скрипта');
  return list;
}

function tg_(method, payload) {
  var token = PropertiesService.getScriptProperties().getProperty('TG_TOKEN');
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
