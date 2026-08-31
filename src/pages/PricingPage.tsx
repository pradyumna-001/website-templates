import { BOOKING_LABELS, type Service } from '../types/studio'
import { useSiteConfig } from '../components/SiteConfigContext'
import CtaButton from '../components/CtaButton'

/**
 * Pricing page (GitHub issue #16).
 *
 * Honest, visible pricing is a reservoir of goodwill (Krug, "Don't Make Me
 * Think"): hiding prices behind a form or "contact us" wall forces the visitor
 * to guess and erodes trust. So every service and its price is on the page, up
 * front, with no email-wall and no gate before the number.
 *
 * Each service comes from `useSiteConfig().services` (one source of truth —
 * Stefanov, "React Up & Running"). A numeric `price` becomes a formatted amount
 * in the studio's currency; a non-numeric price is surfaced verbatim as "On
 * request" so quote-only work is still honest rather than hidden. Duration is
 * shown when present, and booking types render as small labelled tags.
 *
 * Layout follows Krug's third law: stick to scannable formatting. A single
 * aligned list groups name, duration, and price, with the numeric column
 * right-aligned so figures compare at a glance. Two obvious actions close the
 * page — "Book a session" and WhatsApp — so the goodwill of visible pricing
 * flows straight into an easy next step.
 */

/** Studio currency symbol for formatting numeric prices. */
const CURRENCY = '$'

/** Prefilled message for the WhatsApp shortcut CTA on this page. */
const WHATSAPP_INTRO =
  "Hi, I'd like to book a session. Could you tell me about availability?"

/** Format a numeric price in the studio's currency: "$1,200". */
function formatPrice(price: number): string {
  return `${CURRENCY}${price.toLocaleString('en-US')}`
}

/** The visible price for a service — "Free", a "$" amount, or "On request". */
function priceLabel(price: Service['price']): string {
  if (price === 'On request') return 'On request'
  if (price === 0) return 'Free'
  return formatPrice(price)
}

export default function PricingPage() {
  const { services, whatsapp } = useSiteConfig()
  const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    WHATSAPP_INTRO,
  )}`

  return (
    <section className="pricing">
      <h1 className="pricing__heading">Pricing</h1>
      <p className="pricing__lede">
        Clear pricing. A deposit confirms your slot.
      </p>

      {services.length > 0 ? (
        <ul className="pricing__list">
          {services.map((service) => {
            const price = priceLabel(service.price)
            const onRequest = service.price === 'On request'
            return (
              <li className="pricing__row" key={service.id}>
                <div className="pricing__service">
                  <span className="pricing__name">{service.name}</span>
                  {service.duration ? (
                    <span className="pricing__duration">{service.duration}</span>
                  ) : null}
                  {service.description ? (
                    <span className="pricing__description">
                      {service.description}
                    </span>
                  ) : null}
                  {service.bookingTypes.length > 0 ? (
                    <ul className="pricing__tags" aria-label="Booking types">
                      {service.bookingTypes.map((type) => (
                        <li className="pricing__tag" key={type}>
                          {BOOKING_LABELS[type]}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <span
                  className={
                    onRequest
                      ? 'pricing__price pricing__price--on-request'
                      : 'pricing__price'
                  }
                >
                  {price}
                </span>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="pricing__empty">
          Our rates are shared in conversation — book a session to get a quote.
        </p>
      )}

      <div className="pricing__cta-row">
        <CtaButton to="/booking">Book a session</CtaButton>
        <CtaButton href={waLink} variant="whatsapp" target="_blank">
          WhatsApp
        </CtaButton>
      </div>
    </section>
  )
}