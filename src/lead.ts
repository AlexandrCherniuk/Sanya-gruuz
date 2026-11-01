import { getAttribution } from './analytics'
import { cleanDraft, type QuoteDraft } from './quote'

const endpoint = import.meta.env.VITE_LEAD_ENDPOINT?.trim()

export const leadEndpointConfigured = Boolean(endpoint)

export type LeadResult = { ok: true } | { ok: false; reason: 'not_configured' | 'network' | 'rejected' }

/**
 * Шлёт заявку в Google Apps Script. Тот пишет строку в таблицу и шлёт сообщение в Telegram.
 * Content-Type text/plain, чтобы браузер не делал preflight (Apps Script его не умеет).
 */
export async function sendLead(draft: QuoteDraft, honeypot: string): Promise<LeadResult> {
  if (!endpoint) return { ok: false, reason: 'not_configured' }

  const payload = {
    ...cleanDraft(draft),
    website: honeypot,
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
