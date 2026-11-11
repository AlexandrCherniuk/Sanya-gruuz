// Подбор языка по браузеру посетителя. Не по IP: сайт статический (GitHub Pages),
// а Googlebot ходит из США, и редирект по IP спрятал бы от него UA/RU версии.
// Выбор посетителя (переключатель или плашка) запоминаем и дальше уважаем.
// Посетителю из Украины русский сами не предлагаем (даже с русским браузером), а открываем
// украинскую версию. Украину узнаём по часовому поясу устройства или украинскому в списке
// языков браузера: без IP-сервисов, ничего никуда не отправляем.
import { languages, type Lang } from './config'

export const LANG_KEY = 'cr-lang'

/** Код языка браузера → папка сайта. Белорусский и казахский чаще читают по-русски. */
export const browserLangMap: Record<string, Lang> = { uk: 'ua', ru: 'ru', be: 'ru', kk: 'ru', en: 'en', pl: 'pl', sl: 'sl' }

/** Часовые пояса Украины (старые и новые названия IANA). */
export const UA_TIMEZONES = ['Europe/Kyiv', 'Europe/Kiev', 'Europe/Uzhgorod', 'Europe/Zaporozhye']

export function inUkraine(list: readonly string[] = navigator.languages ?? [navigator.language]): boolean {
  if (list.some((tag) => String(tag).toLowerCase().split('-')[0] === 'uk')) return true
  try {
    return UA_TIMEZONES.includes(Intl.DateTimeFormat().resolvedOptions().timeZone)
  } catch {
    return false
  }
}

export function browserLang(list: readonly string[] = navigator.languages ?? [navigator.language]): Lang | null {
  if (inUkraine(list)) return 'ua'
  for (const tag of list) {
    const code = browserLangMap[tag.toLowerCase().split('-')[0]]
    if (code && languages.some((l) => l.code === code && l.ready)) return code
  }
  return null
}

export function savedLang(): Lang | null {
  try {
    const v = localStorage.getItem(LANG_KEY)
    return languages.some((l) => l.code === v) ? (v as Lang) : null
  } catch {
    return null
  }
}

export function saveLang(code: string) {
  try {
    localStorage.setItem(LANG_KEY, code)
  } catch {
    /* приватный режим: просто не запоминаем */
  }
}

/** Текст плашки на языке посетителя. */
export const hintCopy: Record<Lang, { text: string; go: string; close: string }> = {
  ua: { text: 'Цей сайт є українською.', go: 'Перейти', close: 'Закрити' },
  ru: { text: 'Этот сайт есть на русском.', go: 'Перейти', close: 'Закрыть' },
  en: { text: 'This page is available in English.', go: 'Switch to English', close: 'Close' },
  pl: { text: 'Ta strona jest dostępna po polsku.', go: 'Przejdź', close: 'Zamknij' },
  sl: { text: 'Ta stran je na voljo v slovenščini.', go: 'Preklopi', close: 'Zapri' },
}
