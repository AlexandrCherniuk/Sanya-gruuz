import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { countries, PRIORITY, type Country } from './countries'
import type { FormCopy } from './formCopy'

// Флаги картинками, а не эмодзи: на Windows эмодзи-флагов нет, вместо них были буквы «UA», «PL».
// Каждый флаг отдельный маленький svg, браузер грузит только те, что видны в списке.
const FLAGS = import.meta.glob('../node_modules/country-flag-icons/3x2/*.svg', {
  query: '?no-inline',
  import: 'default',
  eager: true,
}) as Record<string, string>

function flagUrl(iso: string) {
  return FLAGS[`../node_modules/country-flag-icons/3x2/${iso}.svg`]
}

export function Flag({ iso }: { iso: string }) {
  const src = flagUrl(iso)
  if (!src) return <span className="cc-flag cc-flag--none" aria-hidden="true" />
  return <img className="cc-flag" src={src} alt="" width={21} height={14} loading="lazy" decoding="async" />
}

type Named = Country & { name: string }

function locale(lang: string) {
  return lang === 'ua' ? 'uk' : lang
}

/** Названия стран на языке страницы (из браузера), сначала частые страны, дальше по алфавиту. */
function buildList(lang: string) {
  let names: Intl.DisplayNames | null = null
  try {
    names = new Intl.DisplayNames([locale(lang)], { type: 'region' })
  } catch {
    names = null
  }
  const list: Named[] = countries.map((c) => ({ ...c, name: names?.of(c.iso) ?? c.iso }))
  const top = PRIORITY.map((iso) => list.find((c) => c.iso === iso)!).filter(Boolean)
  const rest = list
    .filter((c) => !PRIORITY.includes(c.iso))
    .sort((a, b) => a.name.localeCompare(b.name, locale(lang)))
  return { top, rest }
}

function norm(s: string) {
  return s.toLocaleLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ё/g, 'е')
}

/** Ищем по началу слова: «пол» находит Польшу, но не «Сполучені Штати». */
function wordStarts(name: string, q: string) {
  const n = norm(name)
  // Запрос из нескольких слов («united st», «сполучені штати») ищем с начала любого слова названия.
  return n.startsWith(q) || n.split(/[\s\-()]+/).some((w) => w.startsWith(q)) || n.includes(` ${q}`)
}

type Props = {
  id: string
  lang: string
  t: FormCopy
  value: string
  /** Что показываем на кнопке (может отличаться от value, если номер вписан с «+»). */
  shown: Country
  onChange: (iso: string) => void
}

export function CountryPicker({ id, lang, t, value, shown, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [list, setList] = useState<ReturnType<typeof buildList> | null>(null)
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const search = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Список собираем только в браузере и только при первом открытии.
  useEffect(() => {
    if (open && !list) setList(buildList(lang))
  }, [open, list, lang])
  useEffect(() => setList(null), [lang])

  const q = norm(query.trim().replace(/^\+/, ''))
  const groups = useMemo(() => {
    if (!list) return []
    if (!q) return [
      { label: t.countryPopular, items: list.top },
      { label: t.countryAll, items: list.rest },
    ]
    const all = [...list.top, ...list.rest]
    const hits = all.filter(
      (c) => wordStarts(c.name, q) || c.dial.startsWith(q) || c.iso.toLowerCase() === q,
    )
    // Сначала те, чьё название начинается с запроса.
    hits.sort((a, b) => Number(!norm(a.name).startsWith(q)) - Number(!norm(b.name).startsWith(q)))
    return [{ label: '', items: hits }]
  }, [list, q, t])
  const flat = groups.flatMap((g) => g.items)

  // При открытии подсвечиваем выбранную страну и прокручиваем к ней.
  useEffect(() => {
    if (!open || !list) return
    const i = flat.findIndex((c) => c.iso === value)
    setActive(q ? 0 : Math.max(i, 0))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, list, q])

  useEffect(() => {
    if (!open) return
    listRef.current
      ?.querySelector<HTMLElement>(`[data-i="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [active, open, list])

  // Закрываем по клику мимо.
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  // На компьютере сразу ставим курсор в поиск. На телефоне нет: иначе клавиатура закроет пол-списка.
  useEffect(() => {
    if (open && window.matchMedia('(pointer: fine)').matches) search.current?.focus()
  }, [open])

  function close(focusButton = true) {
    setOpen(false)
    setQuery('')
    if (focusButton) button.current?.focus()
  }

  function pick(iso: string) {
    onChange(iso)
    close()
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, flat.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (flat[active]) pick(flat[active].iso)
    } else if (e.key === 'Tab') {
      close(false)
    }
  }

  const listId = `${id}-list`
  let n = -1

  return (
    <div className={`cc${open ? ' cc--open' : ''}`} ref={root}>
      <button
        ref={button}
        type="button"
        className="cc-btn"
        aria-label={`${t.country}: +${shown.dial}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? close() : setOpen(true))}
        onKeyDown={(e) => {
          if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            e.preventDefault()
            setOpen(true)
          }
        }}
      >
        <Flag iso={shown.iso} />
        <span>{`+${shown.dial}`}</span>
        <svg className="cc-chev" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>

      {open ? (
        <>
          <div className="cc-backdrop" onClick={() => close(false)} aria-hidden="true" />
          <div className="cc-pop" onKeyDown={onKey}>
            <div className="cc-head">
              <span className="cc-title">{t.country}</span>
              <button type="button" className="cc-x" aria-label="×" onClick={() => close()}>
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </button>
            </div>
            <div className="cc-search">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <input
                ref={search}
                type="search"
                role="combobox"
                aria-controls={listId}
                aria-expanded="true"
                aria-autocomplete="list"
                aria-activedescendant={flat[active] ? `${id}-o-${flat[active].iso}` : undefined}
                aria-label={t.countrySearch}
                placeholder={t.countrySearch}
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <ul className="cc-list" id={listId} role="listbox" aria-label={t.country} ref={listRef}>
              {flat.length === 0 && list ? <li className="cc-empty">{t.countryNone}</li> : null}
              {groups.map((g) =>
                g.items.length ? (
                  <li key={g.label || 'hits'} role="presentation">
                    {g.label ? <div className="cc-group">{g.label}</div> : null}
                    <ul role="group" aria-label={g.label || undefined}>
                      {g.items.map((c) => {
                        n += 1
                        const i = n
                        const selected = c.iso === value
                        return (
                          <li
                            key={c.iso}
                            id={`${id}-o-${c.iso}`}
                            data-i={i}
                            role="option"
                            aria-selected={selected}
                            className={`cc-opt${i === active ? ' is-active' : ''}${selected ? ' is-selected' : ''}`}
                            onMouseMove={() => i !== active && setActive(i)}
                            onClick={() => pick(c.iso)}
                          >
                            <Flag iso={c.iso} />
                            <span className="cc-name">{c.name}</span>
                            <span className="cc-dial">{`+${c.dial}`}</span>
                            {selected ? (
                              <svg className="cc-check" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                                <path d="M2 7.5l3.2 3L12 3.5" fill="none" stroke="currentColor" strokeWidth="2" />
                              </svg>
                            ) : null}
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  )
}
