const {Button:HButton,SectionHead:HSectionHead} = window.CommunitySparkDesignSystem_6bcc19;

const STEPS=[
  {n:'01',t:'Choose',d:'Pick a preset event, request a custom concept, or give us a budget and let us recommend the strongest option.'},
  {n:'02',t:'Personalize',d:'Select the enhancements that add the most value — décor, entertainment, food, photography, or sponsor support.'},
  {n:'03',t:'Approve',d:'Review a clear event plan with pricing, timing, responsibilities, and every included service spelled out.'},
  {n:'04',t:'Enjoy',d:'We handle setup, on-site coordination, and breakdown. Your team focuses on welcoming residents.'}
];
const FEATURES=[
  {img:'images/photo-1.jpg',tag:'Premier experience',t:'Signature Community Celebration',cls:'is-large'},
  {img:'images/photo-2.jpg',tag:'Resident social',t:'Mix, Mingle & Connect'},
  {img:'images/photo-3.jpg',tag:'Seasonal event',t:'Poolside Resident Social'}
];
const TIERS=[
  {name:'The Spark',price:'$800',line:'Up to 1 hour · one featured activity'},
  {name:'The Glow',price:'$1,250',line:'1–2 hours · multiple event elements',featured:true},
  {name:'The Radiance',price:'$1,750+',line:'1–3 hours · full event management'}
];

function HomeApp(){
  useReveal();
  return (
    <SiteShell active="Home">
      <PageHero image="images/photo-7.jpg" eyebrow="Where connection begins"
        title={<React.Fragment>Resident events people will <em>genuinely</em> want to attend.</React.Fragment>}
        lead="Ready-to-book experiences, custom event concepts, transparent pricing, and local sponsorship options — built for apartment communities across Indiana."
        actions={<React.Fragment><HButton variant="primary" href="Events.html">Browse Events</HButton><HButton variant="outline" href="Contact.html">Request a Custom Event</HButton></React.Fragment>}
        proof={['20 preset events','Setup and breakdown included','Indiana-based and resident-focused']} />

      <section className="cs-section cs-soft">
        <div className="cs-wrap">
          <div data-reveal><HSectionHead label="Built for property teams" title="Simple planning from inquiry to event day." body="Community Spark handles coordination, setup, and breakdown so your team can focus on residents — not logistics. Choose from 20 preset events or tell us what you have in mind." /></div>
          <div className="cs-steps" data-stagger>
            {STEPS.map(s=>(
              <div className="cs-step" key={s.n} data-reveal>
                <span className="cs-step-num">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap">
          <div data-reveal><HSectionHead label="Featured experiences" title="Ready-to-book events without the cookie-cutter feel." body="Begin with a polished event concept, then make it your own with décor, food, entertainment, prizes, photography, or sponsor-supported upgrades." /></div>
          <div className="cs-features" data-stagger>
            {FEATURES.map(f=>(
              <a className={'cs-feature '+(f.cls||'')} href="Events.html" key={f.t} data-reveal>
                <img src={f.img} alt={f.t} loading="lazy" />
                <span className="cs-feature-scrim"></span>
                <span className="cs-feature-copy"><span className="cs-feature-tag">{f.tag}</span><span className="cs-feature-title">{f.t}</span></span>
              </a>
            ))}
          </div>
          <p className="cs-features-link" data-reveal><a href="Events.html">View the full event catalog →</a></p>
        </div>
      </section>

      <section className="cs-section cs-soft">
        <div className="cs-wrap">
          <div data-reveal><HSectionHead label="Transparent pricing" title="Three starting points, published up front." body="Every tier includes planning, décor styling, on-site coordination, and full breakdown. Add-on packages are published too — no quote required to see a number." /></div>
          <div className="cs-tier-strip" data-stagger>
            {TIERS.map(t=>(
              <a className={'cs-tier-mini'+(t.featured?' is-featured':'')} href="Pricing.html" key={t.name} data-reveal>
                <span className="cs-tier-name">{t.name}</span>
                <span className="cs-tier-amount">{t.price}</span>
                <span className="cs-tier-line">{t.line}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap cs-split" data-stagger>
          <div className="cs-split-card" data-reveal>
            <span className="cs-split-label">For property teams</span>
            <h3>Community partnerships</h3>
            <p>Recurring resident programming on a schedule your team can plan around, with consistent quality and one point of contact.</p>
            <a href="Partnerships.html">See how partnerships work →</a>
          </div>
          <div className="cs-split-card" data-reveal>
            <span className="cs-split-label">For local businesses</span>
            <h3>Sponsor an event</h3>
            <p>Fund part of a resident event and get your name in front of a few hundred nearby households. Attending is optional, and the community approves every sponsor.</p>
            <a href="Sponsors.html">See sponsorship levels →</a>
          </div>
        </div>
      </section>

      <section className="cs-section" style={{paddingTop:0}}>
        <ClosingPanel label="Ready when you are" title="Tell us the date and we'll take it from there."
          body="Share your community, the kind of event you have in mind, and the budget you're working with. You'll get a written plan with pricing, inclusions, and responsibilities before anything is booked."
          ctaLabel="Plan an Event" ctaHref="Contact.html" linkLabel="Or browse the event catalog first" linkHref="Events.html" />
      </section>
    </SiteShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<HomeApp />);
