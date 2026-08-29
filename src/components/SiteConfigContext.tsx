import {
  createContext,
  useContext,
  useMemo,
  type CSSProperties,
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

  return (
    <SiteConfigContext.Provider value={value}>
      <div
        style={
          {
            '--color-primary': theme.primary,
            '--color-accent': theme.accent,
            minHeight: '100vh',
          } as CSSProperties
        }
      >
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