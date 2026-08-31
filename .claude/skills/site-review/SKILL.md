---
name: site-review
description: Full sweep of the live Community Spark website for content, consistency, and accessibility issues — find, fix, and verify live. Use when the user asks to review the site again for improvements/fixes/inconsistencies, similar to a prior pass.
---

# Community Spark site review pass

A repeatable full-site audit of the 11 live pages (index, about, book, contact, events, gallery, partnerships, pricing, privacy, sponsors, 404) plus `styles.css`/`redesign-components.css`, looking for real bugs and drift — not a redesign, not a rewrite.

## What to check, every pass

- **Business-rule consistency** — site copy must show Community Spark performs the event itself (plans, sources, sets up, runs, and breaks down), never just "staffs" as the core service verb (this is a small/solo operation — "staffing" undersells and slightly misrepresents it). Reusable/durable equipment (bought once, reused across events) must never be described as a rental fee or per-event cost.
- **Cross-page copy consistency** — field label casing (Title Case, matching contact.html/book.html/sponsors.html), response-time language, CTA wording, nav text (desktop vs. mobile drawer), footer content — drift between pages that should say the same thing.
- **Accessibility** — redundant `alt`/visible-text pairs needing `aria-hidden` on the decorative half, missing ARIA labels on disabled/interactive controls, color tokens vs. hardcoded hex (should reference the CSS custom properties in `:root`, not repeat literal hex codes), keyboard-navigability gaps.
- **Broken or stale functionality** — anything that looks live but silently fails (forms, deep-linking, JS-driven UI state), stale references to retired infrastructure (e.g. a hosting provider or service the site no longer actually uses).
- **Accuracy against real business state** — dates, prices, claims about credentials/insurance/coverage that must not get ahead of what's actually true yet (check memory/ROADMAP.md for standing constraints before adding any such claim).

## Process

1. Read `ROADMAP.md` first — it's the living source of truth for what's already known-broken, what's intentionally deferred, and what NOT to add yet (e.g. liability-insurance language is explicitly blocked until the user confirms real coverage).
2. Sweep the pages — grep for known trouble patterns (`staff` as a verb, hardcoded hex colors, old hosting-provider references) and read through each page's diff-worthy sections.
3. Fix what's found. Small, targeted fixes — don't redesign anything not asked about.
4. Commit only if the user has asked for it this session (don't assume a prior "push everything" carries forward).
5. If already pushed, verify the fix is actually live — `curl` the production URL(s) directly rather than trusting that a push succeeded silently. Use a `Monitor`/polling loop if the deploy needs a moment to land, not a blind sleep.
6. Report back what was found and fixed, and update `ROADMAP.md` if anything found/fixed there is worth logging as done (matching the file's own existing pattern of dated, dashed entries).

## What NOT to do

Don't add scope beyond what a "review pass" implies — no new features, no visual redesign, no content additions the user hasn't asked for (see the liability-insurance and analytics constraints in memory before adding anything that sounds like a new claim or capability). Don't fabricate metrics, testimonials, or inventory claims to fill a gap — flag the gap instead.
