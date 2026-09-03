import { site } from './seo'

export type QuoteDraft = {
  phone: string
  from: string
  to: string
  cargo: string
}

export function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

export function isValidPhone(value: string) {
  const digits = digitsOnly(value)
  return digits.length >= 10 && digits.length <= 15
}

export function buildQuoteMessage({ phone, from, to, cargo }: QuoteDraft) {
  return [
    'Заявка на розрахунок — Саня Груз',
    `Телефон: ${phone.trim()}`,
    `Звідки: ${from.trim() || '—'}`,
    `Куди: ${to.trim() || '—'}`,
    `Тип: ${cargo}`,
  ].join('\n')
}

export function mailtoQuote(draft: QuoteDraft) {
  const subject = encodeURIComponent('Заявка на розрахунок — Саня Груз')
  const body = encodeURIComponent(buildQuoteMessage(draft))
  return `mailto:${site.email}?subject=${subject}&body=${body}`
}
