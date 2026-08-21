const {Button:SBtn,SectionHead:SHead,FaqItem:SFaq,Badge:SBadge,FormField:SField} = window.CommunitySparkDesignSystem_6bcc19;
const {useState:useS} = React;

const WHY=[
  {n:'01',t:'The audience is already local',d:'An apartment community is a few hundred households stacked inside a couple of buildings, usually within a few miles of your door. You are not paying to reach a region and hoping part of it is nearby.'},
  {n:'02',t:'You arrive as a neighbor, not an ad',d:'Residents meet your name attached to free food, a prize, or an evening they enjoyed. That is a different first impression than an interruption in a feed.'},
  {n:'03',t:'Residents move, and movers buy',d:'Apartment residents turn over. New residents need a dentist, a mechanic, a pizza place, a groomer. Being the name they already recognize is the whole point.'},
  {n:'04',t:'You do not have to staff it',d:'Want a table? Take one. Would rather just have your name on the signage and the resident email? That works too — and it costs the same.'}
];
const LEVELS=[
  {tier:'Event Enhancement',name:'Supporting Partner',amount:'One element',unit:'of a single event',
   features:['Your name on event signage','Named sponsor of one enhancement','Recognition in the approved resident email or flyer','Optional prize, sample, or resident offer','Post-event recap']},
  {tier:'Event Sponsor',name:'Featured Partner',amount:'One event',unit:'top billing throughout',featured:true,badge:'Most Chosen',
   features:['Everything in Supporting Partner','Pre-event and on-site recognition','Brand presence built into the event design','Optional approved on-site table or activation','First option on your category for that community']},
  {tier:'Multi-Event Program',name:'Community Partner',amount:'3–6 events',unit:'one agreement, a full season',
   features:['Everything in Featured Partner','Recognition across 3–6 events','A consistent resident offer carried event to event','Priority matching as new communities book','Rate locked for your program term']}
];
const STEPS_S=[
  {n:'1',t:'You get on the list',d:'Two minutes. Your business, your service area, and the level you are interested in. No payment, no commitment.'},
  {n:'2',t:'We find the fit',d:'As apartment communities book events, we look for the sponsor whose category, location, and budget match that event.'},
  {n:'3',t:'You see the specifics',d:'The community, the date, the event, what your money funds, and exactly how your name appears — in writing, before anything is owed.'},
  {n:'4',t:'You approve — or pass',d:'Passing costs nothing and does not take you off the list. Some events will not be right for you, and that is expected.'},
  {n:'5',t:'Event happens, you get a recap',d:'A short summary of the event, attendance, and how your business appeared. No resident data, ever.'}
];
const SFAQS=[
  ['You don\u2019t have events booked yet — what am I signing up for?','A spot on the founding sponsor list. We are booking our first communities for 2026. When an event near you is confirmed, you get first look at it. You are not charged and not committed until you approve a specific event.'],
  ['What does my money actually pay for?','It splits two ways: part credits the apartment community\u2019s invoice, and part goes toward upgrading the event itself — better food, entertainment, décor, or prizes. Sponsorship never covers the whole cost of an event.'],
  ['Do I have to show up?','No. Name-only sponsorship costs the same and includes the same recognition — signage, resident email mention, and a post-event recap.'],
  ['Do I get resident contact information?','No, never automatically. Any optional resident sign-up must be voluntary, disclosed, and approved by the community first.'],
  ['What if there\u2019s no community near me?','We will tell you honestly, and you stay on the list at no cost until there is one.'],
  ['Could a competitor sponsor the same event?','We aim not to place two direct competitors at the same event — tell us your category and service area so we can plan around it.'],
  ['When do I pay?','After you approve a specific event. Nothing is due to join the list.']
];
const BIZ_TYPES=['Select a category','Restaurant or Bar','Coffee, Bakery, or Dessert','Grocery or Specialty Food','Home Services (HVAC, plumbing, cleaning, lawn)','Real Estate or Mortgage','Insurance or Financial Services','Health, Dental, or Medical','Fitness or Wellness','Pet Services','Auto Sales or Service','Salon, Spa, or Beauty','Retail or Boutique','Professional Services (legal, accounting, etc.)','Moving or Storage','Nonprofit or Community Organization','Other'];
const RANGES=['Select a range','Within 5 miles','Within 15 miles','Within 30 miles','Anywhere in Central Indiana','Anywhere in Indiana'];
const LEVEL_OPTS=['Select a level','Supporting Partner — one element of an event','Featured Partner — one full event','Community Partner — a season of events','Not sure yet — help me choose'];
const FREQ=['Select an option','Once, to try it','A few times a year','Monthly or ongoing','Not sure yet'];
const ATTEND=['Select an option','I\u2019d like to attend and meet residents','Name and materials only — I won\u2019t attend','Either works, depending on the event'];

function LevelCard({l}){
  return (
    <div data-reveal style={{position:'relative',display:'flex',flexDirection:'column',padding:'34px 30px',borderRadius:'var(--r-lg)',background:l.featured?'var(--ink)':'#fff',color:l.featured?'#fff':'var(--ink)',border:'1px solid '+(l.featured?'var(--ink)':'var(--line)'),boxShadow:l.featured?'var(--shadow-lg)':'var(--shadow-sm)'}}>
      {l.badge && <SBadge style={{position:'absolute',top:'-14px',left:'50%',transform:'translateX(-50%)'}}>{l.badge}</SBadge>}
      <span style={{fontSize:'var(--text-eyebrow)',textTransform:'uppercase',letterSpacing:'var(--track-tier)',fontWeight:'var(--fw-bold)',color:l.featured?'var(--gold-light)':'var(--gold)',marginBottom:'8px'}}>{l.tier}</span>
      <h3 style={{fontFamily:'var(--font-display)',fontSize:'25px',fontWeight:'var(--fw-semibold)',margin:'0 0 14px'}}>{l.name}</h3>
      <div style={{fontFamily:'var(--font-display)',fontSize:'34px',fontWeight:'var(--fw-bold)',lineHeight:1.05}}>{l.amount}</div>
      <span style={{fontSize:'var(--text-micro)',color:l.featured?'rgba(255,255,255,.6)':'var(--muted)',marginTop:'6px'}}>{l.unit}</span>
      <ul style={{listStyle:'none',margin:'22px 0 26px',padding:0,flex:1,display:'flex',flexDirection:'column',gap:'10px'}}>
        {l.features.map(f=>(
          <li key={f} style={{position:'relative',paddingLeft:'22px',fontSize:'var(--text-body-sm)',lineHeight:'var(--lh-body)',color:l.featured?'rgba(255,255,255,.74)':'var(--muted)'}}>
            <span style={{position:'absolute',left:0,color:l.featured?'var(--gold-light)':'var(--gold)',fontWeight:'var(--fw-bold)',fontSize:'12px'}}>✓</span>{f}
          </li>
        ))}
      </ul>
      <SBtn variant={l.featured?'primary':'inkGhost'} href="#sponsor-form" fullWidth>Join This Level</SBtn>
    </div>
  );
}

function SponsorForm(){
  const [sent,setSent]=useS(false);
  const [f,setF]=useS({biz:'',contact:'',email:'',phone:'',type:BIZ_TYPES[0],site:'',area:'',reach:RANGES[0],level:LEVEL_OPTS[0],freq:FREQ[0],attend:ATTEND[0],notes:''});
  const set=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  if(sent) return (
    <div className="cs-form-card" data-reveal style={{textAlign:'center'}}>
      <h3>You're on the founding list.</h3>
      <p className="cs-form-intro" style={{maxWidth:'52ch',margin:'0 auto 22px'}}>Nothing is owed and nothing is committed. We'll reach out when there's an event that fits your business and your area.</p>
      <SBtn variant="inkGhost" onClick={()=>setSent(false)}>Add another business</SBtn>
    </div>
  );
  return (
    <form className="cs-form-card" data-reveal onSubmit={e=>{e.preventDefault();setSent(true)}}>
      <h3>Join the founding sponsor list</h3>
      <p className="cs-form-intro">No payment, no commitment. We'll reach out when there's an event that fits your business and your area.</p>
      <div className="cs-form-grid">
        <SField label="Business name *" value={f.biz} onChange={set('biz')} />
        <SField label="Contact name *" value={f.contact} onChange={set('contact')} />
        <SField label="Email address *" type="email" value={f.email} onChange={set('email')} />
        <SField label="Phone number *" type="tel" value={f.phone} onChange={set('phone')} />
        <SField label="Business type *" as="select" options={BIZ_TYPES} value={f.type} onChange={set('type')} />
        <SField label="Business website" value={f.site} onChange={set('site')} />
        <SField label="Business address or service area *" value={f.area} onChange={set('area')} style={{gridColumn:'1/-1'}} />
        <SField label="How far do you serve? *" as="select" options={RANGES} value={f.reach} onChange={set('reach')} />
        <SField label="Level you're interested in *" as="select" options={LEVEL_OPTS} value={f.level} onChange={set('level')} />
        <SField label="How often?" as="select" options={FREQ} value={f.freq} onChange={set('freq')} />
        <SField label="Would you like to attend events? *" as="select" options={ATTEND} value={f.attend} onChange={set('attend')} help="Both cost the same. Plenty of our sponsors never attend." />
        <SField label="Anything else we should know?" as="textarea" value={f.notes} onChange={set('notes')} style={{gridColumn:'1/-1'}} />
      </div>
      <label className="cs-form-consent"><input type="checkbox" defaultChecked /><span>You may include my business name on the list of local sponsors shown to apartment communities. This helps us tell properties that local businesses are ready to support their events. Contact details are never shared.</span></label>
      <div className="cs-form-actions">
        <SBtn variant="primary" onClick={()=>{}}>Add My Business to the List →</SBtn>
        <span style={{fontSize:'var(--text-micro)',color:'var(--muted)'}}>No payment. No commitment.</span>
      </div>
    </form>
  );
}

function SponsorsApp(){
  useReveal();
  return (
    <SiteShell active="Sponsors">
      <PageHero image="images/photo-2.jpg" eyebrow="For Indiana local businesses"
        title={<React.Fragment>Put your name on something residents <em>actually</em> enjoy.</React.Fragment>}
        lead="Community Spark runs resident events at apartment communities across Indiana. Local businesses fund pieces of those events and get their name in front of a few hundred neighbors at a time — whether or not you show up."
        actions={<React.Fragment><SBtn variant="primary" href="#sponsor-form">Get on the Founding List</SBtn><SBtn variant="outline" href="#levels">See Sponsorship Levels</SBtn></React.Fragment>}
        proof={['Set your own amount','Attending is optional','You approve every match']} />

      <section className="cs-section">
        <div className="cs-wrap">
          <div className="cs-tier-strip" data-stagger style={{marginTop:0}}>
            {[['100–1,000','Units per community'],['Indiana','Local businesses only'],['$0','To join the list']].map(([a,b])=>(
              <div className="cs-tier-mini" key={b} data-reveal style={{cursor:'default'}}>
                <span className="cs-tier-amount">{a}</span>
                <span className="cs-tier-line">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section cs-soft" style={{paddingTop:0}}>
        <div className="cs-wrap">
          <div data-reveal><SHead label="Why local businesses sponsor" title="Local marketing that shows up as a favor." /></div>
          <div className="cs-numbered" data-stagger>
            {WHY.map(w=><div className="cs-numbered-item" key={w.n} data-reveal><span>{w.n}</span><h3>{w.t}</h3><p>{w.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="cs-section" id="levels">
        <div className="cs-wrap">
          <div data-reveal><SHead label="Sponsorship levels" title="Three ways to back an event." body="Pick how deeply you want to participate. Your exact amount is set when we match you to a specific community and event — and you approve it, in writing, before anything is committed." /></div>
          <p className="cs-note-card" data-reveal><strong style={{color:'var(--ink)'}}>Where we are right now:</strong> Community Spark is booking its first apartment community events for 2026. Sponsorships are being reserved ahead of those bookings — tell us your business, your service area, and the level you're interested in, and we'll come back with a specific community, date, and event when there's a fit.</p>
          <div className="cs-levels" data-stagger>{LEVELS.map(l=><LevelCard key={l.name} l={l} />)}</div>
          <div className="cs-statpair" data-reveal style={{maxWidth:'620px'}}>
            <div><small>Part of your fee</small><strong>Credits the property</strong></div>
            <div><small>Part of your fee</small><strong>Upgrades the event</strong></div>
          </div>
          <p className="cs-note-card" data-reveal>Sponsorship never covers the entire cost of an event — the community always has its own money in it too. That's what keeps the event theirs, and keeps your name attached to something the property genuinely wanted to do. <a href="Partnerships.html">See how sponsorship helps the property →</a></p>
        </div>
      </section>

      <section className="cs-section cs-soft">
        <div className="cs-wrap">
          <div data-reveal><SHead label="How it works" title="From founding list to your first event." /></div>
          <div className="cs-numbered" data-stagger>
            {STEPS_S.map(s=><div className="cs-numbered-item" key={s.n} data-reveal><span>{s.n}</span><h3>{s.t}</h3><p>{s.d}</p></div>)}
          </div>
          <div className="cs-commit" data-reveal>
            <span className="cs-commit-mark">✦</span>
            <div>
              <h3>What you get, and what you won't</h3>
              <p>Your visibility comes from the event itself: signage, the approved resident email or flyer, and being present if you choose to be. Resident contact information is never handed to a sponsor. If an event includes an optional sign-up, drawing, or offer, it has to be voluntary, clearly labeled, and approved by the apartment community first. Every sponsor is also approved by the property before anything is confirmed — including yours.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-soft">
        <div className="cs-wrap">
          <div data-reveal><SHead label="FAQ" title="Straight answers before you sign up." /></div>
          <div className="cs-faq-grid" data-stagger>
            {SFAQS.map(([q,a])=><div key={q} data-reveal><SFaq question={q}>{a}</SFaq></div>)}
          </div>
        </div>
      </section>

      <section className="cs-section" id="sponsor-form">
        <div className="cs-wrap">
          <div data-reveal><SHead label="Join the list" title="Two minutes now, we come to you later." body="Submitting this does not commit you to a sponsorship, a dollar amount, or a date. We'll reach out when there's an event that fits your business and your area." /></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:'var(--grid-gap)',alignItems:'start',marginTop:'36px'}} className="cs-form-layout">
            <SponsorForm />
            <div className="cs-form-side">
              <div className="cs-contact-line" data-reveal><small>Email</small><a href="mailto:Griffin.newton@indycollab.com">Griffin.newton@indycollab.com</a></div>
              <div className="cs-contact-line" data-reveal><small>Phone</small><a href="tel:3173545880">(317) 354-5880</a></div>
              <div className="cs-contact-line" data-reveal><small>Apartment community?</small><span style={{fontSize:'var(--text-body-sm)',color:'var(--muted)',lineHeight:'var(--lh-body)',display:'block'}}>If you manage a property rather than a business, <a href="Contact.html">start here instead</a>.</span></div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<SponsorsApp />);
