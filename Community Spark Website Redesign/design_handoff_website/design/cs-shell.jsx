const CSDS = window.CommunitySparkDesignSystem_6bcc19;
const {SiteHeader:CSHeader,SiteFooter:CSFooter,AnnouncementBar:CSAnnounce,Button:CSButton} = CSDS;

const CS_REDUCED = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CS_NAV=[{label:'Home',href:'Home.html'},{label:'Events',href:'Events.html'},{label:'Pricing',href:'Pricing.html'},{label:'Communities',href:'Partnerships.html'},{label:'Sponsors',href:'Sponsors.html'},{label:'Gallery',href:'Gallery.html'},{label:'About',href:'About.html'}];
const CS_NAV_LONG=[{label:'Home',href:'Home.html'},{label:'Event Catalog',href:'Events.html'},{label:'Pricing',href:'Pricing.html'},{label:'For Apartment Communities',href:'Partnerships.html'},{label:'Sponsor an Event',href:'Sponsors.html'},{label:'Gallery',href:'Gallery.html'},{label:'About & Contact',href:'About.html'}];

function useReveal(dep){
  React.useEffect(()=>{
    const all=[...document.querySelectorAll('[data-reveal]:not(.is-in)')];
    const groups=[...document.querySelectorAll('[data-stagger]')];
    if(CS_REDUCED()){all.forEach(e=>e.classList.add('is-in'));return}
    const pending=[
      ...groups.map(g=>({el:g,run:()=>[...g.querySelectorAll('[data-reveal]')].forEach((k,i)=>{k.style.transitionDelay=Math.min(i,10)*0.06+'s';k.classList.add('is-in')})})),
      ...all.filter(e=>!e.closest('[data-stagger]')).map(e=>({el:e,run:()=>e.classList.add('is-in')}))
    ];
    let queued=false;
    const cleanup=()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll)};
    const check=()=>{
      queued=false;
      const vh=window.innerHeight;
      for(let i=pending.length-1;i>=0;i--){
        const r=pending[i].el.getBoundingClientRect();
        if(r.top<vh-60&&r.bottom>0){pending[i].run();pending.splice(i,1)}
      }
      if(!pending.length)cleanup();
    };
    const onScroll=()=>{if(!queued){queued=true;requestAnimationFrame(check)}};
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    check();
    const safety=setTimeout(()=>{pending.forEach(p=>p.run());pending.length=0},4000);
    return()=>{clearTimeout(safety);cleanup()};
  },[dep]);
}

function useHeaderMotion(){
  React.useEffect(()=>{
    const bar=document.getElementById('scrollProgress');
    const heroBg=document.getElementById('heroBg'),hero=document.getElementById('pageHero');
    const tick=()=>{
      if(bar){const max=document.documentElement.scrollHeight-window.innerHeight;bar.style.transform='scaleX('+(max>0?window.scrollY/max:0)+')'}
      if(heroBg&&hero){const p=Math.min(1,Math.max(0,window.scrollY/(hero.offsetHeight||1)));heroBg.style.transform='translateY('+(p*70)+'px) scale(1.12)'}
    };
    let q=false;
    const onScroll=()=>{if(!q){q=true;requestAnimationFrame(()=>{q=false;tick()})}};
    window.addEventListener('scroll',onScroll,{passive:true});
    tick();
    return()=>window.removeEventListener('scroll',onScroll);
  },[]);
}

function SiteShell({active,children}){
  const [open,setOpen]=React.useState(false);
  useHeaderMotion();
  React.useEffect(()=>{document.body.style.overflow=open?'hidden':'';return()=>{document.body.style.overflow=''}},[open]);
  const activeLong=(CS_NAV_LONG.find(l=>l.href===(CS_NAV.find(n=>n.label===active)||{}).href)||{}).label;
  return (
    <React.Fragment>
      <CSAnnounce>Now booking fall and holiday 2026 events for apartment communities</CSAnnounce>
      <div style={{position:'sticky',top:0,zIndex:90}}>
        <CSHeader active={active} links={CS_NAV} ctaLabel="Plan an Event" ctaHref="Contact.html" />
        <button className="cs-burger" aria-label="Open navigation" aria-expanded={open} onClick={()=>setOpen(true)}>☰</button>
        <div className={'cs-drawer'+(open?' is-open':'')} aria-hidden={!open}>
          <div className="cs-drawer-backdrop" onClick={()=>setOpen(false)}></div>
          <nav className="cs-drawer-panel" aria-label="Mobile navigation">
            <button className="cs-drawer-close" aria-label="Close navigation" onClick={()=>setOpen(false)}>✕</button>
            {CS_NAV_LONG.map(l=><a key={l.label} href={l.href} className={l.label===activeLong?'is-active':''} onClick={()=>setOpen(false)}>{l.label}</a>)}
            <CSButton variant="primary" href="Contact.html" fullWidth>Plan an Event</CSButton>
          </nav>
        </div>
        <div style={{height:'2px',position:'relative',marginTop:'-2px'}}>
          <div id="scrollProgress" style={{height:'2px',background:'linear-gradient(90deg,var(--gold),var(--gold-light))',transform:'scaleX(0)',transformOrigin:'0 50%'}}></div>
        </div>
      </div>
      <main>{children}</main>
      <CSFooter columns={[
        {title:'Explore',links:[['Event Catalog','Events.html'],['Pricing','Pricing.html'],['Gallery','Gallery.html'],['About','About.html']]},
        {title:'Programs',links:[['For Apartment Communities','Partnerships.html'],['Sponsor an Event','Sponsors.html'],['Custom Events','Contact.html'],['Budget-Based Events','Pricing.html']]},
        {title:'Contact',links:[['Griffin.newton@indycollab.com','mailto:Griffin.newton@indycollab.com'],['(317) 354-5880','tel:3173545880'],['Submit an Inquiry','Contact.html']]}
      ]} />
    </React.Fragment>
  );
}

function PageHero({image,eyebrow,title,lead,actions,proof=[]}){
  return (
    <section id="pageHero" className="cs-hero">
      <div id="heroBg" className="cs-hero-bg" style={{backgroundImage:'url('+image+')'}}></div>
      <div className="cs-hero-scrim"></div>
      <div className="cs-hero-content" data-stagger>
        {eyebrow && <p className="cs-hero-eyebrow" data-reveal>{eyebrow}</p>}
        <h1 data-reveal>{title}</h1>
        {lead && <p className="cs-hero-lead" data-reveal>{lead}</p>}
        {actions && <div className="cs-hero-actions" data-reveal>{actions}</div>}
        {proof.length>0 && <div className="cs-hero-proof" data-reveal>{proof.map(p=><span key={p}><span>✦</span>{p}</span>)}</div>}
      </div>
    </section>
  );
}

function ClosingPanel({label,title,body,ctaLabel,ctaHref,linkLabel,linkHref}){
  return (
    <div className="cs-wrap cs-closing" data-reveal>
      <div>
        <span className="cs-closing-label">{label}</span>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className="cs-closing-action">
        <CSButton variant="primary" href={ctaHref}>{ctaLabel}</CSButton>
        {linkLabel && <a className="cs-closing-link" href={linkHref}>{linkLabel}</a>}
      </div>
    </div>
  );
}

Object.assign(window,{useReveal,useHeaderMotion,SiteShell,PageHero,ClosingPanel,CS_NAV,CS_NAV_LONG,CS_REDUCED});
