# Handoff: Community Spark Website

## Overview
Public marketing site for **Community Spark**, an Indiana company that plans and runs resident events for apartment communities. Eight pages: Home, Event Catalog, Pricing, For Apartment Communities (Partnerships), Sponsor an Event, Gallery, About, Contact.

The site's jobs, in order: get a property manager to submit an inquiry, let them self-qualify on published pricing, and let a local business sign up to sponsor an event.

There is an existing repo for this site: **`Breatht8king/Community-Spark`** (branch `main`) — the plain HTML/CSS/JS version that predates this redesign. See "Relationship to the existing repo" at the bottom.

## About the design files
Everything in `design/` is a **design reference written in HTML + React (Babel compiled in the browser)**. These are prototypes of intended look and behavior — not production code to ship. The task is to **recreate this design in the target codebase** using that codebase's own patterns, routing, and build tooling.

If no codebase is chosen yet, the natural target is **Astro or Next.js (static export)** — this is a content site with one interactive form per page and no auth, no database. Keep the token CSS files as-is and style against the CSS custom properties.

The prototypes run with no build step: serve the `design/` folder over any static server (`npx serve design`) and open `Home.html`. Do not open via `file://` — the Babel scripts won't load.

## Fidelity
**High fidelity.** Colors, typography, spacing, radii, motion, and interaction states are final. Recreate them exactly. Every value in the prototypes comes from a `var(--*)` custom property defined in `tokens/` — carry the variables over rather than hard-coding hexes.

Copy is also final: the text in these files is real client copy pulled from the live site plus edits made during design. Treat strings as content to preserve, not lorem.

## Files

### Shared shell
| File | Contains |
| --- | --- |
| `design/cs-shell.jsx` | `SiteShell` (announcement bar, sticky header, mobile drawer, scroll progress, footer), `PageHero`, `ClosingPanel`, `useReveal`, `useHeaderMotion`, nav link tables |
| `design/cs-shell.css` | Shell CSS: hero, closing panel, drawer, burger, reveal animation, `.cs-wrap` / `.cs-section` / `.cs-soft` |
| `design/cs-pages.css` | Page-level section CSS shared across Home, Partnerships, Sponsors, Gallery, About, Contact |
| `design/cs-type.css` | Type scale variables (`--text-*`, `--track-*`, `--lh-*`, `--fw-*`) |

### Pages
| Page | Files |
| --- | --- |
| Home | `Home.html`, `home-app.jsx` |
| Event Catalog | `Events.html`, `events-app.jsx`, `events-data.js` |
| Pricing | `Pricing.html`, `pricing-app.jsx`, `pricing-data.js`, `vendor/motion.js` |
| For Apartment Communities | `Partnerships.html`, `partnerships-app.jsx` |
| Sponsor an Event | `Sponsors.html`, `sponsors-app.jsx` |
| Gallery | `Gallery.html`, `gallery-app.jsx` |
| About | `About.html`, `about-app.jsx` |
| Contact | `Contact.html`, `contact-app.jsx` |

### Design system
`design/_ds/community-spark-design-system-.../` is the Community Spark component bundle the prototypes load (`_ds_bundle.js` plus `styles.css` and `tokens/`). Components used across the site: `SiteHeader`, `SiteFooter`, `AnnouncementBar`, `Button`, `SectionHead`, `SectionLabel`, `Card`, `BrandMark`. Replace these with the codebase's equivalents; the bundle is readable JS if you need exact internals.

`tokens/*.css` at the top level is the same token set, pulled out for convenience — this is the file set to port verbatim.

### Assets
`design/images/photo-1.jpg` … `photo-7.jpg` — seven event photographs, used as hero backgrounds and gallery tiles. These are the client's own photos; carry them over and run them through the target codebase's image pipeline (they are unoptimized full-size JPEGs today). Every other graphic element (✦ spark glyph, arrows, ✕, ☰) is a text character, not an icon file.

---

## Global shell

Rendered by `SiteShell` on every page, in this order:

**1. Announcement bar** — full-width `--ink` strip, centered 12px Inter, `--gold-light` text: "Now booking fall and holiday 2026 events for apartment communities."

**2. Sticky header** (`position:sticky; top:0; z-index:90`) — `--paper` background, 1px `--line` bottom border, `--header-height` tall, padded `--header-pad-x`. Left: BrandMark (40px `--ink` circle with `--gold-light` ✦, Cormorant wordmark). Center: nav — Home · Events · Pricing · Communities · Sponsors · Gallery · About, 14px Inter, active item in `--gold`. Right: `Button variant="primary"` "Plan an Event" → `Contact.html`.

**3. Scroll progress** — 2px bar under the header, `linear-gradient(90deg,var(--gold),var(--gold-light))`, `transform: scaleX(scrollY / maxScroll)` from `origin 0 50%`, updated in a rAF-throttled scroll handler.

**4. Mobile drawer** — below 1024px the nav hides and a 42px ☰ pill appears at `top:15px; right:var(--header-pad-x)`. Opening slides in a `min(340px,86vw)` `--paper` panel from the right (`transform: translateX(100%) → none`, `.38s cubic-bezier(.22,1,.36,1)`) over a `--scrim-drawer` backdrop that fades in over `.3s`. Body scroll locks while open. The drawer uses the **long** nav labels — Home, Event Catalog, Pricing, For Apartment Communities, Sponsor an Event, Gallery, About & Contact — plus a full-width primary "Plan an Event" button. Closes on link click, backdrop click, and ✕.

**5. Footer** — three link columns:
- *Explore* — Event Catalog, Pricing, Gallery, About
- *Programs* — For Apartment Communities, Sponsor an Event, Custom Events, Budget-Based Events
- *Contact* — Griffin.newton@indycollab.com, (317) 354-5880, Submit an Inquiry

### `PageHero`
Full-bleed section, `padding: clamp(80px,10vw,132px) var(--hero-pad-x) clamp(70px,8vw,110px)`, white text, `overflow:hidden`.
- `.cs-hero-bg` — the photo, `position:absolute; inset:-8% 0; background-size:cover`. Parallax: on scroll, `translateY(progress × 70px) scale(1.12)` where `progress = clamp(scrollY / heroHeight, 0, 1)`.
- `.cs-hero-scrim` — `var(--overlay-hero)` over the photo.
- Content column, `max-width:820px`, `z-index:2`: eyebrow (`--text-eyebrow`, uppercase, `--track-eyebrow`, bold, `--gold-light`); h1 (Cormorant, `--text-h1`, semibold, `--lh-display`, `text-shadow:0 2px 24px rgba(0,0,0,.32)` — `<em>` inside renders italic `--gold-light`); lead (`--text-lead`, `rgba(255,255,255,.84)`, max 600px); actions row (flex, 14px gap, wraps); proof row (flex, `10px 30px` gap, each item a 10px `--gold-light` ✦ plus `--text-meta` `rgba(255,255,255,.72)` label).

### `ClosingPanel`
Ends every page. `--ink` card, `--r-lg`, `--shadow-lg`, `padding:44px 48px`, grid `1fr auto` with 48px gap, `align-items:end`. Left: gold-light uppercase label, Cormorant h2 `clamp(26px,3vw,38px)` capped at 22ch, body `rgba(255,255,255,.68)` capped at 60ch. Right: primary Button plus an optional underlined secondary link (`rgba(255,255,255,.6)`, → `--gold-light` on hover). Below 980px it stacks to one column, `padding:34px 28px`.

### Reveal animation
Any `[data-reveal]` element starts at `opacity:0; translateY(22px)` and transitions to visible over `.7s` (`cubic-bezier(.22,1,.36,1)` for opacity, `cubic-bezier(.34,1.28,.64,1)` for transform) when it enters the viewport (`top < vh−60`). A `[data-stagger]` parent reveals its children with a `0.06s × index` delay, capped at 10 steps. A 4s safety timer force-reveals anything still pending. `prefers-reduced-motion: reduce` shows everything immediately with no transition.

---

## Pages

Each page is `SiteShell` → `PageHero` → alternating `.cs-section` / `.cs-section.cs-soft` bands (`--cream` background) inside `.cs-wrap` (`max-width: var(--content-max)`) → `ClosingPanel`. Section bands lead with the design system's `SectionHead` (gold uppercase label + Cormorant title + muted body).

### 1. Home — `Home.html`
Hero on `photo-7.jpg`: eyebrow "Where connection begins", h1 "Resident events people will *genuinely* want to attend." (the emphasis is italic gold), lead about ready-to-book experiences across Indiana.

Then, in order:
- **Built for property teams** (`--cream`) — "Simple planning from inquiry to event day." A numbered process strip (`.cs-steps`, staggered reveal) from the `STEPS` array.
- **Featured experiences** — "Ready-to-book events without the cookie-cutter feel." Card grid from `FEATURES`, each linking into the catalog.
- **Transparent pricing** (`--cream`) — "Three starting points, published up front." Three-tier strip from `TIERS` (The Spark $800 / The Glow $1,250 / The Radiance $1,750+), each linking to Pricing.
- **Closing panel** — "Tell us the date and we'll take it from there." → "Plan an Event" / "Or browse the event catalog first".

### 2. Event Catalog — `Events.html`
Searchable, filterable list of preset event concepts from `events-data.js`.
- Search input filters on event name and description; a category pill row (`all` + each category) filters by type. Both are client-side and update instantly.
- Each result is a `CatalogCard` — collapsed it shows name, category, price-from, and a one-line summary; clicking expands it in place to reveal the full inclusions list and a "Book this event" CTA that deep-links to `Contact.html?intent=book&event=<name>` (a "Question about this" link uses `intent=question`).
- Empty state when no event matches the query.
- Closes with "Not seeing the right fit? — Request a fully custom event."

### 3. Pricing — `Pricing.html`
Three tiers from `pricing-data.js`, priced $800 / $1,250 / $1,750+, each with what's included, typical guest count, and add-on enhancements. The middle tier is visually featured (`--ink` fill, white text) with a gold "Most booked" tag. Below the tiers: an enhancements table, a what's-always-included band, and an FAQ.

This page loads `vendor/motion.js` (Motion One) via a module script that sets `window.Motion` and fires a `motion-ready` event, and `jspdf` from CDN for a downloadable pricing sheet. In a real codebase both should be replaced with the framework's own animation/PDF approach — check whether the PDF export is still wanted before porting it.

Closes with "Working with a set budget? — We can build the strongest event within your number."

### 4. For Apartment Communities — `Partnerships.html`
Hero on `photo-6.jpg`. Long-form pitch for property management teams: what Community Spark handles versus what the property provides, recurring-event options, and a responsibilities breakdown. Content-only — no interactive state.

### 5. Sponsor an Event — `Sponsors.html`
Hero on `photo-2.jpg`. Sponsorship levels rendered as `LevelCard`s in a grid; the featured level is an `--ink` card with white text and gold accents while the others are white on `--line` borders.

Below the levels, `SponsorForm` — a controlled form with fields: business name, contact name, email, phone, business type (select), website, service area, monthly reach (select), sponsorship level (select), frequency (select), whether they'd attend (select), and notes. Submitting sets `sent` state and swaps the form for a confirmation panel; there is no backend — wire this to the real endpoint.

### 6. Gallery — `Gallery.html`
Hero, then a photo grid of `photo-1` … `photo-6` with captions naming the event type. Purely presentational; the intent is a masonry-ish grid that stays legible at every width.

### 7. About — `About.html`
Hero on `photo-5.jpg`. Founder story, values list, and how the company works. Ends with a link to Contact.

### 8. Contact — `Contact.html`
`ContactForm` reads two query params on load:
- `?event=<name>` prefills the event field
- `?intent=book` vs `?intent=question` changes the form's framing (heading and submit label) — event cards link in with these

Fields include community name, contact, email, phone, event date, guest count, and a **budget select** whose options match the pricing tiers exactly: "$800 — The Spark", "$1,250 — The Glow", "$1,750+ — The Radiance", "Not sure yet — recommend something". Submitting shows an inline confirmation; no backend is wired.

---

## Interactions & behavior
- **Navigation** is plain page-to-page links (`Home.html`, `Events.html`, …). In a real app these become routes; keep the same information architecture and the same long/short label pairs (short in the desktop header, long in the mobile drawer and footer).
- **Reveal on scroll** — see the shell section. Every content block in every page carries `data-reveal`; card grids carry `data-stagger`.
- **Hero parallax** — background translates up to 70px and holds a `scale(1.12)` so it never shows an edge.
- **Scroll progress bar** — always visible under the header.
- **Forms** (Contact, Sponsors) are fully client-side today: controlled inputs, a `sent` boolean, and an inline confirmation. No validation beyond browser `required`. Real implementation needs field validation, a submit endpoint, spam protection, and an error state — none of which the prototype shows, so design those with the same visual language.
- **Motion** honors `prefers-reduced-motion: reduce` everywhere: reveals show instantly, and the parallax/progress handlers should be skipped.
- **Responsive** breakpoints: 1024px (nav → drawer), 980px (closing panel stacks), plus per-page grid collapses in `cs-pages.css`. Verify no horizontal scroll at 320px.

## State
Small and local. `SiteShell` holds `open` (drawer). Events holds `q` (search string), `cat` (active category), and per-card `open`. Sponsors and Contact each hold a form-values object plus `sent`. Nothing persists; nothing is fetched. All content is hard-coded arrays in the `*-data.js` and `*-app.jsx` files — in a real build these should become a content collection or CMS entries, especially `events-data.js` and `pricing-data.js`, which the client will want to edit without a deploy.

## Design tokens
Use `tokens/*.css` verbatim.
- **Colors** — ink `#1a1714`, paper `#fdfaf6`, cream `#f3ece0`, warm `#e8ddd0`, gold `#c49a3c`, gold-light `#e8c97a`, gold-dark `#9a7628`, plum `#4a2d3e`, sage `#6b7c5e`, muted `#7a7068`, line `rgba(26,23,20,.11)`; plus `--overlay-hero` and `--scrim-drawer`
- **Type** — display **Cormorant Garamond** (all headings and figures), UI **Inter** (everything else). Scale in `cs-type.css` / `tokens/typography.css`: `--text-h1`, `--text-lead`, `--text-body-lg`, `--text-body`, `--text-meta`, `--text-micro`, `--text-eyebrow`. Tracking: `--track-eyebrow`, `--track-section-label` (.22em), `--track-meta` (.1em). Weights `--fw-semibold`, `--fw-bold`. Line heights `--lh-display`, `--lh-tight`, `--lh-body`, `--lh-relaxed`
- **Radii** — sm 12, md 20, lg 28, pill 999
- **Layout** — `--content-max`, `--section-pad-y`, `--section-pad-x`, `--hero-pad-x`, `--header-height`, `--header-pad-x`
- **Elevation / motion** — `--shadow-lg`, `--shadow-gold`, `--ring-field`, `--ring-focus`, `--dur-base`, `--lift-btn`

## Known cleanup for the port
Worth fixing rather than faithfully reproducing:
1. **`Events.html` and `Pricing.html` don't use the shared shell.** They inline their own `<style>` block and `events-app.jsx` carries duplicate copies of `useHeaderMotion`, `MobileNav`, and the nav link tables. In the real codebase all eight pages should use one layout component.
2. **`Pricing.html` pulls jsPDF from a CDN** for a client-side PDF. Confirm this feature is still wanted; if so, generate it server-side or at build time instead.
3. **Images are unoptimized full-size JPEGs.** Use responsive `srcset` / the framework's image component.
4. **Forms have no backend.** Pick a form handler before implementation and design the validation and error states alongside it.
5. **Contact info is hard-coded in three places** (footer, About, Contact). Make it one config value.

## Relationship to the existing repo
`Breatht8king/Community-Spark` (branch `main`) holds the pre-redesign site — `index.html`, `events.html`, `pricing.html`, etc., with `styles.css`, `script.js`, `motion-effects.js`, and the same `images/` set. This handoff **replaces** that site's design; the repo is useful for the original copy and asset provenance, not as a starting structure. Mapping:

| This design | Repo file it replaces |
| --- | --- |
| Home.html | index.html |
| Events.html | events.html |
| Pricing.html | pricing.html |
| Partnerships.html | partnerships.html |
| Sponsors.html | sponsors.html |
| Gallery.html | gallery.html |
| About.html | about.html |
| Contact.html | contact.html |
