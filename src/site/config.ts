// Общие настройки сайта. Всё, что помечено TODO, ждёт реальных данных от Александра.

export type Lang = 'ua' | 'ru' | 'en' | 'pl' | 'sl'

export type LangInfo = {
  code: Lang
  /** Код для html lang и hreflang (стандарт ISO 639-1: украинский = uk). */
  hreflang: string
  label: string
  name: string
  /** Язык собирается в отдельную папку /<code>/ только когда готовы тексты. */
  ready: boolean
  /** Локаль для чисел (1 200 км) в таблицах. */
  locale: string
}

export const languages: LangInfo[] = [
  { code: 'ua', hreflang: 'uk', label: 'UA', name: 'Українська', ready: true, locale: 'uk-UA' },
  { code: 'ru', hreflang: 'ru', label: 'RU', name: 'Русский', ready: true, locale: 'ru-RU' },
  { code: 'en', hreflang: 'en', label: 'EN', name: 'English', ready: true, locale: 'en-GB' },
  { code: 'pl', hreflang: 'pl', label: 'PL', name: 'Polski', ready: true, locale: 'pl-PL' },
  { code: 'sl', hreflang: 'sl', label: 'SL', name: 'Slovenščina', ready: true, locale: 'sl-SI' },
]

export const defaultLang: Lang = 'ua'

export const brand = {
  name: 'GR Logistics',
  city: 'Київ',
  secondLocation: 'Словенія',
}

export const contacts = {
  // Временные контакты Александра (2026-11-01), позже заменит. Меняются только здесь.
  phone: '380969502755',
  phoneDisplay: '+38 096 950 27 55',
  viber: '380969502755',
  whatsapp: '380969502755',
  /** Telegram по номеру телефона; можно заменить на ник без @. */
  telegram: '+380969502755',
  email: 'cherniukolexandr@gmail.com',
}

/**
 * Логотипы клиентов для блока «Нам доверяют». Пусто, пока Александр не пришлёт реальные
 * (файл кладём в public/clients/). Пример: { name: 'Назва компанії', file: 'clients/name.svg' }.
 * Пока список пустой, блок показывает только типы клиентов.
 */
export const clientLogos: { name: string; file: string }[] = [
  { name: 'Kärcher', file: 'clients/karcher.svg' },
  { name: 'Метінвест', file: 'clients/metinvest.svg' },
  { name: 'Хміль України', file: 'clients/hop.svg' },
  { name: 'Hub Sky Line', file: 'clients/hubskyline.png' },
  { name: 'Hawk FPV', file: 'clients/hawk.png' },
  { name: 'Бітрейд Вест', file: 'clients/bitrade-west.svg' },
  { name: 'Grinpoint', file: 'clients/grinpoint.png' },
  { name: 'Укртелеком', file: 'clients/ukrtelecom.svg' },
]

export const links = {
  tel: `tel:+${contacts.phone}`,
  viber: `viber://chat?number=%2B${contacts.viber}`,
  whatsapp: `https://wa.me/${contacts.whatsapp}`,
  telegram: `https://t.me/${contacts.telegram}`,
  email: `mailto:${contacts.email}`,
}

/** Базовый путь сайта: /Sanya-gruuz/ на GitHub Pages, / на Cloudflare Pages и своём домене. */
export const BASE: string = import.meta.env.BASE_URL

/**
 * Главный адрес сайта: на него ведут canonical, hreflang, og и sitemap, где бы ни лежала копия
 * (GitHub Pages, Cloudflare Pages, временный *.pages.dev). Когда подключим свой домен, меняем здесь.
 * Переменная VITE_SITE_URL при сборке его перекрывает.
 */
const DEFAULT_SITE_URL = 'https://alexandrcherniuk.github.io/Sanya-gruuz'

export const SITE_URL: string = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')

/** Ссылка внутри сайта: url('ua', 'ukraine/bus/') → /Sanya-gruuz/ua/ukraine/bus/ */
export function url(lang: Lang, path = '') {
  return `${BASE}${lang}/${path}`
}

export function absUrl(lang: Lang, path = '') {
  return `${SITE_URL}/${lang}/${path}`
}

export function asset(path: string) {
  return `${BASE}${path}`
}
