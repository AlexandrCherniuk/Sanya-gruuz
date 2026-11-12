// Сборка статических страниц: scripts/prerender.mjs вызывает renderPage для каждого адреса.
import { renderToStaticMarkup } from 'react-dom/server'
import { type Lang, absUrl, asset, BASE as BASE_PATH, brand, contacts, defaultLang, languages, links, SITE_URL, url } from './site/config'
import { buildRoutes, content, langsForPath, servicePath, type Route } from './site/routes'
import { browserLangMap, LANG_KEY, UA_TIMEZONES } from './site/langPick'
import type { LangContent, Vehicle } from './content/types'
import {
  Chips,
  Clients,
  Crumbs,
  FaqBlock,
  FinalCta,
  Footer,
  Head,
  Header,
  Hero,
  Messengers,
  MobileBar,
  mainServices,
  routePages,
  PriceCard,
  PriceRows,
  Routes,
  SectionsBlock,
  ServiceCards,
  Steps,
  Transport,
  Why,
  type Ctx,
} from './components/Layout'
import { MessengerGlyph } from './components/Icon'

export const routes = buildRoutes()
export { SITE_URL, defaultLang }
export { BASE } from './site/config'

function pickVehicles(c: LangContent, ids: string[]): Vehicle[] {
  return ids.map((id) => c.vehicles.find((v) => v.id === id)).filter((v): v is Vehicle => Boolean(v))
}

function crumbsFor(ctx: Ctx, trail: { href?: string; label: string }[]) {
  return [{ href: url(ctx.lang), label: ctx.c.ui.breadcrumbHome }, ...trail]
}

function hubLabel(c: LangContent, slug: 'ukraine' | 'international') {
  return slug === 'ukraine' ? c.ui.nav.ukraine : c.ui.nav.international
}

function Home({ ctx }: { ctx: Ctx }) {
  const { c } = ctx
  return (
    <>
      <Hero
        ctx={ctx}
        home
        eyebrow={c.home.eyebrow}
        title={
          <>
            {c.home.h1} <span className="accent">{c.home.h1Accent}</span>
          </>
        }
        lead={c.home.lead}
        bullets={c.home.bullets}
      />
      <Transport c={c} vehicles={c.vehicles.filter((v) => ['bus', 't5', 't10', 'fura', 'coupler', 'carrier', 'lowbed', 'manipulator'].includes(v.id))} quoteHref={ctx.quoteHref} tinted />
      <Steps c={c} />
      <Why c={c} tinted />
      <Clients c={c} />
      <Routes c={c} lang={ctx.lang} tinted />
      <FaqBlock c={c} faq={c.home.faq} />
      <FinalCta c={c} quoteHref={ctx.quoteHref} />
    </>
  )
}

function Hub({ ctx, route }: { ctx: Ctx; route: Extract<Route, { kind: 'hub' }> }) {
  const { c, lang } = ctx
  const hub = route.hub
  const list = mainServices(c, hub.slug)
  const routeList = routePages(c).filter((s) => s.group === hub.slug)
  const vehicles = hub.slug === 'ukraine' ? c.vehicles.filter((v) => v.id !== 'crane') : pickVehicles(c, ['bus', 'fura', 'carrier', 'lowbed'])
  return (
    <>
      <Hero ctx={ctx} crumbs={crumbsFor(ctx, [{ label: hubLabel(c, hub.slug) }])} title={hub.h1} lead={hub.lead} bullets={hub.bullets} />
      <section className="s">
        <div className="wrap">
          <ServiceCards lang={lang} services={list} />
          {routeList.length ? (
            <div className="mt-l">
              <Head title={c.blocks.routePages ?? c.blocks.routes.title} />
              <ServiceCards lang={lang} services={routeList} compact />
            </div>
          ) : null}
        </div>
      </section>
      <section className="s s--tint">
        <div className="wrap">
          <SectionsBlock sections={hub.sections} />
        </div>
      </section>
      <Transport c={c} vehicles={vehicles} quoteHref={ctx.quoteHref} />
      {hub.slug === 'ukraine' ? <Routes c={c} lang={ctx.lang} /> : null}
      <Steps c={c} tinted />
      <Why c={c} />
      <Clients c={c} tinted />
      <FaqBlock c={c} faq={hub.faq} />
      <FinalCta c={c} quoteHref={ctx.quoteHref} />
    </>
  )
}

function Service({ ctx, route }: { ctx: Ctx; route: Extract<Route, { kind: 'service' }> }) {
  const { c, lang } = ctx
  const s = route.service
  // На странице маршрута: другие маршруты и основной транспорт; на странице услуги: соседние услуги.
  const related = s.route
    ? [
        ...routePages(c).filter((x) => x.slug !== s.slug),
        ...mainServices(c, s.group).filter((x) => (s.group === 'ukraine' ? ['bus', 'trucks', 'fura', 'pereizd', 'zbirni'] : ['europe', 'poland']).includes(x.slug)),
      ]
    : [
        ...mainServices(c, s.group).filter((x) => x.slug !== s.slug),
        ...(s.group === 'international' ? routePages(c).filter((x) => x.group === 'international') : []),
      ]
  return (
    <>
      <Hero
        ctx={ctx}
        crumbs={crumbsFor(ctx, [{ href: url(lang, `${s.group}/`), label: hubLabel(c, s.group) }, { label: s.card.title }])}
        title={s.h1}
        lead={s.lead}
        bullets={s.bullets}
        price={s.priceFrom}
      />
      <section className="s">
        <div className="wrap svc-grid">
          <div>
            {s.intro ? (
              <div className="intro">
                <h2>{s.intro.title}</h2>
                {s.intro.paragraphs.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            ) : null}
            {s.cargo ? <Chips title={s.cargo.title} items={s.cargo.items} /> : null}
            <SectionsBlock sections={s.sections} />
          </div>
          {s.prices ? (
            <PriceCard title={s.prices.title} rows={s.prices.rows} note={s.prices.note} cta={c.ui.cta} quoteHref={ctx.quoteHref} />
          ) : null}
        </div>
      </section>
      <Transport c={c} vehicles={pickVehicles(c, s.vehicles)} quoteHref={ctx.quoteHref} tinted />
      <Steps c={c} />
      <Why c={c} tinted />
      <FaqBlock c={c} faq={s.faq} />
      <section className="s s--tint" aria-labelledby="rel-h">
        <div className="wrap">
          <Head title={c.blocks.related} id="rel-h" />
          <ServiceCards lang={lang} services={related} compact />
        </div>
      </section>
      <FinalCta c={c} quoteHref={ctx.quoteHref} />
    </>
  )
}

function Prices({ ctx }: { ctx: Ctx }) {
  const { c } = ctx
  const p = c.pricesPage
  return (
    <>
      <Hero ctx={ctx} crumbs={crumbsFor(ctx, [{ label: c.ui.nav.prices }])} title={p.h1} lead={p.lead} bullets={[]} />
      <section className="s">
        <div className="wrap price-cols">
          <div className="price-box">
            <h2>{p.ukraineTitle}</h2>
            <PriceRows rows={p.ukraineRows} />
          </div>
          <div className="price-box">
            <h2>{p.extraTitle}</h2>
            <PriceRows rows={p.extraRows} />
            <h2 className="mt">{p.europeTitle}</h2>
            <PriceRows rows={p.europeRows} />
          </div>
        </div>
        <div className="wrap">
          <p className="fine">{p.note}</p>
        </div>
      </section>
      <section className="s s--tint">
        <div className="wrap">
          <SectionsBlock sections={[{ title: p.factorsTitle, items: p.factors }]} />
        </div>
      </section>
      <Routes c={c} lang={ctx.lang} />
      <FaqBlock c={c} faq={p.faq} tinted />
      <FinalCta c={c} quoteHref={ctx.quoteHref} />
    </>
  )
}

function ContactList() {
  const items = [
    { href: links.tel, kind: 'phone' as const, label: contacts.phoneDisplay },
    { href: links.viber, kind: 'viber' as const, label: 'Viber' },
    { href: links.telegram, kind: 'telegram' as const, label: 'Telegram' },
    { href: links.whatsapp, kind: 'whatsapp' as const, label: 'WhatsApp' },
    { href: links.email, kind: 'email' as const, label: contacts.email },
  ]
  return (
    <ul className="contacts">
      {items.map((i) => (
        <li key={i.kind}>
          <a className={`contact contact--${i.kind}`} href={i.href}>
            <MessengerGlyph kind={i.kind} />
            {i.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

function Contacts({ ctx }: { ctx: Ctx }) {
  const { c } = ctx
  const p = c.contactsPage
  return (
    <>
      <Hero ctx={ctx} crumbs={crumbsFor(ctx, [{ label: c.ui.nav.contacts }])} title={p.h1} lead={p.lead} bullets={[]} />
      <section className="s">
        <div className="wrap svc-grid">
          <div>
            <ContactList />
            <p className="fine">
              {c.ui.location} · {p.hours}
            </p>
          </div>
          <div className="prose">
            <div className="prose-item">
              <h2>{p.aboutTitle}</h2>
              {p.about.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Steps c={c} tinted />
    </>
  )
}

function Thanks({ ctx }: { ctx: Ctx }) {
  const { c } = ctx
  const p = c.thanksPage
  return (
    <>
      <section className="hero hero--plain" aria-labelledby="h1">
        <div className="wrap narrow">
          <Crumbs items={crumbsFor(ctx, [{ label: p.h1 }])} />
          <h1 id="h1">{p.h1}</h1>
          <p className="lead">{p.lead}</p>
          <div className="contact-big">
            <a className="btn btn--acc" href={links.tel}>
              <MessengerGlyph kind="phone" />
              {contacts.phoneDisplay}
            </a>
          </div>
          <Messengers c={c} />
        </div>
      </section>
      <Steps c={c} tinted />
    </>
  )
}

function jsonLd(route: Route, c: LangContent) {
  const graph: object[] = []
  const pageUrl = absUrl(route.lang, route.path)
  const inLanguage = languages.find((l) => l.code === route.lang)!.hreflang
  const business = { '@id': `${SITE_URL}/#business` }
  // Компания описана на каждой странице, остальные сущности ссылаются на неё по @id.
  graph.push({
    '@type': 'LocalBusiness',
    ...business,
    name: brand.name,
    url: absUrl(route.lang),
    image: `${SITE_URL}/brand/og.png`,
    logo: `${SITE_URL}/brand/icon-512.png`,
    telephone: `+${contacts.phone}`,
    email: contacts.email,
    address: { '@type': 'PostalAddress', addressLocality: brand.city, addressCountry: 'UA' },
    areaServed: ['UA', 'EU'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${contacts.phone}`,
      contactType: 'customer service',
      availableLanguage: languages.filter((l) => l.ready).map((l) => l.hreflang),
    },
  })
  graph.push({
    '@type': 'WebPage',
    '@id': `${pageUrl}#page`,
    url: pageUrl,
    name: route.meta.title,
    description: route.meta.description,
    inLanguage,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: business,
  })
  if (route.kind === 'home') {
    graph.push({ '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: brand.name, publisher: business, inLanguage })
  }
  if (route.kind === 'service') {
    const s = route.service
    graph.push({
      '@type': 'Service',
      name: s.h1,
      description: s.meta.description,
      serviceType: s.card.title,
      provider: business,
      url: pageUrl,
      areaServed: s.group === 'ukraine' ? 'UA' : ['UA', 'EU'],
    })
  }
  if (route.kind !== 'home') {
    const items = [{ name: c.ui.breadcrumbHome, item: absUrl(route.lang) }]
    if (route.kind === 'service') {
      items.push({ name: hubLabel(c, route.service.group), item: absUrl(route.lang, `${route.service.group}/`) })
      items.push({ name: route.service.card.title, item: pageUrl })
    } else {
      items.push({ name: route.meta.title, item: pageUrl })
    }
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, ...x })),
    })
  }
  const faq =
    route.kind === 'home'
      ? c.home.faq
      : route.kind === 'service'
        ? route.service.faq
        : route.kind === 'hub'
          ? route.hub.faq
          : route.kind === 'prices'
            ? c.pricesPage.faq
            : []
  if (faq.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
}

/** Тема до первой отрисовки, чтобы не мигало белым: выбор посетителя, иначе настройка устройства.
 *  Ключ THEME_KEY тот же, что в client.tsx. */
const THEME_KEY = 'gr-theme'
const THEME_BOOT = `(function(){var t=null;try{t=localStorage.getItem('${THEME_KEY}')}catch(e){}if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t);if(t==='dark'){var m=document.querySelector('meta[name=theme-color]');if(m)m.content='#17191C'}})()`

type Assets = { js: string; css: string[]; fonts: string[] }

const ogLocale: Record<Lang, string> = { ua: 'uk_UA', ru: 'ru_RU', en: 'en_GB', pl: 'pl_PL', sl: 'sl_SI' }

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

export function renderPage(route: Route, assets: Assets) {
  const c = content[route.lang]!
  const available = langsForPath(route.path, routes)
  const hasForm = route.kind !== 'thanks'
  const ctx: Ctx = { lang: route.lang, c, path: route.path, available, quoteHref: hasForm ? '#zapyt' : `${url(route.lang)}#zapyt` }
  const info = languages.find((l) => l.code === route.lang)!
  // Бренд дописываем, только если title влезает в выдачу Google (~65 знаков).
  const branded = `${route.meta.title} | ${brand.name}`
  const title = route.kind === 'home' || branded.length > 65 ? route.meta.title : branded

  let body: React.ReactNode
  if (route.kind === 'home') body = <Home ctx={ctx} />
  else if (route.kind === 'hub') body = <Hub ctx={ctx} route={route} />
  else if (route.kind === 'service') body = <Service ctx={ctx} route={route} />
  else if (route.kind === 'prices') body = <Prices ctx={ctx} />
  else if (route.kind === 'contacts') body = <Contacts ctx={ctx} />
  else body = <Thanks ctx={ctx} />

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
    <meta name="theme-color" content="#FFFFFF">
    <script>${THEME_BOOT}</script>
    <meta name="format-detection" content="telephone=no">
    <link rel="icon" type="image/png" href="${asset('favicon.png')}">
    <link rel="apple-touch-icon" href="${asset('brand/apple-touch-icon.png')}">
    <link rel="manifest" href="${asset('site.webmanifest')}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${esc(brand.name)}">
    <meta property="og:locale" content="${ogLocale[route.lang]}">
    ${available
      .filter((code) => code !== route.lang)
      .map((code) => `<meta property="og:locale:alternate" content="${ogLocale[code]}">`)
      .join('\n    ')}
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(route.meta.description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${SITE_URL}/brand/og.png">
    <meta name="twitter:card" content="summary_large_image">
    ${assets.fonts.map((href) => `<link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin>`).join('\n    ')}
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

/**
 * Корень сайта: открываем язык посетителя. Сначала сохранённый выбор (переключатель или
 * плашка), потом Украина → украинская, потом язык браузера, иначе английский. Без JS (и для ботов) — украинская версия
 * через noscript и ссылки на все языки. Логика та же, что в src/site/langPick.ts.
 */
export function renderRoot() {
  const ready = languages.filter((l) => l.ready)
  const fallback = url(defaultLang)
  const map = Object.fromEntries(Object.entries(browserLangMap).filter(([, code]) => ready.some((l) => l.code === code)))
  const pick = `(function(){var m=${JSON.stringify(map)},c=null;try{c=localStorage.getItem(${JSON.stringify(LANG_KEY)})}catch(e){}
if(!c||${JSON.stringify(ready.map((l) => l.code))}.indexOf(c)<0){c=null;var a=navigator.languages||[navigator.language||''],u=false;try{u=${JSON.stringify(UA_TIMEZONES)}.indexOf(Intl.DateTimeFormat().resolvedOptions().timeZone)>=0}catch(e){}
for(var j=0;j<a.length;j++){if(String(a[j]).toLowerCase().split('-')[0]==='uk')u=true}if(u)c='ua';for(var i=0;i<a.length&&!c;i++){c=m[String(a[i]).toLowerCase().split('-')[0]]||null}}
location.replace(${JSON.stringify(BASE_PATH)}+(c||'en')+'/'+location.search+location.hash)})()`
  return `<!doctype html>
<html lang="uk">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(brand.name)}</title>
    <noscript><meta http-equiv="refresh" content="0; url=${fallback}"></noscript>
    <link rel="canonical" href="${absUrl(defaultLang)}">
    ${ready.map((l) => `<link rel="alternate" hreflang="${l.hreflang}" href="${absUrl(l.code)}">`).join('\n    ')}
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/">
    <link rel="icon" type="image/png" href="${asset('favicon.png')}">
    <script>${pick}</script>
  </head>
  <body style="font-family:system-ui,sans-serif;padding:24px">
    <p>${ready.map((l) => `<a style="color:#0B0D0E" href="${url(l.code)}" hreflang="${l.hreflang}">${l.name}</a>`).join(' · ')}</p>
  </body>
</html>
`
}

export function render404(assets: Assets) {
  const c = content[defaultLang]!
  const ctx: Ctx = { lang: defaultLang, c, path: '', available: [defaultLang], quoteHref: `${url(defaultLang)}#zapyt` }
  const html = renderToStaticMarkup(
    <>
      <Header {...ctx} />
      <main>
        <section className="hero hero--plain">
          <div className="wrap narrow">
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
    <meta name="theme-color" content="#FFFFFF">
    <script>${THEME_BOOT}</script>
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
        .concat(r.kind === 'home' ? [`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>`] : [])
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
