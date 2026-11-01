import type { ReactNode } from 'react'
import { renderToString } from 'react-dom/server'
import { ChevronDown, Menu, X } from 'lucide-react'
import { QuoteForm } from '../QuoteForm'
import { asset, brand, contacts, languages, links, url, type Lang } from '../site/config'
import type { Faq, LangContent, ServicePage, Vehicle } from '../content/types'
import { servicePath } from '../site/routes'
import { Arrow, Icon, MessengerGlyph, Tick } from './Icon'

type Ctx = { lang: Lang; c: LangContent; path: string; available: Lang[]; quoteHref: string }

export function Logo({ lang, height = 30, label }: { lang: Lang; height?: number; label: string }) {
  return (
    <a className="logo" href={url(lang)} aria-label={`${brand.name}: ${label}`}>
      <img src={asset('brand/logo-cr.png')} alt={brand.name} width={Math.round(height * 2.42)} height={height} />
    </a>
  )
}

function LangSwitch({ lang, path, available, c }: Ctx) {
  const current = languages.find((l) => l.code === lang)!
  return (
    <details className="lang">
      <summary aria-label={c.ui.language}>
        {current.label}
        <ChevronDown size={14} strokeWidth={2.4} aria-hidden="true" />
      </summary>
      <ul className="lang-menu">
        {languages.map((l) => {
          const has = available.includes(l.code)
          const href = has ? url(l.code, path) : l.ready ? url(l.code) : undefined
          return (
            <li key={l.code}>
              {href ? (
                <a href={href} hrefLang={l.hreflang} lang={l.hreflang} aria-current={l.code === lang ? 'true' : undefined}>
                  {l.name}
                  <small>{l.label}</small>
                </a>
              ) : (
                <span className="is-off" lang={l.hreflang}>
                  {l.name}
                  <small>{c.ui.soon}</small>
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </details>
  )
}

export function Header(ctx: Ctx) {
  const { lang, c } = ctx
  const nav = [
    { href: url(lang, 'ukraine/'), label: c.ui.nav.ukraine },
    { href: url(lang, 'international/'), label: c.ui.nav.international },
    { href: `${url(lang)}#transport`, label: c.ui.nav.transport },
    { href: url(lang, 'business/'), label: c.ui.nav.business },
    { href: url(lang, 'contacts/'), label: c.ui.nav.contacts },
  ]
  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Logo lang={lang} label={c.ui.logoHome} />
        <nav className="nav" aria-label={c.ui.menu}>
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="sp" />
        <a className="hdr-phone" href={links.tel}>
          {contacts.phoneDisplay}
        </a>
        <LangSwitch {...ctx} />
        <a className="btn btn--acc btn--sm hdr-cta" href={ctx.quoteHref}>
          {c.ui.ctaHeader}
        </a>
        <details className="burger">
          <summary aria-label={c.ui.menu}>
            <Menu className="i-open" size={22} aria-hidden="true" />
            <X className="i-close" size={22} aria-hidden="true" />
          </summary>
          <nav className="burger-menu" aria-label={c.ui.menu}>
            {nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
            <a className="burger-phone" href={links.tel}>
              {contacts.phoneDisplay}
            </a>
          </nav>
        </details>
      </div>
    </header>
  )
}

export function Messengers({ c, compact = false }: { c: LangContent; compact?: boolean }) {
  return (
    <div className={`msg${compact ? ' msg--compact' : ''}`} aria-label={c.ui.ctaMessengers}>
      <a className="msg-viber" href={links.viber}>
        <MessengerGlyph kind="viber" />
        Viber
      </a>
      <a className="msg-tg" href={links.telegram} target="_blank" rel="noopener">
        <MessengerGlyph kind="telegram" />
        Telegram
      </a>
      <a className="msg-wa" href={links.whatsapp} target="_blank" rel="noopener">
        <MessengerGlyph kind="whatsapp" />
        WhatsApp
      </a>
    </div>
  )
}

/** Форма заявки команды «Заявки»: рендерится на сервере и оживает в браузере (src/client.tsx). */
export function QuoteIsland({ lang }: { lang: Lang }) {
  const successUrl = url(lang, 'thanks/')
  const html = renderToString(<QuoteForm successUrl={successUrl} />)
  return <div className="quote-slot" data-island="quote" data-success-url={successUrl} dangerouslySetInnerHTML={{ __html: html }} />
}

export function Hero({
  ctx,
  title,
  lead,
  bullets,
  chips,
  crumbs,
}: {
  ctx: Ctx
  title: ReactNode
  lead: string
  bullets: string[]
  chips?: string[]
  crumbs?: { href?: string; label: string }[]
}) {
  return (
    <section className="hero" aria-labelledby="h1">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          {crumbs ? <Crumbs items={crumbs} /> : null}
          {chips ? (
            <ul className="chips">
              {chips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          ) : null}
          <h1 id="h1">{title}</h1>
          <p className="lead">{lead}</p>
        </div>
        <div className="hero-form">
          <QuoteIsland lang={ctx.lang} />
          <Messengers c={ctx.c} />
        </div>
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
      </div>
    </section>
  )
}

export function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className="crumbs" aria-label="breadcrumbs">
      <ol>
        {items.map((i) => (
          <li key={i.label}>{i.href ? <a href={i.href}>{i.label}</a> : <span aria-current="page">{i.label}</span>}</li>
        ))}
      </ol>
    </nav>
  )
}

export function ServiceTiles({ lang, services }: { lang: Lang; services: ServicePage[] }) {
  return (
    <div className="tiles">
      {services.map((s) => (
        <a key={s.slug} className="tile" href={url(lang, servicePath(s))}>
          <span className="tile-ic">
            <Icon name={s.icon} />
          </span>
          <b>{s.tile.title}</b>
          <span>{s.tile.text}</span>
          <span className="tile-go">
            <Arrow size={16} />
          </span>
        </a>
      ))}
    </div>
  )
}

export function IntlCards({ lang, services, more }: { lang: Lang; services: ServicePage[]; more: string }) {
  return (
    <div className="intl">
      {services.map((s, i) => (
        <a key={s.slug} className={`big${i === 1 ? ' big--acc' : ''}`} href={url(lang, servicePath(s))}>
          <Icon name={s.icon} size={28} />
          <b>{s.tile.title}</b>
          <span>{s.tile.text}</span>
          <span className="big-go">
            {more} <Arrow size={16} />
          </span>
        </a>
      ))}
    </div>
  )
}

export function Transport({ c, vehicles, id }: { c: LangContent; vehicles: Vehicle[]; id?: string }) {
  if (!vehicles.length) return null
  return (
    <section className="s" id={id} aria-labelledby="transport-h">
      <div className="wrap">
        <h2 id="transport-h">{c.ui.sections.transport}</h2>
        <p className="sub">{c.ui.sections.transportSub}</p>
        <ul className="vts">
          {vehicles.map((v) => (
            <li key={v.id} className="vt">
              <span className="vt-ic">
                <Icon name={v.icon} size={26} />
              </span>
              <div>
                <b>{v.name}</b>
                <div className="specs">
                  {v.specs.map((s) => (
                    <i key={s}>{s}</i>
                  ))}
                </div>
                {v.price ? (
                  <p className="vt-price">
                    {c.ui.sections.price}: <strong>{v.price}</strong>
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
        <p className="note">{c.ui.sections.transportNote}</p>
      </div>
    </section>
  )
}

export function Steps({ c }: { c: LangContent }) {
  return (
    <section className="s s--white" aria-labelledby="steps-h">
      <div className="wrap">
        <h2 id="steps-h">{c.ui.sections.steps}</h2>
        <ol className="steps">
          {c.steps.map((s) => (
            <li key={s.title}>
              <b>{s.title}</b>
              <span>{s.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Why({ c }: { c: LangContent }) {
  return (
    <section className="s" aria-labelledby="why-h">
      <div className="wrap">
        <h2 id="why-h">{c.ui.sections.whyUs}</h2>
        <ul className="why">
          {c.why.map((w) => (
            <li key={w.title}>
              <span className="why-ic">
                <Icon name={w.icon} />
              </span>
              <b>{w.title}</b>
              <span>{w.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function FaqBlock({ c, faq }: { c: LangContent; faq: Faq[] }) {
  if (!faq.length) return null
  return (
    <section className="s" aria-labelledby="faq-h">
      <div className="wrap">
        <h2 id="faq-h">{c.ui.sections.faq}</h2>
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

export function FinalCta({ c, quoteHref }: { c: LangContent; quoteHref: string }) {
  return (
    <section className="s s--tight">
      <div className="wrap">
        <div className="final">
          <div>
            <h2>{c.ui.final.title}</h2>
            <p>{c.ui.final.text}</p>
          </div>
          <div className="final-actions">
            <a className="btn btn--dark" href={quoteHref}>
              {c.ui.ctaQuote}
            </a>
            <a className="btn btn--line" href={links.tel}>
              <MessengerGlyph kind="phone" />
              {contacts.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer({ lang, c, path, available }: Ctx) {
  const ukr = c.services.filter((s) => s.group === 'ukraine')
  const intl = c.services.filter((s) => s.group === 'international')
  return (
    <footer className="ftr">
      <div className="wrap ftr-cols">
        <div className="ftr-brand">
          <Logo lang={lang} height={36} label={c.ui.logoHome} />
          <p>{c.ui.footer.tagline}</p>
          <p className="ftr-loc">
            {c.ui.location}
          </p>
        </div>
        <div>
          <b>
            <a href={url(lang, 'ukraine/')}>{c.ui.footer.ukraine}</a>
          </b>
          <ul>
            {ukr.map((s) => (
              <li key={s.slug}>
                <a href={url(lang, servicePath(s))}>{s.tile.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <b>
            <a href={url(lang, 'international/')}>{c.ui.footer.international}</a>
          </b>
          <ul>
            {intl.map((s) => (
              <li key={s.slug}>
                <a href={url(lang, servicePath(s))}>{s.tile.title}</a>
              </li>
            ))}
          </ul>
          <b className="ftr-sub">{c.ui.footer.company}</b>
          <ul>
            <li>
              <a href={url(lang, 'business/')}>{c.pages.business.h1}</a>
            </li>
            <li>
              <a href={url(lang, 'about/')}>{c.pages.about.h1}</a>
            </li>
          </ul>
        </div>
        <div>
          <b>
            <a href={url(lang, 'contacts/')}>{c.ui.footer.contacts}</a>
          </b>
          <ul>
            <li>
              <a href={links.tel}>{contacts.phoneDisplay}</a>
            </li>
            <li>
              <a href={links.viber}>Viber</a> · <a href={links.telegram}>Telegram</a> · <a href={links.whatsapp}>WhatsApp</a>
            </li>
            <li>
              <a href={links.email}>{contacts.email}</a>
            </li>
          </ul>
          <b className="ftr-sub">{c.ui.footer.language}</b>
          <ul className="ftr-langs">
            {languages.map((l) =>
              available.includes(l.code) ? (
                <li key={l.code}>
                  <a href={url(l.code, path)} hrefLang={l.hreflang}>
                    {l.label}
                  </a>
                </li>
              ) : (
                <li key={l.code} className="is-off">
                  {l.label}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
      <div className="wrap ftr-bottom">
        © {new Date().getFullYear()} {brand.name}. {c.ui.footer.rights}
      </div>
    </footer>
  )
}

export function MobileBar({ c, quoteHref }: { c: LangContent; quoteHref: string }) {
  return (
    <nav className="mbar" aria-label={c.ui.ctaMessengers}>
      <a className="mbar-call" href={links.tel} aria-label={c.ui.call}>
        <MessengerGlyph kind="phone" />
      </a>
      <a className="mbar-viber" href={links.viber} aria-label="Viber">
        <MessengerGlyph kind="viber" />
      </a>
      <a className="mbar-tg" href={links.telegram} aria-label="Telegram">
        <MessengerGlyph kind="telegram" />
      </a>
      <a className="mbar-wa" href={links.whatsapp} aria-label="WhatsApp">
        <MessengerGlyph kind="whatsapp" />
      </a>
      <a className="mbar-quote" href={quoteHref}>
        {c.ui.ctaQuote}
      </a>
    </nav>
  )
}

export type { Ctx }
