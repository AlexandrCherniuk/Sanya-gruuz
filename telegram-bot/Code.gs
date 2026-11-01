/**
 * Приём заявок с сайта → сообщение в Telegram.
 *
 * Это Google Apps Script. Он живёт в Google-аккаунте Александра, а не на сайте,
 * поэтому токен бота никогда не попадает в публичный репозиторий.
 * Токен и чат хранятся в «Свойствах скрипта»:
 *   TG_TOKEN    — токен от @BotFather
 *   TG_CHAT_ID  — id чата или группы, куда слать заявки (можно несколько через запятую)
 *
 * Как поставить: см. telegram-bot/README.md
 */

var MAX = { name: 100, phone: 20, from: 200, to: 200, cargo: 500, date: 20, page: 300 };
var ATTR_KEYS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function doPost(e) {
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

    var attr = ATTR_KEYS.filter(function (k) { return data[k]; })
      .map(function (k) { return k + '=' + esc_(clean_(data[k], 200)); });
    if (attr.length) lines.push('', '🎯 ' + attr.join(' · '));
    if (lead.page) lines.push('🔗 ' + esc_(lead.page));

    sendTelegram_(lines.join('\n'));
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server' });
  }
}

// Чтобы открыть ссылку скрипта в браузере и увидеть, что он живой.
function doGet() {
  return json_({ ok: true, service: 'leads' });
}

/** Запусти один раз вручную из редактора: в Telegram должно прийти тестовое сообщение. */
function testTelegram() {
  sendTelegram_('✅ Бот заявок підключено. Сюди будуть приходити заявки з сайту.');
}

/**
 * Помощник: напиши своему боту любое сообщение (или добавь бота в группу и напиши там),
 * потом запусти эту функцию. В «Журнале выполнения» появятся id чатов, их и вставляй в TG_CHAT_ID.
 */
function findChatId() {
  var token = PropertiesService.getScriptProperties().getProperty('TG_TOKEN');
  if (!token) throw new Error('Сначала добавь TG_TOKEN в свойства скрипта');
  var res = JSON.parse(UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/getUpdates').getContentText());
  var seen = {};
  (res.result || []).forEach(function (u) {
    var m = u.message || u.channel_post || u.my_chat_member;
    if (m && m.chat && !seen[m.chat.id]) {
      seen[m.chat.id] = true;
      console.log('chat id: ' + m.chat.id + '  (' + (m.chat.title || m.chat.first_name || m.chat.type) + ')');
    }
  });
  if (!Object.keys(seen).length) console.log('Пусто. Напиши боту сообщение и запусти ещё раз.');
}

function sendTelegram_(text) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('TG_TOKEN');
  var chats = (props.getProperty('TG_CHAT_ID') || '').split(',');
  if (!token || !chats[0]) throw new Error('Не заданы TG_TOKEN / TG_CHAT_ID в свойствах скрипта');

  chats.forEach(function (chat) {
    chat = chat.trim();
    if (!chat) return;
    var res = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ chat_id: chat, text: text, parse_mode: 'HTML', disable_web_page_preview: true }),
      muteHttpExceptions: true,
    });
    if (res.getResponseCode() !== 200) {
      throw new Error('Telegram ответил ' + res.getResponseCode() + ': ' + res.getContentText());
    }
  });
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

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
