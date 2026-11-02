// Браузерная часть: страницы уже готовые (пререндер), оживляем только форму заявки,
// меню и подсказку о языке.
import '@fontsource-variable/manrope/wght.css'
import './styles.css'
import { hydrateRoot } from 'react-dom/client'
import { QuoteForm } from './QuoteForm'
import { languages, type Lang } from './site/config'
import { browserLang, hintCopy, saveLang, savedLang } from './site/langPick'

const isLang = (v?: string): v is Lang => languages.some((l) => l.code === v)

document.querySelectorAll<HTMLElement>('[data-island="quote"]').forEach((el) => {
  const lang = isLang(el.dataset.lang) ? el.dataset.lang : 'ua'
  hydrateRoot(el, <QuoteForm successUrl={el.dataset.successUrl} lang={lang} />)
})

// Закрываем выпадающие меню (язык, бургер) по клику мимо и по Esc.
function closeMenus(except?: Element | null) {
  document.querySelectorAll<HTMLDetailsElement>('details.lang[open], details.burger[open]').forEach((d) => {
    if (d !== except) d.open = false
  })
}
document.addEventListener('click', (e) => {
  const target = e.target as Element
  closeMenus(target.closest('details.lang, details.burger'))
  if (target.closest('.burger-menu a')) closeMenus()
  // Посетитель сам выбрал язык: запоминаем, корень сайта дальше откроет его.
  const pick = target.closest<HTMLAnchorElement>('a[data-lang]')
  if (pick?.dataset.lang) saveLang(pick.dataset.lang)
})
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenus()
})

// Плашка «есть версия на вашем языке». Без автоматического перехода: человек из рекламы
// или поиска остаётся на своей странице, а Google видит все версии.
function langHint() {
  const pageHreflang = document.documentElement.lang
  const page = languages.find((l) => l.hreflang === pageHreflang)
  if (!page) return
  const saved = savedLang()
  const want = saved ?? browserLang()
  if (!want || want === page.code) return
  const target = languages.find((l) => l.code === want)!
  const alt = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${target.hreflang}"]`)
  if (!alt) return
  const t = hintCopy[want]
  const bar = document.createElement('div')
  bar.className = 'lang-hint'
  bar.lang = target.hreflang
  bar.innerHTML = `<div class="wrap lang-hint-in"><p></p><a></a><button type="button">×</button></div>`
  bar.querySelector('p')!.textContent = t.text
  const go = bar.querySelector('a')!
  go.textContent = t.go
  go.href = new URL(alt.href).pathname + location.search
  go.hreflang = target.hreflang
  go.dataset.lang = want
  const close = bar.querySelector('button')!
  close.setAttribute('aria-label', t.close)
  close.addEventListener('click', () => {
    // Закрыл плашку — значит, читает на этом языке: больше не предлагаем.
    saveLang(page.code)
    bar.remove()
  })
  document.body.prepend(bar)
}
langHint()
