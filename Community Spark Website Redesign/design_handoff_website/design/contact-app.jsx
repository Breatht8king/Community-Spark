const {Button:CBtn,SectionHead:CHead,FormField:CField} = window.CommunitySparkDesignSystem_6bcc19;
const {useState:useC} = React;

const ATTENDANCE=['Select a range','Under 25 residents','25–50 residents','50–100 residents','100–200 residents','200+ residents'];
const BUDGETS=['Select a range','$800 — The Spark','$1,250 — The Glow','$1,750+ — The Radiance','Not sure yet — recommend something'];

function params(){
  try{const p=new URLSearchParams(window.location.search);return {event:p.get('event')||'',intent:p.get('intent')||''}}catch(e){return {event:'',intent:''}}
}

function ContactForm(){
  const {event,intent}=params();
  const asking=intent==='question';
  const [sent,setSent]=useC(false);
  const [f,setF]=useC({
    name:'',community:'',email:'',site:'',phone:'',date:'',attendance:ATTENDANCE[0],budget:BUDGETS[0],location:'',
    about:event?(asking?'I have a question about '+event+': ':'We\u2019re interested in booking '+event+'. '):'',
    wants:'',notes:''
  });
  const set=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  if(sent) return (
    <div className="cs-form-card" data-reveal style={{textAlign:'center'}}>
      <h3>Request received.</h3>
      <p className="cs-form-intro" style={{maxWidth:'52ch',margin:'0 auto 22px'}}>Nothing is booked and no date is held yet. Griffin will follow up to talk through availability, details, and next steps.</p>
      <CBtn variant="inkGhost" onClick={()=>setSent(false)}>Send another request</CBtn>
    </div>
  );
  return (
    <form className="cs-form-card" data-reveal onSubmit={e=>{e.preventDefault();setSent(true)}}>
      <h3>{event?(asking?'Ask about this event':'Request this event'):'Request a custom event'}</h3>
      <p className="cs-form-intro">Community Spark will follow up to discuss availability, event details, and next steps. Submitting this form does not reserve a date.</p>
      {event && (
        <div className="cs-prefill" data-reveal>
          <span>Event you're asking about</span>
          <strong>{event}</strong>
          <a href="Events.html">Change</a>
        </div>
      )}
      <div className="cs-form-grid">
        <CField label="Contact name *" value={f.name} onChange={set('name')} />
        <CField label="Apartment community name *" value={f.community} onChange={set('community')} />
        <CField label="Email address *" type="email" value={f.email} onChange={set('email')} />
        <CField label="Phone number" type="tel" value={f.phone} onChange={set('phone')} />
        <CField label="Community website" value={f.site} onChange={set('site')} />
        <CField label="Event date" type="date" value={f.date} onChange={set('date')} help="At least 2 weeks out works best. Tighter timeline? Leave blank and email us." />
        <CField label="Estimated attendance" as="select" options={ATTENDANCE} value={f.attendance} onChange={set('attendance')} />
        <CField label="Estimated budget" as="select" options={BUDGETS} value={f.budget} onChange={set('budget')} />
        <CField label="Event location" value={f.location} onChange={set('location')} style={{gridColumn:'1/-1'}} help="Clubhouse, courtyard, pool deck, parking area — wherever you're picturing it." />
        <CField label="Tell us about the event you want" as="textarea" value={f.about} onChange={set('about')} style={{gridColumn:'1/-1'}} />
        <CField label="What would you like included?" as="textarea" value={f.wants} onChange={set('wants')} style={{gridColumn:'1/-1'}} help="List everything — we'll help you prioritize within your budget." />
        <CField label="Additional information" as="textarea" value={f.notes} onChange={set('notes')} rows={3} style={{gridColumn:'1/-1'}} />
      </div>
      <label className="cs-form-consent"><input type="checkbox" defaultChecked /><span><strong style={{color:'var(--ink)'}}>I'm open to sponsor support.</strong> An approved local sponsor may help reduce your community's cost while adding upgrades to the event.</span></label>
      <div className="cs-form-actions">
        <CBtn variant="primary" onClick={()=>{}}>{event&&!asking?'Request This Event →':'Send My Request →'}</CBtn>
        <span style={{fontSize:'var(--text-micro)',color:'var(--muted)'}}>Submitting starts a conversation — it doesn't commit you to anything.</span>
      </div>
    </form>
  );
}

function ContactApp(){
  useReveal();
  const {event}=params();
  return (
    <SiteShell active="">
      <section className="cs-section">
        <div className="cs-wrap">
          <div data-reveal><CHead label={event?'Event inquiry':'Request a custom event'} title={event?'Tell us about your community.':'Tell us the basics.'} body="We can work through the details after reviewing your request. Nothing is reserved until a proposal is approved — this just starts the conversation." /></div>
          <div className="cs-form-layout" style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:'var(--grid-gap)',alignItems:'start',marginTop:'36px'}}>
            <ContactForm />
            <div className="cs-form-side">
              <div className="cs-contact-line" data-reveal><small>Email</small><a href="mailto:Griffin.newton@indycollab.com">Griffin.newton@indycollab.com</a></div>
              <div className="cs-contact-line" data-reveal><small>Phone</small><a href="tel:3173545880">(317) 354-5880</a></div>
              <div className="cs-contact-line" data-reveal><small>Local business?</small><span style={{fontSize:'var(--text-body-sm)',color:'var(--muted)',lineHeight:'var(--lh-body)',display:'block'}}>If you'd like to sponsor resident events rather than book one, <a href="Sponsors.html">start here instead</a>.</span></div>
              <div className="cs-contact-line" data-reveal><small>Response time</small><span style={{fontSize:'var(--text-body-sm)',color:'var(--muted)',lineHeight:'var(--lh-body)',display:'block'}}>Most inquiries get a reply the same or next business day.</span></div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ContactApp />);
