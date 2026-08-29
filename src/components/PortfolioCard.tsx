import type { PortfolioItem } from '../types/studio'

interface PortfolioCardProps {
  item: PortfolioItem
}

/**
 * Minimal config-driven portfolio card.
 *
 * The 2025 core update rewards useful, accessible media, so every image gets a
 * descriptive `alt` (falling back to a generated one from the title when a
 * config omits `alt`) plus `loading="lazy"` to defer off-screen media. The card
 * shows a clear click/tap affordance (Krug, "Don't Make Me Think"): a pointer
 * cursor, and an accent ring + lift on hover/focus so the whole tile reads as
 * tappable. A richer lightbox/tattoo detail is intentionally out of scope here;
 * this issue is only the grid.
 */
export default function PortfolioCard({ item }: PortfolioCardProps) {
  const alt = item.alt ?? `${item.title}, a ${item.style} tattoo`
  return (
    <article className="card card--portfolio">
      <img
        className="card__image"
        src={item.image}
        alt={alt}
        loading="lazy"
      />
      <div className="card__body">
        <h3 className="card__title">{item.title}</h3>
        {item.year ? <p className="card__meta">{item.year}</p> : null}
      </div>
    </article>
  )
}