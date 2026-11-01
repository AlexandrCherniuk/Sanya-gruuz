// Сборка статических страниц: scripts/prerender.mjs вызывает renderPage для каждого адреса.
import { renderToStaticMarkup } from 'react-dom/server'
import { absUrl, asset, brand, contacts, defaultLang, languages, links, SITE_URL, url } from './site/config'
import { buildRoutes, content, langsForPath, servicePath, type Route } from './site/routes'
import type { LangContent } from './content/types'
import {
  Crumbs,
  FaqBlock,
  FinalCta,
  Footer,
  Header,
  Hero,
  IntlCards,
  Messengers,
  MobileBar,
  ServiceTiles,
  Steps,
  Transport,
  Why,
  type Ctx,
} from './components/Layout'
import { Arrow, MessengerGlyph } from './components/Icon'

export const routes = buildRoutes()
export { SITE_URL, defaultLang }
export { BASE } from './site/config'

function Home({ ctx }: { ctx: Ctx }) {
  const { c, lang } = ctx
  const ukr = c.services.filter((s) => s.group === 'ukraine')
  const intl = c.services.filter((s) => s.group === 'international')
  return (
    <>
      <Hero
        ctx={ctx}
        chips={c.ui.heroChips}
        title={
          <>
            {c.home.h1} <em>{c.home.h1Accent}</em> {c.home.h1After}
          </>
        }
        lead={c.home.lead}
        bullets={c.home.bullets}
      />
      <section className="s" aria-labelledby="services-h">
        <div className="wrap">
          <h2 id="services-h">{c.ui.sections.services}</h2>
          <p className="sub">{c.ui.sections.servicesSub}</p>
          <h3 className="group-h">
            <a href={url(lang, 'ukraine/')}>
              {c.ui.sections.tabUkraine} <Arrow size={16} />
            </a>
          </h3>
          <ServiceTiles lang={lang} services={ukr} />
          <h3 className="group-h">
            <a href={url(lang, 'international/')}>
              {c.ui.sections.tabInternational} <Arrow size={16} />
            </a>
          </h3>
          <IntlCards lang={lang} services={intl} more={c.ui.more} />
        </div>
      </section>
      <Steps c={c} />
      <Transport c={c} vehicles={c.vehicles} id="transport" />
      <Why c={c} />
      <FaqBlock c={c} faq={c.home.faq} />
      <FinalCta c={c} quoteHref={ctx.quoteHref} />
    </>
  )
}

function crumbsFor(ctx: Ctx, trail: { href?: string; label: string }[]) {
  return [{ href: url(ctx.lang), label: ctx.c.ui.breadcrumbHome }, ...trail]
}

function hubLabel(c: LangContent, slug: 'ukraine' | 'international') {
  return slug === 'ukraine' ? c.ui.nav.ukraine : c.ui.nav.international
}

function Hub({ ctx, route }: { ctx: Ctx; route: Extract<Route, { kind: 'hub' }> }) {
  const { c, lang } = ctx
  const hub = route.hub
  const list = c.services.filter((s) => s.group === hub.slug)
  return (
    <>
      <Hero ctx={ctx} crumbs={crumbsFor(ctx, [{ label: hubLabel(c, hub.slug) }])} title={hub.h1} lead={hub.lead} bullets={[]} />
      <section className="s">
        <div className="wrap">
          {hub.slug === 'ukraine' ? <ServiceTiles lang={lang} services={list} /> : <IntlCards lang={lang} services={list} more={c.ui.more} />}
        </div>
      </section>
      <Blocks blocks={hub.blocks} />
      <Steps c={c} />
      <Transport c={c} vehicles={c.vehicles} />
      <FinalCta c={c} quoteHref={ctx.quoteHref} />
    </>
  )
}

function Blocks({ blocks }: { blocks: LangContent['services'][number]['blocks'] }) {
  if (!blocks.length) return null
  return (
    <section className="s">
      <div className="wrap blocks">
        {blocks.map((b) => (
          <div key={b.title} className="block">
            <h2>{b.title}</h2>
            {b.text ? <p>{b.text}</p> : null}
            {b.items ? (
              <ul className="dots">
                {b.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}

function Service({ ctx, route }: { ctx: Ctx; route: Extract<Route, { kind: 'service' }> }) {
  const { c, lang } = ctx
  const s = route.service
  const vehicles = s.vehicles.map((id) => c.vehicles.find((v) => v.id === id)).filter((v) => v !== undefined)
  const related = c.services.filter((x) => x.group === s.group && x.slug !== s.slug).slice(0, 8)
  return (
    <>
      <Hero
        ctx={ctx}
        crumbs={crumbsFor(ctx, [{ href: url(lang, `${s.group}/`), label: hubLabel(c, s.group) }, { label: s.tile.title }])}
        title={s.h1}
        lead={s.lead}
        bullets={s.bullets}
      />
      <Blocks blocks={s.blocks} />
      <Transport c={c} vehicles={vehicles} />
      <Steps c={c} />
      <FaqBlock c={c} faq={s.faq} />
      <section className="s">
        <div className="wrap">
          <h2>{c.ui.sections.related}</h2>
          {s.group === 'ukraine' ? <ServiceTiles lang={lang} services={related} /> : <IntlCards lang={lang} services={related} more={c.ui.more} />}
        </div>
      </section>
      <FinalCta c={c} quoteHref={ctx.quoteHref} />
    </>
  )
}

function Simple({ ctx, route }: { ctx: Ctx; route: Extract<Route, { kind: 'page' }> }) {
  const { c } = ctx
  const p = route.page
  if (p.slug === 'thanks') {
    return (
      <>
        <section className="hero hero--plain" aria-labelledby="h1">
          <div className="wrap">
            <Crumbs items={crumbsFor(ctx, [{ label: p.h1 }])} />
            <h1 id="h1">{p.h1}</h1>
            <p className="lead">{p.lead}</p>
            <div className="contact-big">
              <a className="btn btn--acc" href={links.tel}>
                <MessengerGlyph kind="phone" />
                {contacts.phoneDisplay}
              </a>
              <a className="btn btn--ghost" href={links.email}>
                <MessengerGlyph kind="email" />
                {contacts.email}
              </a>
            </div>
            <Messengers c={c} />
            <p className="hero-loc">
              {c.ui.location}
            </p>
          </div>
        </section>
        <Blocks blocks={p.blocks} />
        <Steps c={c} />
      </>
    )
  }
  return (
    <>
      <Hero ctx={ctx} crumbs={crumbsFor(ctx, [{ label: p.h1 }])} title={p.h1} lead={p.lead} bullets={[]} />
      {p.slug === 'contacts' ? <ContactCards c={c} /> : null}
      <Blocks blocks={p.blocks} />
      <Steps c={c} />
      <FinalCta c={c} quoteHref={ctx.quoteHref} />
    </>
  )
}

function ContactCards({ c }: { c: LangContent }) {
  const items = [
    { href: links.tel, kind: 'phone' as const, label: contacts.phoneDisplay },
    { href: links.viber, kind: 'viber' as const, label: 'Viber' },
    { href: links.telegram, kind: 'telegram' as const, label: 'Telegram' },
    { href: links.whatsapp, kind: 'whatsapp' as const, label: 'WhatsApp' },
    { href: links.email, kind: 'email' as const, label: contacts.email },
  ]
  return (
    <section className="s">
      <div className="wrap">
        <ul className="contacts">
          {items.map((i) => (
            <li key={i.kind}>
              <a className={`contact contact--${i.kind}`} href={i.href}>
                <MessengerGlyph kind={i.kind} />
                {i.label}
              </a>
            </li>
          ))}
          <li>
            <span className="contact contact--loc">
              {c.ui.location}
            </span>
          </li>
        </ul>
      </div>
    </section>
  )
}

function jsonLd(route: Route, c: LangContent) {
  const graph: object[] = []
  const pageUrl = absUrl(route.lang, route.path)
  if (route.kind === 'home') {
    graph.push({
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: brand.name,
      url: absUrl(route.lang),
      image: `${SITE_URL}/brand/og.png`,
      logo: `${SITE_URL}/brand/icon-512.png`,
      telephone: `+${contacts.phone}`,
      email: contacts.email,
      address: { '@type': 'PostalAddress', addressLocality: brand.city, addressCountry: 'UA' },
      areaServed: ['UA', 'EU'],
    })
  }
  if (route.kind !== 'home') {
    const items = [{ name: c.ui.breadcrumbHome, item: absUrl(route.lang) }]
    if (route.kind === 'service') {
      items.push({ name: hubLabel(c, route.service.group), item: absUrl(route.lang, `${route.service.group}/`) })
      items.push({ name: route.service.tile.title, item: pageUrl })
    } else {
      items.push({ name: route.kind === 'hub' ? route.hub.h1 : route.page.h1, item: pageUrl })
    }
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, ...x })),
    })
  }
  const faq = route.kind === 'home' ? c.home.faq : route.kind === 'service' ? route.service.faq : []
  if (faq.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

export function renderPage(route: Route, assets: { js: string; css: string[] }) {
  const c = content[route.lang]!
  const available = langsForPath(route.path, routes)
  const hasForm = !(route.kind === 'page' && route.page.slug === 'thanks')
  const ctx: Ctx = { lang: route.lang, c, path: route.path, available, quoteHref: hasForm ? '#zapyt' : `${url(route.lang)}#zapyt` }
  const info = languages.find((l) => l.code === route.lang)!
  const title = route.kind === 'home' ? route.meta.title : `${route.meta.title} | ${brand.name}`

  let body: React.ReactNode
  if (route.kind === 'home') body = <Home ctx={ctx} />
  else if (route.kind === 'hub') body = <Hub ctx={ctx} route={route} />
  else if (route.kind === 'service') body = <Service ctx={ctx} route={route} />
  else body = <Simple ctx={ctx} route={route} />

  const bodyHtml = renderToStaticMarkup(
    <>
      <a className="skip" href={ctx.quoteHref}>
        {c.ui.skip}
      </a>
      <Header {...ctx} />
      <main>{body}</main>
      <Footer {...ctx} />
      <MobileBar c={c} quoteHref={ctx.quoteHref} />
    </>,
  )

  const canonical = absUrl(route.lang, route.path)
  const alternates = available
    .map((code) => {
      const l = languages.find((x) => x.code === code)!
      return `<link rel="alternate" hreflang="${l.hreflang}" href="${absUrl(code, route.path)}">`
    })
    .concat(route.kind === 'home' ? [`<link rel="alternate" hreflang="x-default" href="${SITE_URL}/">`] : [])
    .join('\n    ')

  const head = `<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(route.meta.description)}">
    ${route.noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${canonical}">\n    ${alternates}`}
    <meta name="theme-color" content="#0B0D0E">
    <meta name="format-detection" content="telephone=no">
    <link rel="icon" type="image/png" href="${asset('favicon.png')}">
    <link rel="apple-touch-icon" href="${asset('brand/apple-touch-icon.png')}">
    <link rel="manifest" href="${asset('site.webmanifest')}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${esc(brand.name)}">
    <meta property="og:locale" content="${info.hreflang === 'uk' ? 'uk_UA' : info.hreflang}">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(route.meta.description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${SITE_URL}/brand/og.png">
    <meta name="twitter:card" content="summary_large_image">
    ${assets.css.map((href) => `<link rel="stylesheet" href="${href}">`).join('\n    ')}
    <script type="module" src="${assets.js}"></script>
    <script type="application/ld+json">${jsonLd(route, c)}</script>`

  return `<!doctype html>
<html lang="${info.hreflang}">
  <head>
    ${head}
  </head>
  <body>
${bodyHtml}
  </body>
</html>
`
}

/** Корень сайта: сразу отправляем на украинскую версию, ссылки на все языки для ботов. */
export function renderRoot() {
  const ready = languages.filter((l) => l.ready)
  const target = url(defaultLang)
  return `<!doctype html>
<html lang="uk">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(brand.name)}</title>
    <meta http-equiv="refresh" content="0; url=${target}">
    <link rel="canonical" href="${absUrl(defaultLang)}">
    ${ready.map((l) => `<link rel="alternate" hreflang="${l.hreflang}" href="${absUrl(l.code)}">`).join('\n    ')}
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/">
    <link rel="icon" type="image/png" href="${asset('favicon.png')}">
    <script>location.replace(${JSON.stringify(target)} + location.search + location.hash)</script>
  </head>
  <body style="font-family:system-ui,sans-serif;background:#0B0D0E;color:#fff;padding:24px">
    <p>${ready.map((l) => `<a style="color:#04F69C" href="${url(l.code)}" hreflang="${l.hreflang}">${l.name}</a>`).join(' · ')}</p>
  </body>
</html>
`
}

export function render404(assets: { js: string; css: string[] }) {
  const c = content[defaultLang]!
  const ctx: Ctx = { lang: defaultLang, c, path: '', available: [defaultLang], quoteHref: `${url(defaultLang)}#zapyt` }
  const html = renderToStaticMarkup(
    <>
      <Header {...ctx} />
      <main>
        <section className="hero hero--plain">
          <div className="wrap">
            <h1>{c.ui.notFound.title}</h1>
            <p className="lead">{c.ui.notFound.text}</p>
            <div className="contact-big">
              <a className="btn btn--acc" href={url(defaultLang)}>
                {c.ui.breadcrumbHome}
              </a>
              <a className="btn btn--ghost" href={links.tel}>
                {contacts.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer {...ctx} />
      <MobileBar c={c} quoteHref={ctx.quoteHref} />
    </>,
  )
  return `<!doctype html>
<html lang="uk">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>404 | ${esc(brand.name)}</title>
    <meta name="robots" content="noindex">
    <link rel="icon" type="image/png" href="${asset('favicon.png')}">
    ${assets.css.map((href) => `<link rel="stylesheet" href="${href}">`).join('\n    ')}
  </head>
  <body>
${html}
  </body>
</html>
`
}

export function renderSitemap() {
  const urls = routes
    .filter((r) => !r.noindex)
    .map((r) => {
      const alts = langsForPath(r.path, routes)
        .map((code) => {
          const l = languages.find((x) => x.code === code)!
          return `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${absUrl(code, r.path)}"/>`
        })
        .join('\n')
      return `  <url>\n    <loc>${absUrl(r.lang, r.path)}</loc>\n${alts}\n  </url>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
}

export function renderRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
}

export { servicePath }
