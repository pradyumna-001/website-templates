import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSiteConfig } from './SiteConfigContext'
import CtaButton from './CtaButton'

const NAV_ITEMS = [
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Artists', path: '/artists' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Booking', path: '/booking' },
  { label: 'Contact', path: '/contact' },
]

/**
 * Persistent site navigation (Krug: users should always know where they are).
 *
 * The site ID doubles as a link home, the tagline renders beside it, and every
 * tab uses a <NavLink> so the active route is marked by both a distinct color
 * AND a heavier weight (two explicit cues, not one subtle one).
 */
export default function Navbar() {
  const { studioName, tagline, whatsapp, city } = useSiteConfig()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  const waMessage = encodeURIComponent(
    `Hello ${studioName}! I would like to book an appointment.`,
  )
  const waLink = `https://wa.me/${whatsapp}?text=${waMessage}`

  return (
    <header className="navbar">
      <div className="navbar__bar">
        <div className="navbar__brand">
          <Link to="/" className="navbar__logo" onClick={closeMenu}>
            {studioName}
          </Link>
          {tagline ? <span className="navbar__tagline">{tagline}</span> : null}
        </div>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={menuOpen}
          aria-controls="navbar-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>
      </div>

      <nav
        id="navbar-nav"
        className={['navbar__nav', menuOpen ? 'navbar__nav--open' : null]
          .filter(Boolean)
          .join(' ')}
        aria-label="Primary"
      >
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              ['navbar__link', isActive ? 'navbar__link--active' : null]
                .filter(Boolean)
                .join(' ')
            }
            onClick={closeMenu}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar__actions">
        <CtaButton href={waLink} target="_blank" rel="noopener noreferrer">
          Book via WhatsApp
        </CtaButton>
        {city ? <span className="navbar__city">{city}</span> : null}
      </div>
    </header>
  )
}