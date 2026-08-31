import { Link, Outlet } from 'react-router-dom'
import { siteConfig } from '../config/site'

export default function Layout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">{siteConfig.siteName}</Link>
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