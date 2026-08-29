import { Link, Outlet } from 'react-router-dom'
import { siteConfig } from '../config/site'
import { useSiteConfig } from './SiteConfigContext'

export default function Layout() {
  const { studioName } = useSiteConfig()

  return (
    <div>
      <header>
        <nav>
          <Link to="/">{studioName}</Link>
          <ul>
            {siteConfig.nav.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>
          &copy; {siteConfig.footer.year} {siteConfig.footer.copyright}
        </p>
      </footer>
    </div>
  )
}