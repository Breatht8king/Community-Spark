const DS = window.CommunitySparkDesignSystem_6bcc19;
const {SiteHeader,SiteFooter,AnnouncementBar,SectionHead,Button,FilterChip,SearchField} = DS;
const {useState,useEffect,useMemo} = React;

const REDUCED_EV = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const moneyEv = n => '$' + n.toLocaleString('en-US');

function useCatalogMotion(dep){
  useEffect(()=>{
    const all=[...document.querySelectorAll('[data-reveal]:not(.is-in)')];
    const groups=[...document.querySelectorAll('[data-stagger]')];
    if(REDUCED_EV()){all.forEach(e=>e.classList.add('is-in'));return}
    const pending=[
      ...groups.map(g=>({el:g,run:()=>[...g.querySelectorAll('[data-reveal]')].forEach((k,i)=>{k.style.transitionDelay=Math.min(i,10)*0.055+'s';k.classList.add('is-in')})})),
      ...all.filter(e=>!e.closest('[data-stagger]')).map(e=>({el:e,run:()=>e.classList.add('is-in')}))
    ];
    let queued=false;
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
    const cleanup=()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll)};
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    check();
    const safety=setTimeout(()=>{pending.forEach(p=>p.run());pending.length=0},4000);
    return()=>{clearTimeout(safety);cleanup()};
  },[dep]);
}

function useHeaderMotion(){
  useEffect(()=>{
    const bar=document.getElementById('scrollProgress');
    const heroBg=document.getElementById('heroBg'),hero=document.getElementById('catalogHero');
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
          {NAV_LINKS.map(l=><a key={l.label} href={l.href} className={l.label==='Event Catalog'?'is-active':''} onClick={()=>setOpen(false)}>{l.label}</a>)}
          <Button variant="primary" href="Contact.html" fullWidth>Plan an Event</Button>
        </nav>
      </div>
    </React.Fragment>
  );
}

function CatalogCard({ev,open,onToggle}){
  return (
    <div data-reveal className="cs-event-wrap">
    <article className={'cs-event'+(open?' is-open':'')}>
      <div className="cs-event-head">
        <span className="cs-event-cat">{ev.cat}</span>
        <span className="cs-event-dur">{ev.dur}</span>
      </div>
      <h3>{ev.title}</h3>
      <p className="cs-event-desc">{ev.desc}</p>
      <div className="cs-event-price">
        <span className="cs-event-amount">{moneyEv(ev.price)}</span>
        <span className="cs-event-band">Planning estimate</span>
      </div>
      <button className="cs-event-toggle" aria-expanded={open} onClick={onToggle}>
        {open?'Hide details':'View details'}
        <span className="cs-event-plus">{open?'–':'+'}</span>
      </button>
      {open && (
        <div className="cs-event-body">
          <div className="cs-event-lists">
            <div>
              <h4>What's included</h4>
              <ul>{ev.inc.map(i=><li key={i}><span>✓</span>{i}</li>)}</ul>
            </div>
            <div>
              <h4>Optional add-ons</h4>
              <ul className="is-addons">{ev.add.map(i=><li key={i}><span>+</span>{i}</li>)}</ul>
            </div>
          </div>
          {ev.note && <p className="cs-event-note"><strong>Vendor note:</strong> {ev.note}</p>}
          <p className="cs-event-fine">Estimate only. Final pricing may change with quantities, vendor pricing, taxes, staffing, delivery, and customization.</p>
          <div className="cs-event-actions">
            <Button size="sm" variant="primary" href={"Contact.html?intent=book&event="+encodeURIComponent(ev.title)}>Book This Event</Button>
            <Button size="sm" variant="inkGhost" href={"Contact.html?intent=question&event="+encodeURIComponent(ev.title)}>Ask a Question</Button>
          </div>
        </div>
      )}
    </article>
    </div>
  );
}

function Catalog(){
  const [q,setQ]=useState('');
  const [cat,setCat]=useState('all');
  const [band,setBand]=useState('all');
  const [openIds,setOpenIds]=useState([]);
  const toggleOpen=id=>setOpenIds(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id].slice(-3));
  const events=window.CS_EVENTS;
  const results=useMemo(()=>events.filter(e=>{
    const okCat=cat==='all'||e.tags.includes(cat);
    const okBand=band==='all'||String(e.price)===band;
    const okQ=!q.trim()||(e.title+' '+e.cat+' '+e.desc+' '+e.inc.join(' ')).toLowerCase().includes(q.trim().toLowerCase());
    return okCat&&okBand&&okQ;
  }),[q,cat,band]);
  useCatalogMotion(results.length+'-'+cat+'-'+band+'-'+q);
  const clear=()=>{setQ('');setCat('all');setBand('all')};
  return (
    <section className="cs-section" id="catalog">
      <div className="cs-wrap">
        <div data-reveal><SectionHead label="Event catalog" title="Find an event that fits your community." body="Twenty ready-to-book events, each with listed supplies, optional upgrades, and an up-front planning estimate. Every one can be customized." /></div>
        <div className="cs-filters" data-reveal>
          <SearchField value={q} onChange={e=>setQ(e.target.value)} placeholder="Search events, food, activities…" style={{maxWidth:'100%'}} />
          <div className="cs-filter-row">
            <span className="cs-filter-label">Category</span>
            <div className="cs-chips">{window.CS_CATEGORIES.map(c=><FilterChip key={c.id} active={cat===c.id} onClick={()=>setCat(c.id)}>{c.label}</FilterChip>)}</div>
          </div>
          <div className="cs-filter-row">
            <span className="cs-filter-label">Price plan</span>
            <div className="cs-chips">{window.CS_PRICE_BANDS.map(b=><FilterChip key={b.id} active={band===b.id} onClick={()=>setBand(b.id)}>{b.label}</FilterChip>)}</div>
          </div>
          <div className="cs-filter-foot">
            <span>Showing <strong>{results.length}</strong> of {events.length} events</span>
            {(q||cat!=='all'||band!=='all') && <button className="cs-clear" onClick={clear}>Clear filters</button>}
          </div>
        </div>
        {results.length>0 ? (
          <div className="cs-event-grid" data-stagger key={cat+band+q}>
            {results.map(ev=><CatalogCard key={ev.id} ev={ev} open={openIds.includes(ev.id)} onToggle={()=>toggleOpen(ev.id)} />)}
          </div>
        ) : (
          <div className="cs-empty" data-reveal>
            <h3>No events match your search.</h3>
            <p>Try a different keyword, or clear the filters to see all {events.length} events.</p>
            <Button variant="ghost" onClick={clear}>Clear filters</Button>
          </div>
        )}
      </div>
    </section>
  );
}

function EventsApp(){
  const [navOpen,setNavOpen]=useState(false);
  useHeaderMotion();
  return (
    <React.Fragment>
      <AnnouncementBar>Now booking fall and holiday 2026 events for apartment communities</AnnouncementBar>
      <div style={{position:'sticky',top:0,zIndex:90}}>
        <SiteHeader active="Events" ctaLabel="Plan an Event" ctaHref="Contact.html" links={[{label:'Home',href:'Home.html'},{label:'Events',href:'Events.html'},{label:'Pricing',href:'Pricing.html'},{label:'Communities',href:'Partnerships.html'},{label:'Sponsors',href:'Sponsors.html'},{label:'Gallery',href:'Gallery.html'},{label:'About',href:'About.html'}]} />
        <MobileNav open={navOpen} setOpen={setNavOpen} />
        <div style={{height:'2px',position:'relative',marginTop:'-2px'}}>
          <div id="scrollProgress" style={{height:'2px',background:'linear-gradient(90deg,var(--gold),var(--gold-light))',transform:'scaleX(0)',transformOrigin:'0 50%'}}></div>
        </div>
      </div>
      <main>
        <section id="catalogHero" className="cs-hero">
          <div id="heroBg" className="cs-hero-bg"></div>
          <div className="cs-hero-scrim"></div>
          <div className="cs-hero-content" data-stagger>
            <p className="cs-hero-eyebrow" data-reveal>Event catalog</p>
            <h1 data-reveal>Twenty events your residents will actually show up for.</h1>
            <p className="cs-hero-lead" data-reveal>Each one lists exactly what's included, what it costs, and what you can add — so you can pick a date instead of chasing a quote.</p>
            <div className="cs-hero-actions" data-reveal>
              <Button variant="primary" href="#catalog">Browse the Catalog</Button>
              <Button variant="outline" href="Contact.html">Request a Custom Event</Button>
            </div>
            <div className="cs-hero-proof" data-reveal>
              {['Three price plans','Every event customizable','Sponsor support available'].map(p=><span key={p}><span>✦</span>{p}</span>)}
            </div>
          </div>
        </section>
        <Catalog />
        <section className="cs-section cs-closing-section">
          <div className="cs-wrap cs-closing" data-reveal>
            <div className="cs-closing-copy">
              <span className="cs-closing-label">Not seeing the right fit?</span>
              <h2>Request a fully custom event.</h2>
              <p>Same process as any preset — tell us what you have in mind and the budget you're working with, and we'll build the concept, inclusions, and vendor plan around it.</p>
            </div>
            <div className="cs-closing-action">
              <Button variant="primary" href="Contact.html">Request a Custom Event</Button>
              <a className="cs-closing-link" href="Pricing.html">Or see how pricing works</a>
            </div>
          </div>
          <div className="cs-wrap cs-sponsor-note" data-reveal>
            <div>
              <span className="cs-sponsor-label">Local business?</span>
              <p>You can sponsor any event in this catalog. Fund a piece of an event and get your name in front of a few hundred nearby households — attending is optional.</p>
            </div>
            <Button variant="ghost" href="Sponsors.html">See Sponsorship Levels</Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<EventsApp />);
