// Модель контента сайта. Все тексты лежат в src/content/<язык>.ts и описаны этими типами.

export type IconName =
  | 'bus'
  | 'truck'
  | 'trailer'
  | 'oversized'
  | 'car'
  | 'manipulator'
  | 'crane'
  | 'moving'
  | 'groupage'
  | 'pallet'
  | 'europe'
  | 'china'
  | 'sea'
  | 'air'
  | 'docs'
  | 'shield'
  | 'chat'
  | 'route'
  | 'contract'
  | 'wallet'
  | 'clock'
  | 'check'
  | 'business'
  | 'store'
  | 'factory'
  | 'build'
  | 'agro'
  | 'home'
  | 'reefer'
  | 'bulk'
  | 'liquid'
  | 'city'
  | 'flag'

export type Meta = { title: string; description: string }

export type Faq = { q: string; a: string }

export type VehicleId =
  | 'bus'
  | 't5'
  | 't10'
  | 'fura'
  | 'coupler'
  | 'reefer'
  | 'tipper'
  | 'tanker'
  | 'carrier'
  | 'lowbed'
  | 'manipulator'
  | 'crane'

export type Vehicle = {
  id: VehicleId
  name: string
  /** Короткое назначение: для чего подходит. */
  use: string
  specs: { label: string; value: string }[]
  /** «від 35 грн/км» или «за запитом». */
  price: string
}

export type Group = 'ukraine' | 'international'

export type Card = { icon: IconName; title: string; text: string; price?: string }

export type Section = { title: string; text?: string; items?: string[] }

export type PriceRow = { label: string; value: string; note?: string }

export type ServicePage = {
  slug: string
  group: Group
  meta: Meta
  /** Карточка в списках услуг и пункт меню. */
  card: Card
  h1: string
  lead: string
  /** Три коротких тезиса под заголовком. */
  bullets: string[]
  /** Цена «від» в первом экране, если есть. */
  priceFrom?: string
  /** Вводный текст об услуге (2–3 абзаца). */
  intro?: { title: string; paragraphs: string[] }
  /** Что везём: список видов груза. */
  cargo?: { title: string; items: string[] }
  /** Блоки описания услуги. */
  sections: Section[]
  /** Таблица тарифов страницы. */
  prices?: { title: string; rows: PriceRow[]; note: string }
  vehicles: VehicleId[]
  faq: Faq[]
  /**
   * Страница маршрута (Київ — Львів и т.п.). Такие страницы не попадают в меню и карточки услуг,
   * на них ведут строки таблицы маршрутов и блок «Популярні маршрути».
   */
  route?: Route
}

export type HubPage = {
  slug: Group
  meta: Meta
  h1: string
  lead: string
  bullets: string[]
  sections: Section[]
  faq: Faq[]
}

export type Route = {
  from: string
  to: string
  km: number
  /** Если есть страница маршрута: её путь внутри языка, например 'ukraine/kyiv-lviv/'. */
  href?: string
}

export type LangContent = {
  /** Язык интерфейса: подписи, меню, кнопки. */
  ui: {
    skip: string
    menu: string
    nav: { ukraine: string; international: string; prices: string; contacts: string }
    cta: string
    ctaShort: string
    call: string
    write: string
    breadcrumbHome: string
    city: string
    location: string
    from: string
    more: string
    allServices: string
    perKm: string
    orderVehicle: string
    footerAbout: string
    footerNote: string
    rights: string
    notFound: { title: string; text: string }
    routesHead: { route: string; km: string; bus: string; fura: string }
    /** Подпись переключателя языков для экранных читалок. */
    langSwitch: string
    /** Единицы в таблице маршрутов. */
    units: { km: string; uah: string }
  }
  /** Общие блоки, которые повторяются на страницах. */
  blocks: {
    trustStrip: { title: string; text: string }[]
    directions: { eyebrow: string; title: string; sub: string }
    transport: { eyebrow: string; title: string; sub: string }
    steps: { eyebrow: string; title: string; sub: string; items: { title: string; text: string }[]; note: string }
    why: { eyebrow: string; title: string; sub: string; items: Card[] }
    routes: { eyebrow: string; title: string; sub: string; note: string; list: Route[] }
    faq: { eyebrow: string; title: string }
    clients: { eyebrow: string; title: string; sub: string; items: Card[]; logosTitle: string }
    cta: { title: string; text: string; button: string; or: string; orMobile: string }
    related: string
    /** Заголовок блока со страницами маршрутов на разделах «По Україні» и «Міжнародні». */
    routePages?: string
    cargoTitle: string
    pricesTitle: string
  }
  home: {
    meta: Meta
    eyebrow: string
    h1: string
    h1Accent: string
    lead: string
    bullets: string[]
    faq: Faq[]
  }
  vehicles: Vehicle[]
  hubs: HubPage[]
  services: ServicePage[]
  pricesPage: {
    meta: Meta
    h1: string
    lead: string
    ukraineTitle: string
    ukraineRows: PriceRow[]
    extraTitle: string
    extraRows: PriceRow[]
    europeTitle: string
    europeRows: PriceRow[]
    note: string
    factorsTitle: string
    factors: string[]
    faq: Faq[]
  }
  contactsPage: {
    meta: Meta
    h1: string
    lead: string
    aboutTitle: string
    about: string[]
    hours: string
  }
  thanksPage: { meta: Meta; h1: string; lead: string; next: string }
}
