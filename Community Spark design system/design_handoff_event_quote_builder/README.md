# Handoff: Event Quote Builder (Community Spark)

## Overview
Internal desktop tool for pricing a community event. The user builds a line-item list by category, each line prices itself at the cheapest allowed warehouse (Costco / BJ's / Sam's Club / Amazon), and the tool shows total cost, cost per guest, what the client is charged, profit and margin. It also produces a per-store shopping list, a client-facing printable quote, a CSV export, and saved/duplicable quotes.

Not part of the public Community Spark website — a standalone internal tool that matches the site's visual system.

## About the design files
The files in `design/` are **design references written in HTML + React (Babel in the browser)**. They are prototypes showing intended look and behavior — not production code to ship. The task is to **recreate this design in the target codebase** (React/Next, Vue, etc.) using that codebase's own patterns, state management, and build tooling. If no codebase exists yet, React + Vite + TypeScript is the natural target; keep the token CSS files as-is and style against the CSS custom properties.

## Fidelity
**High fidelity.** Colors, typography, spacing, radii, and interaction states are final. Recreate pixel-for-pixel using the tokens in `tokens/`. All values in the prototype come from `var(--*)` custom properties — carry those variables over rather than hard-coding hexes.

## Files
- `design/Quote Builder.html` — page shell: token stylesheet links, global CSS, all layout/grid/breakpoint CSS, print rules
- `design/quote-app.jsx` — top summary bar, line rows, category sections, totals band, right-hand rail, CSV export, save/load/duplicate/rename
- `design/quote-parts.jsx` — pricing math (`qbBest`, `qbLineCalc`), drill-down item picker modal, per-store shopping list, saved-quotes list, print sheet, number input
- `design/quote-data.js` — placeholder catalog tree + flattening logic + sample quote
- `tokens/*.css` — Community Spark design tokens (colors, typography, spacing, elevation, motion, fonts)

Note: the prototype also loads `_ds/…/_ds_bundle.js`, the Community Spark component bundle. Only three components are used: `Button` (variants `primary`, `inkGhost`, sizes `md`/`sm`), `SectionLabel` (gold uppercase eyebrow with a 20px rule), and `BrandMark` (circle ✦ + wordmark). Replace with the codebase's equivalents; specs below.

---

## Data model

### Catalog (tree → flattened)
```
Family   { id, cat, name, unit, perGuest, variants[], packs[] }
Variant  { id, name, only?: packId[], delta?: number }   // delta shifts price for that variant
Pack     { id, label, per, prices?: {costco,bjs,sams,amazon}, flat?: number }
```
Flatten to one priced record per (family × variant × pack), skipping variants restricted by `only`:
```
Item { id:"family.variant.pack", cat, family, variant, pack,
       name:"Coca-Cola · Cherry — 24 pack · 12 oz cans",
       short:"Coca-Cola · Cherry", packLabel:"24 pack · 12 oz cans",
       unit:"can", per:24, perGuest:1.5,
       prices:{costco:16.59,bjs:16.59,sams:16.08,amazon:20.55}, flat:null }
```
`prices[store] = pack.prices[store] + (variant.delta || 0)`, `null` when that store doesn't carry it.
`flat` (staffing/rentals) means an in-house rate; store prices are not applicable.

### Line
```
Line { id, cat, item /* item id */, packs /* integer ≥ 1 */, store: 'best' | storeKey, note: string }
```

### Pricing rules (`qbLineCalc(line, allowedStores)`)
1. `flat != null` → `store = 'inhouse'`, `unitPrice = item.flat`.
2. Otherwise `best` = lowest non-null price **among allowed stores**; if no allowed store carries the item, fall back to the cheapest of any store.
3. If `line.store` is not `'best'`, is in `allowed`, and has a price → use it; else use `best.store`.
4. `units = packs × item.per`; `price = packs × unitPrice`; `perUnit = price / units`.

### Totals
```
goods   = Σ line.price
tax     = goods × taxPct/100
cost    = goods + tax + delivery
profit  = charge − cost
margin  = charge > 0 ? profit/charge × 100 : 0
markup  = cost   > 0 ? profit/cost   × 100 : 0
perGuest= guests > 0 ? cost/guests : null
"to target" = cost / (1 − target/100) − charge
```

### Persisted state (localStorage key `cs-event-quote-builder-v1`)
`{ lines, name, guests, charge, taxPct, delivery, target, saved, allowed }`. Defaults: `guests 60`, `taxPct 7`, `delivery 0`, `target 35`, `charge 0`, `allowed` = all four stores. Saved quotes cap at 12, newest first.

---

## Screens / views

### 1. Header (72px)
`--header-height` tall, `--paper` background, 1px `--line` bottom border. Left: BrandMark (40px ink circle, `--gold-light` ✦ glyph at 20px Cormorant; wordmark 17px Cormorant bold; sub-label "INTERNAL TOOLS" 9px Inter uppercase, `--track-nav-small`, `--muted`). Right: "EVENT QUOTE BUILDER" — 10px Inter bold uppercase, `--track-section-label`, `--muted`. Both inside the 1680px `.qb-wrap` container.

### 2. Sticky summary bar
`position:sticky; top:0; z-index:60`, background `--ink`, white text, 18px vertical padding. Five stat cells in a flex row, `gap: clamp(20px,4vw,54px)`, each after the first preceded by a 1px `rgba(255,255,255,.16)` left border and matching left padding:

| Label | Value |
| --- | --- |
| TOTAL COST | `$0.00` |
| PER GUEST | cost/guests or `—` |
| CHARGING CLIENT | charge |
| PROFIT | profit (can be negative) |
| MARGIN | `12.4%` or `—` |

Labels: 10px Inter bold uppercase `--track-section-label`, color `--gold-light`. Values: 27px Cormorant Garamond bold, line-height 1. When `charge > 0 && margin < target`, a pill pushes to the far right (`margin-left:auto`): "Below your 35% target", 12px, `--gold-light`, 1px `rgba(232,201,122,.4)` border, `--r-pill`, 7px/14px padding.

### 3. Builder (main column)
Page grid `.qb-grid`: `minmax(0,1fr) 344px`, gap `clamp(36px,4vw,60px)`, `align-items:start`; collapses to one column below 1080px. Page padding `44px clamp(20px,3vw,52px) 90px`.

**Heading block** — SectionLabel "THIS EVENT"; h1 "Build the quote" `clamp(30px,4vw,44px)` Cormorant semibold, line-height 1.15; sub-copy 15px Inter `--muted`, line-height 1.6, max 46ch. Right side: two `inkGhost` sm buttons — "Load sample lines", "Clear all".

**Column header** (`.qb-head`) — 10px uppercase `--muted`, 12px side padding, 1px `--line` bottom border: Item · Packs · Per pack · Units · Per unit · Priced at · Cost · (blank).

**Category section** (all 8 always shown, even when empty)
- Header row: 18px/12px/10px padding; h2 21px Cormorant semibold; inline gold link-button "+ Add drinks" / "+ Add another" (12px Inter bold uppercase, `--track-meta`, `--gold-dark`); right-aligned subtotal (14px semibold) or `—` in `--muted` when empty. Bottom border is 1px `--ink` when the category has lines, else 1px `--line`.
- Categories in order: Drinks, Food, Catering, Décor, Paper & Serving, Prizes & Giveaways, Add-Ons, Staffing & Equipment Rental.

**Line row** (`.qb-line` > `.qb-row`), grid `minmax(0,1fr) 84px 104px 116px 96px 180px 116px 30px`, gap 16px, padding 14px/12px, `--r-sm` radius, hover background `--cream` (200ms), 1px `--line` between adjacent lines:
1. Item — `short` name 14px semibold; below it `packLabel` 12px `--muted` and a gold "+ Note" / "Note added" / "Hide note" toggle
2. Packs — number stepper, 84px wide, centered
3. Per pack — `$15.48` 14px with "/ pack" 12px `--muted` beneath, right-aligned
4. Units — `96 cans` (count in `--ink`, unit word in `--muted`), right-aligned
5. Per unit — `$0.65`, 14px `--muted`, right-aligned
6. Priced at — pill select (`--r-pill`, white, 12px): "Best · Sam's Club" first, then each allowed store carrying the item with its price. Flat items show plain text "In-house rate".
7. Cost — line total, 15px semibold, right-aligned
8. ✕ remove — 28px circle, 1px `--line`, `--muted`, 11px glyph

Note field, when open: full-width input below the row, 12px left/right inset, `--cream` background, 1px `--line`, `--r-sm`, placeholder "e.g. cherry flavor only, deliver Friday".

**Number input** (shared): flex pill, `--r-sm`, background `--cream` → `#fff` on focus, border `--line` → `--gold` on focus plus `--ring-field`; optional `$` prefix / `%`/`pk` suffix in `--muted`; native spinners hidden; input 14px semibold, min-height 38px.

### 4. Totals band (`.qb-totals`)
Grid `minmax(0,1fr) auto`, 1px `--line`, `--r-md`, `overflow:hidden`, background `--cream`, 30px top margin. Stacks to one column below 900px.
- Left `.qb-totals-parts`: 3 equal columns, padding `24px clamp(20px,2.5vw,30px)`, gap `clamp(18px,3vw,34px)`, each subsequent column with a 1px `--line` left border + matching left padding. Each: 10px uppercase `--muted` label, 26px Cormorant semibold value, 12px `--muted` qualifier — "Items subtotal / N lines", "Tax / 7% of items", "Delivery & fees / flat add-on".
- Right `.qb-totals-sum`: `--ink` panel, min-width 280px, padding `24px clamp(24px,3vw,40px)`, centered column: "TOTAL EVENT COST" label in `--gold-light`, value `clamp(32px,3.4vw,42px)` Cormorant bold white, then "$4.12 per guest · 60 guests" 12px `rgba(255,255,255,.6)`.
- Below 520px the three parts stack and lose their dividers.

### 5. Shopping list by store
Heading "Shopping list by store" 24px Cormorant semibold + "N stops" 12px `--muted`. Cards in `repeat(auto-fit,minmax(280px,1fr))`, gap 16px. One card per allowed store that actually wins a line, plus an "In-house / rentals" card for flat items. Card: white, 1px `--line`, `--r-md`, 20px/22px padding; header row = store name 19px Cormorant semibold + store subtotal, separated by a 1px `--ink` bottom border; then rows `3× Coca-Cola · Cherry · 24 pack · 12 oz cans` with the line cost right-aligned in `--muted`. Renders nothing when the quote is empty.

### 6. Right rail (`.qb-rail`)
`position:sticky; top: header + 34px`, flex column, gap 20px. Static below 1080px. Three stacked blocks:

**Card A — "THE NUMBERS"** (white, 1px `--line`, `--r-md`, 24px padding, 18px gap)
- "Shopping at" + helper "Only these stores are priced": four toggle pills (Costco, BJ's, Sam's Club, Amazon). On = `--ink` fill, white text, `--ink` border; off = transparent, `--muted` text, `--line` border. At least one must stay on.
- 1px `--line` divider.
- Rows of `label · control` (label 14px `--ink`, optional 12px `--muted` helper under it): Guest count (84px stepper) — then a full-width `inkGhost` sm button "Scale quantities to 60 guests" which sets each line's packs to `ceil(guests × item.perGuest / item.per)`, min 1, skipping items with `perGuest = 0`.
- Divider. Charging the client (`$`, 116px), Tax (`%`, 90px, step 0.25), Delivery & fees (`$`, 116px), Target margin (`%`, 90px).
- Divider. Two stats side by side: "PROFIT" and "MARGIN" (26px Cormorant bold), margin cell carries "markup 48.2%" beneath in 12px `--muted`.
- When under target: "$412.50 more gets you to 35%." 12px `--gold-dark`.

**Card B — "THIS QUOTE"** — event-name text input (`--cream`, `--r-sm`); primary sm "Save quote" (disabled with no lines); `inkGhost` "Print client quote" (`window.print()`); `inkGhost` "Export to Excel (CSV)".

**Block C — "SAVED QUOTES"** — gold uppercase label; empty copy "No saved quotes yet. Save one and it stays on this device."; otherwise cards (white, `--r-md`, 14px/16px) with name + date, a meta row "Cost … Charged … Margin …" (12px `--muted`), and four underlined text actions: **Load** (gold, bold), **Duplicate**, **Rename**, **Delete** (`--muted`). Rename swaps the title for an inline input with a gold border; Enter or "Save" commits. Duplicate appends " (copy)" and today's date.

### 7. Item picker modal (drill-down)
Fixed overlay, `--scrim-drawer` backdrop (click to dismiss), Escape closes. Panel `min(880px,100%)`, max-height 86vh, `--paper`, `--r-lg`, `--shadow-lg`, header + scrolling body.

Header: breadcrumb of 10px gold/muted uppercase segments — `DRINKS / COCA-COLA / CHERRY` (line-height 1.5, wraps safely); h2 changes per step — "What are you adding?" → "Which one?" → "Pick a pack size"; "← Back" pill (only past step 1) and ✕ close, both 38px `--r-pill`.

- **Step 1 — family**: search pill (autofocus) filtering on family + variant names; cards in `repeat(auto-fill,minmax(240px,1fr))`, gap 12px. Card: white, 1px `--line`, `--r-md`, 16px/18px; family name 15px semibold; meta "4 options · 3 pack sizes · from $8.28"; hover lifts 2px and borders gold.
- **Step 2 — variant** (skipped when a family has ≤1 named variant): pill buttons, 44px min-height, `white-space:nowrap`, `--r-pill`, hover gold border + white fill.
- **Step 3 — pack size**: one card per pack (this is the "one button per size" rule). Card header: `packLabel` 17px semibold + "24 cans per pack · $0.69 per can"; right side pack-count stepper (`pk` suffix) and a primary sm "Add to quote" that becomes `inkGhost` "Added 3" after use (modal stays open for multi-add). Under a 1px `--line` divider: one price chip per allowed store carrying that pack — `--cream` pill with store name and price; the cheapest chip is `--ink` filled, white, with a small `--gold-light` "BEST" tag. Flat items instead read "**$140.00** in-house rate, per pack".

### 8. Print sheet (client-facing)
Hidden on screen; `@media print` hides the app and shows this, `@page { margin: 0.75in }`. Header: "COMMUNITY SPARK · EVENT QUOTE" gold-dark eyebrow, event name 34px Cormorant, right column with today's date and guest count, 2px `--ink` rule beneath. Then per category: uppercase category label, one row per line with the full item name (plus italic note in `--muted`) and the quantity in units, hairline separated. Footer: 2px `--ink` rule, "Total" 22px Cormorant and the **charge** amount 30px Cormorant bold, then terms: "Quote includes planning, sourcing, setup, and teardown as listed. Valid 30 days. Final counts confirmed one week before the event." **Cost, margin, per-store pricing, and profit never appear here.**

### 9. CSV export
Filename = slugified event name (fallback `event-quote.csv`), UTF-8 BOM, CRLF rows. Columns: Category, Item, Pack size, Packs, Units, Unit, Priced at, Price per pack, Line cost, Note — lines ordered by category. Then a blank row and summary rows: Guests, Items subtotal, Tax N%, Delivery & fees, Total cost, Cost per guest, Charging client, Profit, Margin.

---

## Interactions & behavior
- Adding: category "+ Add" → picker → Add to quote appends a line with `store:'best'`; modal stays open so several sizes/flavors can be added in one visit.
- Changing packs, store, tax, delivery, charge, guests, or allowed stores recomputes everything immediately — no submit step.
- Turning a store off re-prices every line that was using it (falls back to the best remaining store) and removes its shopping-list card.
- "Clear all" empties lines and resets charge, delivery, and event name (guests, tax, target and saved quotes are kept).
- "Load sample lines" fills a ~12-line demo quote.
- Everything persists to localStorage on every change and rehydrates on load.
- Transitions: `--dur-base` on button/border/background changes; picker cards lift `translateY(-2px)`; no entrance animations.
- Responsive: rail drops under the builder at 1080px; the line row hides Per unit below 1140px, Priced at below 940px, and collapses to a 3-column stack at 820px so Cost and remove stay visible. No horizontal page scroll at any width.

## State
`lines[]`, `name`, `guests`, `charge`, `taxPct`, `delivery`, `target`, `allowed[]`, `saved[]`, `picker` (open category or null); per-line local `noteOpen`; per-modal local `family`, `variant`, `packs{}`, `added{}`, `query`.

## Design tokens
Use `tokens/*.css` verbatim. Key values:
- Colors: ink `#1a1714`, paper `#fdfaf6`, cream `#f3ece0`, warm `#e8ddd0`, gold `#c49a3c`, gold-light `#e8c97a`, gold-dark `#9a7628`, plum `#4a2d3e`, sage `#6b7c5e`, muted `#7a7068`, line `rgba(26,23,20,.11)`
- Type: display **Cormorant Garamond** (headings, all money figures), UI **Inter** (everything else); sizes 10/12/13/14/15/17/19/21/24/26/27 px as noted per element; uppercase tracking `.22em` for micro-labels, `.1em` for meta
- Radii: sm 12, md 20, lg 28, pill 999
- Spacing: 4-point-ish scale in `spacing.css`; container 1680px, page padding `clamp(20px,3vw,52px)`
- Elevation/motion: `--shadow-lg`, `--ring-field`, `--ring-focus`, `--dur-base`, `--lift-btn`

## Components to map
| Prototype | Spec |
| --- | --- |
| `Button` primary | gold fill, white text, 2px gold border, `--r-pill`, min-height 50 (sm 40), 14px (sm 13) Inter bold; hover `--gold-dark` + lift + `--shadow-gold` |
| `Button` inkGhost | transparent, `--ink` text, 2px `--line` border; hover `--ink` border + `--cream` fill |
| `SectionLabel` | 10px Inter bold uppercase, `--track-section-label`, `--gold`, preceded by a 20×1px rule |
| `BrandMark` | 40px `--ink` circle with `--gold-light` ✦; Cormorant wordmark + 9px uppercase tagline |

## Assets
None. The ✦ brand glyph, ⌕ search glyph, and ✕ are text characters. The catalog in `quote-data.js` is **placeholder data with realistic naming and prices** — replace with real pricing before use.
