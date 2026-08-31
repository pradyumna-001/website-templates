import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import PlaceholderPage from './components/PlaceholderPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<PlaceholderPage title="Home" />} />
        <Route path="/portfolio" element={<PlaceholderPage title="Portfolio" />} />
        <Route path="/artists" element={<PlaceholderPage title="Artists" />} />
        <Route path="/pricing" element={<PlaceholderPage title="Pricing" />} />
        <Route path="/booking" element={<PlaceholderPage title="Booking" />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
      </Route>
    </Routes>
  )
}