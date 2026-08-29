import { useCallback, useMemo, useState } from 'react'
import { STYLE_LABELS, type PortfolioItem, type StyleCategory } from '../types/studio'
import { useSiteConfig } from '../components/SiteConfigContext'
import TattooCard from '../components/TattooCard'
import Lightbox from '../components/Lightbox'

/**
 * Config-driven gallery.
 *
 * The whole grid is derived purely from `useSiteConfig().portfolio` (Stefanov,
 * "React Up & Running": one source of truth, no hard-coded markup). Filtering
 * is driven by the same `StyleCategory` literal union the config uses
 * (Goldberg, "Learning TypeScript"): the active selection is typed as
 * `StyleCategory | "all"`, guarantee-filled, and each filter button is derived
 * from the canonical `STYLE_LABELS` map so labels can never drift from the
 * union. Gallery items are keyed by `item.id` for stable reconciliation.
 */
type StyleFilter = StyleCategory | 'all'

const styleFilters: StyleFilter[] = [
  'all',
  'traditional',
  'neo-traditional',
  'realism',
  'blackwork',
  'color',
  'tribal',
  'lettering',
  'minimal',
]

export default function PortfolioPage() {
  const { portfolio } = useSiteConfig()
  const [active, setActive] = useState<StyleFilter>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const visible = useMemo(() => {
    if (active === 'all') return portfolio
    return portfolio.filter((item) => item.style === active)
  }, [portfolio, active])

  const openFrom = useCallback((item: PortfolioItem) => {
    setLightboxIndex(visible.findIndex((p) => p.id === item.id))
  }, [visible])

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const navigateLightbox = useCallback(
    (delta: number) => {
      setLightboxIndex((current) => {
        if (current === null) return current
        const next = current + delta
        if (next < 0 || next >= visible.length) return current
        return next
      })
    },
    [visible.length],
  )

  return (
    <>
      <section className="gallery">
      <h1 className="gallery__heading">Portfolio</h1>
      <p className="gallery__lede">
        Browse recent pieces from our artists. Filter by style.
      </p>

      <div className="gallery__filters" role="group" aria-label="Filter by style">
        {styleFilters.map((filter) => {
          const label = filter === 'all' ? 'All' : STYLE_LABELS[filter]
          const isActive = filter === active
          const className = [
            'gallery__filter',
            isActive ? 'gallery__filter--active' : '',
          ]
            .filter(Boolean)
            .join(' ')
          return (
            <button
              key={filter}
              type="button"
              className={className}
              aria-pressed={isActive}
              onClick={() => setActive(filter)}
            >
              {label}
            </button>
          )
        })}
      </div>

      {visible.length > 0 ? (
        <div className="gallery__grid">
          {visible.map((item) => (
            <TattooCard
              key={item.id}
              item={item}
              onOpen={openFrom}
            />
          ))}
        </div>
      ) : (
        <p className="gallery__empty">No pieces in this style yet.</p>
      )}
    </section>

    <Lightbox
      items={visible}
      index={lightboxIndex}
      onClose={closeLightbox}
      onNavigate={navigateLightbox}
    />
    </>
  )
}