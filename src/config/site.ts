export const siteConfig = {
  siteName: 'Website Templates',
  tagline: 'Config-driven client websites',
  nav: [
    { label: 'Home', path: '/' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Artists', path: '/artists' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Booking', path: '/booking' },
    { label: 'Contact', path: '/contact' },
  ],
  footer: {
    copyright: 'Website Templates',
    year: new Date().getFullYear(),
  },
} as const