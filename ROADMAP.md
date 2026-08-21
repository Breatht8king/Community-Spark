# Community Spark — Roadmap

Living list of what's next. Update this file whenever priorities shift or something gets done — this is the source of truth across chat sessions, not just conversation history.

## Now
- [ ] Netlify free-tier usage cap hit (2026-08-20) — deploys/serving blocked until the monthly reset. Check Netlify dashboard → Billing → Usage for the exact reset date (tied to billing anniversary, may not be Sept 1). Plan: keep developing and committing to git normally, push queues up but won't go live until reset — no separate hosting needed for a static site with no build step.
- [x] Push new site design across all 8 pages (2026-08-20)
- [x] Fix Contact/Sponsor form confirmation — was resetting silently instead of showing a clear "sent" panel (2026-08-20)
- [ ] Visual QA pass on the redesign — mobile/tablet check across all 8 pages, nobody's actually looked yet
- [~] **Redesign port turned out to be a loose reimplementation, not a faithful port** (found 2026-08-20) — the "Push new site design" item above shipped different class names/structure/content hierarchy than the actual prototype (`Community Spark Website Redesign/design_handoff_website/`), not just a styling drift. Confirmed by comparing rendered prototype (screenshot) against live site. User asked for a proper page-by-page rebuild against the real prototype markup/CSS instead of a patch job.
  - Built `redesign-components.css` + `redesign-components.md` at repo root — a faithful CSS port of the prototype's shared component library (buttons, cards, hero, header/footer/drawer, forms, etc.), extracted directly from the prototype's `_ds_bundle.js`. Load this after `styles.css` on any page being rebuilt. The header/nav/footer/announcement bar/buttons were already faithful pre-existing — only the mobile drawer needed a real fix (wrong panel bg/padding, no exit animation, no active-page highlight); that fix is in the new file, reuses existing `script.js` hooks, no JS changes needed.
  - [x] Events page (`events.html`) rebuilt and user-approved (2026-08-20): removed the photo/emoji blocks (prototype has none), moved price to always-visible on the closed card (was hidden inside the expandable details — a real UX regression, not just styling), added the "Showing X of Y events" counter + Clear filters (prototype has these, live didn't), restyled the toggle to the prototype's circular +/– button, fixed category filter order to match prototype, replaced the dark `.budget-banner` sponsor callout with a white `.sponsor-note` card matching the prototype. Also fixed a real content bug found along the way: all 20 event cards were missing their description text entirely (dropped during the original port, not a redesign issue).
  - [ ] **Remaining pages, same treatment, in this order:** pricing.html, partnerships.html, sponsors.html, gallery.html, about.html, contact.html — each has its own page-specific components in the prototype (`*-app.jsx` per page, e.g. `PriceCard`/`PartnerCard`/`SponsorTier`/`GalleryItem`/`FounderCard`/`FaqItem`) that weren't captured by the shared `redesign-components.css` pass and need the same page-by-page read-prototype-then-rebuild treatment Events got. **Paused here per user ("looks good but stop now") — resume only when asked.**
  - Partnerships page was restructured more heavily than the others in the original port (old pricing-teaser/founder-teaser sections dropped) — re-check this against the prototype when partnerships.html gets its turn.
  - Contact form gained a 4th budget option ("Not sure yet — recommend something") — not from the prototype, was a judgment-call addition; revisit whether to keep when contact.html gets its turn.
  - Sponsors page: one contact link now points property managers to `partnerships.html` instead of `contact.html` — check against prototype when sponsors.html gets its turn.
- [x] Image optimization — photos now served as WebP with JPEG fallback + explicit width/height (2026-08-20). Actual win was ~23% smaller total image weight (876KB→~678KB for WebP-capable browsers) — the originals were already reasonably compressed, so this was a real but modest gain, not the dramatic one first estimated.

## Later — fix but not urgent
- [ ] Confirm Netlify email notifications are configured for form submissions (Site settings → Forms → Notifications) — submissions are landing in Netlify fine, just double-check the email-notify step is on

## Quote Calculator (internal tool, not yet built for real)
- [ ] Decide calc features to add: waste/buffer %, per-store delivery minimums, deposit/payment schedule, tax exemption handling
- [ ] Replace placeholder catalog pricing with real, verified current Costco/Sam's/BJ's/Amazon prices
- [ ] Decide where it lives (password-gated page on the main site vs. separate small deploy) — it's internal-only, no backend needed
- [ ] Decide on persistence beyond localStorage if more than one person needs to see/share quotes

## Low priority / skip unless it matters
- [ ] Site-wide type-scale "readability" bump from the redesign (body 15px→16px etc.) — real change, but touching it safely means a broad sweep of `styles.css`
- [ ] Gallery page: switch from the current masonry-column photo grid to the redesign's uniform grid — cosmetic only
- [ ] Pricing page "download as PDF" feature from the design prototype — would add a new CDN dependency (jsPDF), not currently on the live site

## Possible future automation (not started — revisit once the business has real volume)
- Scheduled bot to work through this roadmap autonomously (needs PR-review guardrails, not direct-to-main pushes)
- Scheduled bot to review the live site + named competitors and propose redesign/feature ideas
- Later, once there's real outreach volume: n8n-based automation for email follow-ups, property outreach, event ideation, P&L/pricing monitoring — decided to hold off on this until the business picks up (2026-08-20)
