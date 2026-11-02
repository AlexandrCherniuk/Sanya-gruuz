import { getAttribution } from './analytics'
import { cleanDraft, type QuoteDraft } from './quote'

// Адрес Google Apps Script, который пересылает заявки в Telegram-бота (telegram-bot/Code.gs).
// Он не секретный: токен бота хранится в самом скрипте. Переменная LEAD_ENDPOINT в репо
// при необходимости его перекрывает.
const DEFAULT_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzor-XjnKoMRX8Jdtw7YBHb2y29GEvo1WzsmSBIcVVOe4AtsKteb_yzYuxrA1oZXrbM/exec'

const endpoint = import.meta.env.VITE_LEAD_ENDPOINT?.trim() || DEFAULT_ENDPOINT

export const leadEndpointConfigured = Boolean(endpoint)

export type LeadResult = { ok: true } | { ok: false; reason: 'not_configured' | 'network' | 'rejected' }

/**
 * Шлёт заявку в Google Apps Script. Тот пишет строку в таблицу и шлёт сообщение в Telegram.
 * Content-Type text/plain, чтобы браузер не делал preflight (Apps Script его не умеет).
 */
export async function sendLead(draft: QuoteDraft, honeypot: string, lang = 'ua'): Promise<LeadResult> {
  if (!endpoint) return { ok: false, reason: 'not_configured' }

  const payload = {
    ...cleanDraft(draft),
    website: honeypot,
    lang,
    page: window.location.href.slice(0, 500),
    ...getAttribution(),
  }

  try {
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), 15000)
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      signal: controller.signal,
    })
    window.clearTimeout(timer)
    if (!response.ok) return { ok: false, reason: 'network' }
    const data = (await response.json().catch(() => null)) as { ok?: boolean } | null
    return data?.ok ? { ok: true } : { ok: false, reason: 'rejected' }
  } catch {
    return { ok: false, reason: 'network' }
  }
}
