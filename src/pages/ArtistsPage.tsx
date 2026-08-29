import { Link } from 'react-router-dom'
import { STYLE_LABELS, type Artist } from '../types/studio'
import { useSiteConfig } from '../components/SiteConfigContext'

/**
 * Config-driven artist index.
 *
 * Renders the studio's artists straight from `useSiteConfig().artists`
 * (Stefanov, "React Up & Running": one source of truth). Each card is a
 * credibility device: a photo (or fallback monogram), name, bio, and styles as
 * labelled pills built from the canonical `STYLE_LABELS` map so they can never
 * drift from the data. The "View work" link follows the natural mapping
 * principle (Norman, "The Design of Everyday Things"): an artist maps
 * intuitively to *their* work, so clicking leads to the portfolio with that
 * artist pre-filtered via the `?artist=` search param.
 */
function monogram(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <article className="artist-card">
      {artist.photo ? (
        <img
          className="artist-card__photo"
          src={artist.photo}
          alt={artist.name}
        />
      ) : (
        <div
          className="artist-card__monogram"
          role="img"
          aria-label={artist.name}
        >
          {monogram(artist.name)}
        </div>
      )}

      <div className="artist-card__body">
        <h2 className="artist-card__name">{artist.name}</h2>
        <p className="artist-card__bio">{artist.bio}</p>

        <ul className="artist-card__styles">
          {artist.styles.map((style) => (
            <li key={style} className="artist-card__style">
              {STYLE_LABELS[style]}
            </li>
          ))}
        </ul>

        <Link
          className="artist-card__link"
          to={`/portfolio?artist=${encodeURIComponent(artist.id)}`}
        >
          View work
        </Link>
      </div>
    </article>
  )
}

export default function ArtistsPage() {
  const { artists } = useSiteConfig()

  return (
    <section className="artists">
      <h1 className="artists__heading">Artists</h1>
      <p className="artists__lede">
        Meet the people behind the machine. Whatever your idea, someone here is
        the right fit for it.
      </p>

      {artists.length > 0 ? (
        <div className="artists__grid">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      ) : (
        <p className="artists__empty">Artist profiles are coming soon.</p>
      )}
    </section>
  )
}