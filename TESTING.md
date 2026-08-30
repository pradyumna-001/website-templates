# Usability & User-Testing Guide

This document gives you a fast, practical way to check that this template is usable **before you launch it for a real client**. It is based on Steve Krug's *Don't Make Me Think* (the Trunk Test, chapter 6; the Big Bang homepage test; "test early and cheaply — three users a morning") and Donald Norman's *The Design of Everyday Things* (fail fast, observe in context, seven-stage action checklist).

Everything here works on the **default demo content** in `src/config/site.ts` or on your own client content. Run the two checklists yourself first, then run one guided test with 2-3 real people before putting the site in front of a paying studio.

> Goal: by the time you finish, you have a **documented review checklist** — the answer to "Done when: a documented review checklist exists."

---

## 1. Trunk Test checklist

The Trunk Test is a quick self-gut-check Krug recommends: pick **any random page**, hold it at arm's length (or squint hard at it from a distance), and see if you can still answer the questions below without actually reading anything. If you can, the page's design is doing its job.

### How to run it

1. Open the site and navigate to a random page (Home, Portfolio, Artists, Pricing, Booking, or Contact).
2. Step back or squint so you can't read words — you can only see layout, color, size, and shape.
3. Tick the boxes below **without** reading the actual text.
4. Repeat for at least 3 pages, including pages that are **not** the Home page.

### Checklist (tick one box per page, per row)

| Question (ask without reading) | Page 1 | Page 2 | Page 3 |
| ------------------------------ | ------ | ------ | ------ |
| **What site is this?** The site name/logo is clearly visible in the same place on every page. | ☐ | ☐ | ☐ |
| **Where am I?** The page has a name that matches the navigation label I clicked (e.g. "Portfolio" page shows "Portfolio"). | ☐ | ☐ | ☐ |
| **What are the main sections?** Navigation categories are obvious at a glance (Home, Portfolio, Artists, Pricing, Booking, Contact). | ☐ | ☐ | ☐ |
| **Where do I start?** I can tell at a glance what the primary action is (e.g. "Book a session"). | ☐ | ☐ | ☐ |
| **Am I currently "here"?** There is a "you are here" indicator — the current nav item is visually highlighted. | ☐ | ☐ | ☐ |
| **Can I see the main CTA?** The primary call-to-action (book / contact) is visible without scrolling or hunting. | ☐ | ☐ | ☐ |
| **Can I reach WhatsApp?** A WhatsApp contact entry is reachable from the page. | ☐ | ☐ | ☐ |
| **Can I find pricing and contact?** Pricing and Contact are visible in the navigation without a search. | ☐ | ☐ | ☐ |

### Rules of thumb that make the trunk test pass

- The site name appears on **every** page, top-left, and goes Home when clicked.
- Every page has an H1/title matching its nav label.
- The current page's nav item is visually selected (color / underline / active state).
- The primary CTA ("Book a session" / WhatsApp) is repeated in the header and on each page's main region.
- Nothing important hides behind hover-only menu states on touch devices.

### Failure → fix loop

For every unchecked box, note **which page** failed and **why**, then fix it and re-run the trunk test for just that page. Do not open the PR / launch while any box is unticked.

---

## 2. Big Bang (homepage) audit

Before anyone commits to scrolling, a first-time visitor must be able to answer four questions in **a few seconds**. Krug calls this the Big Bang test — the moment the page "hits" them. A visitor will not read; they glance. Verify the hero does this **without reading** (squint test).

### The four questions

1. **What is it?** — I know what this site is (e.g. a tattoo and piercing studio).
2. **What does it do?** — I know what this studio offers (tattoos, piercings, artists).
3. **What can I do here?** — I can see an obvious action (book a session, view the portfolio, see pricing).
4. **Why should I stay?** — The tagline and hero give me a reason to trust it / keep scrolling (e.g. featured artists, portfolio pieces).

### Reasonableness of the slogan

A tagline works when it's **short and concrete**, explains what the site does, has **differentiating value** (not "we are great"), and can be read at a glance. If the hero copy doesn't say *what the studio is and what you can do here* in the first screen, rewrite it.

### Big Bang audit checklist

| Check (does the *hero / first screen* answer this without reading?) | Pass | Notes |
| ------------------------------------------------------------------- | ---- | ----- |
| Q1 "What is it?" — site name + line about the studio visible. | ☐ | |
| Q2 "What does it do?" — services (tattoo + piercing) named. | ☐ | |
| Q3 "What can I do here?" — a book/pricing/portfolio entry point is on the first screen. | ☐ | |
| Q4 "Why should I stay?" — a gallery preview or artist teaser draws the eye. | ☐ | |
| The primary CTA is above the fold on mobile **and** desktop. | ☐ | |
| Nothing on the first screen is a mystery — no unexplained imagery-only hero. | ☐ | |

---

*This part of the guide covers the two self-review checklists. Continue in the companion section for the guided user-testing guide and pre-launch sign-off.*