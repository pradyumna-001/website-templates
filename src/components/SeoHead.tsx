import { type ReactNode } from 'react'
import { useSiteConfig } from './SiteConfigContext'
import type { Service } from '../types/studio'

/**
 * Typed schema.org JSON-LD object (Goldberg: typed data for SEO metadata).
 *
 * The interface narrows the structured-data payload to the fields the template
 * actually emits, so a config change that would produce invalid schema fails to
 * type-check rather than silently shipping a malformed script.
 */
interface SchemaOrgLocalBusiness {
  '@context': 'https://schema.org'
  '@type': 'TattooParlour' | 'ProfessionalService'
  name: string
  description: string
  url: string
  address: {
    '@type': 'PostalAddress'
    addressLocality: string
    addressCountry: string
  }
  telephone: string
  priceRange?: string
  openingHours?: string[]
  sameAs?: string[]
  contactPoint: {
    '@type': 'ContactPoint'
    contactType: string
    telephone: string
    availableLanguage: string
  }
  geo?: { '@type': 'GeoCoordinates'; latitude: number; longitude: number }
}

/** Canonical day keys -> schema.org two-letter abbreviations. */
const DAY_CODES: Record<string, string> = {
  mon: 'Mo',
  tue: 'Tu',
  wed: 'We',
  thu: 'Th',
  fri: 'Fr',
  sat: 'Sa',
  sun: 'Su',
}

/** Turn `{ mon: '11:00-19:00', tue: null, ... }` into schema.org openingHours. */
function openingHoursSpecs(
  hours?: Record<string, string | null>,
): string[] | undefined {
  if (!hours) return undefined
  const specs: string[] = []
  for (const [day, value] of Object.entries(hours)) {
    if (typeof value !== 'string' || value.trim() === '' || !(day in DAY_CODES)) {
      continue
    }
    const [open, close] = value
      .split('-')
      .map((part) => part.trim())
    if (!open || !close) continue
    specs.push(`${DAY_CODES[day]} ${open}-${close}`)
  }
  return specs.length > 0 ? specs : undefined
}

/**
 * Injects a single schema.org JSON-LD script for local-business rich results.
 *
 * The payload is derived entirely from `useSiteConfig()` (one source of
 * truth), typed through `SchemaOrgLocalBusiness`, and JSON-stringified so it
 * is safe to embed. Mounted from the shared layout so structured data applies
 * to every route.
 */
export default function SeoHead(): ReactNode {
  const { studioName, tagline, city, whatsapp, instagram, hours, services } =
    useSiteConfig()

  // Derive the schema.org priceRange from the config's numeric services rather
  // than hard-coding sample amounts, so each client's structured data reflects
  // its own prices. Omit it entirely when nothing has a numeric price.
  const numericPrices = services
    .filter((s): s is Service & { price: number } => typeof s.price === 'number')
    .map((s) => s.price)
  const priceRange =
    numericPrices.length > 0
      ? `$${Math.min(...numericPrices).toLocaleString('en-US')} - $${Math.max(...numericPrices).toLocaleString('en-US')}`
      : undefined

  const jsonLd: SchemaOrgLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'TattooParlour',
    name: studioName,
    description:
      tagline ??
      'Custom tattoo studio offering design consultation and booking online.',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city ?? '',
      addressCountry: 'US',
    },
    telephone: `+${whatsapp}`,
    priceRange,
    openingHours: openingHoursSpecs(hours),
    sameAs: instagram ? [`https://instagram.com/${instagram}`] : undefined,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Booking',
      telephone: `+${whatsapp}`,
      availableLanguage: 'English',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}