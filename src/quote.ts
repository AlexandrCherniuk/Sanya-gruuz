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
 * Номер без кода страны дописываем по языку страницы: польские и словенские номера
 * короче украинских (9 цифр), без этого они бы не прошли проверку.
 */
export function normalizePhone(value: string, lang = 'ua') {
  const digits = digitsOnly(value)
  const plus = value.trim().startsWith('+') || value.trim().startsWith('00')
  if (plus) return `+${digits.replace(/^00/, '')}`
  if (digits.length === 10 && digits.startsWith('0')) return `+38${digits}`
  if (digits.length === 12 && digits.startsWith('380')) return `+${digits}`
  if (lang === 'pl' && digits.length === 9) return `+48${digits}`
  if (lang === 'pl' && digits.length === 11 && digits.startsWith('48')) return `+${digits}`
  if (lang === 'sl' && digits.length === 9 && digits.startsWith('0')) return `+386${digits.slice(1)}`
  if (lang === 'sl' && digits.length === 8) return `+386${digits}`
  if (lang === 'sl' && digits.length === 11 && digits.startsWith('386')) return `+${digits}`
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
