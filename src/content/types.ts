// Форма контента одного языка. Тексты пишет команда «Тексты и SEO»,
// вёрстка берёт всё отсюда и ничего не хардкодит.

export type IconName =
  | 'bus'
  | 'van'
  | 'truck'
  | 'trailer'
  | 'oversized'
  | 'liquid'
  | 'reefer'
  | 'bulk'
  | 'moving'
  | 'equipment'
  | 'car'
  | 'manipulator'
  | 'crane'
  | 'groupage'
  | 'europe'
  | 'world'
  | 'route'
  | 'docs'
  | 'business'
  | 'clock'
  | 'check'

export type Meta = {
  /** <title>: до ~60 символов. */
  title: string
  /** <meta description>: до ~155 символов. */
  description: string
}

export type Faq = { q: string; a: string }

export type Vehicle = {
  id: string
  icon: IconName
  name: string
  specs: string[]
  /** Ставка вида «від 25 грн/км». Пусто = колонка не показывается. */
  price?: string
}

export type TextBlock = { title: string; text?: string; items?: string[] }

export type ServicePage = {
  /** Часть адреса: /ua/<group>/<slug>/ */
  slug: string
  group: 'ukraine' | 'international'
  icon: IconName
  /** Плитка на главной и в хабе. */
  tile: { title: string; text: string }
  meta: Meta
  h1: string
  lead: string
  /** Короткие пункты под H1 (2–4 шт.). */
  bullets: string[]
  /** Блоки текста под первым экраном. */
  blocks: TextBlock[]
  /** id машин из vehicles, которые подходят под услугу. */
  vehicles: string[]
  faq: Faq[]
}

export type HubPage = {
  slug: 'ukraine' | 'international'
  meta: Meta
  h1: string
  lead: string
  blocks: TextBlock[]
}

export type SimplePage = {
  slug: string
  meta: Meta
  h1: string
  lead: string
  blocks: TextBlock[]
  noindex?: boolean
}

export type Ui = {
  skip: string
  nav: { ukraine: string; international: string; transport: string; business: string; contacts: string }
  menu: string
  language: string
  soon: string
  ctaHeader: string
  ctaQuote: string
  ctaMessengers: string
  call: string
  more: string
  breadcrumbHome: string
  heroChips: string[]
  sections: {
    services: string
    servicesSub: string
    tabUkraine: string
    tabInternational: string
    transport: string
    transportSub: string
    transportNote: string
    price: string
    steps: string
    faq: string
    related: string
    whyUs: string
  }
  final: { title: string; text: string }
  footer: { tagline: string; ukraine: string; international: string; company: string; contacts: string; language: string; rights: string }
  mobileBar: { quote: string }
  /** «Київ · Словенія» на языке страницы. */
  location: string
  /** aria-label логотипа: «на головну». */
  logoHome: string
  notFound: { title: string; text: string }
}

export type LangContent = {
  ui: Ui
  home: {
    meta: Meta
    h1: string
    h1Accent: string
    h1After: string
    lead: string
    bullets: string[]
    faq: Faq[]
  }
  steps: { title: string; text: string }[]
  /** Короткие плюсы «Чому ми» (без выдуманных цифр). */
  why: { icon: IconName; title: string; text: string }[]
  vehicles: Vehicle[]
  hubs: HubPage[]
  services: ServicePage[]
  /** Для бізнесу, Про нас, Контакти, Дякуємо. */
  pages: { business: SimplePage; about: SimplePage; contacts: SimplePage; thanks: SimplePage }
}
