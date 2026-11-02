export type QuoteDraft = {
  name: string
  phone: string
  from: string
  to: string
  cargo: string
  date: string
}

export const emptyDraft: QuoteDraft = {
  name: '',
  phone: '',
  from: '',
  to: '',
  cargo: '',
  date: '',
}

export function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

/**
 * Приводим номер к виду +<код><номер>. Без кода страны угадываем страну по длине и языку страницы.
 * Украинский: 0XX XXX XX XX (10 цифр). Словенский: 0XX XXX XXX (9 цифр с нулём) на любой версии сайта,
 * без нуля 8 цифр на словенской. Польский: 9 цифр без нуля на польской версии.
 */
export function normalizePhone(value: string, lang = 'ua') {
  const digits = digitsOnly(value)
  const v = value.trim()
  if (v.startsWith('+')) return `+${digits}`
  if (v.startsWith('00')) return `+${digits.slice(2)}`
  if (digits.length === 10 && digits.startsWith('0')) return `+38${digits}`
  if (digits.length === 12 && digits.startsWith('380')) return `+${digits}`
  if (digits.length === 11 && (digits.startsWith('386') || digits.startsWith('48'))) return `+${digits}`
  if (digits.length === 9 && digits.startsWith('0')) return `+386${digits.slice(1)}`
  if (digits.length === 9 && lang === 'pl') return `+48${digits}`
  if (digits.length === 9 && (lang === 'ua' || lang === 'ru')) return `+380${digits}`
  if (digits.length === 8 && lang === 'sl') return `+386${digits}`
  return digits
}

export function isValidPhone(value: string, lang = 'ua') {
  const digits = digitsOnly(normalizePhone(value, lang))
  return digits.length >= 10 && digits.length <= 15
}

export function cleanDraft(draft: QuoteDraft, lang = 'ua'): QuoteDraft {
  return {
    name: draft.name.trim().slice(0, 100),
    phone: normalizePhone(draft.phone, lang),
    from: draft.from.trim().slice(0, 200),
    to: draft.to.trim().slice(0, 200),
    cargo: draft.cargo.trim().slice(0, 500),
    date: draft.date.trim().slice(0, 20),
  }
}
