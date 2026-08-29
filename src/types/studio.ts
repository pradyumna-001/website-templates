/**
 * Typed config schema for a config-driven tattoo studio website.
 *
 * Each client is deployed as a clone of the template plus a single config
 * file (the "sample config") that conforms to `StudioConfig`. The types below
 * are the contract that config file must satisfy. They are designed to be
 * strict-safe and purpose-built for data that is authored by hand and, in the
 * browser, loaded from `unknown` via type guards.
 */

/* ------------------------------------------------------------------ *\
  Literal unions
\* ------------------------------------------------------------------ */

/**
 * Visual styles a studio or artist may specialise in. Modelled as a
 * string-literal union (not an enum) so config authors use plain strings and
 * values serialise cleanly to JSON.
 */
export type StyleCategory =
  | 'traditional'
  | 'neo-traditional'
  | 'realism'
  | 'blackwork'
  | 'color'
  | 'tribal'
  | 'lettering'
  | 'minimal'

/** Booking types a service can offer (or an artist can book). */
export type BookingType = 'tattoo' | 'piercing' | 'consultation'

/* ------------------------------------------------------------------ *\
  Domain entities
\* ------------------------------------------------------------------ */

export interface Artist {
  readonly id: string
  name: string
  /** URL-safe slug used for /artists/:slug routes; falls back to id. */
  slug?: string
  bio?: string
  /** Styles this artist specialises in. */
  styles: StyleCategory[]
  photo?: string
}

export interface PortfolioItem {
  readonly id: string
  title: string
  artistId: string
  style: StyleCategory
  image: string
  /** When the piece was made, e.g. "2024" or "Mar 2024". */
  year?: string
  /** True if the piece is a healed photograph. */
  healed?: boolean
  /** Shown as a popular signifier on the card. */
  featured?: boolean
  /** Accessible description for the image. */
  alt?: string
}

export interface Service {
  id: string
  name: string
  /** Numeric price in studio currency, or a message for quote-only work. */
  price: number | 'On request'
  description?: string
  bookingTypes: BookingType[]
  duration?: string
}

export interface FaqItem {
  q: string
  a: string
}

/* ------------------------------------------------------------------ *\
  Theme
\* ------------------------------------------------------------------ */

export interface ThemeTokens {
  primary: string
  accent: string
  background: string
  foreground: string
}

/** Sensible default theme used when a config omits its own `theme`. */
export const DEFAULT_THEME: ThemeTokens = {
  primary: '#0b0b0f',
  accent: '#d4a24e',
  background: '#faf7f2',
  foreground: '#1a1a1a',
}

/* ------------------------------------------------------------------ *\
  Root config
\* ------------------------------------------------------------------ */

export interface StudioConfig {
  studioName: string
  tagline?: string
  city?: string
  whatsapp: string
  instagram?: string
  address?: string
  /**
   * Opening hours keyed by day, e.g. { mon: '10-18', tue: null }. A null
   * value means closed that day.
   */
  hours?: Record<string, string | null>
  artists: Artist[]
  portfolio: PortfolioItem[]
  services: Service[]
  faq?: FaqItem[]
  theme?: ThemeTokens
}

/* ------------------------------------------------------------------ *\
  Label maps via `as const` + `keyof typeof`
\* ------------------------------------------------------------------ */

/**
 * Canonical source of style labels. Keeping a single const object and deriving
 * both the label map and the union from it guarantees the labels and the
 * `StyleCategory` union can never drift apart.
 */
export const STYLES = {
  traditional: 'Traditional',
  'neo-traditional': 'Neo-Traditional',
  realism: 'Realism',
  blackwork: 'Blackwork',
  color: 'Color',
  tribal: 'Tribal',
  lettering: 'Lettering',
  minimal: 'Minimal',
} as const

/**
 * Display label for a style category, matching the `StyleCategory` union by
 * construction. Derived from `STYLES` via `keyof typeof`.
 */
export type StyleLabel = (typeof STYLES)[keyof typeof STYLES]

/** Map from each `StyleCategory` to its display label. */
export const STYLE_LABELS: Record<StyleCategory, string> = STYLES

export const BOOKING_TYPES = {
  tattoo: 'Tattoo',
  piercing: 'Piercing',
  consultation: 'Consultation',
} as const

export type BookingLabel = (typeof BOOKING_TYPES)[keyof typeof BOOKING_TYPES]

export const BOOKING_LABELS: Record<BookingType, string> = BOOKING_TYPES