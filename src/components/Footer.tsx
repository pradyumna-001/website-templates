import { useSiteConfig } from './SiteConfigContext'

/**
 * Shared site footer.
 *
 * Rendered inside the layout shell beneath the routed page. Picks contact
 * links straight from the studio config and only shows the ones a config
 * actually provides (address, Instagram, WhatsApp are all optional in the
 * schema), so an online-only studio renders a cleaner footer without dead
 * links.
 */
export default function Footer() {
  const { studioName, instagram, whatsapp, address } = useSiteConfig()

  return (
    <footer className="footer">
      <div className="footer__brand">
        <span className="footer__name">{studioName}</span>
        {address ? <span className="footer__address">{address}</span> : null}
      </div>

      <div className="footer__links">
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
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            WhatsApp
          </a>
        ) : null}
      </div>

      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} {studioName}
      </p>
    </footer>
  )
}