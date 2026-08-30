import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import SeoHead from './SeoHead'
import { useSiteConfig } from './SiteConfigContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

/** Route -> document-title label. `null` keeps the static index.html title. */
const ROUTE_TITLES: Record<string, string | null> = {
  '/': null,
  '/portfolio': 'Portfolio',
  '/artists': 'Artists',
  '/pricing': 'Pricing',
  '/booking': 'Booking',
  '/contact': 'Contact',
}

/**
 * Shared layout shell for every routed page: Navbar at the top, the routed
 * page rendered into the <Outlet/>, and the site Footer at the bottom
 * (Stefanov, React Up & Running: composition + shared layout).
 *
 * Accessibility + SEO (GitHub issue #19):
 * - <SeoHead> emits schema.org JSON-LD once, here, so structured data applies
 *   to every route.
 * - A skip-to-content link at the top lets keyboard users jump straight to
 *   <main id="main">, which wraps every routed page.
 * - `useDocumentTitle` sets a unique, descriptive tab/result title per route.
 */
export default function Layout() {
  const { studioName } = useSiteConfig()
  const { pathname } = useLocation()
  useDocumentTitle(ROUTE_TITLES[pathname] ?? null, studioName)

  return (
    <div className="layout">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SeoHead />
      <Navbar />
      <main id="main" className="layout__main" aria-label="Main content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}