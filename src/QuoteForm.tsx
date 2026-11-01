import { useEffect, useId, useState, type FormEvent } from 'react'
import './QuoteForm.css'
import { copy } from './content'
import { formCopy as t } from './formCopy'
import { site } from './seo'
import { initAnalytics, trackLead } from './analytics'
import { sendLead } from './lead'
import { emptyDraft, isValidPhone, type QuoteDraft } from './quote'

type Status = 'idle' | 'sending' | 'sent' | 'failed'
type Field = 'phone' | 'from' | 'to'

type Props = {
  /** Якорь формы. На странице с двумя формами второй даём другой id. */
  id?: string
  /** Если задан, после успешной отправки переходим на страницу благодарности (например /ua/thanks/). */
  successUrl?: string
}

function validate(draft: QuoteDraft): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {}
  if (!isValidPhone(draft.phone)) errors.phone = t.errorPhone
  if (!draft.from.trim()) errors.from = t.errorFrom
  if (!draft.to.trim()) errors.to = t.errorTo
  return errors
}

export function QuoteForm({ id = copy.form.id, successUrl }: Props) {
  const uid = useId()
  const [draft, setDraft] = useState<QuoteDraft>(emptyDraft)
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    initAnalytics()
  }, [])

  function update<K extends keyof QuoteDraft>(key: K, value: QuoteDraft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }))
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }))
    if (status === 'failed') setStatus('idle')
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const found = validate(draft)
    setErrors(found)
    const first = (['phone', 'from', 'to'] as Field[]).find((f) => found[f])
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus()
      return
    }
    setStatus('sending')
    const result = await sendLead(draft, honeypot)
    if (result.ok) {
      if (successUrl) {
        trackLead(() => window.location.assign(successUrl))
        return
      }
      trackLead()
      setStatus('sent')
      setDraft(emptyDraft)
    } else {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div id={id} className="quote-card quote-card--success" role="status">
        <h2>{t.successTitle}</h2>
        <p className="lead">{t.successText}</p>
        <div className="quote-success-actions">
          <a className="btn btn--ghost-dark" href={`tel:${site.phone}`}>
            {t.call}
          </a>
          <button className="btn btn--signal" type="button" onClick={() => setStatus('idle')}>
            {t.again}
          </button>
        </div>
      </div>
    )
  }

  const errId = (f: Field) => (errors[f] ? `${uid}-${f}-error` : undefined)

  return (
    <form
      id={id}
      className="quote-card"
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={`${uid}-title`}
      aria-busy={status === 'sending'}
    >
      <h2 id={`${uid}-title`}>{t.title}</h2>
      <p className="lead">{t.lead}</p>

      <label htmlFor={`${uid}-phone`}>
        {t.phone}
        <input
          id={`${uid}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder={t.phonePlaceholder}
          value={draft.phone}
          onChange={(e) => update('phone', e.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errId('phone')}
        />
        {errors.phone ? (
          <span id={errId('phone')} className="quote-error">
            {errors.phone}
          </span>
        ) : null}
      </label>

      <div className="quote-grid">
        <label htmlFor={`${uid}-from`}>
          {t.from}
          <input
            id={`${uid}-from`}
            name="from"
            type="text"
            autoComplete="address-level2"
            required
            placeholder={t.fromPlaceholder}
            value={draft.from}
            onChange={(e) => update('from', e.target.value)}
            aria-invalid={Boolean(errors.from)}
            aria-describedby={errId('from')}
          />
          {errors.from ? (
            <span id={errId('from')} className="quote-error">
              {errors.from}
            </span>
          ) : null}
        </label>
        <label htmlFor={`${uid}-to`}>
          {t.to}
          <input
            id={`${uid}-to`}
            name="to"
            type="text"
            required
            placeholder={t.toPlaceholder}
            value={draft.to}
            onChange={(e) => update('to', e.target.value)}
            aria-invalid={Boolean(errors.to)}
            aria-describedby={errId('to')}
          />
          {errors.to ? (
            <span id={errId('to')} className="quote-error">
              {errors.to}
            </span>
          ) : null}
        </label>
      </div>

      <details className="quote-details">
        <summary>{t.detailsToggle}</summary>
        <div className="quote-details-body">
          <label htmlFor={`${uid}-cargo`}>
            {t.cargo}
            <input
              id={`${uid}-cargo`}
              name="cargo"
              type="text"
              placeholder={t.cargoPlaceholder}
              value={draft.cargo}
              onChange={(e) => update('cargo', e.target.value)}
            />
          </label>
          <div className="quote-grid">
            <label htmlFor={`${uid}-name`}>
              {t.name}
              <input
                id={`${uid}-name`}
                name="name"
                type="text"
                autoComplete="given-name"
                placeholder={t.namePlaceholder}
                value={draft.name}
                onChange={(e) => update('name', e.target.value)}
              />
            </label>
            <label htmlFor={`${uid}-date`}>
              {t.date}
              <input
                id={`${uid}-date`}
                name="date"
                type="date"
                value={draft.date}
                onChange={(e) => update('date', e.target.value)}
              />
            </label>
          </div>
        </div>
      </details>

      {/* Ловушка для ботов: человек это поле не видит и не заполняет. */}
      <div className="quote-hp" aria-hidden="true">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      {status === 'failed' ? (
        <p className="quote-error quote-error--send" role="alert">
          {t.errorSend}{' '}
          <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
        </p>
      ) : null}

      <button className="btn btn--signal btn--block" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t.sending : t.submit}
      </button>
      <p className="quote-privacy">{t.privacy}</p>
    </form>
  )
}
