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

## 3. Guided user test (2–3 people)

> **The point is to watch real people do a real task and see where they stumble — not to ask them what they think.**

Krug's key insight: about 80% of the most serious usability problems are found by even **3 users**. You do not need a big sample; you need a few honest observers and the discipline to watch in silence.

### Before the session

- Pick **2–3 people** who have not built the site (friends, other clients — not you and not a developer on this project).
- Explain honestly: "This is a test of the website, not of you. Whatever goes wrong is our fault, and your honest reactions help us fix it."
- Can test in person or over a screen-share call. Record (with permission) or take notes.
- Sit **behind** them and observe. Do **not** volunteer help or praise, and do **not** answer questions during the task.

### The task list (hand this to the tester, read the tasks aloud one at a time)

Give these as plain goals, not as "click the Portfolio link" (that already tells them the answer):

1. **Find a blackwork tattoo piece.** Show me a tattoo in the blackwork style from the portfolio.
2. **Start booking a session with the artist Maria.** Begin the process of booking a session with the artist Maria.
3. **Check the price of a piercing.** Find out what a piercing costs.
4. Walk through **how you would contact the studio** to ask a question.

Let them work through each task at their own pace. When they finish one (or give up), move to the next.

### While they work, write down

- Where they **pause** (hesitate, hover, re-read).
- Where they **fail** (click the wrong thing, ask "how do I…", backtrack).
- Where they **succeed quickly** (so you know what to leave alone).
- What they say **out loud** (verbatim quotes are gold), especially sighs or "I don't get what I'm looking at".

### Do / don't for the observer

- **Do** ask neutral follow-ups: "What were you expecting to happen there?"
- **Do** let them fail in silence long enough to reveal the problem.
- **Don't** ask leading questions ("Did you find it confusing?") — that puts words in their mouth.
- **Don't** rescue them — your urge to help is where the real problems hide.

### Results table template (copy per task, one column per user)

| Task: ______ | User 1 | User 2 | User 3 |
| ------------- | ------ | ------ | ------ |
| Completed? (Yes / No / Partly) | | | |
| Time to finish | | | |
| Where paused | | | |
| Where failed | | | |
| Quote / note | | | |

### Decide what to fix (Krug)

1. List every problem observed across all users.
2. **Sort by severity** — impact (how stuck they got) × frequency (how many users hit it). Pick only the **2–3 most serious problems** first. Fixing the worst few gives most of the gain.
3. Fix those, then **iterate and retest** with the same or new users — even one retest confirms the fix worked.

Repeat this loop before launch, and ideally again after launch whenever you change navigation, content, or the booking flow.

---

## 4. Pre-launch usability sign-off checklist

Run this right before launching a real client site. It is the final safety net on top of Section 1 and Section 3.

| Check | Done |
| ----- | ---- |
| Every button and link is **clickable**, does something, and says what it does. | ☐ |
| **Back / forward / undo** behave predictably (browser back works, no stuck states). | ☐ |
| **No dead ends** — every entry point leads somewhere meaningful; no "under construction" or empty pages. | ☐ |
| **Mobile first screen** shows the key CTA (book / WhatsApp / pricing) without scrolling. | ☐ |
| **Loading state present** — pages/screens show feedback while loading instead of a blank flash. | ☐ |
| Active nav "you are here" state visible (matches Trunk Test row above). | ☐ |
| WhatsApp link opens correctly on desktop and mobile. | ☐ |
| Forms give clear feedback (success / error), not silent failures. | ☐ |
| Site name links Home; logo/name present on all pages. | ☐ |

If any box is unticked, fix it, then re-run the Trunk Test + a quick 1-user retest before launch.

---

## The "before the first real studio" workflow

For this template, launching for a real client means:

1. **Do the Trunk Test** (Section 1) across Home, Portfolio, Artists, Pricing, Booking, and Contact. Tick every box.
2. **Do the Big Bang audit** (Section 2) on your client's homepage content.
3. **Run one guided test with 2–3 real people** (Section 3) — have them book a session and browse the portfolio. Record pauses/failures, fix only the **2–3 most serious** problems, then retest.
4. **Run the pre-launch sign-off** (Section 4).
5. Ship. Re-test after any content or navigation change.

---

## Reference (for the principles)

- Steve Krug — *Don't Make Me Think*, 2nd ed. Chapter 6 ("Trunk Test"), the Big Bang homepage test, and "test early, test often, three users a morning."
- Donald Norman — *The Design of Everyday Things*. Fail fast and iterate, observe users in context, and the seven-stage model of action (goal → plan → specify → perform → perceive → interpret → compare) as a lens for where a task breaks down.

---

*Everything above is written in plain English and applicable to the default demo config (`src/config/site.ts`) or any client fork.*