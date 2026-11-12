// Подбор языка по браузеру посетителя (только для корня сайта, см. entry-server.tsx). Не по IP: сайт статический (GitHub Pages),
// а Googlebot ходит из США, и редирект по IP спрятал бы от него UA/RU версии.
// Выбор посетителя (переключатель) запоминаем и дальше уважаем.
// Посетителю из Украины русский сами не предлагаем (даже с русским браузером), а открываем
// украинскую версию. Украину узнаём по часовому поясу устройства или украинскому в списке
// языков браузера: без IP-сервисов, ничего никуда не отправляем.
import type { Lang } from './config'

export const LANG_KEY = 'cr-lang'

/** Код языка браузера → папка сайта. Белорусский и казахский чаще читают по-русски. */
export const browserLangMap: Record<string, Lang> = { uk: 'ua', ru: 'ru', be: 'ru', kk: 'ru', en: 'en', pl: 'pl', sl: 'sl' }

/** Часовые пояса Украины (старые и новые названия IANA). */
export const UA_TIMEZONES = ['Europe/Kyiv', 'Europe/Kiev', 'Europe/Uzhgorod', 'Europe/Zaporozhye']

export function saveLang(code: string) {
  try {
    localStorage.setItem(LANG_KEY, code)
  } catch {
    /* приватный режим: просто не запоминаем */
  }
}
