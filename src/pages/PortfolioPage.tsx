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
 * is driven by the same literal unions the config uses (Goldberg, "Learning
 * TypeScript"): the active selections are typed as `StyleCategory | "all"` and
 * `ArtistId | "all"`, guarantee-filled, and each filter button is derived from
 * the canonical `STYLE_LABELS` map (styles) or `useSiteConfig().artists`
 * (artists) so labels can never drift from the data. Both filters act with
 * logical AND since they control the same grid, which is why they are laid out
 * as one visually adjacent group sitting directly above the grid (Norman,
 * "The Design of Everyday Things": controls are grouped with what they
 * control). Gallery items are keyed by `item.id` for stable reconciliation.
 */
type StyleFilter = StyleCategory | 'all'
type ArtistFilter = string | 'all'

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

const ALL = 'all'

export default function PortfolioPage() {
  const { portfolio, artists } = useSiteConfig()
  const [activeStyle, setActiveStyle] = useState<StyleFilter>('all')
  const [activeArtist, setActiveArtist] = useState<ArtistFilter>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const visible = useMemo(() => {
    const byStyle =
      activeStyle === ALL
        ? portfolio
        : portfolio.filter((item) => item.style === activeStyle)
    const byArtist =
      activeArtist === ALL
        ? byStyle
        : byStyle.filter((item) => item.artistId === activeArtist)
    return byArtist
  }, [portfolio, activeStyle, activeArtist])

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
        Browse recent pieces from our artists. Filter by style or artist.
      </p>

      <div className="gallery__filters">
        <fieldset className="gallery__filter-group">
          <legend className="gallery__filter-legend">Style</legend>
          <div className="gallery__filter-options" role="group" aria-label="Filter by style">
            {styleFilters.map((filter) => {
              const label = filter === ALL ? 'All' : STYLE_LABELS[filter]
              const isActive = filter === activeStyle
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
                  onClick={() => setActiveStyle(filter)}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </fieldset>

        <fieldset className="gallery__filter-group">
          <legend className="gallery__filter-legend">Artist</legend>
          <div className="gallery__filter-options" role="group" aria-label="Filter by artist">
            <button
              type="button"
              className={[
                'gallery__filter',
                activeArtist === ALL ? 'gallery__filter--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-pressed={activeArtist === ALL}
              onClick={() => setActiveArtist(ALL)}
            >
              All
            </button>
            {artists.map((artist) => {
              const isActive = artist.id === activeArtist
              const className = [
                'gallery__filter',
                isActive ? 'gallery__filter--active' : '',
              ]
                .filter(Boolean)
                .join(' ')
              return (
                <button
                  key={artist.id}
                  type="button"
                  className={className}
                  aria-pressed={isActive}
                  onClick={() => setActiveArtist(artist.id)}
                >
                  {artist.name}
                </button>
              )
            })}
          </div>
        </fieldset>

        <p className="gallery__count" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'piece' : 'pieces'}
        </p>
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
        <p className="gallery__empty">No pieces match these filters.</p>
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