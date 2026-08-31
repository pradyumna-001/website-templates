# Website Templates

A config-driven starter kit for building client websites with **Vite + React + TypeScript**.

Instead of creating a separate codebase for every client site, this template lets you **clone the repo once and edit a single config file**. Shared components render the whole site's content, structure, and navigation from that config, so each client site is just a clone plus a config edit.

## Getting started

### Clone and populate

1. Clone this repository:

   ```bash
   git clone https://github.com/pradyumna-001/website-templates.git
   cd website-templates
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Customize the site by editing the site config at `src/config/site.ts` — update the site name, navigation links, and footer text for the client.

4. Start the dev server:

   ```bash
   npm run dev
   ```

   Open the printed local URL (by default http://localhost:5173). The app hot-reloads as you edit config and components.

### Production build

```bash
npm run build
```

The static output is written to `dist/` and can be served by any static host.

### Type checking

```bash
npx tsc --noEmit
```

## Folder structure

```
├── index.html                 # Vite entry HTML
├── package.json
├── tsconfig.json              # TS project references
├── tsconfig.app.json          # strict TS config for src
├── tsconfig.node.json         # strict TS config for tooling
├── vite.config.ts
└── src/
    ├── main.tsx               # React + Router bootstrap
    ├── App.tsx                # Route wiring
    ├── config/
    │   └── site.ts            # Single source of truth for site content
    ├── types/
    │   └── index.ts           # Shared TypeScript types
    ├── components/
    │   ├── Layout.tsx         # Navbar + Footer shell with <Outlet/>
    │   └── PlaceholderPage.tsx
    └── styles/
        └── index.css          # Global styles
```

### Routes

Placeholder routes are wired with `react-router-dom`:

| Path         | View                  |
| ------------ | --------------------- |
| `/`          | Home                  |
| `/portfolio` | Portfolio placeholder |
| `/artists`   | Artists placeholder   |
| `/pricing`   | Pricing placeholder   |
| `/booking`   | Booking placeholder   |
| `/contact`   | Contact placeholder   |

## Configuration

All TypeScript configs run under `strict` mode with `strictNullChecks` enabled to catch errors early.

The `src/config/site.ts` file is the contract for how content and navigation flow into the shared `Layout` component. To spin up a new client site, clone this repository, edit that config, and rebuild.