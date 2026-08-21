# redesign-components.css — component reference

This documents every class in `redesign-components.css`, which is a faithful,
class-based port of the prototype's design-system bundle
(`_ds_bundle.js`, 30 `React.createElement` components) plus the SiteShell
patterns in `cs-shell.jsx`/`cs-shell.css` (page hero banner, closing CTA
panel, mobile drawer).

**Load order:** link this file after `styles.css`. It only adds the tokens
`styles.css` is missing (type scale, font-weight/line-height/tracking,
motion, extra radii, overlay gradients) — it never redeclares `--ink`,
`--paper`, `--gold`, `--line`, `--shadow-*`, or `--r-sm/md/lg`.

## Components already faithful — not redefined

Before porting anything, each of the 30 bundle components was checked
against the live `styles.css` value-by-value. These already match the
prototype's inline styles exactly (same padding/color/radius/type/motion)
under their **existing** class names, so the new file does not duplicate
them:

| Component | Existing live classes |
|---|---|
| Button | `.btn`, `.btn-primary`, `.btn-dark`, `.btn-outline`, `.btn-ghost`, `.btn-ink-ghost`, `.btn-sm` |
| Eyebrow | `.eyebrow` |
| SectionLabel | `.section-label` (+ `.section-dark .section-label` for the on-dark tone) |
| Hero (layout, full-viewport) | `.hero`, `.hero-bg`, `.hero-overlay`, `.hero-content`, `.hero-desc`, `.hero-actions`, `.hero-proof`, `.proof-item` |
| SectionHead | `.section-head` (split/two-column variant), `.section-center` (centered variant) |
| TrustBar | `.trust-bar`, `.trust-item` |
| AnnouncementBar | `.announcement` |
| BrandMark | `.brand`, `.mark`, `.brand-text` |
| SiteHeader | `header`, `nav a`, `.nav-cta` |
| SiteFooter | `footer`, `.footer-grid`, `.footer-brand`, `.footer-col`, `.footer-bottom`, `.footer-legal` |
| ClosingPanel (cs-shell.jsx) | `.closing-panel`, `.closing-label`, `.closing-action`, `.closing-link` |

Two hairline drifts were found in that set and are corrected in
`redesign-components.css` **without** touching the rules above:
- `.brand-text small` had `letter-spacing:.18em`; the prototype's
  `--track-nav-small` token is `.16em`. Fixed.
- `.trust-item span` had `letter-spacing:.12em`; the prototype's
  `--track-meta` token is `.1em`. Fixed.

Everything else below is either newly added (missing entirely) or
redefined under new, more explicit class names because the live site's
existing version used different structure/naming than the prototype
(this is the "loose reimplementation" drift the redesign is fixing).

---

## Navigation — mobile drawer (corrected)

The mobile drawer is the one navigation piece that genuinely drifted from
the prototype: wrong panel background, undersized/mispositioned close
button, no exit animation (old version just did `display:none`), no
current-page highlight, and the drawer's CTA rendered as the dark pill
`.nav-cta` instead of the prototype's full-width gold primary button.

The fix reuses the **same ids and classes `script.js` already wires up** —
`#mobileToggle`, `#mobileDrawer`, `#drawerBackdrop`, `#drawerClose`, and the
`.open` class `script.js` toggles on `#mobileDrawer` — so no JS changes are
required, only the HTML/CSS need to catch up in the later rebuild step.

```html
<button class="mobile-toggle" id="mobileToggle" aria-label="Open navigation" aria-expanded="false">☰</button>

<div class="mobile-drawer" id="mobileDrawer" aria-hidden="true">
  <div class="drawer-backdrop" id="drawerBackdrop"></div>
  <nav class="drawer-panel">
    <button class="drawer-close" id="drawerClose">✕</button>
    <a href="index.html" class="active">Home</a>
    <a href="events.html">Event Catalog</a>
    ...
    <a class="btn btn-primary" href="contact.html" style="width:100%;margin-top:16px">Plan an Event</a>
  </nav>
</div>
```

- **Variant:** the current page's link gets `class="active"` (gold text) —
  static, set server-side/per-page, no JS needed.
- **Interactive:** open/close is already handled by `script.js`
  (`openDrawer()`/`closeDrawer()` toggle `.open` on `#mobileDrawer` and lock
  body scroll). No new JS needed — only the CSS above needed correcting so
  the panel actually slides in/out with a matching background, shadow, and
  a real exit transition instead of an abrupt `display:none`.

## Layout — `.page-hero` (new — did not exist in styles.css)

The prototype has **two distinct hero treatments**: the full-viewport home
hero (`Hero.jsx`, already faithfully implemented as `.hero`) and a shorter
"page banner" hero (`cs-shell.jsx`'s `PageHero`, used at the top of every
interior page — Events, Pricing, Partnerships, Sponsors, Gallery, About,
Contact, Book). Only the first one existed in `styles.css`; `.page-hero` is
added fresh to cover the second.

```html
<section class="page-hero" id="pageHero">
  <div class="page-hero-bg" id="heroBg" style="background-image:url(images/events.jpg)"></div>
  <div class="page-hero-scrim"></div>
  <div class="page-hero-content">
    <p class="page-hero-eyebrow">Event Catalog</p>
    <h1>Twenty ready-to-book <em>experiences</em></h1>
    <p class="page-hero-lead">...</p>
    <div class="page-hero-actions"><a class="btn btn-primary" href="#catalog">Browse Events</a></div>
    <div class="page-hero-proof"><span><span>✦</span>20 preset events</span></div>
  </div>
</section>
```

- **Static.** The only JS behavior associated with this pattern in the
  prototype is a scroll-driven parallax on `.page-hero-bg` (translateY +
  scale as the user scrolls) and a header scroll-progress bar — both purely
  cosmetic enhancements, not required for the component to work correctly.

---

## Core

### Badge — `.badge`
```html
<span class="badge">Most Popular</span>
<span class="badge ink">Featured</span>
<span class="badge cream">New</span>
```
- **Variants:** `tone` prop → base `.badge` = gold tone (default); `.ink`;
  `.cream`.
- **Static**, decorative label.
- Replaces two ad hoc one-off rules the old live CSS had for the same
  visual pattern (`.price-card .badge` and `.gallery-badge`) — both are now
  just `.badge` (+ contextual placement rules under `.price-card .badge`
  and `.gallery-item .badge`).

---

## Forms

### Calendar — `.calendar`
```html
<div class="calendar">
  <div class="calendar-header">
    <button class="calendar-nav" id="calPrev">‹</button>
    <strong class="calendar-month">August 2026</strong>
    <button class="calendar-nav" id="calNext">›</button>
  </div>
  <div class="calendar-weekdays"><span>S</span>...<span>S</span></div>
  <div class="calendar-grid" id="calGrid">
    <span></span> <!-- empty leading cell -->
    <button class="calendar-day">1</button>
    <button class="calendar-day selected">2</button>
    <button class="calendar-day" disabled>3</button>
    ...
  </div>
</div>
```
- **Variants:** `.calendar-day.selected` (chosen date); `disabled`
  attribute (unavailable date, not a class — matches native `<button
  disabled>` semantics).
- **Interactive — needs JS:** clicking a `.calendar-day` must add
  `.selected` to it and remove `.selected` from any previously-selected day
  (script.js already does this exact pattern for `.cal-day`/`.time-slot`).
  The prev/next `.calendar-nav` buttons need JS to regenerate
  `.calendar-month` text and the day grid for the new month.

### FilterChip — `.filter-chip`
```html
<button class="filter-chip active">All</button>
<button class="filter-chip">Birthday</button>
```
- **Variant:** `.active` (currently-selected filter).
- **Interactive — needs JS:** click removes `.active` from sibling chips
  and adds it to the clicked one (script.js's existing `.filter-btn`
  handler is the same pattern — just repoint the class name/selector).

### FormField — `.form-field`
```html
<div class="form-field">
  <label class="form-field-label" for="name">Full name</label>
  <input class="form-field-control" id="name" type="text">
  <span class="form-field-help">We'll only use this to confirm your booking.</span>
</div>

<div class="form-field">
  <label class="form-field-label" for="notes">Notes</label>
  <textarea class="form-field-control" id="notes" rows="4"></textarea>
</div>
```
- **Variants:** `as` prop → `<input>`, `<select>`, or `<textarea>`, all use
  the same `.form-field-control` class (textarea additionally needs
  `resize:vertical;min-height:100px`, already built into the selector
  `textarea.form-field-control`). `help` text is optional
  (`.form-field-help`).
- **Static** apart from native `:focus` styling (gold border + ring) — no
  JS needed.

### SearchField — `.search-field`
```html
<div class="search-field">
  <span class="search-field-icon">⌕</span>
  <input class="search-field-input" placeholder="Search events…">
</div>
```
- **Static.** `:focus-within` on the wrapper handles the focus ring — no JS
  needed for styling. (Filtering the results as the user types is page
  logic, not a component-level behavior.)

### TimeSlot — `.time-slot`
```html
<button class="time-slot">10:00 AM</button>
<button class="time-slot selected">1:00 PM</button>
<button class="time-slot" disabled>4:00 PM</button>
```
- **Variants:** `.selected`; `disabled` attribute (native, strikethrough +
  40% opacity).
- **Interactive — needs JS:** same single-select pattern as Calendar — on
  click, clear `.selected` from siblings and add it to the clicked slot.

---

## Layout

### BudgetBanner — `.budget-banner`
```html
<div class="budget-banner">
  <div>
    <p class="section-label">Not sure what fits?</p>
    <h3>Tell us your budget, we'll build the event</h3>
    <p>Every package can flex up or down...</p>
  </div>
  <a class="btn btn-primary" href="contact.html">Start a Custom Quote</a>
</div>
```
- Reuses the existing `.section-label` class for the small label (contextual
  override `.budget-banner .section-label` dims it to `rgba(255,255,255,.6)`
  instead of the on-dark gold-light default).
- **Static**, decorative CTA banner.

### EstimateNotice — `.estimate-notice`
```html
<div class="estimate-notice">
  <p><strong class="estimate-notice-lead">Estimate only.</strong> Final pricing is confirmed after your consultation call.</p>
</div>
```
- **Static.**

---

## Cards

### AddonItem — `.addon-item`
```html
<div class="addon-item">
  <div>
    <span class="addon-item-name">Photo Booth</span>
    <span class="addon-item-desc">2-hour rental with props and digital gallery</span>
  </div>
  <div class="addon-item-controls">
    <select class="addon-item-qty">
      <option value="0">None</option>
      <option value="1">Add — $150</option>
    </select>
    <span class="addon-item-price">+$150</span>
  </div>
</div>
```
- **Interactive — needs JS:** the `<select>`'s `change` event should
  recompute the running total shown in the paired `.addon-total` (script.js
  already does this for `.addon-qty` selects — same pattern, new class
  name).

### AddonTotal — `.addon-total`
```html
<div class="addon-total">
  <span class="addon-total-label">Estimated add-on total<small class="addon-total-note">Planning estimate only. Final vendor quote required.</small></span>
  <span class="addon-total-amount">$450</span>
</div>
```
- Meant to sit as the last grid item inside a 2-column `.addon-item` grid
  (`grid-column:1/-1` spans both columns) — the grid wrapper itself is a
  page-level layout, not part of this component.
- **Interactive — needs JS:** `.addon-total-amount` text is recalculated
  whenever any `.addon-item-qty` changes (see AddonItem above).

### EventCard — `.event-card`
```html
<article class="event-card">
  <div class="event-card-image"><img src="..." alt="Birthday Bash"></div>
  <div class="event-card-body">
    <div class="event-card-meta"><span>Birthday</span><span class="event-card-duration">3 hours</span></div>
    <h3>Birthday Bash</h3>
    <p class="event-card-desc">...</p>
    <details class="event-card-details">
      <summary class="event-card-toggle">
        <span class="event-card-toggle-label-closed">View details &amp; pricing</span>
        <span class="event-card-toggle-label-open">Hide details</span>
        <span class="event-card-toggle-icon"></span>
      </summary>
      <div class="event-card-detail-content">
        <div class="event-card-facts">
          <div class="event-card-fact"><small>Capacity</small><strong>Up to 40</strong></div>
          <div class="event-card-fact"><small>Starting at</small><strong>$450</strong></div>
        </div>
        <div class="event-card-cols">
          <div class="event-card-col includes">
            <h4>Included</h4>
            <ul><li>Setup &amp; breakdown</li></ul>
          </div>
          <div class="event-card-col addons">
            <h4>Popular add-ons</h4>
            <ul><li>Photo booth</li></ul>
          </div>
        </div>
        <div class="event-card-price-note"><strong>Note:</strong> Final pricing confirmed at booking.</div>
        <div class="event-card-vendor-note">Requires an outside caterer.</div>
        <div class="event-card-actions">
          <a class="btn btn-primary btn-sm" href="book.html">Book This Event</a>
          <a class="btn btn-ink-ghost btn-sm" href="contact.html">Customize</a>
        </div>
      </div>
    </details>
  </div>
</article>
```
- **Variants:** `.event-card-col.includes` (✓ glyph, gold) vs
  `.event-card-col.addons` (+ glyph, sage) — either column is optional
  (only render the ones with content). `.event-card-price-note` and
  `.event-card-vendor-note` are both optional.
- **Static:** the hover lift/shadow on the whole card is pure CSS
  (`.event-card:hover`) — no JS needed.
- **Interactive — no JS strictly required:** built as a native
  `<details>/<summary>`, so open/close, the icon rotate+recolor, and the
  "View details & pricing" ↔ "Hide details" label swap are **all handled
  by CSS alone** via the `[open]` attribute selector and the two
  `.event-card-toggle-label-*` spans. The existing `script.js` pattern of
  closing every other open `.event-details` when one is opened (accordion
  exclusivity) is optional polish, not required for the component to work;
  keep it by listening for the native `toggle` event if that behavior is
  wanted (script.js already does this for `.event-details` and
  `.faq-item`).

### ExperienceCard — `.experience-card`
```html
<div class="experience-card">
  <div class="experience-card-num">01</div>
  <h3>We listen first</h3>
  <p>Every event starts with understanding your community...</p>
</div>
```
- **Static.**

### FaqItem — `.faq-item`
```html
<details class="faq-item">
  <summary class="faq-item-question">How far in advance should we book?</summary>
  <p class="faq-item-answer">Most communities book 6-8 weeks out...</p>
</details>
```
- **Variant:** add the `open` attribute to start expanded (maps to the
  bundle's `defaultOpen` prop).
- **Interactive — no JS required:** native `<details>` handles open/close
  and the `+`/`–` icon swap (via the `[open]` attribute selector) entirely
  in the browser. Optional: script.js can listen for the `toggle` event to
  close other `.faq-item`s for single-open-at-a-time behavior (it already
  does this).

### FeatureTile — `.feature-tile`
```html
<div class="feature-tile is-large">
  <img src="..." alt="Rooftop mixer">
  <div class="feature-tile-scrim"></div>
  <div class="feature-tile-copy">
    <span class="feature-tile-tag">Featured</span>
    <h3>Rooftop Summer Mixer</h3>
    <p class="feature-tile-body">A community favorite, rebooked every June.</p>
  </div>
</div>
```
- **Variant:** `.is-large` (spans 2 grid rows, larger heading). Needs an
  external grid wrapper from the page (e.g. a 1.4fr/.6fr, 2-row grid — the
  wrapper class itself, like the old `.feature-grid`, is page layout and
  outside this component's scope).
- **Static:** image zoom-on-hover is pure CSS (`.feature-tile:hover img`) —
  no JS needed.

### FounderCard — `.founder-card`
```html
<div class="founder-card">
  <div class="founder-card-profile">
    <div class="founder-card-initials">JD</div>
    <div class="founder-card-role">Founder</div>
    <div class="founder-card-name">Jane Doe</div>
  </div>
  <div class="founder-card-details">
    <p class="founder-card-bio">...</p>
    <ul class="founder-card-tags">
      <li class="founder-card-tag">Event planning</li>
      <li class="founder-card-tag">Community engagement</li>
    </ul>
  </div>
</div>
```
- **Static.**

### GalleryItem — `.gallery-item`
```html
<figure class="gallery-item is-tall">
  <img src="..." alt="Summer block party">
  <span class="badge ink">Featured</span>
  <figcaption class="gallery-item-caption">Summer Block Party, June 2026</figcaption>
</figure>
```
- **Variants:** `.is-tall` (340px vs the 260px default image height — maps
  to the bundle's `height` prop, which the prototype's own gallery page
  only overrides for the very first item). Optional `<span class="badge
  ink">` badge; optional `figcaption`.
- **Static:** image zoom-on-hover is pure CSS — no JS needed.

### PartnerCard — `.partner-card`
```html
<div class="partner-card"> <!-- default = "community" kind, sage accent -->
  <p class="section-label">For Communities</p>
  <h3>Bring Community Spark to your property</h3>
  <p class="partner-card-body">...</p>
  <ul class="partner-card-list"><li>Quarterly resident events</li></ul>
  <div class="partner-card-split">
    <div class="partner-card-split-block"><span>Funded by</span><strong>Property</strong></div>
    <div class="partner-card-split-block"><span>Residents pay</span><strong>$0</strong></div>
  </div>
  <div class="partner-card-note">Ask your property manager about partnering.</div>
  <div class="partner-card-action"><a class="btn btn-dark" href="contact.html">Get Started</a></div>
</div>

<div class="partner-card sponsor"> <!-- gold accent -->
  ...
</div>
```
- **Variant:** `kind` prop → base `.partner-card` = `community` (sage
  accent, default); `.sponsor` modifier switches every accent color to
  gold. All child blocks (`.partner-card-list`, `.partner-card-split-block`,
  `.partner-card-note`) are optional depending on content.
- **Static.**

### PolicyCard — `.policy-card`
```html
<div class="policy-card">
  <div class="policy-card-num">01</div>
  <h3>Booking &amp; Deposits</h3>
  <p>A <strong>50% deposit</strong> secures your date...</p>
</div>
```
- **Static.**

### PriceCard — `.price-card`
```html
<div class="price-card featured">
  <span class="badge">Most Popular</span>
  <div class="price-card-tier">Signature</div>
  <h3>The Gathering</h3>
  <div class="price-card-amount">$650<span class="price-card-amount-suffix">+</span></div>
  <p class="price-card-blurb">Full-service event for up to 75 guests.</p>
  <ul class="price-card-features">
    <li>4-hour rental</li>
    <li>Setup &amp; breakdown</li>
  </ul>
  <div class="price-card-action"><a class="btn btn-primary" style="width:100%" href="book.html">Book Now</a></div>
</div>
```
- **Variants:** `.featured` (dark card, lifted -14px, shadow-lg, gold-light
  accents instead of gold); optional `<span class="badge">` (auto-positioned
  via `.price-card .badge`); `amountSuffix` is optional
  (`.price-card-amount-suffix`).
- **Static** — no JS required.

### SponsorTier — `.sponsor-tier`
```html
<div class="sponsor-tier" style="--tier-accent:var(--gold)">
  <h4>Gold Sponsor</h4>
  <div class="sponsor-tier-level">$500 / event</div>
  <p>Top billing across all event materials.</p>
  <ul>
    <li>Logo on all signage</li>
    <li>Social media shoutout</li>
  </ul>
</div>
```
- **Variant:** `accent` prop → set via the `--tier-accent` CSS custom
  property on the element (defaults to `var(--sage)` if omitted). This
  covers the prototype's per-instance accent coloring without needing a
  fixed set of modifier classes.
- **Static.**

### StepCard — `.step-card`
```html
<!-- flat variant (default) — large 4-up "how it works" strip -->
<div class="step-card">
  <div class="step-card-num">1</div>
  <h3>Tell us your vision</h3>
  <p>Share your event goals and budget...</p>
</div>

<!-- bordered variant — compact 5-up process strip, custom accent -->
<div class="step-card is-bordered" style="--step-accent:var(--sage)">
  <div class="step-card-num">2</div>
  <h3>We propose options</h3>
  <p>...</p>
</div>
```
- **Variants:** `variant` prop → base `.step-card` = `flat` (default, larger
  padding/type, no border); `.is-bordered` = bordered (compact, white bg,
  colored top border). `accent` prop → `--step-accent` custom property
  (defaults to gold).
- **Static.**

---

## Summary of interactive (JS-needed) components

| Component | JS needed? | What to wire up |
|---|---|---|
| Mobile drawer | Already wired (`script.js`) | None — only the CSS above needed fixing |
| EventCard details | **No** (native `<details>`) | Optional: single-open accordion via the `toggle` event |
| FaqItem | **No** (native `<details>`) | Optional: single-open accordion via the `toggle` event |
| FeatureTile / GalleryItem hover zoom | **No** (`:hover`) | — |
| PriceCard / EventCard / FaqItem hover/border states | **No** (`:hover`, `[open]`) | — |
| FilterChip | **Yes** | Click → move `.active` to the clicked chip |
| TimeSlot | **Yes** | Click → move `.selected` to the clicked slot |
| Calendar day | **Yes** | Click → move `.selected`; prev/next → regenerate month grid |
| AddonItem / AddonTotal | **Yes** | `change` on `.addon-item-qty` → recompute `.addon-total-amount` |
| FormField / SearchField focus states | **No** (`:focus`, `:focus-within`) | — |
| SiteHeader nav active link | **No** | Static `.active`/`active` class set per page |

All of the "Yes" rows already have a working implementation to copy from in
the current `script.js` (`.filter-btn`, `.time-slot`, `.cal-day`,
`.addon-qty` handlers) — only the class names need to be repointed to the
new ones above when the HTML is rebuilt.
