const {Button:PBtn,SectionHead:PHead,FaqItem:PFaq} = window.CommunitySparkDesignSystem_6bcc19;

const WHY=[
  {n:'01',t:'Your team stops running events',d:'Concept, sourcing, vendor calls, setup, event-day coordination, and breakdown are handled. Your staff greets residents instead of hauling tables.'},
  {n:'02',t:'Residents actually turn out',d:'Events are built around what people show up for — food, activity, and a reason to stand around talking — not a folding table with a sign-up sheet.'},
  {n:'03',t:'The number is on the website',d:'Three planning tiers and published add-on packages. You can price an event for your budget meeting before you ever send an inquiry.'},
  {n:'04',t:'A local sponsor can offset the cost',d:'When a nearby business backs your event, part of their contribution credits your invoice and part upgrades the event. Entirely optional, and you approve every detail.'}
];
const INCLUDED=['Event concept and planning','Décor styling and setup','Vendor sourcing and communication','On-site coordination for the whole event','Full breakdown and cleanup','A written plan before anything is booked'];
const FLOW=[
  {n:'1',t:'You send the basics',d:'Your community, a date you have in mind, rough attendance, and the budget you are working with. Two minutes, no commitment.'},
  {n:'2',t:'You get a written plan',d:'The event concept, inclusions, add-ons, vendor expenses, responsibilities, and an estimated total — in writing, before anything is owed.'},
  {n:'3',t:'You approve the details',d:'Adjust the scope, swap inclusions, or set it against a different budget. The date is not reserved until you approve the proposal.'},
  {n:'4',t:'We run the event',d:'Setup, vendor management, on-site coordination, and breakdown. Your team shows up to greet residents and nothing else.'},
  {n:'5',t:'You get a recap',d:'A short summary of the event, turnout, and anything worth changing next time. No resident data is ever handed to a sponsor.'}
];
const SPONSOR_POINTS=['A direct credit that lowers your community\u2019s final invoice','Real upgrades — better food, entertainment, décor, prizes, or photography','A more impressive event without raising your original budget','Access to vetted, reputable local businesses that want to serve your residents','A complete sponsor plan shown for your approval before anything is confirmed'];
const TIER_GLANCE=[
  {k:'Supporting Partner',t:'Event Enhancement',d:'A business funds one specific element of your event — a prize, a food station, the photo area.'},
  {k:'Featured Partner',t:'Event Sponsor',d:'Broader visibility throughout one resident event, with brand presence built into the event design.'},
  {k:'Community Partner',t:'Multi-Event Program',d:'One business supporting a series of events at your property across a season.'}
];
const SAMPLE=[
  {cat:'Games & Social',dur:'1–2 hours',t:'Trivia Night',p:'$1,250',d:'Snacks, drinks, a big-screen display setup, and prizes for the top three tables.'},
  {cat:'Pet-Friendly',dur:'1–2 hours',t:'Dog Adoption & Pet Appreciation Day',p:'$800',d:'Treat stations, pet gift bags, and take-home bowls for every four-legged resident.'},
  {cat:'Community Support',dur:'1–2 hours',t:'Back-to-School Supply Event',p:'$1,750',d:'Fully stocked supply bags for about 100 kids, plus five backpack giveaways.'}
];
const CFAQ=[
  ['Does submitting an inquiry reserve our date?','No. The date is confirmed only after the proposal is approved and the booking requirements in the agreement are complete. Earlier inquiries give you more flexibility on dates and vendors.'],
  ['Can we use our own vendors?','Possibly. Vendor responsibilities, timing, insurance, access, and setup requirements need to be agreed on in advance so the event plan stays clear and manageable.'],
  ['What if we have a fixed budget?','Share the amount and the two or three things that matter most to your residents. We recommend the event concept and inclusions that get the most out of it.'],
  ['Do we have to accept a sponsor?','No. Sponsorship is optional, you choose which categories are acceptable, and no sponsor is confirmed until you approve the business, the offer, and the visibility plan.'],
  ['What happens if the weather turns?','Outdoor events should have a backup location or an approved weather plan. We review the indoor option, rescheduling possibilities, and vendor limitations before the event is finalized.'],
  ['Is resident information shared with sponsors?','Never automatically. Any optional resident sign-up must be voluntary, clearly labeled, and approved by your community first.']
];

function PartnershipsApp(){
  useReveal();
  return (
    <SiteShell active="Communities">
      <PageHero image="images/photo-6.jpg" eyebrow="For Indiana apartment communities"
        title="Resident events your team doesn't have to run."
        lead="Community Spark plans, sources, sets up, staffs, and breaks down resident events for apartment communities across Indiana — with pricing published up front and an optional local sponsor to help cover it."
        actions={<React.Fragment><PBtn variant="primary" href="Contact.html">Plan an Event</PBtn><PBtn variant="outline" href="Events.html">Browse the Catalog</PBtn></React.Fragment>}
        proof={['20 preset events','Setup and breakdown included','You approve every sponsor']} />

      <section className="cs-section">
        <div className="cs-wrap">
          <div className="cs-tier-strip" data-stagger style={{marginTop:0}}>
            {[['20','Ready-to-book events'],['3','Published price tiers'],['1','Point of contact']].map(([a,b])=>(
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
          <div data-reveal><PHead label="Why property teams book" title="Resident programming without the workload." /></div>
          <div className="cs-numbered" data-stagger>
            {WHY.map(w=><div className="cs-numbered-item" key={w.n} data-reveal><span>{w.n}</span><h3>{w.t}</h3><p>{w.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap cs-split" data-stagger>
          <div className="cs-split-card" data-reveal>
            <span className="cs-split-label">What's always included</span>
            <h3>Every event, start to finish.</h3>
            <p>No tier is a rental drop-off. Whichever event you pick, the same operational work is covered before your team is asked for anything.</p>
            <ul className="cs-checks">{INCLUDED.map(i=><li key={i}>{i}</li>)}</ul>
          </div>
          <div className="cs-split-card" data-reveal>
            <span className="cs-split-label">What we need from you</span>
            <h3>Access, a space, and a decision.</h3>
            <p>Accurate access times, loading information, venue rules, utility availability, and parking details — plus any property-specific insurance or vendor requirements. Then approve the plan.</p>
            <div className="cs-statpair">
              <div><small>Your team on event day</small><strong>Greet residents</strong></div>
              <div><small>Our team on event day</small><strong>Everything else</strong></div>
            </div>
            <p className="cs-note-card">Website prices are base starting points. You receive a written proposal showing inclusions, add-ons, vendor expenses, responsibilities, and an estimated total before booking.</p>
          </div>
        </div>
      </section>

      <section className="cs-section cs-soft">
        <div className="cs-wrap">
          <div data-reveal><PHead label="How it works" title="From first email to post-event recap." /></div>
          <div className="cs-numbered" data-stagger>
            {FLOW.map(f=><div className="cs-numbered-item" key={f.n} data-reveal><span>{f.n}</span><h3>{f.t}</h3><p>{f.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap">
          <div data-reveal><PHead label="Optional sponsor support" title="A local business can help pay for it." body="If your community allows it, Community Spark approaches nearby businesses that want to reach your residents. Their contribution works two ways at once — and you approve every part of it." /></div>
          <div className="cs-split" data-stagger style={{marginTop:'40px'}}>
            <div className="cs-split-card" data-reveal>
              <h3>What sponsorship does for your budget</h3>
              <ul className="cs-checks">{SPONSOR_POINTS.map(p=><li key={p}>{p}</li>)}</ul>
              <div className="cs-statpair">
                <div><small>Part of the funding</small><strong>Credits your invoice</strong></div>
                <div><small>Part of the funding</small><strong>Upgrades your event</strong></div>
              </div>
            </div>
            <div className="cs-split-card" data-reveal>
              <h3>Your community stays in control</h3>
              <p>You decide whether sponsorship is appropriate at all, which business categories are acceptable, and how visible a sponsor may be. No sponsor is confirmed until you approve the business, the contribution, the visibility plan, and how it appears in the event.</p>
              <p style={{marginBottom:0}}>Sponsorship never covers the entire cost of an event — your community always has its own money in it. That keeps the event yours.</p>
              <p className="cs-note-card">Resident contact information is never handed to a sponsor. Any optional sign-up, drawing, or offer must be voluntary, clearly labeled, and approved by your community in advance.</p>
            </div>
          </div>
          <div style={{marginTop:'36px'}} data-reveal><PHead label="Levels a sponsor can choose" title="Three levels of local involvement." body="Sponsors pick how deeply they participate. Whichever level applies to your event, the approval process is the same — you see the business, the contribution, and the plan before anything is confirmed." /></div>
          <div className="cs-tier-strip" data-stagger>
            {TIER_GLANCE.map(t=>(
              <div className="cs-tier-mini" key={t.k} data-reveal style={{cursor:'default'}}>
                <span className="cs-tier-name">{t.k}</span>
                <span style={{fontFamily:'var(--font-display)',fontSize:'24px',fontWeight:'var(--fw-semibold)'}}>{t.t}</span>
                <span className="cs-tier-line">{t.d}</span>
              </div>
            ))}
          </div>
          <p className="cs-features-link" data-reveal><a href="Sponsors.html">Know a local business that would be a fit? Send them here →</a></p>
        </div>
      </section>

      <section className="cs-section cs-soft">
        <div className="cs-wrap">
          <div data-reveal><PHead label="A look at the catalog" title="What a Community Spark event actually looks like." body="Twenty ready-to-book resident events span three planning tiers — $800, $1,250, and $1,750. Here's one from each." /></div>
          <div className="cs-steps" data-stagger>
            {SAMPLE.map(s=>(
              <div className="cs-step" key={s.t} data-reveal>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'10px'}}>
                  <span style={{fontSize:'var(--text-eyebrow)',textTransform:'uppercase',letterSpacing:'var(--track-tier)',fontWeight:'var(--fw-bold)',color:'var(--gold)'}}>{s.cat}</span>
                  <span style={{fontSize:'var(--text-micro)',color:'var(--muted)'}}>{s.dur}</span>
                </div>
                <h3>{s.t}</h3>
                <p><strong style={{color:'var(--ink)'}}>About {s.p}.</strong> {s.d}</p>
              </div>
            ))}
          </div>
          <p className="cs-features-link" data-reveal><a href="Events.html">Browse all 20 events →</a></p>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap">
          <div data-reveal><PHead label="Common questions" title="What property teams ask first." /></div>
          <div className="cs-faq-grid" data-stagger>
            {CFAQ.map(([q,a])=><div key={q} data-reveal><PFaq question={q}>{a}</PFaq></div>)}
          </div>
          <div className="cs-commit" data-reveal>
            <span className="cs-commit-mark">✦</span>
            <div>
              <h3>Our commitment to your residents</h3>
              <p>Every event and every partnership has to add clear value to the resident experience. Sponsor participation stays tasteful, relevant, and clearly defined. Your community approves every partner in advance, residents are never required to share personal information, and Community Spark will decline any sponsor that is not a good fit for your event or your community.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section" style={{paddingTop:0}}>
        <ClosingPanel label="Ready when you are" title="Tell us the date and we'll take it from there."
          body="Share your community, the kind of event you have in mind, and the budget you're working with. You'll get a written plan with pricing, inclusions, and responsibilities — and, if you want it, a sponsor plan to go with it."
          ctaLabel="Plan an Event" ctaHref="Contact.html" linkLabel="Or see how pricing works" linkHref="Pricing.html" />
      </section>
    </SiteShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PartnershipsApp />);
