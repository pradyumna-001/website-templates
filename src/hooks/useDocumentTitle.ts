import { useEffect } from 'react'

/**
 * Lightweight per-route document title hook.
 *
 * Sets `document.title` whenever the given label changes, composed as
 * "<label> — <siteName>" so every route has a unique, descriptive browser tab
 * (and search-result title). `null` leaves the title untouched so a route can
 * opt out and keep the static <title>.
 */
export function useDocumentTitle(
  label: string | null,
  siteName: string,
): void {
  useEffect(() => {
    if (label === null) return
    document.title = `${label} — ${siteName}`
  }, [label, siteName])
}