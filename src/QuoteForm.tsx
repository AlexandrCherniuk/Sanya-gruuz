import { useId, useMemo, useState, type FormEvent } from 'react'
import { copy } from './content'
import { site } from './seo'
import { isValidPhone, mailtoQuote, type QuoteDraft } from './quote'

const initial: QuoteDraft = {
  phone: '',
  from: '',
  to: '',
  cargo: copy.form.cargoOptions[0],
}

export function QuoteForm() {
  const formId = useId()
  const [draft, setDraft] = useState<QuoteDraft>(initial)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const mailHref = useMemo(() => mailtoQuote(draft), [draft])

  function update<K extends keyof QuoteDraft>(key: K, value: QuoteDraft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }))
    if (error) setError('')
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isValidPhone(draft.phone)) {
      setError(copy.form.error)
      setSent(false)
      return
    }
    setError('')
    setSent(true)
  }

  if (sent) {
    return (
      <div id={copy.form.id} className="quote-card quote-card--success" role="status">
        <h2>{copy.form.successTitle}</h2>
        <p className="lead">{copy.form.successText}</p>
        <div className="quote-success-actions">
          <a className="btn btn--ghost-dark" href={`tel:${site.phone}`}>
            {copy.form.call}
          </a>
          <a className="btn btn--signal" href={mailHref}>
            {copy.form.successMail}
          </a>
        </div>
      </div>
    )
  }

  return (
    <form
      id={copy.form.id}
      className="quote-card"
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={`${formId}-title`}
    >
      <h2 id={`${formId}-title`}>{copy.form.title}</h2>
      <p className="lead">{copy.form.lead}</p>

      <label htmlFor={`${formId}-phone`}>
        {copy.form.phone}
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="+38 096 000 00 00"
          value={draft.phone}
          onChange={(e) => update('phone', e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${formId}-error` : undefined}
        />
      </label>

      <div className="quote-grid">
        <label htmlFor={`${formId}-from`}>
          {copy.form.from}
          <input
            id={`${formId}-from`}
            name="from"
            type="text"
            autoComplete="address-level2"
            placeholder="Київ"
            value={draft.from}
            onChange={(e) => update('from', e.target.value)}
          />
        </label>
        <label htmlFor={`${formId}-to`}>
          {copy.form.to}
          <input
            id={`${formId}-to`}
            name="to"
            type="text"
            autoComplete="address-level2"
            placeholder="Варшава"
            value={draft.to}
            onChange={(e) => update('to', e.target.value)}
          />
        </label>
      </div>

      <label htmlFor={`${formId}-cargo`}>
        {copy.form.cargo}
        <select
          id={`${formId}-cargo`}
          name="cargo"
          value={draft.cargo}
          onChange={(e) => update('cargo', e.target.value)}
        >
          {copy.form.cargoOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      {error ? (
        <p id={`${formId}-error`} className="quote-error">
          {error}
        </p>
      ) : null}

      <button className="btn btn--signal btn--block" type="submit">
        {copy.form.submit}
      </button>
      <p className="quote-privacy">{copy.form.privacy}</p>
    </form>
  )
}
