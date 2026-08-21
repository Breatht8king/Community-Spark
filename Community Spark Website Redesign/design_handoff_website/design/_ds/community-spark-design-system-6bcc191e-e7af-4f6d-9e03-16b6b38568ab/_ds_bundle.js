/* @ds-bundle: {"format":4,"namespace":"CommunitySparkDesignSystem_6bcc19","components":[{"name":"AddonItem","sourcePath":"components/cards/AddonItem.jsx"},{"name":"AddonTotal","sourcePath":"components/cards/AddonTotal.jsx"},{"name":"EventCard","sourcePath":"components/cards/EventCard.jsx"},{"name":"ExperienceCard","sourcePath":"components/cards/ExperienceCard.jsx"},{"name":"FaqItem","sourcePath":"components/cards/FaqItem.jsx"},{"name":"FeatureTile","sourcePath":"components/cards/FeatureTile.jsx"},{"name":"FounderCard","sourcePath":"components/cards/FounderCard.jsx"},{"name":"GalleryItem","sourcePath":"components/cards/GalleryItem.jsx"},{"name":"PartnerCard","sourcePath":"components/cards/PartnerCard.jsx"},{"name":"PolicyCard","sourcePath":"components/cards/PolicyCard.jsx"},{"name":"PriceCard","sourcePath":"components/cards/PriceCard.jsx"},{"name":"SponsorTier","sourcePath":"components/cards/SponsorTier.jsx"},{"name":"StepCard","sourcePath":"components/cards/StepCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"SectionLabel","sourcePath":"components/core/SectionLabel.jsx"},{"name":"Calendar","sourcePath":"components/forms/Calendar.jsx"},{"name":"FilterChip","sourcePath":"components/forms/FilterChip.jsx"},{"name":"FormField","sourcePath":"components/forms/FormField.jsx"},{"name":"SearchField","sourcePath":"components/forms/SearchField.jsx"},{"name":"TimeSlot","sourcePath":"components/forms/TimeSlot.jsx"},{"name":"BudgetBanner","sourcePath":"components/layout/BudgetBanner.jsx"},{"name":"EstimateNotice","sourcePath":"components/layout/EstimateNotice.jsx"},{"name":"Hero","sourcePath":"components/layout/Hero.jsx"},{"name":"SectionHead","sourcePath":"components/layout/SectionHead.jsx"},{"name":"TrustBar","sourcePath":"components/layout/TrustBar.jsx"},{"name":"AnnouncementBar","sourcePath":"components/navigation/AnnouncementBar.jsx"},{"name":"BrandMark","sourcePath":"components/navigation/BrandMark.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"}],"sourceHashes":{"components/cards/AddonItem.jsx":"c53ff2b1b8be","components/cards/AddonTotal.jsx":"673d46e74c32","components/cards/EventCard.jsx":"738db3a1227a","components/cards/ExperienceCard.jsx":"93cd1523b06b","components/cards/FaqItem.jsx":"be74fd971222","components/cards/FeatureTile.jsx":"83161a828fb6","components/cards/FounderCard.jsx":"269ff8b7c6ab","components/cards/GalleryItem.jsx":"042b084be2ef","components/cards/PartnerCard.jsx":"fa00ed103906","components/cards/PolicyCard.jsx":"8c60f83d66d8","components/cards/PriceCard.jsx":"22761876a63f","components/cards/SponsorTier.jsx":"f6dac5ebfd74","components/cards/StepCard.jsx":"8ce726b8a4d2","components/core/Badge.jsx":"573ef4cec3c3","components/core/Button.jsx":"2d601655ea40","components/core/Eyebrow.jsx":"0982c3c8b620","components/core/SectionLabel.jsx":"b0e44a6397cd","components/forms/Calendar.jsx":"1531da4b2084","components/forms/FilterChip.jsx":"0523b2c6c9a2","components/forms/FormField.jsx":"037d1373fade","components/forms/SearchField.jsx":"3d599ab72095","components/forms/TimeSlot.jsx":"cfdc4e1a4cdb","components/layout/BudgetBanner.jsx":"450e7fd536d3","components/layout/EstimateNotice.jsx":"b47d1587bea3","components/layout/Hero.jsx":"a56e49555b74","components/layout/SectionHead.jsx":"d144122048cc","components/layout/TrustBar.jsx":"12209461c110","components/navigation/AnnouncementBar.jsx":"5044e24c239d","components/navigation/BrandMark.jsx":"5d257785f992","components/navigation/SiteFooter.jsx":"3917b9f18d32","components/navigation/SiteHeader.jsx":"376a9e734f45"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CommunitySparkDesignSystem_6bcc19 = window.CommunitySparkDesignSystem_6bcc19 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/AddonItem.jsx
try { (() => {
function AddonItem({
  name,
  description,
  price,
  options = [],
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: '16px',
      alignItems: 'center',
      padding: '20px',
      background: '#fff',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-md)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--text-body)',
      marginBottom: '3px',
      display: 'block'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-micro)',
      color: 'var(--muted)',
      lineHeight: 1.4,
      display: 'block'
    }
  }, description)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: onChange,
    style: {
      padding: '9px 12px',
      border: '1px solid var(--line)',
      borderRadius: '10px',
      background: 'var(--cream)',
      fontSize: 'var(--text-meta)',
      fontWeight: 'var(--fw-semibold)',
      minWidth: '80px',
      cursor: 'pointer',
      fontFamily: 'inherit',
      color: 'var(--ink)'
    }
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.label,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--text-meta)',
      color: 'var(--gold)',
      textAlign: 'right'
    }
  }, price)));
}
Object.assign(__ds_scope, { AddonItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/AddonItem.jsx", error: String((e && e.message) || e) }); }

// components/cards/AddonTotal.jsx
try { (() => {
function AddonTotal({
  label = 'Estimated add-on total',
  note = 'Planning estimate only. Final vendor quote required.',
  amount,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1',
      background: 'var(--ink)',
      color: '#fff',
      borderRadius: 'var(--r-md)',
      padding: '22px 26px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-meta)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--track-meta)',
      color: 'rgba(255,255,255,.6)',
      fontWeight: 'var(--fw-bold)'
    }
  }, label, /*#__PURE__*/React.createElement("small", {
    style: {
      display: 'block',
      fontSize: 'var(--text-label)',
      marginTop: '3px',
      textTransform: 'none',
      letterSpacing: 0,
      fontWeight: 'var(--fw-regular)'
    }
  }, note)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '42px',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--gold-light)'
    }
  }, amount));
}
Object.assign(__ds_scope, { AddonTotal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/AddonTotal.jsx", error: String((e && e.message) || e) }); }

// components/cards/ExperienceCard.jsx
try { (() => {
function ExperienceCard({
  number,
  title,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-lg)',
      padding: '22px',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '48px',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--cream)',
      lineHeight: 1,
      marginBottom: '14px'
    }
  }, number), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '18px',
      fontWeight: 'var(--fw-semibold)',
      marginBottom: '8px'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      fontSize: 'var(--text-body-sm)',
      lineHeight: 1.65,
      margin: 0
    }
  }, children));
}
Object.assign(__ds_scope, { ExperienceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ExperienceCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/FaqItem.jsx
try { (() => {
const {
  useState
} = React;
function FaqItem({
  question,
  children,
  defaultOpen = false,
  style
}) {
  const [open, setOpen] = useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: `1px solid ${open ? 'var(--gold)' : 'var(--line)'}`,
      borderRadius: 'var(--r-md)',
      overflow: 'hidden',
      fontFamily: 'var(--font-ui)',
      transition: 'border-color var(--dur-base)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      fontWeight: 'var(--fw-bold)',
      padding: '20px 50px 20px 22px',
      position: 'relative',
      lineHeight: 'var(--lh-snug)',
      fontSize: 'var(--text-body)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'inherit',
      color: 'var(--ink)'
    }
  }, question, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: '18px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '28px',
      height: '28px',
      borderRadius: 'var(--r-circle)',
      display: 'grid',
      placeItems: 'center',
      background: open ? 'var(--ink)' : 'var(--cream)',
      color: open ? 'var(--gold-light)' : 'var(--gold)',
      fontSize: '20px',
      fontWeight: 'var(--fw-regular)',
      transition: 'all var(--dur-base)'
    }
  }, open ? '–' : '+')), open && /*#__PURE__*/React.createElement("p", {
    style: {
      padding: '0 22px 20px',
      color: 'var(--muted)',
      margin: 0,
      fontSize: 'var(--text-body-sm)',
      lineHeight: 'var(--lh-relaxed)'
    }
  }, children));
}
Object.assign(__ds_scope, { FaqItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/FaqItem.jsx", error: String((e && e.message) || e) }); }

// components/cards/FeatureTile.jsx
try { (() => {
const {
  useState
} = React;
function FeatureTile({
  image,
  tag,
  title,
  body,
  large,
  style
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      borderRadius: 'var(--r-lg)',
      overflow: 'hidden',
      gridRow: large ? '1 / span 2' : 'auto',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      transform: hover ? 'var(--zoom-image)' : 'none',
      transition: 'transform var(--dur-slow) var(--ease-default)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--overlay-image)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      zIndex: 2,
      left: '24px',
      right: '24px',
      bottom: '22px',
      color: '#fff'
    }
  }, tag && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-eyebrow)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--track-nav-small)',
      color: 'var(--gold-light)',
      fontWeight: 'var(--fw-bold)'
    }
  }, tag), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      margin: '8px 0 6px',
      fontSize: large ? '26px' : '20px',
      fontWeight: 'var(--fw-semibold)',
      lineHeight: 'var(--lh-tight)'
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(255,255,255,.75)',
      fontSize: 'var(--text-meta)',
      margin: 0
    }
  }, body)));
}
Object.assign(__ds_scope, { FeatureTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/FeatureTile.jsx", error: String((e && e.message) || e) }); }

// components/cards/FounderCard.jsx
try { (() => {
function FounderCard({
  initials,
  role = 'Founder',
  name,
  bio,
  tags = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--cream)',
      borderRadius: 'var(--r-lg)',
      padding: '36px 40px',
      display: 'flex',
      gap: '40px',
      alignItems: 'center',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 220px',
      borderRight: '1px solid var(--line)',
      paddingRight: '40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '56px',
      height: '56px',
      borderRadius: 'var(--r-circle)',
      background: 'var(--plum)',
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: '22px',
      fontWeight: 'var(--fw-bold)',
      marginBottom: '16px'
    }
  }, initials), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-eyebrow)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--track-tier)',
      color: 'var(--gold)',
      fontWeight: 'var(--fw-bold)',
      marginBottom: '6px'
    }
  }, role), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '26px',
      fontWeight: 'var(--fw-bold)'
    }
  }, name)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body)',
      color: 'var(--muted)',
      lineHeight: 'var(--lh-relaxed)',
      margin: 0
    }
  }, bio), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '16px'
    }
  }, tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      background: '#fff',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-pill)',
      padding: '6px 14px',
      fontSize: 'var(--text-micro)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--muted)'
    }
  }, t)))));
}
Object.assign(__ds_scope, { FounderCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/FounderCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/PolicyCard.jsx
try { (() => {
function PolicyCard({
  number,
  title,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-lg)',
      padding: '26px',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '44px',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--cream)',
      marginBottom: '12px',
      lineHeight: 1
    }
  }, number), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '20px',
      fontWeight: 'var(--fw-semibold)',
      marginBottom: '10px'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      fontSize: 'var(--text-body-sm)',
      lineHeight: 'var(--lh-body)',
      margin: 0
    }
  }, children));
}
Object.assign(__ds_scope, { PolicyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/PolicyCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/SponsorTier.jsx
try { (() => {
function SponsorTier({
  level,
  name,
  blurb,
  items = [],
  accent = 'var(--sage)',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      color: 'var(--ink)',
      borderRadius: 'var(--r-md)',
      padding: '26px',
      borderTop: `4px solid ${accent}`,
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '22px',
      fontWeight: 'var(--fw-semibold)',
      marginBottom: '4px'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-eyebrow)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--track-nav-small)',
      color: accent,
      fontWeight: 'var(--fw-bold)',
      marginBottom: '14px'
    }
  }, level), blurb && /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      fontSize: 'var(--text-meta)',
      marginBottom: '12px',
      lineHeight: 'var(--lh-body)'
    }
  }, blurb), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  }, items.map((li, i) => /*#__PURE__*/React.createElement("li", {
    key: li,
    style: {
      fontSize: 'var(--text-meta)',
      color: 'var(--muted)',
      padding: '6px 0 6px 18px',
      position: 'relative',
      borderBottom: i === items.length - 1 ? 'none' : '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      color: accent,
      fontWeight: 'var(--fw-bold)'
    }
  }, "\u2713"), li))));
}
Object.assign(__ds_scope, { SponsorTier });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/SponsorTier.jsx", error: String((e && e.message) || e) }); }

// components/cards/StepCard.jsx
try { (() => {
function StepCard({
  number,
  title,
  body,
  accent = 'var(--gold)',
  variant = 'flat',
  style
}) {
  const isBordered = variant === 'bordered';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: isBordered ? '#fff' : 'var(--paper)',
      border: isBordered ? '1px solid var(--line)' : 'none',
      borderTop: isBordered ? `3px solid ${accent}` : 'none',
      borderRadius: isBordered ? 'var(--r-md)' : 0,
      padding: isBordered ? '24px 20px' : '36px 28px',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '44px',
      height: '44px',
      borderRadius: 'var(--r-circle)',
      background: 'var(--cream)',
      border: '1px solid var(--line)',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: '22px',
      fontWeight: 'var(--fw-bold)',
      color: accent,
      marginBottom: isBordered ? '16px' : '20px'
    }
  }, number), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: isBordered ? 'var(--font-ui)' : 'var(--font-display)',
      fontSize: isBordered ? '15px' : '22px',
      fontWeight: 'var(--fw-semibold)',
      marginBottom: isBordered ? '6px' : '10px',
      lineHeight: 'var(--lh-tight)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      fontSize: isBordered ? 'var(--text-meta)' : 'var(--text-body-sm)',
      lineHeight: isBordered ? 1.5 : 1.65,
      margin: 0
    }
  }, body));
}
Object.assign(__ds_scope, { StepCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/StepCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const tones = {
  gold: {
    background: 'var(--gold)',
    color: '#fff'
  },
  ink: {
    background: 'rgba(26,23,20,.82)',
    color: 'rgba(255,255,255,.9)'
  },
  cream: {
    background: 'var(--cream)',
    color: 'var(--muted)',
    border: '1px solid var(--line)'
  }
};
function Badge({
  tone = 'gold',
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-ui)',
      fontSize: '10px',
      fontWeight: 'var(--fw-bold)',
      textTransform: 'uppercase',
      letterSpacing: '.14em',
      padding: '5px 12px',
      borderRadius: 'var(--r-pill)',
      whiteSpace: 'nowrap',
      ...tones[tone],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/cards/GalleryItem.jsx
try { (() => {
const {
  useState
} = React;
function GalleryItem({
  image,
  caption,
  badge,
  height = 260,
  style
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("figure", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      breakInside: 'avoid',
      margin: '0 0 18px',
      position: 'relative',
      borderRadius: 'var(--r-md)',
      overflow: 'hidden',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: caption,
    style: {
      width: '100%',
      height,
      objectFit: 'cover',
      display: 'block',
      transform: hover ? 'var(--zoom-image)' : 'none',
      transition: 'transform .5s var(--ease-default)'
    }
  }), badge && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "ink",
    style: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      zIndex: 2,
      fontSize: '10px',
      letterSpacing: '.12em',
      padding: '5px 10px'
    }
  }, badge), caption && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '20px 18px 16px',
      background: 'var(--overlay-caption)',
      color: '#fff',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--text-body-sm)'
    }
  }, caption));
}
Object.assign(__ds_scope, { GalleryItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/GalleryItem.jsx", error: String((e && e.message) || e) }); }

// components/cards/PriceCard.jsx
try { (() => {
function PriceCard({
  tier,
  name,
  amount,
  amountSuffix,
  blurb,
  features = [],
  action,
  featured,
  badge,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      padding: '36px',
      borderRadius: 'var(--r-lg)',
      position: 'relative',
      fontFamily: 'var(--font-ui)',
      background: featured ? 'var(--ink)' : '#fff',
      color: featured ? '#fff' : 'var(--ink)',
      border: featured ? '1px solid var(--ink)' : '1px solid var(--line)',
      transform: featured ? 'translateY(-14px)' : 'none',
      boxShadow: featured ? 'var(--shadow-lg)' : 'none',
      ...style
    }
  }, badge && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    style: {
      position: 'absolute',
      top: '-14px',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  }, badge), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-eyebrow)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--track-tier)',
      fontWeight: 'var(--fw-bold)',
      color: featured ? 'var(--gold-light)' : 'var(--gold)',
      marginBottom: '8px'
    }
  }, tier), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '24px',
      fontWeight: 'var(--fw-semibold)',
      marginBottom: '6px'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-price)',
      fontWeight: 'var(--fw-bold)',
      lineHeight: 1,
      margin: '16px 0 4px',
      color: featured ? '#fff' : 'var(--ink)'
    }
  }, amount, amountSuffix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '32px'
    }
  }, amountSuffix)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-meta)',
      color: featured ? 'rgba(255,255,255,.6)' : 'var(--muted)',
      marginBottom: '20px',
      lineHeight: 'var(--lh-body)'
    }
  }, blurb), /*#__PURE__*/React.createElement("ul", {
    style: {
      flex: 1,
      margin: '20px 0 28px',
      padding: 0,
      listStyle: 'none'
    }
  }, features.map((li, i) => /*#__PURE__*/React.createElement("li", {
    key: li,
    style: {
      padding: '10px 0 10px 22px',
      position: 'relative',
      borderBottom: i === features.length - 1 ? 'none' : featured ? '1px solid rgba(255,255,255,.12)' : '1px solid var(--line)',
      fontSize: 'var(--text-body-sm)',
      color: featured ? 'rgba(255,255,255,.72)' : 'var(--muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      color: featured ? 'var(--gold-light)' : 'var(--gold)',
      fontWeight: 'var(--fw-bold)'
    }
  }, "\u2713"), li))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, action));
}
Object.assign(__ds_scope, { PriceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/PriceCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const {
  useState
} = React;
const base = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  minHeight: '50px',
  padding: '0 26px',
  borderRadius: 'var(--r-pill)',
  fontFamily: 'var(--font-ui)',
  fontWeight: 'var(--fw-bold)',
  fontSize: '14px',
  lineHeight: 1,
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'all var(--dur-base)',
  boxSizing: 'border-box'
};
const small = {
  minHeight: '40px',
  padding: '0 18px',
  fontSize: '13px'
};
const variants = {
  primary: {
    rest: {
      background: 'var(--gold)',
      color: '#fff',
      border: '2px solid var(--gold)'
    },
    hover: {
      background: 'var(--gold-dark)',
      borderColor: 'var(--gold-dark)',
      transform: 'var(--lift-btn)',
      boxShadow: 'var(--shadow-gold)'
    }
  },
  dark: {
    rest: {
      background: 'var(--ink)',
      color: '#fff',
      border: '2px solid var(--ink)'
    },
    hover: {
      background: 'var(--plum)',
      borderColor: 'var(--plum)',
      transform: 'var(--lift-btn)'
    }
  },
  outline: {
    rest: {
      background: 'transparent',
      color: '#fff',
      border: '2px solid rgba(255,255,255,.6)'
    },
    hover: {
      background: 'rgba(255,255,255,.12)',
      borderColor: '#fff'
    }
  },
  ghost: {
    rest: {
      background: 'transparent',
      color: 'var(--gold)',
      border: '2px solid var(--gold)'
    },
    hover: {
      background: 'var(--gold)',
      color: '#fff'
    }
  },
  inkGhost: {
    rest: {
      background: 'transparent',
      color: 'var(--ink)',
      border: '2px solid var(--line)'
    },
    hover: {
      borderColor: 'var(--ink)',
      background: 'var(--cream)'
    }
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  href,
  fullWidth,
  disabled,
  children,
  onClick,
  style
}) {
  const [hover, setHover] = useState(false);
  const v = variants[variant] || variants.primary;
  const s = {
    ...base,
    ...(size === 'sm' ? small : null),
    ...v.rest,
    ...(hover && !disabled ? v.hover : null),
    ...(fullWidth ? {
      width: '100%'
    } : null),
    ...(disabled ? {
      opacity: .45,
      pointerEvents: 'none'
    } : null),
    ...style
  };
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    style: s,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/EventCard.jsx
try { (() => {
const {
  useState
} = React;
function EventCard({
  image,
  category,
  duration,
  title,
  description,
  facts = [],
  includes = [],
  addons = [],
  priceNote,
  vendorNote,
  defaultOpen = false,
  style
}) {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(defaultOpen);
  return /*#__PURE__*/React.createElement("article", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: '#fff',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-lg)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-ui)',
      transform: hover ? 'var(--lift-card)' : 'none',
      boxShadow: hover ? 'var(--shadow-md)' : 'none',
      transition: 'transform var(--dur-med),box-shadow var(--dur-med)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '220px',
      overflow: 'hidden',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px',
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 'var(--text-label)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--track-meta)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--gold)',
      marginBottom: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", null, category), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--muted)',
      fontWeight: 'var(--fw-medium)',
      textTransform: 'none',
      letterSpacing: 0
    }
  }, duration)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '22px',
      fontWeight: 'var(--fw-semibold)',
      marginBottom: '10px',
      lineHeight: 'var(--lh-tight)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      fontSize: 'var(--text-body-sm)',
      lineHeight: 'var(--lh-body)',
      marginBottom: '16px'
    }
  }, description), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      borderTop: '1px solid var(--line)',
      paddingTop: '14px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    style: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 'var(--text-meta)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--gold)',
      cursor: 'pointer',
      padding: '4px 0',
      background: 'none',
      border: 'none',
      fontFamily: 'inherit'
    }
  }, open ? 'Hide details' : 'View details & pricing', /*#__PURE__*/React.createElement("span", {
    style: {
      width: '26px',
      height: '26px',
      borderRadius: 'var(--r-circle)',
      background: open ? 'var(--ink)' : 'var(--cream)',
      color: open ? '#fff' : 'var(--gold)',
      display: 'grid',
      placeItems: 'center',
      fontSize: '16px',
      fontWeight: 'var(--fw-bold)',
      transform: open ? 'rotate(45deg)' : 'none',
      transition: 'transform var(--dur-base),background var(--dur-base)'
    }
  }, "+")), open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 0 4px'
    }
  }, facts.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '10px',
      marginBottom: '16px'
    }
  }, facts.map(fa => /*#__PURE__*/React.createElement("div", {
    key: fa.label,
    style: {
      background: 'var(--cream)',
      borderRadius: 'var(--r-sm)',
      padding: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement("small", {
    style: {
      display: 'block',
      fontSize: 'var(--text-eyebrow)',
      textTransform: 'uppercase',
      letterSpacing: '.12em',
      color: 'var(--muted)',
      fontWeight: 'var(--fw-bold)',
      marginBottom: '4px'
    }
  }, fa.label), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '20px',
      fontWeight: 'var(--fw-bold)'
    }
  }, fa.value)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      marginBottom: '14px'
    }
  }, [['Included', includes, '✓', 'var(--gold)'], ['Popular add-ons', addons, '+', 'var(--sage)']].map(([h, list, glyph, color]) => list.length > 0 && /*#__PURE__*/React.createElement("div", {
    key: h,
    style: {
      background: 'var(--cream)',
      borderRadius: 'var(--r-sm)',
      padding: '14px'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: 'var(--text-micro)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--track-meta)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--muted)',
      marginBottom: '10px'
    }
  }, h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  }, list.map((li, i) => /*#__PURE__*/React.createElement("li", {
    key: li,
    style: {
      fontSize: 'var(--text-meta)',
      color: 'var(--ink)',
      padding: '5px 0 5px 18px',
      position: 'relative',
      borderBottom: i === list.length - 1 ? 'none' : '1px solid rgba(26,23,20,.07)',
      lineHeight: 1.4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      color,
      fontWeight: 'var(--fw-bold)',
      fontSize: '12px'
    }
  }, glyph), li)))))), priceNote && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-sm)',
      background: '#fff',
      fontSize: 'var(--text-micro)',
      color: 'var(--muted)',
      lineHeight: 1.5,
      marginBottom: '14px'
    }
  }, priceNote), vendorNote && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px',
      background: 'rgba(107,124,94,.1)',
      borderRadius: 'var(--r-sm)',
      marginBottom: '10px',
      fontSize: 'var(--text-micro)',
      color: 'var(--sage)'
    }
  }, vendorNote), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "primary"
  }, "Book This Event"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "inkGhost"
  }, "Customize"))))));
}
Object.assign(__ds_scope, { EventCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/EventCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-label)',
      fontWeight: 'var(--fw-bold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--track-eyebrow)',
      color: 'var(--gold-light)',
      margin: '0 0 20px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: '28px',
      height: '1px',
      background: 'var(--gold-light)',
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionLabel.jsx
try { (() => {
function SectionLabel({
  onDark,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-eyebrow)',
      fontWeight: 'var(--fw-bold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--track-section-label)',
      color: onDark ? 'var(--gold-light)' : 'var(--gold)',
      margin: '0 0 16px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: '20px',
      height: '1px',
      background: 'currentColor'
    }
  }), children);
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/cards/PartnerCard.jsx
try { (() => {
function PartnerCard({
  kind = 'community',
  label,
  title,
  body,
  items = [],
  split = [],
  note,
  action,
  style
}) {
  const accent = kind === 'community' ? 'var(--sage)' : 'var(--gold)';
  const tint = kind === 'community' ? 'rgba(107,124,94,.1)' : 'var(--cream)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--r-lg)',
      padding: '40px',
      background: '#fff',
      border: '1px solid var(--line)',
      borderTop: `4px solid ${accent}`,
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement(__ds_scope.SectionLabel, {
    style: {
      color: accent
    }
  }, label), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '28px',
      fontWeight: 'var(--fw-semibold)',
      marginBottom: '10px'
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      lineHeight: 'var(--lh-relaxed)',
      margin: 0,
      fontSize: 'var(--text-body)'
    }
  }, body), items.length > 0 && /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '20px 0',
      padding: 0,
      listStyle: 'none'
    }
  }, items.map((li, i) => /*#__PURE__*/React.createElement("li", {
    key: li,
    style: {
      padding: '10px 0 10px 24px',
      position: 'relative',
      borderBottom: i === items.length - 1 ? 'none' : '1px solid var(--line)',
      fontSize: 'var(--text-body-sm)',
      color: 'var(--muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      color: accent,
      fontSize: '11px',
      top: '12px'
    }
  }, "\u2726"), li))), split.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      margin: '22px 0 18px'
    }
  }, split.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      padding: '16px',
      borderRadius: 'var(--r-sm)',
      background: tint
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-eyebrow)',
      textTransform: 'uppercase',
      letterSpacing: '.14em',
      fontWeight: 'var(--fw-bold)',
      color: accent
    }
  }, s.label), /*#__PURE__*/React.createElement("strong", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-display)',
      fontSize: '22px',
      fontWeight: 'var(--fw-bold)',
      marginTop: '6px'
    }
  }, s.value)))), note && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      borderRadius: 'var(--r-sm)',
      background: tint,
      borderLeft: `3px solid ${accent}`,
      fontSize: 'var(--text-meta)',
      color: 'var(--muted)',
      lineHeight: 1.5
    }
  }, note), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '20px'
    }
  }, action));
}
Object.assign(__ds_scope, { PartnerCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/PartnerCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Calendar.jsx
try { (() => {
const {
  useState
} = React;
const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
function Calendar({
  month = 7,
  year = 2026,
  selected,
  onSelect,
  unavailable = [],
  style
}) {
  const [hover, setHover] = useState(null);
  const first = new Date(year, month, 1).getDay();
  const count = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month, 1).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric'
  });
  const cells = [...Array(first).fill(null), ...Array.from({
    length: count
  }, (_, i) => i + 1)];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-md)',
      padding: '20px',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'var(--cream)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-pill)',
      width: '36px',
      height: '36px',
      cursor: 'pointer',
      fontSize: '16px'
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '16px'
    }
  }, monthName), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'var(--cream)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-pill)',
      width: '36px',
      height: '36px',
      cursor: 'pointer',
      fontSize: '16px'
    }
  }, "\u203A")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7,1fr)',
      gap: '4px',
      marginBottom: '6px',
      textAlign: 'center',
      fontSize: 'var(--text-label)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--muted)',
      textTransform: 'uppercase',
      letterSpacing: '.04em'
    }
  }, DAYS.map((d, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7,1fr)',
      gap: '4px'
    }
  }, cells.map((d, i) => {
    if (d === null) return /*#__PURE__*/React.createElement("span", {
      key: 'e' + i
    });
    const off = unavailable.includes(d),
      isSel = selected === d;
    return /*#__PURE__*/React.createElement("button", {
      key: d,
      disabled: off,
      onClick: () => onSelect && onSelect(d),
      onMouseEnter: () => setHover(d),
      onMouseLeave: () => setHover(null),
      style: {
        aspectRatio: '1',
        border: `1px solid ${isSel ? 'var(--ink)' : hover === d && !off ? 'var(--gold)' : 'transparent'}`,
        borderRadius: 'var(--r-sm)',
        background: isSel ? 'var(--ink)' : off ? 'transparent' : 'var(--cream)',
        color: isSel ? '#fff' : off ? 'var(--line)' : 'var(--ink)',
        fontSize: 'var(--text-body-sm)',
        fontWeight: 'var(--fw-semibold)',
        cursor: off ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit',
        transition: 'all var(--dur-base)'
      }
    }, d);
  })));
}
Object.assign(__ds_scope, { Calendar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Calendar.jsx", error: String((e && e.message) || e) }); }

// components/forms/FilterChip.jsx
try { (() => {
const {
  useState
} = React;
function FilterChip({
  active,
  onClick,
  children,
  style
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      padding: '9px 18px',
      borderRadius: 'var(--r-pill)',
      fontSize: 'var(--text-meta)',
      fontWeight: 'var(--fw-semibold)',
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)',
      transition: 'all var(--dur-base)',
      background: active ? 'var(--ink)' : '#fff',
      border: `1px solid ${active ? 'var(--ink)' : hover ? 'var(--ink)' : 'var(--line)'}`,
      color: active ? '#fff' : hover ? 'var(--ink)' : 'var(--muted)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { FilterChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FilterChip.jsx", error: String((e && e.message) || e) }); }

// components/forms/FormField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function FormField({
  label,
  type = 'text',
  as = 'input',
  help,
  options = [],
  placeholder,
  value,
  onChange,
  rows = 4,
  style
}) {
  const [focus, setFocus] = useState(false);
  const control = {
    padding: '13px 15px',
    border: `1px solid ${focus ? 'var(--gold)' : 'var(--line)'}`,
    borderRadius: 'var(--r-sm)',
    background: focus ? '#fff' : 'var(--cream)',
    fontSize: 'var(--text-body)',
    color: 'var(--ink)',
    fontFamily: 'var(--font-ui)',
    outline: 'none',
    boxShadow: focus ? 'var(--ring-field)' : 'none',
    transition: 'border-color var(--dur-base),background var(--dur-base)',
    width: '100%',
    boxSizing: 'border-box'
  };
  const shared = {
    value,
    onChange,
    placeholder,
    style: as === 'textarea' ? {
      ...control,
      resize: 'vertical',
      minHeight: '100px'
    } : control,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 'var(--text-meta)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--ink)'
    }
  }, label), as === 'textarea' ? /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows
  }, shared)) : as === 'select' ? /*#__PURE__*/React.createElement("select", shared, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o))) : /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, shared)), help && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-micro)',
      color: 'var(--muted)',
      lineHeight: 1.45
    }
  }, help));
}
Object.assign(__ds_scope, { FormField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FormField.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchField.jsx
try { (() => {
const {
  useState
} = React;
function SearchField({
  placeholder = 'Search events…',
  value,
  onChange,
  style
}) {
  const [focus, setFocus] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      maxWidth: '520px',
      padding: '0 18px',
      background: '#fff',
      border: `1px solid ${focus ? 'var(--gold)' : 'var(--line)'}`,
      borderRadius: 'var(--r-pill)',
      boxShadow: focus ? 'var(--ring-focus)' : 'none',
      transition: 'border-color var(--dur-base),box-shadow var(--dur-base)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--muted)',
      fontSize: '16px',
      flexShrink: 0
    }
  }, "\u2315"), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minHeight: '50px',
      border: 'none',
      background: 'transparent',
      outline: 'none',
      fontSize: 'var(--text-body)',
      color: 'var(--ink)',
      fontFamily: 'var(--font-ui)'
    }
  }));
}
Object.assign(__ds_scope, { SearchField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchField.jsx", error: String((e && e.message) || e) }); }

// components/forms/TimeSlot.jsx
try { (() => {
const {
  useState
} = React;
function TimeSlot({
  selected,
  disabled,
  onClick,
  children,
  style
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("button", {
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      padding: '9px 16px',
      borderRadius: 'var(--r-pill)',
      fontSize: 'var(--text-meta)',
      fontWeight: 'var(--fw-semibold)',
      fontFamily: 'var(--font-ui)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all var(--dur-base)',
      background: selected ? 'var(--ink)' : '#fff',
      border: `1px solid ${selected ? 'var(--ink)' : hover && !disabled ? 'var(--ink)' : 'var(--line)'}`,
      color: selected ? '#fff' : hover && !disabled ? 'var(--ink)' : 'var(--muted)',
      opacity: disabled ? .4 : 1,
      textDecoration: disabled ? 'line-through' : 'none',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { TimeSlot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TimeSlot.jsx", error: String((e && e.message) || e) }); }

// components/layout/BudgetBanner.jsx
try { (() => {
function BudgetBanner({
  label,
  title,
  body,
  action,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '36px',
      background: 'var(--plum)',
      color: '#fff',
      borderRadius: 'var(--r-lg)',
      padding: '36px 44px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '40px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", null, label && /*#__PURE__*/React.createElement(__ds_scope.SectionLabel, {
    onDark: true,
    style: {
      color: 'rgba(255,255,255,.6)'
    }
  }, label), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '30px',
      fontWeight: 'var(--fw-semibold)',
      color: '#fff',
      marginBottom: '8px',
      lineHeight: 'var(--lh-tight)'
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      color: 'rgba(255,255,255,.75)',
      maxWidth: '640px',
      fontSize: 'var(--text-body)',
      marginTop: '8px',
      lineHeight: 'var(--lh-body)'
    }
  }, body)), action);
}
Object.assign(__ds_scope, { BudgetBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/BudgetBanner.jsx", error: String((e && e.message) || e) }); }

// components/layout/EstimateNotice.jsx
try { (() => {
function EstimateNotice({
  lead,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-start',
      marginBottom: '28px',
      padding: '16px 20px',
      borderLeft: '3px solid var(--gold)',
      background: '#fff',
      borderRadius: '0 var(--r-sm) var(--r-sm) 0',
      color: 'var(--muted)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-body-sm)',
      lineHeight: 'var(--lh-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, lead && /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)',
      marginRight: '4px'
    }
  }, lead), children));
}
Object.assign(__ds_scope, { EstimateNotice });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/EstimateNotice.jsx", error: String((e && e.message) || e) }); }

// components/layout/Hero.jsx
try { (() => {
function Hero({
  image,
  eyebrow,
  title,
  body,
  proof = [],
  actions,
  minHeight = 'calc(100vh - 102px)',
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight,
      display: 'flex',
      alignItems: 'center',
      padding: '100px var(--hero-pad-x)',
      color: '#fff',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: `url(${image}) center/cover`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--overlay-hero)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '780px'
    }
  }, eyebrow && /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h1)',
      fontWeight: 'var(--fw-semibold)',
      lineHeight: 'var(--lh-display)',
      marginBottom: '24px',
      textShadow: '0 2px 20px rgba(0,0,0,.3)'
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-lead)',
      color: 'rgba(255,255,255,.82)',
      maxWidth: '620px',
      marginBottom: '36px',
      lineHeight: 'var(--lh-relaxed)'
    }
  }, body), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '14px',
      marginBottom: '48px'
    }
  }, actions), proof.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px 30px'
    }
  }, proof.map(p => /*#__PURE__*/React.createElement("span", {
    key: p,
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-meta)',
      color: 'rgba(255,255,255,.70)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold-light)',
      fontSize: '10px'
    }
  }, "\u2726"), p)))));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Hero.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionHead.jsx
try { (() => {
function SectionHead({
  label,
  title,
  body,
  align = 'split',
  onDark,
  children,
  style
}) {
  const muted = onDark ? 'rgba(255,255,255,.68)' : 'var(--muted)';
  if (align === 'center') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        maxWidth: 'var(--measure-center)',
        margin: '0 auto 56px',
        ...style
      }
    }, label && /*#__PURE__*/React.createElement(__ds_scope.SectionLabel, {
      onDark: onDark
    }, label), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-h2)',
        fontWeight: 'var(--fw-semibold)',
        lineHeight: 'var(--lh-display)',
        margin: 0
      }
    }, title), body && /*#__PURE__*/React.createElement("p", {
      style: {
        color: muted,
        fontSize: 'var(--text-body-lg)',
        lineHeight: 'var(--lh-relaxed)',
        marginTop: '14px'
      }
    }, body), children);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      alignItems: 'end',
      marginBottom: '56px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", null, label && /*#__PURE__*/React.createElement(__ds_scope.SectionLabel, {
    onDark: onDark
  }, label), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      fontWeight: 'var(--fw-semibold)',
      lineHeight: 'var(--lh-display)',
      margin: 0
    }
  }, title)), body && /*#__PURE__*/React.createElement("p", {
    style: {
      color: muted,
      fontSize: 'var(--text-body-lg)',
      lineHeight: 'var(--lh-relaxed)',
      margin: 0
    }
  }, body));
}
Object.assign(__ds_scope, { SectionHead });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionHead.jsx", error: String((e && e.message) || e) }); }

// components/layout/TrustBar.jsx
try { (() => {
function TrustBar({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink)',
      color: '#fff',
      display: 'grid',
      gridTemplateColumns: `repeat(${items.length || 3},1fr)`,
      padding: '24px clamp(24px,5vw,80px)',
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.label,
    style: {
      textAlign: 'center',
      padding: '12px 16px',
      borderRight: i === items.length - 1 ? 'none' : '1px solid rgba(255,255,255,.1)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-stat)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--gold-light)',
      lineHeight: 1
    }
  }, it.value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-label)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--track-meta)',
      color: 'rgba(255,255,255,.55)',
      marginTop: '4px',
      display: 'block'
    }
  }, it.label))));
}
Object.assign(__ds_scope, { TrustBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/TrustBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AnnouncementBar.jsx
try { (() => {
function AnnouncementBar({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--plum)',
      color: '#fff',
      textAlign: 'center',
      padding: '10px 20px',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-micro)',
      letterSpacing: 'var(--track-announcement)',
      textTransform: 'uppercase',
      fontWeight: 'var(--fw-semibold)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { AnnouncementBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AnnouncementBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BrandMark.jsx
try { (() => {
function BrandMark({
  size = 40,
  tagline = 'Apartment Community Events',
  showText = true,
  titleSize = 18,
  style
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexShrink: 0,
      textDecoration: 'none',
      color: 'inherit',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--r-circle)',
      background: 'var(--ink)',
      color: 'var(--gold-light)',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: size / 2,
      fontWeight: 'var(--fw-bold)',
      flexShrink: 0
    }
  }, "\u2726"), showText && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-display)',
      fontSize: titleSize,
      fontWeight: 'var(--fw-bold)',
      lineHeight: 1.1
    }
  }, "Community Spark"), tagline && /*#__PURE__*/React.createElement("small", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-ui)',
      fontSize: '9px',
      textTransform: 'uppercase',
      letterSpacing: 'var(--track-nav-small)',
      color: 'var(--muted)',
      marginTop: '2px'
    }
  }, tagline)));
}
Object.assign(__ds_scope, { BrandMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BrandMark.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
const COLS = [{
  title: 'Explore',
  links: [['Event Catalog', 'events.html'], ['Pricing', 'pricing.html'], ['Gallery', 'gallery.html'], ['About', 'about.html']]
}, {
  title: 'Programs',
  links: [['Community Partnerships', 'partnerships.html'], ['Sponsor an Event', 'sponsors.html'], ['Custom Events', 'contact.html'], ['Budget-Based Events', 'pricing.html']]
}, {
  title: 'Contact',
  links: [['Griffin.newton@indycollab.com', 'mailto:Griffin.newton@indycollab.com'], ['(317) 354-5880', 'tel:3173545880'], ['Submit an Inquiry', 'contact.html']]
}];
function SiteFooter({
  columns = COLS,
  blurb = 'Creating memorable moments that help apartment communities feel more connected. Based in Indiana, serving Indiana communities.',
  style
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--black)',
      color: '#fff',
      padding: '64px var(--section-pad-x) 28px',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr repeat(3,1fr)',
      gap: '50px',
      marginBottom: '40px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.BrandMark, {
    tagline: "",
    titleSize: 20,
    style: {
      color: '#fff'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(255,255,255,.5)',
      fontSize: 'var(--text-body-sm)',
      lineHeight: 'var(--lh-body)',
      marginTop: '14px',
      maxWidth: '280px'
    }
  }, blurb)), columns.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.title
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: 'var(--text-micro)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--track-nav-small)',
      fontWeight: 'var(--fw-bold)',
      color: 'rgba(255,255,255,.45)',
      marginBottom: '16px'
    }
  }, c.title), c.links.map(([label, href]) => /*#__PURE__*/React.createElement("a", {
    key: label,
    href: href,
    style: {
      display: 'block',
      color: 'rgba(255,255,255,.62)',
      fontSize: 'var(--text-body-sm)',
      marginBottom: '8px',
      textDecoration: 'none'
    }
  }, label))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,.1)',
      paddingTop: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 'var(--text-micro)',
      color: 'rgba(255,255,255,.35)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Community Spark \xB7 Apartment Community Events"), /*#__PURE__*/React.createElement("span", null, "Indiana-based and resident-focused")));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
const {
  useState
} = React;
const LINKS = [{
  label: 'Home',
  href: 'index.html'
}, {
  label: 'Events',
  href: 'events.html'
}, {
  label: 'Pricing',
  href: 'pricing.html'
}, {
  label: 'Partnerships',
  href: 'partnerships.html'
}, {
  label: 'Sponsor',
  href: 'sponsors.html'
}, {
  label: 'Gallery',
  href: 'gallery.html'
}, {
  label: 'About',
  href: 'about.html'
}];
function SiteHeader({
  links = LINKS,
  active = 'Home',
  ctaLabel = 'Plan an Event',
  ctaHref = 'contact.html',
  onNavigate,
  scrolled,
  style
}) {
  const [hover, setHover] = useState(null);
  const [ctaHover, setCtaHover] = useState(false);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 80,
      height: 'var(--header-height)',
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      padding: '0 var(--header-pad-x)',
      background: 'rgba(253,250,246,.95)',
      backdropFilter: 'var(--blur-header)',
      borderBottom: '1px solid var(--line)',
      boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
      transition: 'box-shadow var(--dur-med)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.BrandMark, null), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      gap: '4px'
    }
  }, links.map(l => {
    const isActive = l.label === active,
      isHover = hover === l.label;
    return /*#__PURE__*/React.createElement("a", {
      key: l.label,
      href: l.href,
      onClick: onNavigate ? e => {
        e.preventDefault();
        onNavigate(l);
      } : undefined,
      onMouseEnter: () => setHover(l.label),
      onMouseLeave: () => setHover(null),
      style: {
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--text-meta)',
        fontWeight: 'var(--fw-semibold)',
        padding: '7px 12px',
        borderRadius: '8px',
        textDecoration: 'none',
        color: isActive ? 'var(--gold)' : isHover ? 'var(--ink)' : 'var(--muted)',
        background: isActive || isHover ? 'var(--cream)' : 'transparent',
        transition: 'color var(--dur-base),background var(--dur-base)'
      }
    }, l.label);
  })), /*#__PURE__*/React.createElement("a", {
    href: ctaHref,
    onClick: onNavigate ? e => {
      e.preventDefault();
      onNavigate({
        label: ctaLabel,
        href: ctaHref
      });
    } : undefined,
    onMouseEnter: () => setCtaHover(true),
    onMouseLeave: () => setCtaHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '42px',
      padding: '0 22px',
      borderRadius: 'var(--r-pill)',
      background: ctaHover ? 'var(--plum)' : 'var(--ink)',
      color: '#fff',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-meta)',
      fontWeight: 'var(--fw-bold)',
      textDecoration: 'none',
      transform: ctaHover ? 'var(--lift-nav)' : 'none',
      transition: 'background var(--dur-base),transform var(--dur-fast)',
      flexShrink: 0
    }
  }, ctaLabel));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AddonItem = __ds_scope.AddonItem;

__ds_ns.AddonTotal = __ds_scope.AddonTotal;

__ds_ns.EventCard = __ds_scope.EventCard;

__ds_ns.ExperienceCard = __ds_scope.ExperienceCard;

__ds_ns.FaqItem = __ds_scope.FaqItem;

__ds_ns.FeatureTile = __ds_scope.FeatureTile;

__ds_ns.FounderCard = __ds_scope.FounderCard;

__ds_ns.GalleryItem = __ds_scope.GalleryItem;

__ds_ns.PartnerCard = __ds_scope.PartnerCard;

__ds_ns.PolicyCard = __ds_scope.PolicyCard;

__ds_ns.PriceCard = __ds_scope.PriceCard;

__ds_ns.SponsorTier = __ds_scope.SponsorTier;

__ds_ns.StepCard = __ds_scope.StepCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.Calendar = __ds_scope.Calendar;

__ds_ns.FilterChip = __ds_scope.FilterChip;

__ds_ns.FormField = __ds_scope.FormField;

__ds_ns.SearchField = __ds_scope.SearchField;

__ds_ns.TimeSlot = __ds_scope.TimeSlot;

__ds_ns.BudgetBanner = __ds_scope.BudgetBanner;

__ds_ns.EstimateNotice = __ds_scope.EstimateNotice;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.SectionHead = __ds_scope.SectionHead;

__ds_ns.TrustBar = __ds_scope.TrustBar;

__ds_ns.AnnouncementBar = __ds_scope.AnnouncementBar;

__ds_ns.BrandMark = __ds_scope.BrandMark;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

})();
