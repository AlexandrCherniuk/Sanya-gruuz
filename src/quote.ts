import { DEFAULT_COUNTRY, dialOf } from './countries'

export type QuoteDraft = {
  name: string
  phone: string
  from: string
  to: string
  cargo: string
  date: string
  /** ISO-код страны из списка у поля телефона. Пусто: человек не трогал список, стоит страна по языку. */
  country: string
}

export const emptyDraft: QuoteDraft = {
  name: '',
  phone: '',
  from: '',
  to: '',
  cargo: '',
  date: '',
  country: '',
}

export function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

/**
 * Приводим номер к виду +<код><номер>.
 * - Начинается с «+» или «00»: номер уже международный, берём как есть.
 * - Иначе код берём из списка стран у поля (по умолчанию страна по языку страницы),
 *   ведущий 0 национального номера отбрасываем (096… → +38096…).
 * - Если человек не трогал список, узнаём «чужие» привычные форматы:
 *   украинский 0XX XXX XX XX на словенской и польской версиях, словенский 0XX XXX XXX на остальных.
 */
export function normalizePhone(value: string, lang = 'ua', country = '') {
  const v = value.trim()
  const digits = digitsOnly(v)
  if (!digits) return ''
  if (v.startsWith('+')) return `+${digits}`
  if (v.startsWith('00')) return `+${digits.slice(2)}`

  const iso = country || DEFAULT_COUNTRY[lang] || 'UA'
  const dial = dialOf(iso)
  if (!country) {
    if (digits.length === 10 && digits.startsWith('0') && iso !== 'UA') return `+38${digits}`
    if (digits.length === 9 && digits.startsWith('0') && iso === 'UA') return `+386${digits.slice(1)}`
  }
  // Номер уже с кодом выбранной страны, только без «+» (380961234567).
  if (digits.startsWith(dial) && digits.length >= 11 && digits.length - dial.length >= 8) return `+${digits}`
  return `+${dial}${digits.replace(/^0+/, '')}`
}

/**
 * Мягкая проверка по E.164: от 8 до 15 цифр вместе с кодом, любые страны.
 * Только украинские номера проверяем строго (+380 и 9 цифр): это основной поток, ловим опечатки.
 */
export function isValidPhone(value: string, lang = 'ua', country = '') {
  const digits = digitsOnly(normalizePhone(value, lang, country))
  if (digits.startsWith('380')) return digits.length === 12
  return digits.length >= 8 && digits.length <= 15
}

export function cleanDraft(draft: QuoteDraft, lang = 'ua'): QuoteDraft {
  return {
    name: draft.name.trim().slice(0, 100),
    phone: normalizePhone(draft.phone, lang, draft.country),
    from: draft.from.trim().slice(0, 200),
    to: draft.to.trim().slice(0, 200),
    cargo: draft.cargo.trim().slice(0, 500),
    date: draft.date.trim().slice(0, 20),
    country: draft.country,
  }
}
