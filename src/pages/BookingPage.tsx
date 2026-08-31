import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { STYLE_LABELS, type StyleCategory } from '../types/studio'
import { useSiteConfig } from '../components/SiteConfigContext'
import CtaButton from '../components/CtaButton'

/**
 * Controlled, WhatsApp-first booking form (GitHub issue #13).
 *
 * Every field is a controlled React input: its value lives in a single
 * `useState` object and every keystroke/selection flows back through
 * `onChange` (Stefanov, "React Up & Running": one source of truth, no
 * uncontrolled DOM state). Free text is constrained to pickers and selects
 * wherever the domain allows — style, artist and placement are all options,
 * not free text — so a bad value literally cannot be typed (Norman, "The
 * Design of Everyday Things": constraints and poka-yoke).
 *
 * Validation is written as a conversation, not an error wall (Norman):
 * a field only shows a short, helpful message next to itself once it has
 * been blurred or edited, and the message disappears the moment the value is
 * valid. The date can never be picked in the past because the picker enforces
 * `min="today"` (a constraint, so violations are impossible).
 *
 * State preservation follows Norman's "state does not have to be coordinated
 * in the user's head": the form drafts itself to `localStorage` on every
 * change and restores the draft on mount, so a booking interrupted mid-way
 * (leaving to answer a WhatsApp, an accidental reload) resumes exactly where
 * it was. A successful submit clears the saved draft.
 *
 * The form runs as a small state machine — `editing` -> `review`. Submitting a
 * validated form moves to a review step that shows everything the user entered
 * as a confirmable summary object. A visible 1-2-3 step indicator
 * ("Details -> Review -> Send on WhatsApp") gives the user the whole pipeline
 * before they start (Norman: a conceptual model), with the current step kept
 * highlighted.
 *
 * The review step surfaces the object of the action before the trigger
 * (Norman): a salient confirm line like `Confirm appointment: "Blackwork
 * dragon" with Maria on Sat 14 Aug.` sits directly above the send control.
 * That send control is a real link to `https://wa.me/<number>?text=<encoded>`
 * built from the confirmed state, so WhatsApp opens with a complete,
 * ready-to-send booking message (Stefanov: link-as-button CTA). Sending shows
 * immediate feedback and is locked while pending to prevent a double trigger.
 * Once the link is used, the saved draft is cleared and the user returns to a
 * fresh step 1 with a success note.
 */

/** Constants. All copy is English on purpose. */
const DRAFT_KEY = 'booking-form-draft'
const ANY_ARTIST = 'any'
const PLACEMENTS = ['Arm', 'Leg', 'Back', 'Chest', 'Hand', 'Neck', 'Other'] as const

/** The visible 1-2-3 conceptual model (Norman): the whole pipeline up front. */
const STEPS_LABELS = ['Details', 'Review', 'Send on WhatsApp']

/** Shape of a single controlled form value. `deposit` drives the checkbox. */
interface BookingFormState {
  name: string
  style: StyleCategory | ''
  artist: string
  placement: string
  date: string // ISO `YYYY-MM-DD` from the native date picker
  deposit: boolean
}

/** The summary object made ready for the WhatsApp prefill in issue #14. */
interface ReadyToSend {
  name: string
  style: StyleCategory
  artistName: string
  placement: string
  date: string
  depositAcknowledged: boolean
}

type Stage = 'editing' | 'review'

/** Which fields the user has interacted with, so we only nag about those. */
type Touched = Partial<Record<keyof BookingFormState, boolean>>

const EMPTY_FORM: BookingFormState = {
  name: '',
  style: '',
  artist: ANY_ARTIST,
  placement: PLACEMENTS[0],
  date: '',
  deposit: false,
}

/** Today's date as a local `YYYY-MM-DD`, used to floor the date picker. */
function todayISO(): string {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

function makeDefaultState(): BookingFormState {
  return {
    ...EMPTY_FORM,
    date: todayISO(), // the safest default is the earliest bookable day
  }
}

/** Parse an ISO `YYYY-MM-DD` value into a local Date, or null if invalid. */
function toLocalDate(iso: string): Date | null {
  if (!iso) return null
  const date = new Date(`${iso}T00:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

/** Long, friendly English date: "Sat, Aug 14, 2026". */
function formatFriendlyDate(iso: string): string {
  const date = toLocalDate(iso)
  if (!date) return iso
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/** Short confirm-line English date: "Sat, Aug 14". */
function formatShortDate(iso: string): string {
  const date = toLocalDate(iso)
  if (!date) return iso
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

/** Compose the fully prefilled WhatsApp message from the confirmed booking. */
function buildWhatsAppMessage(r: ReadyToSend, studioName: string): string {
  const deposit = r.depositAcknowledged ? 'accepted' : 'to confirm'
  return [
    `Hello ${studioName}! I would like to book a tattoo.`,
    `Name: ${r.name}`,
    `Style: ${STYLE_LABELS[r.style]}`,
    `Placement: ${r.placement}`,
    `Artist: ${r.artistName}`,
    `Preferred date: ${formatFriendlyDate(r.date)}`,
    `Deposit: ${deposit}`,
  ].join('\n')
}

/** Restore a saved draft if one exists; otherwise start from the defaults. */
function loadDraft(): BookingFormState {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY)
    if (raw === null) return makeDefaultState()
    const parsed = JSON.parse(raw) as Partial<BookingFormState>
    return { ...makeDefaultState(), ...parsed }
  } catch {
    return makeDefaultState()
  }
}

/** Per-field validation. Messages are helper guidance, not a verdict wall. */
function validateField(
  field: keyof BookingFormState,
  value: BookingFormState[typeof field],
): string | null {
  switch (field) {
    case 'name':
      return typeof value === 'string' && value.trim() !== ''
        ? null
        : 'Please tell us your name so we know who to greet.'
    case 'style':
      return value !== '' ? null : 'Pick a style that best fits your idea.'
    case 'artist':
      return typeof value === 'string' && value !== ''
        ? null
        : 'Choose an artist, or leave "Any artist".'
    case 'placement':
      return typeof value === 'string' && value !== ''
        ? null
        : 'Select where on the body the piece will go.'
    case 'date':
      return typeof value === 'string' && value >= todayISO()
        ? null
        : 'Choose a date at least one day in advance.'
    case 'deposit':
      return value === true
        ? null
        : 'Please confirm the deposit policy before we reserve your slot.'
    default:
      return null
  }
}

export default function BookingPage() {
  const { artists, studioName, whatsapp } = useSiteConfig()

  const [form, setForm] = useState<BookingFormState>(loadDraft)
  const [touched, setTouched] = useState<Touched>({})
  const [stage, setStage] = useState<Stage>('editing')
  const [readyToSend, setReadyToSend] = useState<ReadyToSend | null>(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const sendTimer = useRef<number | undefined>(undefined)

  // Clear the pending-send timer if the user leaves mid-send.
  useEffect(
    () => () => {
      if (sendTimer.current !== undefined) window.clearTimeout(sendTimer.current)
    },
    [],
  )

  // Persist the draft as the user types so an interrupted booking can resume.
  // Runs on every form change; reading the latest values via the updater keeps
  // the write in sync with the most recent state (Norman: state preservation).
  useEffect(() => {
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(form))
    } catch {
      // Storage can be unavailable (private mode / quota); booking still works,
      // it just is not persisted across a reload.
    }
  }, [form])

  /**
   * Canonical state updater for every controlled field. It both commits the
   * value (controlled) and marks the field touched, which drives inline
   * validation-as-conversation: a field you have interacted with can talk back.
   */
  const updateField = useCallback(
    <K extends keyof BookingFormState>(field: K, value: BookingFormState[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }))
      setTouched((prev) => ({ ...prev, [field]: true }))
    },
    [],
  )

  /** Field-specific error shown inline only after the field has been touched. */
  function fieldError(field: keyof BookingFormState): string | null {
    if (!touched[field]) return null
    return validateField(field, form[field])
  }

  const isFormValid = useMemo(() => {
    const fields: (keyof BookingFormState)[] = [
      'name',
      'style',
      'artist',
      'placement',
      'date',
      'deposit',
    ]
    return fields.every((field) => validateField(field, form[field]) === null)
  }, [form])

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      // Touching every field is the "one last check" before moving on.
      setTouched({ name: true, style: true, artist: true, placement: true, date: true, deposit: true })
      if (!isFormValid || form.style === '') return

      const artistName =
        form.artist === ANY_ARTIST
          ? 'Any artist'
          : artists.find((a) => a.id === form.artist)?.name ?? 'Unknown artist'

      const summary: ReadyToSend = {
        name: form.name.trim(),
        style: form.style,
        artistName,
        placement: form.placement,
        date: form.date,
        depositAcknowledged: form.deposit,
      }
      setReadyToSend(summary)
      setStage('review')
    },
    [isFormValid, form, artists],
  )

  const onEditAgain = useCallback(() => {
    setStage('editing')
  }, [])

  // The prefilled WhatsApp message + link, derived from the confirmed booking.
  const waMessage = useMemo(
    () => (readyToSend ? buildWhatsAppMessage(readyToSend, studioName) : ''),
    [readyToSend, studioName],
  )
  const waLink = useMemo(
    () =>
      whatsapp !== '' && waMessage !== ''
        ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(waMessage)}`
        : '',
    [whatsapp, waMessage],
  )

  // Normans's "confirm the action + object": the salient line right above the
  // send button names exactly what opening WhatsApp will carry.
  const confirmLine = useMemo(() => {
    if (!readyToSend) return ''
    return `Confirm appointment: "${STYLE_LABELS[readyToSend.style]}" with ${readyToSend.artistName} on ${formatShortDate(readyToSend.date)}.`
  }, [readyToSend])

  /**
   * "Send on WhatsApp" is a plain link, so the "send" itself is WhatsApp
   * opening in a new tab. We simulate a short pending state to give immediate
   * feedback and to lock the control against a double trigger. When the delay
   * resolves, the confirmed draft is cleared and the form resets to a fresh
   * step 1 with a success note for a possible resend.
   */
  const onSendViaWhatsApp = useCallback(() => {
    if (sending) return
    setSending(true)
    sendTimer.current = window.setTimeout(() => {
      try {
        window.localStorage.removeItem(DRAFT_KEY)
      } catch {
        // Best-effort clear; nothing else to do.
      }
      setForm(makeDefaultState())
      setTouched({})
      setReadyToSend(null)
      setSent(true)
      setSending(false)
      setStage('editing')
    }, 1500)
  }, [sending])

  const minDate = todayISO()
  const currentStep = stage === 'editing' ? 1 : sending ? 3 : 2

  return (
    <section className="booking">
      <h1 className="booking__heading">Booking</h1>
      <p className="booking__lede">
        Tell us about the piece you have in mind. Your answers are saved as you
        go, so nothing is lost if you step away.
      </p>

      <ol
        className="booking__steps"
        aria-label="Booking progress: details, review, then send on WhatsApp"
      >
        {STEPS_LABELS.map((label, index) => {
          const step = index + 1
          const current = step === currentStep
          return (
            <li
              key={label}
              className={current ? 'booking__step booking__step--current' : 'booking__step'}
              aria-current={current ? 'step' : undefined}
            >
              <span className="booking__step-num">{step}</span>
              <span className="booking__step-label">{label}</span>
            </li>
          )
        })}
      </ol>

      {sent && (
        <p className="booking__success" role="status" aria-live="polite">
          Your booking is ready in WhatsApp — we&apos;ll confirm shortly.
        </p>
      )}

      {stage === 'editing' ? (
        <form className="booking__form" onSubmit={onSubmit} noValidate>
          <Field label="Name" controlId="booking-name" hint={fieldError('name')} invalid={!!fieldError('name')}>
            <input
              id="booking-name"
              aria-describedby="booking-name-hint"
              className="booking__input"
              type="text"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              autoComplete="name"
            />
          </Field>

          <Field label="Style" controlId="booking-style" hint={fieldError('style')} invalid={!!fieldError('style')}>
            <select
              id="booking-style"
              aria-describedby="booking-style-hint"
              className="booking__input"
              value={form.style}
              onChange={(e) => updateField('style', e.target.value as StyleCategory | '')}
            >
              <option value="" disabled>
                Choose a style
              </option>
              {Object.entries(STYLE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Artist" controlId="booking-artist" hint={fieldError('artist')} invalid={!!fieldError('artist')}>
            <select
              id="booking-artist"
              aria-describedby="booking-artist-hint"
              className="booking__input"
              value={form.artist}
              onChange={(e) => updateField('artist', e.target.value)}
            >
              <option value={ANY_ARTIST}>Any artist</option>
              {artists.map((artist) => (
                <option key={artist.id} value={artist.id}>
                  {artist.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Size / placement" controlId="booking-placement" hint={fieldError('placement')} invalid={!!fieldError('placement')}>
            <select
              id="booking-placement"
              aria-describedby="booking-placement-hint"
              className="booking__input"
              value={form.placement}
              onChange={(e) => updateField('placement', e.target.value)}
            >
              {PLACEMENTS.map((placement) => (
                <option key={placement} value={placement}>
                  {placement}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Preferred date"
            controlId="booking-date"
            hint={fieldError('date')}
            invalid={!!fieldError('date')}
            help="The earliest open day is today — past dates are not selectable."
          >
            <input
              id="booking-date"
              aria-describedby="booking-date-hint"
              className="booking__input"
              type="date"
              min={minDate}
              value={form.date}
              onChange={(e) => updateField('date', e.target.value)}
            />
          </Field>

          <CheckboxField hint={fieldError('deposit')} invalid={!!fieldError('deposit')}>
            <input
              id="booking-deposit"
              type="checkbox"
              checked={form.deposit}
              onChange={(e) => updateField('deposit', e.target.checked)}
            />
            <label htmlFor="booking-deposit">
              I understand a deposit is required to reserve a slot
            </label>
          </CheckboxField>

          <button type="submit" className="cta cta--primary booking__submit" disabled={!isFormValid}>
            Review booking
          </button>
        </form>
      ) : (
        readyToSend && (
          <div className="booking__review" role="status" aria-live="polite">
            <h2 className="booking__review-title">Review your request</h2>
            <dl className="booking__review-list">
              <div>
                <dt>Name</dt>
                <dd>{readyToSend.name}</dd>
              </div>
              <div>
                <dt>Style</dt>
                <dd>{STYLE_LABELS[readyToSend.style]}</dd>
              </div>
              <div>
                <dt>Artist</dt>
                <dd>{readyToSend.artistName}</dd>
              </div>
              <div>
                <dt>Size / placement</dt>
                <dd>{readyToSend.placement}</dd>
              </div>
              <div>
                <dt>Preferred date</dt>
                <dd>{readyToSend.date}</dd>
              </div>
              <div>
                <dt>Deposit</dt>
                <dd>
                  {readyToSend.depositAcknowledged
                    ? 'Acknowledged — deposit required'
                    : 'Not acknowledged'}
                </dd>
              </div>
            </dl>
            <p className="booking__confirm">{confirmLine}</p>
            <p className="booking__review-note">
              Step 3 of 3: the Send button opens WhatsApp in a new tab with this
              request already written out. Review it there and hit send.
            </p>
            <div className="booking__review-actions">
              <CtaButton
                href={waLink}
                variant="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onSendViaWhatsApp}
                aria-disabled={sending}
                aria-busy={sending}
                className="booking__send"
              >
                {sending ? 'Opening WhatsApp…' : 'Send on WhatsApp'}
              </CtaButton>
              <button
                type="button"
                className="cta booking__review-back"
                onClick={onEditAgain}
                disabled={sending}
              >
                Edit details
              </button>
            </div>
            {sending && (
              <p className="booking__review-note" role="status" aria-live="assertive">
                Opening WhatsApp in a new tab…
              </p>
            )}
          </div>
        )
      )}
    </section>
  )
}

interface FieldProps {
  label: string
  /** The control's own id, so <label htmlFor> and the hint id stay in sync. */
  controlId: string
  hint?: string | null
  invalid: boolean
  help?: string
  children: React.ReactNode
}

/** A labelled row with its hint rendered beside the control, not at the end. */
function Field({ label, controlId, hint, invalid, help, children }: FieldProps) {
  return (
    <div className="booking__field">
      <label className="booking__label" htmlFor={controlId}>
        {label}
      </label>
      {children}
      {help && !hint && <p className="booking__help">{help}</p>}
      {hint && (
        <p className="booking__hint" id={`${controlId}-hint`} {...(invalid ? { role: 'alert' } : {})}>
          {hint}
        </p>
      )}
    </div>
  )
}

interface CheckboxFieldProps {
  hint?: string | null
  invalid: boolean
  children: React.ReactNode
}

function CheckboxField({ hint, invalid, children }: CheckboxFieldProps) {
  return (
    <div className="booking__field">
      <div className="booking__check">{children}</div>
      {hint && (
        <p className="booking__hint" {...(invalid ? { role: 'alert' } : {})}>
          {hint}
        </p>
      )}
    </div>
  )
}