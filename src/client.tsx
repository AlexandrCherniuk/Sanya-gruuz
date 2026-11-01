// Браузерная часть: страницы уже готовые (пререндер), оживляем только форму заявки.
import '@fontsource-variable/manrope/wght.css'
import './styles.css'
import { hydrateRoot } from 'react-dom/client'
import { QuoteForm } from './QuoteForm'

document.querySelectorAll<HTMLElement>('[data-island="quote"]').forEach((el) => {
  hydrateRoot(el, <QuoteForm successUrl={el.dataset.successUrl} />)
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
})
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenus()
})
