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

/* ------------------------------------------------------------------ *\
  Type guards
\* ------------------------------------------------------------------ */

const STYLE_SET: ReadonlySet<string> = new Set(Object.keys(STYLES))

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isArrayOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T,
): value is T[] {
  return Array.isArray(value) && value.every(guard)
}

export function isStyleCategory(value: unknown): value is StyleCategory {
  return typeof value === 'string' && STYLE_SET.has(value)
}

export function isBookingType(value: unknown): value is BookingType {
  return value === 'tattoo' || value === 'piercing' || value === 'consultation'
}

/** Structural check that `value` at least looks like a portfolio item. */
export function isPortfolioItem(value: unknown): value is PortfolioItem {
  if (!isRecord(value)) return false
  if (!isNonEmptyString(value.id)) return false
  if (!isNonEmptyString(value.title)) return false
  if (!isNonEmptyString(value.artistId)) return false
  if (!isNonEmptyString(value.image)) return false
  return isStyleCategory(value.style)
}

export function isArtist(value: unknown): value is Artist {
  if (!isRecord(value)) return false
  if (!isNonEmptyString(value.id)) return false
  if (!isNonEmptyString(value.name)) return false
  return Array.isArray(value.styles) && value.styles.every(isStyleCategory)
}

export function isService(value: unknown): value is Service {
  if (!isRecord(value)) return false
  if (!isNonEmptyString(value.id)) return false
  if (!isNonEmptyString(value.name)) return false
  if (typeof value.price !== 'number' && value.price !== 'On request') {
    return false
  }
  return (
    Array.isArray(value.bookingTypes) && value.bookingTypes.every(isBookingType)
  )
}

export function isFaqItem(value: unknown): value is FaqItem {
  if (!isRecord(value)) return false
  return isNonEmptyString(value.q) && isNonEmptyString(value.a)
}

/**
 * Structural guard for config loaded from `unknown` (e.g. a fetched JSON
 * config file). Validates the required scalar fields and applies the item
 * guards to every array, so a producing site can trust the result.
 */
export function isStudioConfig(value: unknown): value is StudioConfig {
  if (!isRecord(value)) return false
  if (!isNonEmptyString(value.studioName)) return false
  if (!isNonEmptyString(value.whatsapp)) return false
  if (!isArrayOf(value.artists, isArtist)) return false
  if (!isArrayOf(value.portfolio, isPortfolioItem)) return false
  if (!isArrayOf(value.services, isService)) return false
  if (value.faq !== undefined && !isArrayOf(value.faq, isFaqItem)) return false
  if (value.hours !== undefined && !isHoursRecord(value.hours)) return false
  if (value.theme !== undefined && !isThemeTokens(value.theme)) return false
  return true
}

function isHoursRecord(value: unknown): value is Record<string, string | null> {
  if (!isRecord(value)) return false
  return Object.values(value).every(
    (entry) => entry === null || typeof entry === 'string',
  )
}

function isThemeTokens(value: unknown): value is ThemeTokens {
  if (!isRecord(value)) return false
  return (
    isNonEmptyString(value.primary) &&
    isNonEmptyString(value.accent) &&
    isNonEmptyString(value.background) &&
    isNonEmptyString(value.foreground)
  )
}