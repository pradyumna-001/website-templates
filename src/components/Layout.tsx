import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

/**
 * Shared layout shell for every routed page: Navbar at the top, the routed
 * page rendered into the <Outlet/>, and the site Footer at the bottom
 * (Stefanov, React Up & Running: composition + shared layout).
 */
export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}