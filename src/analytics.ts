// Отслеживание отправки заявки как конверсии Google Ads.
// ID тега и метка конверсии приходят из переменных репозитория при сборке
// (VITE_GADS_ID, VITE_GADS_LEAD_LABEL). Пока их нет, тег не грузится.

const adsId = import.meta.env.VITE_GADS_ID?.trim()
const leadLabel = import.meta.env.VITE_GADS_LEAD_LABEL?.trim()

let started = false

export function initAnalytics() {
  if (started || !adsId || typeof window === 'undefined') return
  started = true

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag ждёт именно объект arguments
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', adsId)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(adsId)}`
  document.head.appendChild(script)
}

/** Вызывается только после того, как заявка реально принята сервером. */
export function trackLead() {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  // Для Google Tag Manager, если позже подключат его вместо gtag.
  window.dataLayer.push({ event: 'lead_submit' })

  if (!window.gtag || !adsId) return
  window.gtag('event', 'generate_lead', { method: 'quote_form' })
  if (leadLabel) {
    window.gtag('event', 'conversion', { send_to: `${adsId}/${leadLabel}` })
  }
}

const CLICK_KEYS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
const STORAGE_KEY = 'sg_attribution'

/** Запоминаем, с какой рекламы пришёл человек, чтобы приложить к заявке. */
export function getAttribution(): Record<string, string> {
  let saved: Record<string, string> = {}
  try {
    saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    saved = {}
  }
  try {
    const params = new URLSearchParams(window.location.search)
    const fresh: Record<string, string> = {}
    for (const key of CLICK_KEYS) {
      const value = params.get(key)
      if (value) fresh[key] = value.slice(0, 200)
    }
    if (Object.keys(fresh).length) {
      saved = fresh
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    }
  } catch {
    // sessionStorage может быть недоступен, это не страшно
  }
  return saved
}
