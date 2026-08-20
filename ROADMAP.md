# Community Spark — Roadmap

Living list of what's next. Update this file whenever priorities shift or something gets done — this is the source of truth across chat sessions, not just conversation history.

## Now
- [x] Push new site design across all 8 pages (2026-08-20)
- [x] Fix Contact/Sponsor form confirmation — was resetting silently instead of showing a clear "sent" panel (2026-08-20)
- [ ] Visual QA pass on the redesign — mobile/tablet check across all 8 pages, nobody's actually looked yet
- [~] Content items from the redesign port — treated as accepted-as-is per a general "yes" (2026-08-20), not individually confirmed, revisit if something looks off:
  - Partnerships page was restructured more heavily than the others (old pricing-teaser/founder-teaser sections dropped)
  - Contact form gained a 4th budget option ("Not sure yet — recommend something")
  - Sponsors page: one contact link now points property managers to `partnerships.html` instead of `contact.html`
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
