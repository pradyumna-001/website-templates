import { Outlet } from 'react-router-dom'
import { siteConfig } from '../config/site'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div>
      <Navbar />
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