// Google Analytics 4 на всех страницах + заявка как конверсия (GA4 и Google Ads).
// GA4 ID не секрет, вшит по умолчанию (можно перебить VITE_GA4_ID).
// Google Ads: VITE_GADS_ID и VITE_GADS_LEAD_LABEL. Пока их нет, работает только GA4.
// Теги грузятся только после согласия на cookie (см. consent.ts).

import { onConsentGranted } from './consent'

const DEFAULT_GA4_ID = 'G-8FVN3BS7SM'
const ga4Id = (import.meta.env.VITE_GA4_ID ?? DEFAULT_GA4_ID).trim()
const adsId = import.meta.env.VITE_GADS_ID?.trim()
const leadLabel = import.meta.env.VITE_GADS_LEAD_LABEL?.trim()
const tagIds = [ga4Id, adsId].filter((id): id is string => Boolean(id))

let started = false

export function initAnalytics() {
  if (started || !tagIds.length || typeof window === 'undefined') return
  started = true
  onConsentGranted(loadTags)
}

function loadTags() {
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag ждёт именно объект arguments
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  // Consent Mode v2: согласие уже дано, говорим об этом Google до config.
  window.gtag('consent', 'default', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  })
  window.gtag('js', new Date())
  for (const id of tagIds) window.gtag('config', id)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagIds[0])}`
  document.head.appendChild(script)
}

/**
 * Вызывается только после того, как заявка реально принята сервером.
 * done вызывается, когда событие ушло в Google (или через 1 с, если тег не ответил),
 * чтобы переход на страницу благодарности не обрывал отправку конверсии.
 */
export function trackLead(done?: () => void) {
  let finished = false
  const finish = () => {
    if (finished) return
    finished = true
    done?.()
  }
  if (typeof window === 'undefined') return finish()
  window.dataLayer = window.dataLayer || []
  // Для Google Tag Manager, если позже подключат его вместо gtag.
  window.dataLayer.push({ event: 'lead_submit' })

  if (!window.gtag || !tagIds.length) return finish()
  window.gtag('event', 'generate_lead', { method: 'quote_form' })
  if (adsId && leadLabel) {
    window.gtag('event', 'conversion', { send_to: `${adsId}/${leadLabel}`, event_callback: finish })
    window.setTimeout(finish, 1000)
  } else {
    finish()
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
