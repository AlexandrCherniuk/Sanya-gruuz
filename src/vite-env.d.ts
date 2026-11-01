/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL веб-приложения Google Apps Script, куда форма шлёт заявки. */
  readonly VITE_LEAD_ENDPOINT?: string
  /** ID тега Google Ads, вида AW-123456789. */
  readonly VITE_GADS_ID?: string
  /** Метка конверсии «Заявка» из Google Ads (часть после слэша в send_to). */
  readonly VITE_GADS_LEAD_LABEL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}
