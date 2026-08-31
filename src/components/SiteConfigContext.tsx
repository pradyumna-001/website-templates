import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
import {
  DEFAULT_THEME,
  type StudioConfig,
  type ThemeTokens,
} from '../types/studio'
import { studioConfig } from '../config/studio'

interface SiteConfigProviderProps {
  children: ReactNode
  /** Site-wide config. Falls back to the imported `studioConfig`. */
  config?: StudioConfig
}

/**
 * Shared site config provider.
 *
 * Access strategy (documented): the context defaults to the imported
 * `studioConfig` from `src/config/studio.ts`, so components can consume config
 * with `useSiteConfig()` even without an explicit provider. An explicit
 * `<SiteConfigProvider config={...}>` may be wired higher up (e.g. for
 * config fetched at runtime) and overrides the default for its subtree.
 */
export function SiteConfigProvider({
  children,
  config = studioConfig,
}: SiteConfigProviderProps) {
  const value = useMemo(() => config, [config])

  const theme: ThemeTokens = config.theme ?? DEFAULT_THEME

  // Apply the theme to the document root (not the wrapper div). Dark-surface
  // tokens like body's background and color are read from `:root`, so the
  // values must override the root custom properties rather than a descendant
  // div, which the <body> (a parent) could never inherit from. Setting them on
  // `document.documentElement` makes the whole page — including the body
  // behind the app — respect the config's background/foreground.
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', theme.primary)
    root.style.setProperty('--color-accent', theme.accent)
    root.style.setProperty('--color-bg', theme.background)
    root.style.setProperty('--color-fg', theme.foreground)
  }, [theme])

  return (
    <SiteConfigContext.Provider value={value}>
      <div style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </SiteConfigContext.Provider>
  )
}

const SiteConfigContext = createContext<StudioConfig>(studioConfig)

/**
 * Read the current site config. Safe to call anywhere inside the provider
 * tree; falls back to the imported `studioConfig` when no provider is present.
 */
export function useSiteConfig(): StudioConfig {
  const context = useContext(SiteConfigContext)
  if (context === undefined) {
    throw new Error(
      'useSiteConfig can only be called within a SiteConfigProvider. ' +
        'Wrap your component tree in <SiteConfigProvider> to provide a config.',
    )
  }
  return context
}