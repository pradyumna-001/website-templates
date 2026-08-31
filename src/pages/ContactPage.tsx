import { useSiteConfig } from '../components/SiteConfigContext'
import CtaButton from '../components/CtaButton'
import FaqAccordion from '../components/FaqAccordion'

/**
 * Contact page (GitHub issue #17).
 *
 * Contact details are shown plainly, up front, with no form to dig through —
 * surfacing price and contact information is a reservoir of goodwill (Krug,
 * "Don't Make Me Think") and hiding how to reach you erodes trust. Address,
 * opening hours, Instagram, and WhatsApp are all always visible here, rendering
 * only the fields the studio config provides so an online-only studio shows no
 * dead links.
 *
 * Hours come from the config as a `Record<string, string | null>` keyed by day
 * ("mon" … "sun"); a null value means closed that day. We present them as a
 * readable days-and-hours list in canonical weekday order, skipping days with
 * no hours so closed days don't clutter the list.
 *
 * The FAQ accordion sits on this page because the nav has no dedicated /faq
 * route. Its "answers as conversation" pattern (Norman) answers common
 * questions directly, right where a visitor thinking about reaching out lands.
 */
const WHATSAPP_CONTACT_MESSAGE =
  "Hi, I'd like to get in touch about a tattoo."

/** Canonical weekday order for rendering opening hours. */
const WEEK_ORDER: ReadonlyArray<{ day: string; label: string }> = [
  { day: 'mon', label: 'Monday' },
  { day: 'tue', label: 'Tuesday' },
  { day: 'wed', label: 'Wednesday' },
  { day: 'thu', label: 'Thursday' },
  { day: 'fri', label: 'Friday' },
  { day: 'sat', label: 'Saturday' },
  { day: 'sun', label: 'Sunday' },
]

/** A single hours entry for a day the studio is actually open. */
interface HourRow {
  label: string
  hours: string
}

/** Map config hours to an ordered list of open-day rows, skipping closed days. */
function openHourRows(hours: Record<string, string | null>): HourRow[] {
  const rows: HourRow[] = []
  for (const { day, label } of WEEK_ORDER) {
    const value = hours[day]
    if (typeof value === 'string' && value.trim().length > 0) {
      rows.push({ label, hours: value })
    }
  }
  return rows
}

export default function ContactPage() {
  const { address, hours, instagram, whatsapp } = useSiteConfig()
  const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    WHATSAPP_CONTACT_MESSAGE,
  )}`
  const hourRows = hours ? openHourRows(hours) : []

  return (
    <section className="contact">
      <h1 className="contact__heading">Contact</h1>
      <p className="contact__lede">
        Reach out whenever you like — we reply within one business day.
      </p>

      <div className="contact__grid">
        <div className="contact__details">
          {address ? (
            <p className="contact__address">
              <strong>Studio</strong>
              <span>{address}</span>
            </p>
          ) : null}

          {hourRows.length > 0 ? (
            <div className="contact__hours">
              <h2 className="contact__subheading">Opening hours</h2>
              <ul className="contact__hours-list">
                {hourRows.map((row) => (
                  <li className="contact__hours-row" key={row.label}>
                    <span className="contact__day">{row.label}</span>
                    <span className="contact__time">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="contact__actions">
            {instagram ? (
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link"
              >
                Instagram
              </a>
            ) : null}
            <CtaButton
              href={waLink}
              variant="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact on WhatsApp
            </CtaButton>
          </div>
        </div>

        <div className="contact__faq">
          <FaqAccordion />
        </div>
      </div>
    </section>
  )
}