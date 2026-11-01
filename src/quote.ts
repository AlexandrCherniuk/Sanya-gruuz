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

export function isValidPhone(value: string) {
  const digits = digitsOnly(value)
  return digits.length >= 10 && digits.length <= 15
}

/** Приводит номер к виду +380XXXXXXXXX, если это похоже на украинский номер. */
export function normalizePhone(value: string) {
  const digits = digitsOnly(value)
  if (digits.length === 10 && digits.startsWith('0')) return `+38${digits}`
  if (digits.length === 12 && digits.startsWith('380')) return `+${digits}`
  return value.trim().startsWith('+') ? `+${digits}` : digits
}

export function cleanDraft(draft: QuoteDraft): QuoteDraft {
  return {
    name: draft.name.trim().slice(0, 100),
    phone: normalizePhone(draft.phone),
    from: draft.from.trim().slice(0, 200),
    to: draft.to.trim().slice(0, 200),
    cargo: draft.cargo.trim().slice(0, 500),
    date: draft.date.trim().slice(0, 20),
  }
}
