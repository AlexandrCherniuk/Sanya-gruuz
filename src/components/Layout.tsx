// Блоки страниц. Рендерятся в статический HTML при сборке; в браузере оживает только форма.
import type { ReactNode } from 'react'
import { asset, contacts, languages, links, url, type Lang } from '../site/config'
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

function Logo({ lang }: { lang: Lang }) {
  return (
    <a className="logo" href={url(lang)} aria-label="CR Logistics">
      <span className="logo-mark">
        <img src={asset('brand/logo-cr.png')} width="300" height="125" alt="" />
      </span>
      <span className="logo-text">Logistics</span>
    </a>
  )
}

function LangSwitch({ lang, available, path }: { lang: Lang; available: Lang[]; path: string }) {
  const ready = languages.filter((l) => l.ready)
  return (
    <div className="lang" role="group" aria-label="Мова / Язык">
      {ready.map((l) => {
        const href = available.includes(l.code) ? url(l.code, path) : url(l.code)
        return l.code === lang ? (
          <span key={l.code} className="lang-on" aria-current="true">
            {l.label}
          </span>
        ) : (
          <a key={l.code} href={href} hrefLang={l.hreflang} lang={l.hreflang}>
            {l.label}
          </a>
        )
      })}
    </div>
  )
}

export function Header({ lang, c, path, available, quoteHref }: Ctx) {
  const ukr = c.services.filter((s) => s.group === 'ukraine')
  const intl = c.services.filter((s) => s.group === 'international')
  const active = (p: string) => (path.startsWith(p) ? 'is-active' : undefined)
  const drop = (items: ServicePage[]) => (
    <div className="drop">
      <ul>
        {items.map((s) => (
          <li key={s.slug}>
            <a href={url(lang, servicePath(s))}>
              <Icon name={s.card.icon} size={18} />
              <span>{s.card.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Logo lang={lang} />
        <nav className="nav" aria-label={c.ui.menu}>
          <div className="nav-item">
            <a className={active('ukraine/')} href={url(lang, 'ukraine/')}>
              {c.ui.nav.ukraine}
            </a>
            {drop(ukr)}
          </div>
          <div className="nav-item">
            <a className={active('international/')} href={url(lang, 'international/')}>
              {c.ui.nav.international}
            </a>
            {drop(intl)}
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
          <LangSwitch lang={lang} available={available} path={path} />
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
              <p className="burger-h">
                <a href={url(lang, 'ukraine/')}>{c.ui.nav.ukraine}</a>
              </p>
              <ul>
                {ukr.map((s) => (
                  <li key={s.slug}>
                    <a href={url(lang, servicePath(s))}>{s.card.title}</a>
                  </li>
                ))}
              </ul>
              <p className="burger-h">
                <a href={url(lang, 'international/')}>{c.ui.nav.international}</a>
              </p>
              <ul>
                {intl.map((s) => (
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
  const formLang = ctx.lang === 'ru' ? 'ru' : 'ua'
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
            <span>{c.blocks.cta.or}</span>
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
    </section>
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

export function Directions({ ctx }: { ctx: Ctx }) {
  const { c, lang } = ctx
  const b = c.blocks.directions
  const ukr = c.services.filter((s) => s.group === 'ukraine')
  const intl = c.services.filter((s) => s.group === 'international')
  return (
    <section className="s" aria-labelledby="dir-h">
      <div className="wrap">
        <Head eyebrow={b.eyebrow} title={b.title} sub={b.sub} id="dir-h" />
        <div className="group">
          <h3 className="group-h">
            <a href={url(lang, 'ukraine/')}>
              {c.ui.nav.ukraine} <Arrow size={16} />
            </a>
          </h3>
          <ServiceCards lang={lang} services={ukr} />
        </div>
        <div className="group">
          <h3 className="group-h">
            <a href={url(lang, 'international/')}>
              {c.ui.nav.international} <Arrow size={16} />
            </a>
          </h3>
          <ServiceCards lang={lang} services={intl} />
        </div>
      </div>
    </section>
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

const fmt = (n: number) => n.toLocaleString('uk-UA').replace(/ /g, ' ')

export function Routes({ c, busRate = 20, furaRate = 45 }: { c: LangContent; busRate?: number; furaRate?: number }) {
  const b = c.blocks.routes
  const h = c.ui.routesHead
  const round = (n: number) => Math.round(n / 100) * 100
  return (
    <section className="s" aria-labelledby="rt-h">
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
                    {r.from} → {r.to}
                  </th>
                  <td>~{fmt(r.km)} км</td>
                  <td>
                    {c.ui.from} {fmt(round(r.km * busRate))} грн
                  </td>
                  <td>
                    {c.ui.from} {fmt(round(r.km * furaRate))} грн
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
  const ukr = c.services.filter((s) => s.group === 'ukraine')
  const intl = c.services.filter((s) => s.group === 'international')
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
          © {year} CR Logistics. {c.ui.rights}
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
