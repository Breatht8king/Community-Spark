const DS = window.CommunitySparkDesignSystem_6bcc19;
const {SiteHeader,SiteFooter,AnnouncementBar,SectionHead,SectionLabel,PriceCard,Button,EstimateNotice} = DS;
const {useState,useEffect,useRef} = React;

const SPRING = {type:'spring',stiffness:110,damping:20,mass:0.7};
const REDUCED = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function withMotion(cb){if(window.Motion)return cb(window.Motion);const h=()=>{window.removeEventListener('motion-ready',h);cb(window.Motion)};window.addEventListener('motion-ready',h)}
const money = n => '$' + n.toLocaleString('en-US');

function useSiteMotion(){
  useEffect(()=>{
    const all=[...document.querySelectorAll('[data-reveal]')];
    const groups=[...document.querySelectorAll('[data-stagger]')];
    if(REDUCED()){all.forEach(e=>e.classList.add('is-in'));return}
    const show=el=>el.classList.add('is-in');
    const pending=[
      ...groups.map(g=>({el:g,run:()=>[...g.querySelectorAll('[data-reveal]')].forEach((k,i)=>{k.style.transitionDelay=(i*0.085)+'s';show(k)})})),
      ...all.filter(e=>!e.closest('[data-stagger]')).map(e=>({el:e,run:()=>show(e)}))
    ];
    let queued=false;
    const check=()=>{
      queued=false;
      const vh=window.innerHeight;
      for(let i=pending.length-1;i>=0;i--){
        const r=pending[i].el.getBoundingClientRect();
        if(r.top<vh-60&&r.bottom>0){pending[i].run();pending.splice(i,1)}
      }
      if(!pending.length){window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll)}
    };
    const onScroll=()=>{if(!queued){queued=true;requestAnimationFrame(check)}};
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    check();
    const safety=setTimeout(()=>{pending.forEach(p=>p.run());pending.length=0},4000);
    const bar=document.getElementById('scrollProgress');
    const heroBg=document.getElementById('heroBg'),hero=document.getElementById('pricingHero');
    const onParallax=()=>{
      if(bar){const max=document.documentElement.scrollHeight-window.innerHeight;bar.style.transform='scaleX('+(max>0?window.scrollY/max:0)+')'}
      if(heroBg&&hero){const h=hero.offsetHeight||1;const p=Math.min(1,Math.max(0,window.scrollY/h));heroBg.style.transform='translateY('+(p*70)+'px) scale(1.12)'}
    };
    let pq=false;
    const onScroll2=()=>{if(!pq){pq=true;requestAnimationFrame(()=>{pq=false;onParallax()})}};
    window.addEventListener('scroll',onScroll2,{passive:true});
    onParallax();
    return()=>{clearTimeout(safety);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);window.removeEventListener('scroll',onScroll2)};
  },[]);
}

function useCountUp(value,ref){
  const prev=useRef(0);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const from=prev.current,to=value;prev.current=to;
    if(from===to)return;
    if(REDUCED()){el.textContent=money(to);return}
    el.textContent=money(to);
    const start=performance.now(),dur=520;let raf;
    const tick=now=>{
      const t=Math.min(1,(now-start)/dur),e=1-Math.pow(1-t,3);
      el.textContent=money(Math.round(from+(to-from)*e));
      if(t<1)raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    withMotion(M=>{if(!REDUCED())M.animate(el,{transform:['scale(1.07)','scale(1)']},{type:'spring',stiffness:400,damping:18})});
    return()=>cancelAnimationFrame(raf);
  },[value]);
}

function HeroSection(){
  return (
    <section id="pricingHero" style={{position:'relative',overflow:'hidden',color:'#fff',padding:'clamp(88px,11vw,140px) var(--hero-pad-x) clamp(76px,9vw,116px)'}}>
      <div id="heroBg" style={{position:'absolute',inset:'-8% 0',background:'url(images/photo-4.jpg) center/cover',willChange:'transform'}}></div>
      <div style={{position:'absolute',inset:0,background:'var(--overlay-hero)'}}></div>
      <div style={{position:'relative',zIndex:2,maxWidth:'820px'}} data-stagger>
        <p data-reveal style={{fontFamily:'var(--font-ui)',fontSize:'var(--text-eyebrow)',textTransform:'uppercase',letterSpacing:'var(--track-eyebrow)',fontWeight:'var(--fw-bold)',color:'var(--gold-light)',marginBottom:'18px'}}>Transparent pricing</p>
        <h1 data-reveal style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h1)',fontWeight:'var(--fw-semibold)',lineHeight:'var(--lh-display)',margin:'0 0 24px',textShadow:'0 2px 24px rgba(0,0,0,.32)'}}>Pricing you can take straight into a budget meeting.</h1>
        <p data-reveal style={{fontFamily:'var(--font-ui)',fontSize:'var(--text-lead)',color:'rgba(255,255,255,.84)',maxWidth:'600px',lineHeight:'var(--lh-relaxed)',margin:'0 0 34px'}}>Three event tiers, published add-on packages, and an estimate you can download as a PDF in one click — before you ever send an inquiry.</p>
        <div data-reveal style={{display:'flex',flexWrap:'wrap',gap:'14px',marginBottom:'44px'}}>
          <Button variant="primary" href="#tiers">See the Event Tiers</Button>
          <Button variant="outline" href="#estimate">Build My Estimate</Button>
        </div>
        <div data-reveal style={{display:'flex',flexWrap:'wrap',gap:'10px 30px'}}>
          {['Setup and breakdown included','No resident headcount limits','Indiana-based team'].map(p=>(
            <span key={p} style={{fontFamily:'var(--font-ui)',fontSize:'var(--text-meta)',color:'rgba(255,255,255,.72)',display:'flex',alignItems:'center',gap:'8px'}}><span style={{color:'var(--gold-light)',fontSize:'10px'}}>✦</span>{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({t}){
  const [hover,setHover]=useState(false);
  return (
    <div data-reveal onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{transition:'transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s cubic-bezier(.22,1,.36,1)',transform:hover?'translateY(-8px)':'none',borderRadius:'var(--r-lg)',boxShadow:hover?(t.featured?'var(--shadow-lg)':'var(--shadow-md)'):'none'}}>
      <PriceCard tier={t.tier} name={t.name} amount={t.amount} amountSuffix={t.amountSuffix} blurb={t.blurb} features={t.features} badge={t.badge} featured={t.featured}
        action={<Button variant={t.featured?'primary':'ghost'} href="Contact.html" fullWidth>{t.cta}</Button>}
        style={{height:'100%',transform:'none',boxShadow:'none',borderColor:hover&&!t.featured?'rgba(196,154,60,.55)':undefined,transition:'border-color .35s'}} />
    </div>
  );
}

const SHOW_ESTIMATOR=false;

function BundleCard({b,on,toggle}){
  const interactive=SHOW_ESTIMATOR;
  return (
    <div className="cs-bundle" data-reveal role={interactive?'checkbox':undefined} aria-checked={interactive?on:undefined} tabIndex={interactive?0:undefined} onClick={interactive?toggle:undefined}
      onKeyDown={interactive?e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}}:undefined}
      style={{cursor:interactive?'pointer':'default',position:'relative',display:'flex',flexDirection:'column',padding:'26px 26px 24px',borderRadius:'var(--r-md)',background:on?'var(--cream)':'#fff',border:'1px solid '+(on?'var(--gold)':'var(--line)'),boxShadow:on?'var(--shadow-gold)':'var(--shadow-sm)',fontFamily:'var(--font-ui)',outline:'none'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'16px'}}>
        <div>
          <div style={{fontSize:'var(--text-eyebrow)',textTransform:'uppercase',letterSpacing:'var(--track-tier)',fontWeight:'var(--fw-bold)',color:'var(--gold)',marginBottom:'8px'}}>{b.kicker}</div>
          <h3 style={{fontFamily:'var(--font-display)',fontSize:'23px',fontWeight:'var(--fw-semibold)',margin:'0 0 6px',color:'var(--ink)'}}>{b.name}</h3>
        </div>
        <span aria-hidden="true" style={{display:interactive?'flex':'none',flexShrink:0,width:'26px',height:'26px',borderRadius:'var(--r-circle)',border:'1.5px solid '+(on?'var(--gold)':'var(--line)'),background:on?'var(--gold)':'transparent',color:'#fff',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:'var(--fw-bold)',transition:'background .25s,border-color .25s,transform .25s',transform:on?'scale(1)':'scale(.92)'}}>{on?'✓':''}</span>
      </div>
      <p style={{fontSize:'var(--text-body-sm)',color:'var(--muted)',lineHeight:'var(--lh-body)',margin:'0 0 18px'}}>{b.summary}</p>
      <ul style={{listStyle:'none',padding:0,margin:'0 0 22px',display:'flex',flexDirection:'column',gap:'8px',flex:1}}>
        {b.items.map(i=><li key={i} style={{position:'relative',paddingLeft:'20px',fontSize:'var(--text-body-sm)',color:'var(--ink)'}}><span style={{position:'absolute',left:0,color:'var(--gold)',fontSize:'10px',top:'4px'}}>✦</span>{i}</li>)}
      </ul>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',borderTop:'1px solid var(--line)',paddingTop:'16px'}}>
        <span style={{fontFamily:'var(--font-display)',fontSize:'30px',fontWeight:'var(--fw-bold)',color:'var(--ink)'}}>{money(b.price)}</span>
        <span style={{fontSize:'var(--text-meta)',fontWeight:'var(--fw-bold)',color:on?'var(--gold-dark)':'var(--muted)'}}>{interactive?(on?'Added to estimate':'Add to estimate'):'Starting rate'}</span>
      </div>
    </div>
  );
}

function SummaryPanel({selected,total,onDownload,onClear}){
  const amountRef=useRef(null);
  useCountUp(total,amountRef);
  return (
    <aside style={{position:'sticky',top:'96px',background:'var(--ink)',color:'#fff',borderRadius:'var(--r-lg)',padding:'30px 28px',fontFamily:'var(--font-ui)',boxShadow:'var(--shadow-lg)'}}>
      <div style={{fontSize:'var(--text-eyebrow)',textTransform:'uppercase',letterSpacing:'var(--track-section-label)',fontWeight:'var(--fw-bold)',color:'var(--gold-light)',marginBottom:'18px'}}>Your estimate</div>
      <div style={{display:'flex',flexDirection:'column',gap:'12px',minHeight:'92px',marginBottom:'20px'}}>
        {selected.length===0 && <p style={{fontSize:'var(--text-body-sm)',color:'rgba(255,255,255,.55)',lineHeight:'var(--lh-body)',margin:0}}>Select the packages that fit your community. Your running estimate and a downloadable PDF appear here.</p>}
        {selected.map(b=>(
          <div key={b.id} style={{display:'flex',justifyContent:'space-between',gap:'14px',fontSize:'var(--text-body-sm)',paddingBottom:'12px',borderBottom:'1px solid rgba(255,255,255,.12)'}}>
            <span style={{color:'rgba(255,255,255,.86)'}}>{b.name}</span>
            <span style={{fontWeight:'var(--fw-bold)',color:'var(--gold-light)'}}>{money(b.price)}</span>
          </div>
        ))}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'6px'}}>
        <span style={{fontSize:'var(--text-meta)',textTransform:'uppercase',letterSpacing:'var(--track-meta)',color:'rgba(255,255,255,.6)',fontWeight:'var(--fw-bold)'}}>Add-on total</span>
        <span ref={amountRef} style={{fontFamily:'var(--font-display)',fontSize:'42px',fontWeight:'var(--fw-bold)',color:'var(--gold-light)',display:'inline-block'}}>$0</span>
      </div>
      <p style={{fontSize:'var(--text-label)',color:'rgba(255,255,255,.5)',lineHeight:1.5,margin:'0 0 22px'}}>Add-ons only — your event tier is quoted separately. Planning estimate; final vendor quotes confirmed before booking.</p>
      <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
        <Button variant="primary" fullWidth disabled={selected.length===0} onClick={onDownload}>Download Estimate PDF</Button>
        <Button variant="outline" fullWidth href="Contact.html">Send This to Community Spark</Button>
        {selected.length>0 && <button onClick={onClear} style={{background:'none',border:'none',color:'rgba(255,255,255,.5)',fontFamily:'inherit',fontSize:'var(--text-meta)',cursor:'pointer',padding:'6px',textDecoration:'underline'}}>Clear selections</button>}
      </div>
    </aside>
  );
}

function buildPdf(selected,total){
  const {jsPDF}=window.jspdf;
  const doc=new jsPDF({unit:'pt',format:'letter'});
  const W=612,M=54;
  doc.setFillColor(26,23,20);doc.rect(0,0,W,104,'F');
  doc.setFillColor(196,154,60);doc.rect(0,104,W,3,'F');
  doc.setTextColor(232,201,122);doc.setFont('times','bold');doc.setFontSize(11);doc.text('*',M,46);
  doc.setTextColor(255,255,255);doc.setFontSize(22);doc.text('Community Spark',M+12,48);
  doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(190,183,175);
  doc.text('APARTMENT COMMUNITY EVENTS  ·  INDIANA',M+12,64);
  doc.setFontSize(9);doc.setTextColor(232,201,122);doc.text('Event Add-On Estimate',M+12,84);
  doc.setTextColor(190,183,175);doc.text(new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}),W-M,84,{align:'right'});
  let y=150;
  doc.setTextColor(26,23,20);doc.setFont('times','normal');doc.setFontSize(18);
  doc.text('Selected add-on packages',M,y);y+=28;
  selected.forEach(b=>{
    doc.setDrawColor(232,221,208);doc.line(M,y-14,W-M,y-14);
    doc.setFont('helvetica','bold');doc.setFontSize(11);doc.setTextColor(26,23,20);
    doc.text(b.name,M,y);
    doc.text(money(b.price),W-M,y,{align:'right'});y+=15;
    doc.setFont('helvetica','normal');doc.setFontSize(9);doc.setTextColor(122,112,104);
    b.items.forEach(i=>{doc.text('•  '+i,M+8,y);y+=13});
    y+=16;
  });
  doc.setFillColor(26,23,20);doc.roundedRect(M,y-6,W-M*2,54,8,8,'F');
  doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(190,183,175);
  doc.text('ESTIMATED ADD-ON TOTAL',M+18,y+20);
  doc.setFont('times','bold');doc.setFontSize(24);doc.setTextColor(232,201,122);
  doc.text(money(total),W-M-18,y+27,{align:'right'});
  y+=84;
  doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.setTextColor(122,112,104);
  const note='This estimate covers add-on packages only. Your event tier (The Spark $800, The Glow $1,250, The Radiance $1,750+) is quoted separately. Packages are fully customizable — swap, scale, or combine elements during booking. Third-party vendor services are confirmed through current quotes before an event is booked. A date is reserved only after the proposal is approved.';
  doc.text(doc.splitTextToSize(note,W-M*2),M,y);
  doc.setDrawColor(232,221,208);doc.line(M,742,W-M,742);
  doc.setFontSize(8.5);doc.setTextColor(26,23,20);
  doc.text('Griffin Newton  ·  Griffin.newton@indycollab.com  ·  (317) 354-5880',M,758);
  doc.setTextColor(122,112,104);doc.text('communitysparkevents.netlify.app',W-M,758,{align:'right'});
  doc.save('community-spark-estimate.pdf');
}

function EstimateSection(){
  const bundles=window.CS_BUNDLES;
  const [picked,setPicked]=useState([]);
  const selected=bundles.filter(b=>picked.includes(b.id));
  const total=selected.reduce((s,b)=>s+b.price,0);
  return (
    <section className="cs-section cs-soft" id="estimate">
      <div className="cs-wrap">
        <div data-reveal><SectionHead label="Add-on packages" title="Build the experience one package at a time." body="Curated groupings of the enhancements property teams request most, priced at published planning rates. Every package is customizable — swap, scale, or combine elements during booking." /></div>
        <div data-reveal><EstimateNotice lead="Planning estimates only.">Package rates are current planning estimates for Indianapolis-area vendors. Final vendor quotes are confirmed before booking.</EstimateNotice></div>
        <div className={SHOW_ESTIMATOR?'cs-estimate-grid':'cs-estimate-grid is-solo'}>
          <div className="cs-bundle-grid" data-stagger>
            {bundles.map(b=><BundleCard key={b.id} b={b} on={picked.includes(b.id)} toggle={()=>setPicked(p=>p.includes(b.id)?p.filter(x=>x!==b.id):[...p,b.id])} />)}
            <p className="cs-bundle-note" data-reveal>Photography coverage, resident prize packs, additional staffing, catering, and custom requests are added during booking rather than priced here — they depend on your date, headcount, and vendor availability. <a href="Sponsors.html">A local sponsor can also offset part of your event cost.</a></p>
          </div>
          {SHOW_ESTIMATOR && <div><SummaryPanel selected={selected} total={total} onDownload={()=>buildPdf(selected,total)} onClear={()=>setPicked([])} /></div>}
        </div>
      </div>
    </section>
  );
}

const NAV_LINKS=[{label:'Home',href:'Home.html'},{label:'Event Catalog',href:'Events.html'},{label:'Pricing',href:'Pricing.html'},{label:'For Apartment Communities',href:'Partnerships.html'},{label:'Sponsor an Event',href:'Sponsors.html'},{label:'Gallery',href:'Gallery.html'},{label:'About & Contact',href:'About.html'}];

function MobileNav({open,setOpen}){
  useEffect(()=>{document.body.style.overflow=open?'hidden':'';return()=>{document.body.style.overflow=''}},[open]);
  return (
    <React.Fragment>
      <button className="cs-burger" aria-label="Open navigation" aria-expanded={open} onClick={()=>setOpen(true)}>☰</button>
      <div className={'cs-drawer'+(open?' is-open':'')} aria-hidden={!open}>
        <div className="cs-drawer-backdrop" onClick={()=>setOpen(false)}></div>
        <nav className="cs-drawer-panel" aria-label="Mobile navigation">
          <button className="cs-drawer-close" aria-label="Close navigation" onClick={()=>setOpen(false)}>✕</button>
          {NAV_LINKS.map(l=><a key={l.label} href={l.href} className={l.label==='Pricing'?'is-active':''} onClick={()=>setOpen(false)}>{l.label}</a>)}
          <Button variant="primary" href="Contact.html" fullWidth>Plan an Event</Button>
        </nav>
      </div>
    </React.Fragment>
  );
}

function App(){
  useSiteMotion();
  const [navOpen,setNavOpen]=useState(false);
  return (
    <React.Fragment>
      <AnnouncementBar>Now booking fall and holiday 2026 events for apartment communities</AnnouncementBar>
      <div style={{position:'sticky',top:0,zIndex:90}}>
        <SiteHeader active="Pricing" ctaLabel="Plan an Event" ctaHref="Contact.html" links={[{label:'Home',href:'Home.html'},{label:'Events',href:'Events.html'},{label:'Pricing',href:'Pricing.html'},{label:'Communities',href:'Partnerships.html'},{label:'Sponsors',href:'Sponsors.html'},{label:'Gallery',href:'Gallery.html'},{label:'About',href:'About.html'}]} />
        <MobileNav open={navOpen} setOpen={setNavOpen} />
        <div style={{height:'2px',background:'transparent',position:'relative',marginTop:'-2px'}}>
          <div id="scrollProgress" style={{height:'2px',background:'linear-gradient(90deg,var(--gold),var(--gold-light))',transform:'scaleX(0)',transformOrigin:'0 50%'}}></div>
        </div>
      </div>
      <main>
        <HeroSection />
        <section className="cs-section" id="tiers">
          <div className="cs-wrap">
            <div data-reveal><SectionHead label="Event tiers" title="Three starting points, room to customize." body="Pricing is based on scope, production level, and selected services — not a published resident headcount limit. Every tier includes planning, setup, on-site coordination, and breakdown." /></div>
            <div className="cs-tier-grid" data-stagger>
              {window.CS_TIERS.map(t=><TierCard key={t.name} t={t} />)}
            </div>
            <div className="cs-included-card" data-reveal>
              <span className="cs-included-label">Included in every tier</span>
              <div className="cs-included-items">
                {window.CS_INCLUDED.map(i=><span className="cs-included-item" key={i}><span>✦</span>{i}</span>)}
              </div>
            </div>
          </div>
        </section>
        <EstimateSection />
        <section className="cs-section cs-budget-section">
          <div className="cs-wrap cs-closing" data-reveal>
            <div className="cs-closing-copy">
              <span className="cs-closing-label">Working with a set budget?</span>
              <h2>We can build the strongest event within your number.</h2>
              <p>Tell us the budget and the two or three things that matter most to your residents. We'll recommend the event format, inclusions, and enhancements that get the most out of it — and let you know if a local sponsor could extend it further.</p>
            </div>
            <div className="cs-closing-action">
              <Button variant="primary" href="Contact.html">Build Around My Budget</Button>
              <a className="cs-closing-link" href="Events.html">Or browse the full event catalog</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
