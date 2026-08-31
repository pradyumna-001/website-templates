import { Link } from 'react-router-dom'
import { useSiteConfig } from '../components/SiteConfigContext'
import CtaButton from '../components/CtaButton'

const WHATSAPP_INTRO =
  "Hi, I'd like to book a tattoo. Can you tell me about availability?"

/**
 * Homepage hero (the "Big Bang" test).
 *
 * Answers the four questions a first-time visitor needs answered in seconds
 * (Krug, "Don't Make Me Think"): what this is, what it does, what I can do,
 * and why I am here. Copy is deliberately minimal and specific — a tattoo
 * studio you can book online — with one primary CTA and the WhatsApp channel
 * visible in the first viewport, plus shortcuts to the two most useful
 * destinations (portfolio, pricing). No happy talk.
 */
export default function HomePage() {
  const { studioName, tagline, city, whatsapp } = useSiteConfig()
  const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    WHATSAPP_INTRO,
  )}`

  return (
    <section className="hero">
      <h1 className="hero__title">{studioName}</h1>
      {tagline ? <p className="hero__tagline">{tagline}</p> : null}

      <p className="hero__value">
        Custom tattoo studio{city ? ` in ${city}` : ''}. Book your session
        online.
      </p>

      <div className="hero__cta-row">
        <CtaButton to="/booking">Book a Tattoo</CtaButton>
        <CtaButton href={waLink} variant="whatsapp" target="_blank">
          WhatsApp
        </CtaButton>
      </div>

      <nav className="hero__shortcuts" aria-label="Popular pages">
        <Link className="hero__shortcut" to="/portfolio">
          See the work
        </Link>
        <Link className="hero__shortcut" to="/pricing">
          Pricing
        </Link>
      </nav>

      <p className="hero__promise">
        From small pieces to full custom sleeves. Free consultation on your
        piece.
      </p>
    </section>
  )
}