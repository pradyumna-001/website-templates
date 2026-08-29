import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ArtistsPage from './pages/ArtistsPage'
import BookingPage from './pages/BookingPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import PricingPage from './pages/PricingPage'

/**
 * App composition root.
 *
 * Owns the router and the layout shell: a shared <Layout> (Navbar above, an
 * <Outlet/> for the routed page, Footer below) wraps every route so all pages
 * render from one shell. Kept inside App so the SiteConfigProvider in
 * main.tsx stays outside the router. Each page heading matches its nav label
 * (Krug: a visible "you are here" cue on every page).
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}