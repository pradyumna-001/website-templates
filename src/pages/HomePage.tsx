import { useSiteConfig } from '../components/SiteConfigContext'
import CtaButton from '../components/CtaButton'

export default function HomePage() {
  const { studioName, whatsapp } = useSiteConfig()
  const waLink = `https://wa.me/${whatsapp}`

  return (
    <section>
      <h1>{studioName}</h1>
      <p>Explore our artists and portfolio, then book your session.</p>
      <div className="home__cta-row">
        <CtaButton to="/booking">Book now</CtaButton>
        <CtaButton href={waLink} variant="whatsapp" target="_blank">
          Chat on WhatsApp
        </CtaButton>
      </div>
    </section>
  )
}