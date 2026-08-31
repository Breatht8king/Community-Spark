---
name: add-catalog-items
description: Add N new priced items to a category in the Event Quote Builder (quote-calculator.html) — real, sourced pricing only, no duplicates, matching the file's exact schema. Use when the user asks to add more items/products to the calculator's catalog.
---

# Add catalog items to the Event Quote Builder

Adds real, priced items to `quote-calculator/quote-calculator.html`'s `window.QB_FAMILIES` array — the shopping-list catalog behind Community Spark's internal quote calculator.

## Input

The user gives a count and one or more categories, e.g. "10 more items to each category" or "15 more drinks and decor". Valid category ids (`window.QB_CATEGORIES` in the file): `drinks`, `food`, `catering`, `decor`, `paper`, `prizes`, `addons`, `staffing`. "Equipment" means `staffing`. Treat `catering` as a separate ask if requested — it's restaurant-menu-sourced (30 restaurants via `QB_BRAND_CUISINE`), not store-sourced, so it doesn't fit this same per-store pricing flow; confirm scope with the user before including it.

## Process

1. **Read the current state of the target category(ies)** in the file: `window.QB_STORES` (7 stores, in this exact order — `costco, bjs, sams, amazon, kroger, meijer, walmart`), the `P(costco,bjs,sams,amazon,kroger,meijer,walmart)` helper, and every existing family in that category (grep `cat: 'drinks'` etc.) — collect the full list of existing item names/ids so new items don't duplicate them conceptually, not just by exact id string.

2. **For each category being expanded, research and write real items.** For anything more than ~10 items across more than one category, delegate to one background `Agent` per category (this parallelizes real web research, which is the slow part) — otherwise do it inline. Brief each agent with:
   - The business context: Community Spark runs resident events for apartment communities, ~65 guests typical.
   - The exact schema, shown via 2-3 real examples read straight from the file (don't paraphrase it — have the agent Read the actual lines).
   - The full existing-item list for that category, so it doesn't duplicate concepts.
   - The **strict pricing rule**: never fabricate or estimate a "plausible" price. Use WebSearch/WebFetch to find real, current prices on costco.com, samsclub.com, bjs.com, amazon.com, kroger.com, meijer.com, or walmart.com. If a store's price can't be verified, use `null` for that store — this is normal and expected, most items only need 1-3 stores filled in. A guessed number that looks plausible is worse than an honest null since it can slip into a real client quote unnoticed. If a secondary/price-tracking site is used instead of the retailer's own page, flag it as "likely-accurate, not primary-source-verified" in the notes.
   - **Two syntax traps that have bitten every research round so far** — call these out explicitly:
     - These are plain JavaScript string literals inside a `<script>` tag, **not HTML** — never write `&amp;` for an ampersand, always a literal `&`. Agents default to HTML-escaping out of habit; it must be caught and fixed before insertion.
     - An apostrophe inside a single-quoted string needs escaping (`'Valentine\'s Day'`) or the whole string needs double quotes instead — either is fine, just don't let it break.
   - Output format: a fenced `js` code block of exactly N object literals, 2-space indented, matching the file's style, preceded by a one-line `// -- <Category> (added <date>)` comment. Ask for `prices: P(...)` calls with all 7 args passed positionally (explicit `null` for unverified stores, not omitted trailing args) — this isn't strictly required (the file already has some shorthand calls that omit trailing args, which work fine since JS just leaves them `undefined`), but explicit is clearer to read back later.
   - Each item needs a unique `id` (short, all-lowercase, no camelCase — matches the file's convention), a `variants` array with at least one entry (`[{ id: 'std', name: '' }]` if there's no real variant), and at least one `packs` entry.
   - **Name items by their actual brand, not a generic category description** — e.g. `'A&W Root Beer'`, not `'Root beer'`; `'Bush's Baked Beans'`, not `'Baked beans, bulk can'` — matching the convention the original file already used for Coca-Cola/Pepsi. Only stay generic when a single pack genuinely has no identifiable brand behind the sourced price, or when different pack options in the same family are priced from different, unrelated brands (e.g. a "paper bowls" family with a Dixie pack and a Chinet pack) — picking one brand there would misrepresent the others.

3. **Before inserting, fix what agents get wrong.** Every round so far has needed: `&amp;` → `&` fixes, and occasionally `P(x)` calls with fewer than 7 positional args (harmless but inconsistent with the file's dominant style — pad with `null` for consistency if you want, not required for correctness). Scan each returned block for both before writing it into the file.

4. **Insert each category's block** right before that category's next-section comment (e.g. new Décor items go right after the last existing `cat: 'decor'` item and before `// -- Paper & Serving`). Use a dated comment header like the agent's, e.g. `// -- Drinks (added YYYY-MM-DD)` (append `, round 2` etc. if this is a repeat pass same-day).

5. **Verify before reporting done — every time, no exceptions:**
   - Grep the whole file for `&amp;` — must return zero matches.
   - Extract the plain-JS `<script>` block containing `QB_FAMILIES` (find the `<script>`/`</script>` pair that contains it — it moves as the file grows) into a temp file and run `node --check` on it.
   - Actually execute it with a stub `global.window = {}` and `require()` it, then check `window.QB_FAMILIES.length` and confirm `ids.filter((id,i) => ids.indexOf(id) !== i)` is empty (no duplicate family ids across the *entire* catalog, not just the new batch).

6. **Report back**: a per-category table of item name → best (lowest verified) price found, with store + pack size — this is the fastest way for the user to sanity-check the batch. Flag any item that came back with zero verified prices (still valid — it's an honest null, same convention as existing Sam's/BJ's-only-null items — but worth surfacing) and any category where most/all prices came from only one store (a research-coverage gap worth knowing about, not a defect).

## What NOT to do

Don't touch `catering` without confirming scope first (different schema shape entirely — restaurant/brand + cuisine + subcategory). Don't invent a plausible-sounding price anywhere. Don't skip the post-insertion syntax/duplicate check even if the diff looks obviously fine — it hasn't been, twice now.
