# Client Delivery Playbook

This guide is the **reusable delivery playbook** for turning this template into a finished, live website for a real client (for example, a tattoo studio contacted during B2B prospecting). It pairs with [TESTING.md](./TESTING.md) for the launch checks.

---

## 1. Overview — the config-driven concept

The whole template is one configurable codebase. You never fork the code per client; you make a **copy** and edit **one config file**. Every client-facing string and data point lives in a single source of truth:

- **Content & data** → `src/config/studio.ts` (studio name, tagline, city, WhatsApp, Instagram, address, opening hours, artists, portfolio, services/prices, FAQ, theme colors).
- **Image files** → `public/images/` (the config references them as `/images/...`).

So one repo + a copy + an edit + new photos = a client site. Everything below is that mechanical, repeatable routine.

---

## 2. Step-by-step client rollout

### a. Create a new branch or copy the template

The recommended approach is a **fresh copy of the latest working tree** so each client project is isolated. You can clone the repo, but because this template evolves across branches, copying the current checked-out working tree is fastest.

```bash
# Option 1: fresh clone of the latest release/default branch
git clone https://github.com/pradyumna-001/website-templates.git my-client-site
cd my-client-site
git checkout <latest-working-branch>      # e.g. feature/trunk-test-doc

# Option 2 (recommended): scripted copy of the current working tree
./scripts/create-client.sh my-client-site # prompts if you omit the name
cd my-client-site

# Option 3: manual copy without the helper (equivalent to Option 2)
rsync -a --exclude node_modules --exclude dist --exclude .git ./ my-client-site/
```

Use **Option 2** — `scripts/create-client.sh` skips `node_modules`, `dist`, and `.git`, and starts a fresh git history for the client. This is the cleanest per-client workflow.

### b. Edit the config — `src/config/studio.ts`

Open `src/config/studio.ts` and replace the sample `studioConfig` values with the client's real details:

| Field | Replace with |
| ----- | ------------ |
| `studioName` | The studio's name |
| `tagline` | Their one-line promise |
| `city` | Their city / region |
| `whatsapp` | Their real number, **full international format**, digits only (e.g. `5511999888777`) — used for the `wa.me` booking link |
| `instagram` | Their handle (no `@`) |
| `address` | Add it if they have a walk-in location (optional per the schema) |
| `hours` | Real opening times; `null` = closed that day |
| `artists` | Real artists, photos, bio, and styles |
| `portfolio` | Their real photos + titles + styles (keep `id`, `artistId`, `style`, `alt` consistent) |
| `services` | Real services/ranges and prices (use `'On request'` for custom work) |
| `faq` | Real questions and answers |
| `theme` | Their brand colors (optional; keep defaults if unsure) |

Keep all copy in **English** unless the client is English-first — the template defaults to English on purpose.

> Note: `src/config/site.ts` holds template-level navigation/footer strings; you rarely touch it. Everything client-specific is in `studio.ts`.

### c. Swap images

- Put the client's photos in **`public/images/`** (the config references them as `/images/...`).
- Recommended naming convention: descriptive kebab-case, e.g. `studio-local.jpg`, `artists/mara-okafor.jpg`, `piece-front-sleeve.jpg`. You do not have to reuse the sample file names — just **re-point the config paths** in `studio.ts` to match whatever you name the files.
- Optimize and compress photos for the web before uploading. Photos for a before/after style gallery are typically **2–4 MB "as-shot"; aim for under ~250 KB per image** (use a tool like Squoosh, ImageOptim, or `npx sharp-cli` to resize to max ~1600 px wide). Large originals bloat the static build and slow first load.
- Keep `alt` text meaningful — it's an accessibility and SEO signal.

### d. Build

```bash
npm install
npm run build                      # tsc -b && vite build -> writes dist/
npx tsc --noEmit                   # strict type check must pass with no errors
```

The static build writes to `dist/`. Because all client-edit styling lives in `src`, the app is a **static client-side React SPA** — no server-side rendering is needed.

### e. Deploy — static host

Pick **Netlify** as the primary host; **GitHub Pages** is documented as the alternative. Both serve the static `dist/`.

#### Netlify (primary)
```bash
netlify deploy --dir dist          # public URL preview for review
netlify deploy --dir dist --prod   # promote to the production URL
```
Or use the Netlify drag-and-drop app: drag the `dist/` folder onto the Netlify team dashboard → it publishes a live URL instantly.

#### GitHub Pages (alternative)
```bash
npm install --save-dev gh-pages
# add to package.json: "deploy": "gh-pages -d dist"
npm run build
npm run deploy                     # pushes dist/ to the gh-pages branch
```
Then enable Pages in the repo settings → Source: `gh-pages` branch. The site is served at `https://<your-username>.github.io/<repo-name>/`.

### f. Launch check

Before sending the link to anyone:

1. Run the **Trunk Test** and the **Big Bang homepage audit** from [TESTING.md](./TESTING.md) on the client's content.
2. Do a quick self-check: every link works, the active nav state shows, mobile first screen shows the booking CTA.
3. **Test the booking WhatsApp message end-to-end** — tap the WhatsApp / booking link and confirm it opens a `wa.me` conversation pre-filled with the studio's number and a correct message.

### g. Send the finished URL on WhatsApp (outreach hook)

The finished site is your outreach. A short, professional English message:

> Hello! I built a clean website for Iron & Ink Studio — take a look: https://your-site.netlify.app. I can adjust any of it for you. Want me to set up booking so clients can message and reserve a slot right from the site?

Keep it 2–3 sentences, link the live URL, name the studio, and end with one clear next step (setup booking / adjust). The working booking link is what turns a looker into a lead.

---

## 3. Per-client scaffolding script

A small helper is **justified**: the rollout is a fixed, repeated 4-step sequence (copy → edit → build → deploy), and automating the copy-and-init step removes the most error-prone handwork. It ships as **`scripts/create-client.sh`** (POSIX `sh`, safe, English-only comments).

What it does:
- Takes a target folder name (argument or interactive prompt).
- Copies the current working tree, **excluding** `node_modules`, `dist`, `.git`, and `*.tsbuildinfo`.
- Runs `git init` + an initial `chore: scaffold` commit so each client starts with its own history.
- Prints the remaining manual steps (edit config → swap images → build).

It deliberately does **not** do `npm install` (leaves install timing to you) or guess client details (those are human decisions in `studio.ts`). If you prefer no script, the manual `rsync` recipe in step **a** is the equivalent recipe.

---

## 4. Typical runbook (one client)

```bash
./scripts/create-client.sh iron-and-ink   # 1. copy + init
cd iron-and-ink
npm install                               # 2. deps
# 3. edit src/config/studio.ts  + replace public/images/
npm run build                             # 4. build
npx tsc --noEmit                          # 5. type check (must pass)
netlify deploy --dir dist --prod          # 6. deploy
# 7. Trunk Test + WhatsApp end-to-end check (TESTING.md)
# 8. send the live URL on WhatsApp (see outreach template above)
```

That is the full delivery playbook: **clone → config → images → build → deploy → check → outreach**.