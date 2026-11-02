// Подбор языка по браузеру посетителя. Не по IP: сайт статический (GitHub Pages),
// а Googlebot ходит из США, и редирект по IP спрятал бы от него UA/RU версии.
// Выбор посетителя (переключатель или плашка) запоминаем и дальше уважаем.
import { languages, type Lang } from './config'

export const LANG_KEY = 'cr-lang'

/** Код языка браузера → папка сайта. Белорусский и казахский чаще читают по-русски. */
export const browserLangMap: Record<string, Lang> = { uk: 'ua', ru: 'ru', be: 'ru', kk: 'ru', en: 'en', pl: 'pl', sl: 'sl' }

export function browserLang(list: readonly string[] = navigator.languages ?? [navigator.language]): Lang | null {
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
