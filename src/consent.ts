// Согласие на cookie для аналитики (Google Consent Mode v2, базовый режим).
// Пока человек не нажал «Прийняти», теги Google (и позже Clarity) не грузятся вообще.
// Выбор хранится в localStorage; кнопка «Cookie» в футере снова открывает баннер.

type Choice = 'granted' | 'denied'
const KEY = 'gr-consent'

const copy: Record<string, { text: string; accept: string; reject: string }> = {
  uk: {
    text: 'Ми використовуємо cookie для аналітики, щоб розуміти, що на сайті зручно, а що ні. Без вашої згоди аналітика не вмикається.',
    accept: 'Прийняти',
    reject: 'Відхилити',
  },
  ru: {
    text: 'Мы используем cookie для аналитики, чтобы понимать, что на сайте удобно, а что нет. Без вашего согласия аналитика не включается.',
    accept: 'Принять',
    reject: 'Отклонить',
  },
  en: {
    text: 'We use analytics cookies to understand what works on this site. Analytics stays off until you agree.',
    accept: 'Accept',
    reject: 'Decline',
  },
  pl: {
    text: 'Używamy plików cookie do analityki, aby wiedzieć, co na stronie działa dobrze. Bez Twojej zgody analityka jest wyłączona.',
    accept: 'Akceptuję',
    reject: 'Odrzucam',
  },
  sl: {
    text: 'Piškotke uporabljamo za analitiko, da vemo, kaj na strani deluje dobro. Brez vašega soglasja je analitika izklopljena.',
    accept: 'Sprejmem',
    reject: 'Zavrnem',
  },
}

const listeners: Array<() => void> = []

export function getConsent(): Choice | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

/** fn вызывается один раз, когда (и если) человек согласился. */
export function onConsentGranted(fn: () => void) {
  if (getConsent() === 'granted') fn()
  else listeners.push(fn)
}

function save(choice: Choice) {
  try {
    localStorage.setItem(KEY, choice)
  } catch {
    /* приватный режим: спросим снова на следующей странице */
  }
  const state = choice === 'granted' ? 'granted' : 'denied'
  // Если теги уже загружены (передумал через кнопку в футере), сообщаем Google новое решение.
  window.gtag?.('consent', 'update', {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  })
  if (choice === 'granted') listeners.splice(0).forEach((fn) => fn())
}

function showBanner() {
  if (document.querySelector('.ck')) return
  const lang = (document.documentElement.lang || 'uk').slice(0, 2)
  const t = copy[lang] ?? copy.uk
  const box = document.createElement('div')
  box.className = 'ck'
  box.setAttribute('role', 'region')
  box.setAttribute('aria-label', 'Cookie')
  const p = document.createElement('p')
  p.textContent = t.text
  const actions = document.createElement('div')
  actions.className = 'ck-actions'
  const make = (label: string, cls: string, choice: Choice) => {
    const b = document.createElement('button')
    b.type = 'button'
    b.className = `btn btn--sm ${cls}`
    b.textContent = label
    b.addEventListener('click', () => {
      save(choice)
      box.remove()
    })
    return b
  }
  actions.append(make(t.reject, 'btn--ghost', 'denied'), make(t.accept, 'btn--acc', 'granted'))
  box.append(p, actions)
  document.body.appendChild(box)
}

export function initConsent() {
  if (!getConsent()) showBanner()
  document.querySelectorAll<HTMLElement>('[data-cookie-settings]').forEach((b) => b.addEventListener('click', showBanner))
}
