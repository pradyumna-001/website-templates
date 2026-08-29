import { useCallback } from 'react'
import { STYLE_LABELS, type PortfolioItem } from '../types/studio'
import { useSiteConfig } from './SiteConfigContext'

interface TattooCardProps {
  item: PortfolioItem
  /**
   * Optional callback fired when the card is activated (clicked or activated
   * with the keyboard). The dedicated Lightbox issue will pass a real handler;
   * until then the page can supply a stub. Kept typed and optional so the card
   * works standalone.
   */
  onOpen?: (item: PortfolioItem) => void
}

/**
 * Full studio portfolio card (TattooCard).
 *
 * Where the earlier PortfolioCard was a bare grid cell, this card turns the
 * whole tile into the affordance for opening the piece (Norman, "The Design of
 * Everyday Things": signifiers over affordances). Every visual cue reinforces
 * "this opens something":
 *
 * - The entire card is a real accessible button (keyboard + screen reader).
 * - An accent ring + lift on hover/focus, a pointer cursor, and an overlaid
 *   "View piece" pill that appears on hover/focus.
 *
 * Accessibility and legibility (Krug): the image always carries a descriptive
 * `alt` (falling back to a generated one), `loading="lazy"` defers off-screen
 * media, and explicit width/height plus a 1:1 aspect-ratio frame stop layout
 * from jumping while images load.
 *
 * Badges act as status signifiers: "Healed" marks a photographed-heal piece,
 * "Most requested" marks a popular one. Both are styled pills using the
 * accent/primary tokens with strong contrast.
 */
export default function TattooCard({ item, onOpen }: TattooCardProps) {
  const { artists } = useSiteConfig()
  const artist = artists.find((a) => a.id === item.artistId)
  const artistName = artist?.name ?? 'Studio artist'
  const styleLabel = STYLE_LABELS[item.style]
  const alt = item.alt ?? `${item.title}, a ${styleLabel.toLowerCase()} tattoo`

  const handleOpen = useCallback(() => onOpen?.(item), [onOpen, item])

  return (
    <article className="tcard">
      <button
        type="button"
        className="tcard__open"
        onClick={handleOpen}
        aria-label={`View ${item.title} by ${artistName}`}
      >
        <span className="tcard__view">View piece</span>
      </button>

      <div className="tcard__media">
        <img
          className="tcard__image"
          src={item.image}
          alt={alt}
          loading="lazy"
          width={600}
          height={600}
        />
        <div className="tcard__badges">
          {item.healed ? (
            <span className="tcard__badge tcard__badge--healed">Healed</span>
          ) : null}
          {item.featured ? (
            <span className="tcard__badge tcard__badge--featured">
              Most requested
            </span>
          ) : null}
        </div>
      </div>

      <div className="tcard__body">
        <h3 className="tcard__title">{item.title}</h3>
        <p className="tcard__byline">{artistName}</p>
        <p className="tcard__meta">
          <span className="tcard__style">{styleLabel}</span>
          {item.year ? (
            <span className="tcard__year" aria-hidden="true">
              {'\u00B7'} {item.year}
            </span>
          ) : null}
        </p>
      </div>
    </article>
  )
}