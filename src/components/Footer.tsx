import { Link } from 'react-router-dom'
import { useSiteConfig } from './SiteConfigContext'
import CtaButton from './CtaButton'

const RESIDUAL_LINKS = [
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Artists', path: '/artists' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Booking', path: '/booking' },
  { label: 'Contact', path: '/contact' },
]

/**
 * Shared site footer (GitHub issue #17).
 *
 * Rendered inside the layout shell beneath every routed page, so it carries
 * contact information visible on every page — the "contact info is visible on
 * every page" completion criterion. Picks contact links straight from the
 * studio config and only shows the ones a config actually provides (address,
 * Instagram, WhatsApp are all optional in the schema), so an online-only
 * studio renders a cleaner footer without dead links.
 *
 * Design follows Krug: never hide contact, and keep a persistent residual nav
 * for utility destinations so visitors reaching the page bottom can keep
 * moving. The column is compact, muted, but legible against the dark surface.
 */
export default function Footer() {
  const { studioName, instagram, whatsapp, address } = useSiteConfig()
  const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hi, I'd like to get in touch about a tattoo.",
  )}`

  return (
    <footer className="footer">
      <div className="footer__col">
        <span className="footer__name">{studioName}</span>
        {address ? (
          <span className="footer__address">{address}</span>
        ) : null}
        <div className="footer__social">
          {instagram ? (
            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              Instagram
            </a>
          ) : null}
          {whatsapp ? (
            <CtaButton
              href={waLink}
              variant="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__whatsapp"
            >
              WhatsApp
            </CtaButton>
          ) : null}
        </div>
      </div>

      <nav className="footer__nav" aria-label="Footer">
        {RESIDUAL_LINKS.map((item) => (
          <Link key={item.path} to={item.path} className="footer__nav-link">
            {item.label}
          </Link>
        ))}
      </nav>

      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} {studioName}
      </p>
    </footer>
  )
}