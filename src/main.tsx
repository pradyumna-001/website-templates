import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SiteConfigProvider } from './components/SiteConfigContext'
import './styles/global.css'
import './styles/index.css'

// SiteConfigProvider is deliberately OUTSIDE the router (App owns
// BrowserRouter + Routes) so site-wide config is not coupled to routing.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteConfigProvider>
      <App />
    </SiteConfigProvider>
  </StrictMode>,
)