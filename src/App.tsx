import { useEffect, useRef, useState } from 'react'
import { QuoteForm } from './QuoteForm'
import { copy } from './content'
import { site } from './seo'

function Logo() {
  return (
    <a className="logo" href="#top" aria-label={`${site.name} — на початок`}>
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill="#16140f" stroke="#f3eee4" strokeWidth="1.2" />
        <path d="M7 20.5h13.2l4.3-7.2H11.3L7 20.5Z" fill="#f3eee4" />
        <circle cx="11.2" cy="22.4" r="1.7" fill="#e23d12" />
        <circle cx="18.6" cy="22.4" r="1.7" fill="#e23d12" />
      </svg>
      <span>
        {site.name}
        <small>експедиція</small>
      </span>
    </a>
  )
}

export default function App() {
  const heroRef = useRef<HTMLElement>(null)
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    const node = heroRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div id="top">
      <a className="skip-link" href={`#${copy.form.id}`}>
        {copy.skip}
      </a>

      <header className="site-header">
        <div className="wrap header-inner">
          <Logo />
          <nav className="header-actions" aria-label="Контакт і розрахунок">
            <a className="header-phone" href={`tel:${site.phone}`}>
              {site.phoneDisplay}
            </a>
            <a className="btn btn--signal" href={`#${copy.form.id}`}>
              {copy.navCta}
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section ref={heroRef} className="hero" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow eyebrow--on-dark">{copy.hero.eyebrow}</p>
              <h1 id="hero-title">{copy.hero.title}</h1>
              <p className="hero-lead">{copy.hero.lead}</p>
              <a className="btn btn--ghost" href={`tel:${site.phone}`}>
                {copy.hero.call} {site.phoneDisplay}
              </a>
            </div>
            <QuoteForm />
            <ul className="proof-row">
              {copy.proof.map((item) => (
                <li key={item.value}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id={copy.services.id} className="section" aria-labelledby="services-title">
          <div className="wrap">
            <h2 id="services-title">{copy.services.title}</h2>
            <div className="bento">
              {copy.services.items.map((item) => (
                <article key={item.title} className="bento-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--night" aria-labelledby="process-title">
          <div className="wrap">
            <h2 id="process-title">{copy.process.title}</h2>
            <ol className="steps">
              {copy.process.steps.map((step) => (
                <li key={step.n}>
                  <span>{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" aria-labelledby="extras-title">
          <div className="wrap">
            <h2 id="extras-title">{copy.extras.title}</h2>
            <div className="extras">
              {copy.extras.items.map((item) => (
                <article key={item.title} className="bento-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--sand" aria-labelledby="why-title">
          <div className="wrap">
            <h2 id="why-title">{copy.why.title}</h2>
            <div className="why">
              {copy.why.items.map((item) => (
                <article key={item.title} className="bento-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <Logo />
          <a className="footer-phone" href={`tel:${site.phone}`}>
            {site.phoneDisplay}
          </a>
          <p>
            © {new Date().getFullYear()} {site.name}. {copy.footer.rights}
          </p>
        </div>
      </footer>

      <div
        className={`sticky-cta${showSticky ? ' is-visible' : ''}`}
        aria-hidden={!showSticky}
      >
        <a className="btn btn--ghost-dark" href={`tel:${site.phone}`}>
          {copy.sticky.call}
        </a>
        <a className="btn btn--signal" href={`#${copy.form.id}`}>
          {copy.sticky.quote}
        </a>
      </div>
    </div>
  )
}
