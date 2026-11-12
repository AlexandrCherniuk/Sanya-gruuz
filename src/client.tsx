// Браузерная часть: страницы уже готовые (пререндер), оживляем только форму заявки,
// меню, тему и фуру.
import '@fontsource-variable/manrope/wght.css'
import './styles.css'
import { hydrateRoot } from 'react-dom/client'
import { QuoteForm } from './QuoteForm'
import { languages, type Lang } from './site/config'
import { saveLang } from './site/langPick'

const isLang = (v?: string): v is Lang => languages.some((l) => l.code === v)

document.querySelectorAll<HTMLElement>('[data-island="quote"]').forEach((el) => {
  const lang = isLang(el.dataset.lang) ? el.dataset.lang : 'ua'
  hydrateRoot(el, <QuoteForm successUrl={el.dataset.successUrl} lang={lang} />)
})

// Переключатель темы. Начальную тему уже поставил скрипт в <head> (THEME_BOOT в entry-server.tsx).
const THEME_KEY = 'gr-theme'
const themeColor = { light: '#FFFFFF', dark: '#17191C' }
const currentTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
function syncThemeUi() {
  const t = currentTheme()
  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-checked', String(t === 'dark')))
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', themeColor[t])
}
function setTheme(t: 'dark' | 'light', from?: HTMLElement) {
  const root = document.documentElement
  const apply = () => {
    root.dataset.theme = t
    syncThemeUi()
  }
  try {
    localStorage.setItem(THEME_KEY, t)
  } catch {
    /* приватный режим: просто не запоминаем */
  }
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }
  if (!reduce && doc.startViewTransition && from) {
    // Новая тема «разливается» кругом от переключателя.
    const r = from.getBoundingClientRect()
    const x = r.left + r.width / 2
    const y = r.top + r.height / 2
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    doc.startViewTransition(apply).ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  } else if (!reduce) {
    root.classList.add('theme-anim')
    apply()
    setTimeout(() => root.classList.remove('theme-anim'), 400)
  } else apply()
}
syncThemeUi()
document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((b) =>
  b.addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark', b)),
)
// Посетитель не выбирал сам: следуем за настройкой устройства, если она поменялась.
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  let saved: string | null = null
  try {
    saved = localStorage.getItem(THEME_KEY)
  } catch {
    /* нет доступа */
  }
  if (!saved) {
    document.documentElement.dataset.theme = e.matches ? 'dark' : 'light'
    syncThemeUi()
  }
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

// Фура под hero: по нажатию трогается, уезжает вправо за экран и приезжает слева на своё место.
// Только Web Animations API, без библиотек. Колёса крутятся ровно на пройденный путь.
function truckRide() {
  const truck = document.querySelector<HTMLButtonElement>('.truck')
  const road = truck?.closest<HTMLElement>('.road')
  if (!truck || !road || typeof truck.animate !== 'function') return
  const svg = truck.querySelector('svg')!
  const body = truck.querySelector<SVGGElement>('.truck-body')!
  const trail = truck.querySelector<SVGGElement>('.truck-trail')!
  const wheels = [...truck.querySelectorAll<SVGGElement>('.wheel-spin')]
  const light = truck.querySelector<SVGRectElement>('.truck-light')!
  const pipe = truck.querySelector<SVGRectElement>('.truck-pipe')!
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  const beam = truck.querySelector<SVGGElement>('.truck-beam')!
  const dark = () => document.documentElement.dataset.theme === 'dark'
  let busy = false

  // Фары: моргнули при запуске и горят ровно; гаснут плавно.
  function lightsOn() {
    if (!dark()) return
    beam.getAnimations().forEach((a) => a.cancel())
    beam.animate(
      reduce.matches
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [
            { opacity: 0 },
            { opacity: 0.7, offset: 0.15 },
            { opacity: 0.15, offset: 0.28 },
            { opacity: 0.9, offset: 0.45 },
            { opacity: 0.6, offset: 0.55 },
            { opacity: 1 },
          ],
      { duration: reduce.matches ? 500 : 650, easing: 'ease-out', fill: 'forwards' },
    )
  }
  async function lightsOff() {
    const from = Number(getComputedStyle(beam).opacity)
    if (!from) return
    beam.getAnimations().forEach((a) => a.cancel())
    await beam.animate([{ opacity: from }, { opacity: 0 }], { duration: 900, easing: 'ease-in', fill: 'forwards' }).finished
  }

  const play = (el: Element, k: Keyframe[], o: KeyframeAnimationOptions) => el.animate(k, { fill: 'forwards', ...o }).finished

  // Клубы дыма остаются на месте, а фура уезжает от них.
  function puffs(n: number) {
    const r = pipe.getBoundingClientRect()
    const base = road!.getBoundingClientRect()
    for (let i = 0; i < n; i++) {
      const p = document.createElement('span')
      p.className = 'puff'
      p.style.left = `${r.left - base.left - 4}px`
      p.style.top = `${r.top - base.top - 6}px`
      road!.appendChild(p)
      const dx = -10 - Math.random() * 14 - i * 6
      const dy = -14 - Math.random() * 12
      p.animate(
        [
          { transform: 'translate(0,0) scale(0.4)', opacity: 0 },
          { transform: `translate(${dx * 0.3}px,${dy * 0.4}px) scale(1)`, opacity: 1, offset: 0.2 },
          { transform: `translate(${dx}px,${dy}px) scale(${1.8 + Math.random()})`, opacity: 0 },
        ],
        { duration: 900 + i * 120, delay: i * 110, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' },
      ).finished.then(() => p.remove())
    }
  }

  function spin(px: number, duration: number, easing: string) {
    const r = (50 * svg.getBoundingClientRect().width) / 2200 // радиус колеса в пикселях
    const deg = (px / r) * (180 / Math.PI)
    wheels.forEach((w) => w.animate([{ transform: 'rotate(0deg)' }, { transform: `rotate(${deg}deg)` }], { duration, easing }))
  }

  async function ride() {
    const tr = truck!.getBoundingClientRect()
    const rd = road!.getBoundingClientRect()
    const out = rd.right - tr.left + 30 // до правого края и чуть дальше
    const back = tr.right - rd.left + 30 // заезд из-за левого края
    // На компьютере экран шире, поэтому едет спокойнее, на телефоне быстрее.
    const wide = window.matchMedia('(min-width: 900px)').matches
    const go = wide ? Math.min(3200, 1600 + out * 1.1) : Math.min(1700, 900 + out * 0.55)
    const come = wide ? Math.min(3600, 1900 + back * 1.2) : Math.min(2000, 1100 + back * 0.6)

    // Заводится: дрожь кабины, дым, в тёмной теме включаются фары.
    lightsOn()
    puffs(3)
    light.animate([{ opacity: 1 }, { opacity: 0.2 }, { opacity: 1 }], { duration: 260, iterations: 2 })
    await play(
      body,
      [
        { transform: 'translate(0,0)' },
        { transform: 'translate(0,-0.6px)' },
        { transform: 'translate(0,0.4px)' },
        { transform: 'translate(0,-0.4px)' },
        { transform: 'translate(0,0)' },
      ],
      { duration: 360, easing: 'linear' },
    )

    // Трогается: плавный разгон, корпус чуть приседает назад.
    const accel = 'cubic-bezier(.55,0,.9,.45)'
    spin(out, go, accel)
    puffs(2)
    body.animate(
      [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(-1.6deg)', offset: 0.18 },
        { transform: 'rotate(-0.4deg)', offset: 0.55 },
        { transform: 'rotate(0deg)' },
      ],
      { duration: go, easing: 'ease-in-out' },
    )
    trail.animate([{ opacity: 0 }, { opacity: 0, offset: 0.35 }, { opacity: 0.9 }], { duration: go, fill: 'forwards' })
    await play(truck!, [{ transform: 'translateX(0)' }, { transform: `translateX(${out}px)` }], { duration: go, easing: accel })

    // За кадром перескакивает влево и приезжает обратно, мягко тормозит.
    await new Promise((r) => setTimeout(r, 280))
    const brake = 'cubic-bezier(.1,.55,.25,1)'
    truck!.getAnimations().forEach((a) => a.cancel())
    spin(back, come, brake)
    trail.animate([{ opacity: 0.9 }, { opacity: 0, offset: 0.55 }, { opacity: 0 }], { duration: come, fill: 'forwards' })
    body.animate(
      [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(0deg)', offset: 0.5 },
        { transform: 'rotate(1.4deg)', offset: 0.78 },
        { transform: 'rotate(-0.6deg)', offset: 0.88 },
        { transform: 'rotate(0.25deg)', offset: 0.95 },
        { transform: 'rotate(0deg)' },
      ],
      { duration: come, easing: 'ease-out' },
    )
    await play(truck!, [{ transform: `translateX(${-back}px)` }, { transform: 'translateX(0)' }], { duration: come, easing: brake })
    truck!.getAnimations().forEach((a) => a.cancel())
    ;[body, trail].forEach((el) => el.getAnimations().forEach((a) => a.cancel()))
    // Постоял с фарами и заглушился.
    await new Promise((r) => setTimeout(r, 1200))
    await lightsOff()
  }

  truck.addEventListener('click', async () => {
    if (busy) return
    busy = true
    try {
      await ride() // едет всегда: человек сам нажал и ждёт поездку, даже если в системе выключена анимация
    } finally {
      busy = false
    }
  })
}
truckRide()

// Лента клиентов: на компьютере её можно тянуть мышкой, пальцем листается сама.
function logosDrag() {
  const list = document.querySelector<HTMLElement>('.logos ul')
  if (!list) return
  let startX = 0
  let startScroll = 0
  let down = false
  list.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    down = true
    startX = e.clientX
    startScroll = list.scrollLeft
  })
  list.addEventListener('pointermove', (e) => {
    if (!down) return
    const dx = e.clientX - startX
    if (!list.classList.contains('is-drag') && Math.abs(dx) > 4) {
      list.classList.add('is-drag')
      list.setPointerCapture(e.pointerId)
    }
    if (list.classList.contains('is-drag')) list.scrollLeft = startScroll - dx
  })
  const up = () => {
    down = false
    list.classList.remove('is-drag')
  }
  list.addEventListener('pointerup', up)
  list.addEventListener('pointercancel', up)
}
logosDrag()

// Мобильное меню: открыт только один раздел аккордеона.
document.querySelectorAll<HTMLDetailsElement>('details.mm-sec').forEach((d) => {
  d.addEventListener('toggle', () => {
    if (!d.open) return
    document.querySelectorAll<HTMLDetailsElement>('details.mm-sec[open]').forEach((o) => {
      if (o !== d) o.open = false
    })
  })
})
