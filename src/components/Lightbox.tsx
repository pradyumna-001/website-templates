import { useEffect, useRef, useState } from 'react'
import { STYLE_LABELS, type PortfolioItem } from '../types/studio'
import CtaButton from './CtaButton'
import { useSiteConfig } from './SiteConfigContext'

interface LightboxProps {
  /**
   * The pieces to browse. Kept as a list so ArrowLeft/ArrowRight navigate
   * within the currently filtered results rather than the whole portfolio.
   */
  items: PortfolioItem[]
  /**
   * Index of the piece shown in the lightbox, or `null` when closed. The
   * parent renders the lightbox only while an index is set, so this never
   * reads as an out-of-range index.
   */
  index: number | null
  /** Close the lightbox (Escape, Close button, or backdrop). */
  onClose: () => void
  /** Move within `items` by a signed delta (-1 or +1). */
  onNavigate: (delta: number) => void
}

/**
 * Fullscreen portfolio piece viewer (Lightbox).
 *
 * Opens over the gallery when the user activates a TattooCard. The overlay
 * gives the piece maximum room while keeping the interaction model familiar
 * (Norman, "The Design of Everyday Things"): the large image loads with a
 * visible state, arrows give clear affordances for prev/next, and an explicit
 * close button is always present — the user is never left wondering how they
 * got here or how to leave.
 *
 * Immediate feedback: a loading state covers the big image while it fetches so
 * a slow connection reads as "working" rather than "broken", and the overlay
 * fades in on open.
 *
 * Keyboard + focus (a11y): ArrowLeft/ArrowRight browse, Escape closes. Listeners
 * are attached only while open, focus moves to the dialog on open and returns
 * to the previously focused element on close. The dialog is announced via
 * `role="dialog"`, `aria-modal="true"` and a descriptive `aria-label`.
 *
 * Feedforward CTA (Krug, "Don't Make Me Think"): a single honest "Want this
 * piece?" button points at /booking, keeping the path from admiration to
 * booking a single visible click.
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [loading, setLoading] = useState(true)
  const dialogRef = useRef<HTMLDivElement>(null)
  const { artists } = useSiteConfig()

  const item = index === null ? null : (items[index] ?? null)
  const hasPrev = index !== null && index > 0
  const hasNext = index !== null && index < items.length - 1

  const artist = item ? artists.find((a) => a.id === item.artistId) : undefined
  const artistName = artist?.name ?? 'Studio artist'

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    dialogRef.current?.focus()

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      previous?.focus()
    }
  }, [])

  useEffect(() => {
    setLoading(true)
  }, [index])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onNavigate(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        onNavigate(1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNavigate])

  if (item === null) return null

  const styleLabel = STYLE_LABELS[item.style]
  const alt = item.alt ?? `${item.title}, a ${styleLabel.toLowerCase()} tattoo`

  return (
    <div className="lbx" role="dialog" aria-modal="true" aria-label={item.title}>
      <button
        type="button"
        className="lbx__backdrop"
        aria-label="Close viewer"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        className="lbx__dialog"
        tabIndex={-1}
      >
        <button type="button" className="lbx__close" onClick={onClose}>
          Close {'\u00D7'}
        </button>

        <div className="lbx__stage">
          <button
            type="button"
            className="lbx__nav lbx__nav--prev"
            aria-label="Previous piece"
            disabled={!hasPrev}
            onClick={() => onNavigate(-1)}
          >
            &#8249;
          </button>

          <figure className="lbx__figure">
            {loading ? <div className="lbx__loading" aria-hidden="true" /> : null}
            <img
              className="lbx__image"
              src={item.image}
              alt={alt}
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          </figure>

          <button
            type="button"
            className="lbx__nav lbx__nav--next"
            aria-label="Next piece"
            disabled={!hasNext}
            onClick={() => onNavigate(1)}
          >
            &#8250;
          </button>
        </div>

        <div className="lbx__panel">
          <figcaption className="lbx__caption">
            <h2 className="lbx__title">{item.title}</h2>
            <p className="lbx__byline">{artistName}</p>
            <p className="lbx__meta">
              <span>{styleLabel}</span>
              {item.year ? (
                <span aria-hidden="true">{'\u00B7'} {item.year}</span>
              ) : null}
            </p>
          </figcaption>

          <div className="lbx__cta">
            <span className="lbx__hint">
              Use {'\u2190'} {'\u2192'} to browse {'\u00B7'} Esc to close
            </span>
            <CtaButton to="/booking">Want this piece?</CtaButton>
          </div>
        </div>
      </div>
    </div>
  )
}