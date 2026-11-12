// Блоки страниц. Рендерятся в статический HTML при сборке; в браузере оживает только форма.
import type { ReactNode } from 'react'
import { asset, clientLogos, contacts, languages, links, url, type Lang } from '../site/config'
import type { Card, Faq, LangContent, PriceRow, Section, ServicePage, Vehicle } from '../content/types'
import { QuoteForm } from '../QuoteForm'
import { Arrow, Icon, MessengerGlyph, Tick } from './Icon'

export type Ctx = {
  lang: Lang
  c: LangContent
  path: string
  available: Lang[]
  quoteHref: string
}

export const servicePath = (s: Pick<ServicePage, 'group' | 'slug'>) => `${s.group}/${s.slug}/`

/* ——— Шапка ——— */

/** Услуги для меню и карточек: без страниц маршрутов. */
export function mainServices(c: LangContent, group: ServicePage['group']) {
  return c.services.filter((s) => s.group === group && !s.route)
}

/** Страницы маршрутов (Київ — Львів и т.п.). */
export function routePages(c: LangContent) {
  return c.services.filter((s) => s.route)
}

function Logo({ lang }: { lang: Lang }) {
  return (
    <a className="logo" href={url(lang)} aria-label="GR Logistics">
      <span className="logo-mark">
        <img src={asset('brand/logo-gr.svg')} width="300" height="120" alt="" />
      </span>
      <span className="logo-text">Logistics</span>
    </a>
  )
}

function LangSwitch({ lang, available, path, label }: { lang: Lang; available: Lang[]; path: string; label: string }) {
  const ready = languages.filter((l) => l.ready)
  // В украинской версии русский — в самом низу списка.
  if (lang === 'ua') ready.sort((a, b) => Number(a.code === 'ru') - Number(b.code === 'ru'))
  const current = ready.find((l) => l.code === lang)!
  // Выпадающий список: пять языков в шапке не помещаются на телефоне.
  // data-lang на ссылке: client.tsx запоминает выбор посетителя.
  return (
    <details className="lang">
      <summary aria-label={`${label}: ${current.name}`}>
        {current.label}
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </summary>
      <ul className="lang-menu">
        {ready.map((l) => (
          <li key={l.code}>
            {l.code === lang ? (
              <span className="lang-on" aria-current="true" lang={l.hreflang}>
                <b>{l.label}</b> {l.name}
              </span>
            ) : (
              <a href={available.includes(l.code) ? url(l.code, path) : url(l.code)} hrefLang={l.hreflang} lang={l.hreflang} data-lang={l.code}>
                <b>{l.label}</b> {l.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </details>
  )
}

function ThemeToggle({ label }: { label: string }) {
  // Состояние (aria-checked, тема) выставляет client.tsx: страница пререндерена,
  // а выбор посетителя известен только в браузере.
  return (
    <button type="button" className="theme-tg" role="switch" aria-checked="false" aria-label={label} title={label} data-theme-toggle>
      <span className="theme-tg-stars" aria-hidden="true" />
      <span className="theme-tg-knob" aria-hidden="true">
        <svg className="theme-tg-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.2" fill="currentColor" stroke="none" />
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
        </svg>
        <svg className="theme-tg-moon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a.6.6 0 0 0-.8-.7A9.6 9.6 0 1 0 21.2 15.4a.6.6 0 0 0-.7-.8Z" />
        </svg>
      </span>
    </button>
  )
}

/** Меню «Транспорт»: три основные машины крупно, спецтехника отдельной группой. */
const TRANSPORT_MAIN = ['bus', 'trucks', 'fura']
const TRANSPORT_SPECIAL = ['negabaryt', 'avtovoz', 'manipulator', 'avtokran']

/** Меню «Послуги»: задачи по Україні и международка по регионам. Машины живут в «Транспорте». */
const MENU_GROUPS = [
  { hub: 'ukraine', cols: [{ key: 'cargo', slugs: ['pereizd', 'zbirni', 'palety', 'refrigerator', 'bulk', 'liquid', 'kyiv'] }] },
  { hub: 'international', cols: [
    { key: 'europe', slugs: ['europe', 'poland', 'slovenia', 'customs'] },
    { key: 'overseas', slugs: ['china', 'asia', 'usa', 'sea', 'air'] },
  ] },
] as const

function pick(all: ServicePage[], slugs: readonly string[]) {
  return slugs.map((slug) => all.find((s) => s.slug === slug)).filter((s): s is ServicePage => Boolean(s))
}

function menuGroups(c: LangContent) {
  return MENU_GROUPS.map((g) => {
    const all = mainServices(c, g.hub)
    const cols = g.cols.map((col) => ({ title: c.ui.menuGroups[col.key], items: pick(all, col.slugs) }))
    // Новая услуга, которой ещё нет в меню, попадает в последнюю колонку, чтобы не потеряться.
    const used = new Set<string>([...g.cols.flatMap((col) => col.slugs), ...TRANSPORT_MAIN, ...TRANSPORT_SPECIAL])
    cols[cols.length - 1].items.push(...all.filter((s) => !used.has(s.slug)))
    return { hub: g.hub, title: g.hub === 'ukraine' ? c.ui.nav.ukraine : c.ui.nav.international, cols }
  })
}

function transportMenu(c: LangContent) {
  const all = mainServices(c, 'ukraine')
  return { title: c.blocks.transport.eyebrow, main: pick(all, TRANSPORT_MAIN), specialTitle: c.ui.menuGroups.special, special: pick(all, TRANSPORT_SPECIAL) }
}

export function Header({ lang, c, path, available, quoteHref }: Ctx) {
  const groups = menuGroups(c)
  const tr = transportMenu(c)
  const caret = (
    <svg className="nav-caret" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  const trSlugs = [...tr.main, ...tr.special].map((s) => `ukraine/${s.slug}/`)
  const inTransport = trSlugs.some((p) => path.startsWith(p))
  const active = (p: string) => (path.startsWith(p) ? 'is-active' : undefined)
  const inServices = !inTransport && (path.startsWith('ukraine/') || path.startsWith('international/'))
  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Logo lang={lang} />
        <nav className="nav" aria-label={c.ui.menu}>
          <div className="nav-item nav-item--mega">
            <button type="button" className={`nav-btn${inServices ? ' is-active' : ''}`} aria-haspopup="true">
              {c.ui.nav.services}
              {caret}
            </button>
            <div className="drop drop--mega">
              <div className="mega">
                {groups.map((g) => (
                  <div key={g.hub} className={`mega-sec mega-sec--${g.hub}`}>
                    <a className="mega-hub" href={url(lang, `${g.hub}/`)}>
                      {g.title} <Arrow size={14} />
                    </a>
                    <div className="mega-cols">
                      {g.cols.map((col) => (
                        <div key={col.title} className="mega-col">
                          <p className="mega-h">{col.title}</p>
                          <ul>
                            {col.items.map((s) => (
                              <li key={s.slug}>
                                <a href={url(lang, servicePath(s))}>
                                  <Icon name={s.card.icon} size={16} />
                                  <span>{s.card.title}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="nav-item">
            <button type="button" className={`nav-btn${inTransport ? ' is-active' : ''}`} aria-haspopup="true">
              {tr.title}
              {caret}
            </button>
            <div className="drop drop--tr">
              <div className="tr-menu">
                <ul>
                  {tr.main.map((s) => (
                    <li key={s.slug}>
                      <a className="tr-main" href={url(lang, servicePath(s))}>
                        <Icon name={s.card.icon} size={20} />
                        <span className="tr-txt">
                          <strong>{s.card.title}</strong>
                          <span>{s.card.text}</span>
                        </span>
                        {s.card.price ? <span className="tr-price">{s.card.price}</span> : null}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mega-h">{tr.specialTitle}</p>
                <ul className="tr-special">
                  {tr.special.map((s) => (
                    <li key={s.slug}>
                      <a href={url(lang, servicePath(s))}>
                        <Icon name={s.card.icon} size={16} />
                        <span>{s.card.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <a className={active('prices/')} href={url(lang, 'prices/')}>
            {c.ui.nav.prices}
          </a>
          <a className={active('contacts/')} href={url(lang, 'contacts/')}>
            {c.ui.nav.contacts}
          </a>
        </nav>
        <div className="hdr-right">
          <a className="hdr-phone" href={links.tel}>
            {contacts.phoneDisplay}
          </a>
          <ThemeToggle label={c.ui.theme} />
          <LangSwitch lang={lang} available={available} path={path} label={c.ui.langSwitch} />
          <a className="btn btn--acc btn--sm hdr-cta" href={quoteHref}>
            {c.ui.ctaShort}
          </a>
          <details className="burger">
            <summary aria-label={c.ui.menu}>
              <span />
              <span />
              <span />
            </summary>
            <div className="burger-menu">
              {groups.map((g) => (
                <div key={g.hub}>
                  <p className="burger-h">
                    <a href={url(lang, `${g.hub}/`)}>{g.title}</a>
                  </p>
                  {g.cols.map((col) => (
                    <div key={col.title} className="burger-grp">
                      <p className="burger-sub">{col.title}</p>
                      <ul>
                        {col.items.map((s) => (
                          <li key={s.slug}>
                            <a href={url(lang, servicePath(s))}>{s.card.title}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <p className="burger-h">{tr.title}</p>
              <ul>
                {[...tr.main, ...tr.special].map((s) => (
                  <li key={s.slug}>
                    <a href={url(lang, servicePath(s))}>{s.card.title}</a>
                  </li>
                ))}
              </ul>
              <p className="burger-h">
                <a href={url(lang, 'prices/')}>{c.ui.nav.prices}</a>
              </p>
              <p className="burger-h">
                <a href={url(lang, 'contacts/')}>{c.ui.nav.contacts}</a>
              </p>
              <a className="btn btn--dark btn--block" href={links.tel}>
                <MessengerGlyph kind="phone" />
                {contacts.phoneDisplay}
              </a>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}

/* ——— Первый экран ——— */

export function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className="crumbs" aria-label="breadcrumbs">
      <ol>
        {items.map((i, n) => (
          <li key={n}>{i.href ? <a href={i.href}>{i.label}</a> : <span aria-current="page">{i.label}</span>}</li>
        ))}
      </ol>
    </nav>
  )
}

export function Messengers({ c, dark }: { c: LangContent; dark?: boolean }) {
  const items = [
    { href: links.viber, kind: 'viber' as const, label: 'Viber' },
    { href: links.telegram, kind: 'telegram' as const, label: 'Telegram' },
    { href: links.whatsapp, kind: 'whatsapp' as const, label: 'WhatsApp' },
  ]
  return (
    <ul className={`msg${dark ? ' msg--dark' : ''}`} aria-label={c.ui.write}>
      {items.map((i) => (
        <li key={i.kind}>
          <a className={`msg-${i.kind}`} href={i.href} target="_blank" rel="noopener">
            <MessengerGlyph kind={i.kind} />
            <span>{i.label}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

function FormIsland({ ctx }: { ctx: Ctx }) {
  const successUrl = url(ctx.lang, 'thanks/')
  const formLang = ctx.lang
  return (
    <div className="hero-form" data-island="quote" data-lang={formLang} data-success-url={successUrl}>
      <QuoteForm successUrl={successUrl} lang={formLang} />
    </div>
  )
}

export function Hero({
  ctx,
  crumbs,
  eyebrow,
  title,
  lead,
  bullets,
  price,
  home,
}: {
  ctx: Ctx
  crumbs?: { href?: string; label: string }[]
  eyebrow?: string
  title: ReactNode
  lead: string
  bullets: string[]
  price?: string
  home?: boolean
}) {
  const { c } = ctx
  return (
    <section className={`hero${home ? ' hero--home' : ''}`} aria-labelledby="h1">
      <div className="wrap hero-grid">
        <div className="hero-text">
          {crumbs ? <Crumbs items={crumbs} /> : null}
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 id="h1">{title}</h1>
          <p className="lead">{lead}</p>
          {bullets.length ? (
            <ul className="ticks">
              {bullets.map((b) => (
                <li key={b}>
                  <Tick />
                  {b}
                </li>
              ))}
            </ul>
          ) : null}
          {price ? (
            <p className="hero-price">
              <span>{c.blocks.pricesTitle}</span>
              <strong>{price}</strong>
            </p>
          ) : null}
          <div className="hero-alt">
            <span className="alt-d">{c.blocks.cta.or}</span>
            <span className="alt-m">{c.blocks.cta.orMobile}</span>
            <Messengers c={c} />
          </div>
        </div>
        <FormIsland ctx={ctx} />
      </div>
      {home ? (
        <div className="wrap">
          <ul className="strip">
            {c.blocks.trustStrip.map((t) => (
              <li key={t.title}>
                <strong>{t.title}</strong>
                <span>{t.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {home ? <TruckRoad label={c.blocks.truck} /> : null}
    </section>
  )
}

/* ——— Фура под hero: по нажатию уезжает вправо и возвращается слева (анимация в client.tsx) ——— */

function TruckRoad({ label }: { label: string }) {
  return (
    <div className="road">
      <div className="wrap road-in">
        <button type="button" className="truck" aria-label={label} title={label}>
          <span className="truck-shadow" />
          <svg className="truck-svg" viewBox="-200 30 2200 404" width="300" height="55" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="truck-beam" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#fff6d6" stopOpacity="0.85" />
                <stop offset="0.45" stopColor="#fff2c4" stopOpacity="0.32" />
                <stop offset="1" stopColor="#fff2c4" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="truck-spot">
                <stop offset="0" stopColor="#fff2c4" stopOpacity="0.4" />
                <stop offset="1" stopColor="#fff2c4" stopOpacity="0" />
              </radialGradient>
              {/* Светлая тема: белый прицеп переливается в изумрудный к кабине */}
              <linearGradient id="tk-tr" x1="0" y1="0" x2="1" y2="0.35">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.45" stopColor="#f6fffb" />
                <stop offset="0.8" stopColor="#bff7de" />
                <stop offset="1" stopColor="#6ff0b8" />
              </linearGradient>
              <linearGradient id="tk-cab" x1="0" y1="0" x2="1" y2="0.3">
                <stop offset="0" stopColor="#8ff3c7" />
                <stop offset="0.5" stopColor="#e9fdf4" />
                <stop offset="1" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            <g className="truck-trail">
              <rect x="-170" y="120" width="140" height="10" rx="5" />
              <rect x="-120" y="200" width="100" height="10" rx="5" />
              <rect x="-190" y="280" width="160" height="10" rx="5" />
            </g>
            <g className="truck-body">
              <g className="truck-idle">
                {/* прицеп */}
                <rect className="tk-trailer" x="60" y="40" width="1360" height="275" rx="4" />
                <rect x="60" y="315" width="1360" height="14" fill="#2c3135" />
                <rect className="tk-green" x="60" y="292" width="1360" height="10" />
                <g className="tk-arc">
                  {[359, 490, 621, 1210, 1570].map((x) => (
                    <path key={x} d={`M${x - 58.3} 358.8 A62 62 0 0 1 ${x + 58.3} 358.8 L${x + 51.7} 361.2 A55 55 0 0 0 ${x - 51.7} 361.2 Z`} />
                  ))}
                </g>
                {/* боковая защита и поднятая опора */}
                <g fill="#3a4045">
                  <rect x="700" y="346" width="372" height="5" rx="2" />
                  <rect x="700" y="364" width="372" height="5" rx="2" />
                  <rect x="760" y="329" width="5" height="40" />
                  <rect x="930" y="329" width="5" height="40" />
                  <rect x="1078" y="329" width="18" height="44" rx="2" />
                  <rect x="1072" y="393" width="30" height="6" rx="2" />
                </g>
                <rect x="1082" y="373" width="10" height="20" fill="#5d656c" />
                <g className="tk-logo" transform="translate(413 112) scale(0.38) translate(-420 -301)">
                  <path d="M848,302 L590,302 A169.5,169.5 0 0 0 590,641 L985.0,641 L783.0,462 L670.0,462 L787.4,566 L590,566 A94.5,94.5 0 0 1 590,377 L797,377 Z M884,302 L1153.5,302 A117,117 0 0 1 1153.5,536 L1117,536 L1252,641 L1118,641 L916,462 L1153.5,462 A42.5,42.5 0 0 0 1153.5,377 L834,377 Z" />
                </g>
                <text className="tk-text" x="767" y="214" fontSize="84" fontWeight="600">
                  Logistics
                </text>
                {/* тягач */}
                <rect className="truck-pipe" x="1412" y="40" width="10" height="60" rx="3" fill="#2c3135" />
                <rect x="1272" y="330" width="418" height="20" fill="#2c3135" />
                <rect x="1470" y="350" width="90" height="34" rx="8" fill="#a3aab0" />
                <path className="tk-cab" d="M1426 360 L1426 40 L1520 40 Q1600 46 1640 62 Q1668 74 1674 100 L1690 230 L1694 360 L1632.9 360 A66 66 0 0 0 1507.1 360 Z" />
                <path className="tk-green" d="M1426 300 L1694 244 L1694 360 L1632.9 360 A66 66 0 0 0 1507.1 360 L1426 360 Z" />
                <path d="M1588 106 Q1630 100 1660 106 L1674 214 L1588 214 Z" fill="#3a4a56" />
                <path d="M1636 356 H1694 V388 Q1694 396 1686 396 H1636 Z" fill="#2c3135" />
                <rect className="truck-light" x="1682" y="316" width="10" height="16" rx="3" fill="#fff7c2" />
              </g>
            </g>
            {[359, 490, 621, 1210, 1570].map((cx) => (
              <g key={cx} className="truck-wheel" transform={`translate(${cx} 380)`}>
                <g className="wheel-spin">
                  <circle r="50" fill="#1a1d20" />
                  <circle r="25" fill="#a3aab0" />
                  <circle r="9" fill="#5d656c" />
                  <circle cx="0" cy="-16" r="4" fill="#5d656c" />
                  <circle cx="13.9" cy="8" r="4" fill="#5d656c" />
                  <circle cx="-13.9" cy="8" r="4" fill="#5d656c" />
                </g>
              </g>
            ))}
            {/* Фары: свет включается при запуске, заметен в тёмной теме */}
            <g className="truck-beam">
              <path d="M1694 318 L2150 240 L2150 440 L1694 334 Z" fill="url(#truck-beam)" />
              <ellipse cx="1960" cy="430" rx="210" ry="16" fill="url(#truck-spot)" />
              <circle cx="1690" cy="325" r="18" fill="#fff6d6" opacity="0.7" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  )
}

/* ——— Секции ——— */

export function Head({ eyebrow, title, sub, id }: { eyebrow?: string; title: string; sub?: string; id?: string }) {
  return (
    <div className="head">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {sub ? <p className="sub">{sub}</p> : null}
    </div>
  )
}

export function ServiceCards({ lang, services, compact }: { lang: Lang; services: ServicePage[]; compact?: boolean }) {
  return (
    <ul className={`cards${compact ? ' cards--compact' : ''}`}>
      {services.map((s) => (
        <li key={s.slug}>
          <ServiceCard href={url(lang, servicePath(s))} card={s.card} />
        </li>
      ))}
    </ul>
  )
}

function ServiceCard({ href, card }: { href: string; card: Card }) {
  return (
    <a className="card" href={href}>
      <span className="card-ico">
        <Icon name={card.icon} />
      </span>
      <span className="card-body">
        <strong>{card.title}</strong>
        <span>{card.text}</span>
      </span>
      {card.price ? <span className="card-price">{card.price}</span> : null}
      <span className="card-go">
        <Arrow size={18} />
      </span>
    </a>
  )
}

export function Transport({ c, vehicles, quoteHref, tinted }: { c: LangContent; vehicles: Vehicle[]; quoteHref: string; tinted?: boolean }) {
  const b = c.blocks.transport
  if (!vehicles.length) return null
  return (
    <section className={`s${tinted ? ' s--tint' : ''}`} aria-labelledby="tr-h" id="transport">
      <div className="wrap">
        <Head eyebrow={b.eyebrow} title={b.title} sub={b.sub} id="tr-h" />
        <ul className="fleet">
          {vehicles.map((v) => (
            <li key={v.id} className="veh">
              <div className="veh-top">
                <h3>{v.name}</h3>
                <p>{v.use}</p>
              </div>
              <dl>
                {v.specs.map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="veh-foot">
                <strong>{v.price}</strong>
                <a href={quoteHref} className="link-acc">
                  {c.ui.orderVehicle} <Arrow size={16} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Steps({ c, tinted }: { c: LangContent; tinted?: boolean }) {
  const b = c.blocks.steps
  return (
    <section className={`s${tinted ? ' s--tint' : ''}`} aria-labelledby="st-h">
      <div className="wrap">
        <Head eyebrow={b.eyebrow} title={b.title} sub={b.sub} id="st-h" />
        <ol className="steps">
          {b.items.map((i, n) => (
            <li key={i.title}>
              <span className="step-n">{String(n + 1).padStart(2, '0')}</span>
              <h3>{i.title}</h3>
              <p>{i.text}</p>
            </li>
          ))}
        </ol>
        <p className="fine">{b.note}</p>
      </div>
    </section>
  )
}

export function Why({ c, tinted }: { c: LangContent; tinted?: boolean }) {
  const b = c.blocks.why
  return (
    <section className={`s${tinted ? ' s--tint' : ''}`} aria-labelledby="why-h">
      <div className="wrap">
        <Head eyebrow={b.eyebrow} title={b.title} sub={b.sub} id="why-h" />
        <ul className="why">
          {b.items.map((i) => (
            <li key={i.title}>
              <span className="why-ico">
                <Icon name={i.icon} />
              </span>
              <h3>{i.title}</h3>
              <p>{i.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Clients({ c, tinted }: { c: LangContent; tinted?: boolean }) {
  const b = c.blocks.clients
  return (
    <section className={`s${tinted ? ' s--tint' : ''}`} aria-labelledby="cl-h">
      <div className="wrap">
        <Head eyebrow={b.eyebrow} title={b.title} sub={b.sub} id="cl-h" />
        <ul className="clients">
          {b.items.map((i) => (
            <li key={i.title}>
              <Icon name={i.icon} />
              <div>
                <h3>{i.title}</h3>
                <p>{i.text}</p>
              </div>
            </li>
          ))}
        </ul>
        {clientLogos.length ? (
          <div className="logos">
            <p className="logos-h">{b.logosTitle}</p>
            <ul>
              {clientLogos.map((l) => (
                <li key={l.name}>
                  <img src={asset(l.file)} alt={l.name} loading="lazy" height="40" />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function Routes({ c, lang, busRate = 20, furaRate = 45, tinted }: { c: LangContent; lang: Lang; busRate?: number; furaRate?: number; tinted?: boolean }) {
  const b = c.blocks.routes
  // Строка ведёт на страницу маршрута, если она есть.
  const pageFor = (from: string, to: string) => {
    const s = routePages(c).find((p) => p.route!.from === from && p.route!.to === to)
    return s ? url(lang, servicePath(s)) : undefined
  }
  const h = c.ui.routesHead
  const round = (n: number) => Math.round(n / 100) * 100
  const locale = languages.find((l) => l.code === lang)?.locale ?? 'uk-UA'
  const fmt = (n: number) => n.toLocaleString(locale).replace(/[\s\u202f]/g, '\u00a0')
  const u = c.ui.units
  return (
    <section className={`s${tinted ? ' s--tint' : ''}`} aria-labelledby="rt-h">
      <div className="wrap">
        <Head eyebrow={b.eyebrow} title={b.title} sub={b.sub} id="rt-h" />
        <div className="table-wrap" tabIndex={0}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">{h.route}</th>
                <th scope="col">{h.km}</th>
                <th scope="col">{h.bus}</th>
                <th scope="col">{h.fura}</th>
              </tr>
            </thead>
            <tbody>
              {b.list.map((r) => (
                <tr key={r.to}>
                  <th scope="row">
                    {pageFor(r.from, r.to) ? (
                      <a href={pageFor(r.from, r.to)}>
                        {r.from} → {r.to}
                      </a>
                    ) : (
                      <>
                        {r.from} → {r.to}
                      </>
                    )}
                  </th>
                  <td>
                    ~{fmt(r.km)} {u.km}
                  </td>
                  <td>
                    {c.ui.from} {fmt(round(r.km * busRate))} {u.uah}
                  </td>
                  <td>
                    {c.ui.from} {fmt(round(r.km * furaRate))} {u.uah}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="fine">{b.note}</p>
      </div>
    </section>
  )
}

export function FaqBlock({ c, faq, tinted }: { c: LangContent; faq: Faq[]; tinted?: boolean }) {
  if (!faq.length) return null
  return (
    <section className={`s${tinted ? ' s--tint' : ''}`} aria-labelledby="faq-h">
      <div className="wrap faq-grid">
        <Head eyebrow={c.blocks.faq.eyebrow} title={c.blocks.faq.title} id="faq-h" />
        <div className="faq">
          {faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SectionsBlock({ sections }: { sections: Section[] }) {
  return (
    <div className="prose">
      {sections.map((s) => (
        <div key={s.title} className="prose-item">
          <h2>{s.title}</h2>
          {s.text ? <p>{s.text}</p> : null}
          {s.items ? (
            <ul className="dots">
              {s.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export function PriceCard({ title, rows, note, cta, quoteHref }: { title: string; rows: PriceRow[]; note: string; cta: string; quoteHref: string }) {
  return (
    <aside className="price-card">
      <h2>{title}</h2>
      <PriceRows rows={rows} />
      <p className="fine">{note}</p>
      <a className="btn btn--acc btn--block" href={quoteHref}>
        {cta}
      </a>
    </aside>
  )
}

export function PriceRows({ rows }: { rows: PriceRow[] }) {
  return (
    <dl className="prices">
      {rows.map((r) => (
        <div key={r.label}>
          <dt>
            {r.label}
            {r.note ? <small>{r.note}</small> : null}
          </dt>
          <dd>{r.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function Chips({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="chips-block">
      <h2>{title}</h2>
      <ul className="chips">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  )
}

export function FinalCta({ c, quoteHref }: { c: LangContent; quoteHref: string }) {
  const b = c.blocks.cta
  return (
    <section className="s s--cta" aria-labelledby="cta-h">
      <div className="wrap">
        <div className="cta">
          <div>
            <h2 id="cta-h">{b.title}</h2>
            <p>{b.text}</p>
          </div>
          <div className="cta-actions">
            <a className="btn btn--acc btn--lg" href={quoteHref}>
              {b.button}
              <Arrow />
            </a>
            <a className="cta-phone" href={links.tel}>
              <MessengerGlyph kind="phone" />
              {contacts.phoneDisplay}
            </a>
            <Messengers c={c} dark />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ——— Подвал ——— */

export function Footer({ lang, c }: Ctx) {
  const ukr = mainServices(c, 'ukraine')
  const intl = mainServices(c, 'international')
  const year = new Date().getFullYear()
  return (
    <footer className="ftr">
      <div className="wrap ftr-grid">
        <div className="ftr-brand">
          <Logo lang={lang} />
          <p>{c.ui.footerAbout}</p>
          <p className="ftr-loc">{c.ui.location}</p>
        </div>
        <div>
          <p className="ftr-h">
            <a href={url(lang, 'ukraine/')}>{c.ui.nav.ukraine}</a>
          </p>
          <ul>
            {ukr.map((s) => (
              <li key={s.slug}>
                <a href={url(lang, servicePath(s))}>{s.card.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="ftr-h">
            <a href={url(lang, 'international/')}>{c.ui.nav.international}</a>
          </p>
          <ul>
            {intl.map((s) => (
              <li key={s.slug}>
                <a href={url(lang, servicePath(s))}>{s.card.title}</a>
              </li>
            ))}
            <li>
              <a href={url(lang, 'prices/')}>{c.ui.nav.prices}</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="ftr-h">
            <a href={url(lang, 'contacts/')}>{c.ui.nav.contacts}</a>
          </p>
          <ul>
            <li>
              <a href={links.tel}>{contacts.phoneDisplay}</a>
            </li>
            <li>
              <a href={links.email}>{contacts.email}</a>
            </li>
            <li>
              <a href={links.viber}>Viber</a> · <a href={links.telegram}>Telegram</a> · <a href={links.whatsapp}>WhatsApp</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap ftr-bottom">
        <p>
          © 2024–{year} GR Logistics. {c.ui.rights}
        </p>
        <p>{c.ui.footerNote}</p>
      </div>
    </footer>
  )
}

export function MobileBar({ c, quoteHref }: { c: LangContent; quoteHref: string }) {
  return (
    <nav className="mbar" aria-label={c.ui.nav.contacts}>
      <a className="mbar-call" href={links.tel} aria-label={c.ui.call}>
        <MessengerGlyph kind="phone" />
        <span>{c.ui.call}</span>
      </a>
      <a className="mbar-tg" href={links.telegram} aria-label="Telegram" target="_blank" rel="noopener">
        <MessengerGlyph kind="telegram" />
      </a>
      <a className="mbar-cta" href={quoteHref}>
        {c.ui.ctaShort}
      </a>
    </nav>
  )
}
