const { useState, useMemo, useEffect, useRef } = React;
const QB_DS = window.CommunitySparkDesignSystem_6bcc19;

const qbMoney = n => '$' + (isFinite(n) ? n : 0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const qbNum = n => (isFinite(n) ? n : 0).toLocaleString('en-US');
const qbStoreName = k => (window.QB_STORES.find(s=>s.key===k)||{}).name || '—';
const qbItem = id => window.QB_ITEMS.find(i=>i.id===id);

// Cheapest available store for an item; in-house/flat items return {store:'inhouse'}
function qbBest(item,allowed){
  if(item.flat!=null) return {store:'inhouse',price:item.flat};
  const keys=(allowed&&allowed.length?allowed:window.QB_STORES.map(s=>s.key));
  let best=null;
  keys.forEach(k=>{const p=item.prices[k];if(p!=null&&(best==null||p<best.price))best={store:k,price:p};});
  if(!best) window.QB_STORES.forEach(s=>{const p=item.prices[s.key];if(p!=null&&(best==null||p<best.price))best={store:s.key,price:p};});
  return best||{store:null,price:0};
}
function qbLineCalc(line,allowed){
  const item=qbItem(line.item); if(!item) return {price:0,units:0,perUnit:0,store:null,unitPrice:0,best:{store:null,price:0}};
  const best=qbBest(item,allowed);
  const picked=line.store&&line.store!=='best'&&(!allowed||!allowed.length||allowed.indexOf(line.store)>=0)&&item.prices[line.store]!=null?line.store:best.store;
  const unitPrice=item.flat!=null?item.flat:(item.prices[picked]!=null?item.prices[picked]:best.price);
  const units=line.packs*item.per;
  const price=line.packs*unitPrice;
  return {price,units,perUnit:units?price/units:0,store:picked,unitPrice,best,item};
}

const qbLabel={fontSize:'var(--text-eyebrow)',textTransform:'uppercase',letterSpacing:'var(--track-section-label)',fontWeight:'var(--fw-bold)',color:'var(--muted)'};
const qbCard={background:'var(--surface-card)',border:'1px solid var(--line)',borderRadius:'var(--r-md)'};

function QBNumber({value,onChange,width=88,align='right',prefix,suffix,step=1,min=0}){
  const [focus,setFocus]=useState(false);
  return (
    <span style={{display:'inline-flex',alignItems:'center',gap:'4px',padding:'0 10px',width,border:`1px solid ${focus?'var(--gold)':'var(--line)'}`,borderRadius:'var(--r-sm)',background:focus?'#fff':'var(--cream)',boxShadow:focus?'var(--ring-field)':'none',transition:'border-color var(--dur-base)'}}>
      {prefix&&<span style={{fontSize:'var(--text-body-sm)',color:'var(--muted)'}}>{prefix}</span>}
      <input type="number" step={step} min={min} value={value} onChange={onChange} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
        style={{flex:1,width:'100%',minWidth:0,minHeight:'38px',border:'none',background:'transparent',outline:'none',textAlign:align,fontFamily:'var(--font-ui)',fontSize:'var(--text-body-sm)',fontWeight:'var(--fw-semibold)',color:'var(--ink)'}}/>
      {suffix&&<span style={{fontSize:'var(--text-body-sm)',color:'var(--muted)'}}>{suffix}</span>}
    </span>
  );
}

function QBPicker({cat,onAdd,onClose,allowed}){
  const {Button}=QB_DS;
  const [q,setQ]=useState('');
  const [fam,setFam]=useState(null);
  const [variant,setVariant]=useState(null);
  const [packs,setPacks]=useState({});
  const [added,setAdded]=useState({});
  useEffect(()=>{const h=e=>{if(e.key==='Escape')onClose();};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h);},[onClose]);

  const families=useMemo(()=>window.QB_FAMILIES.filter(f=>f.cat===cat.id&&(f.name+' '+f.variants.map(v=>v.name).join(' ')).toLowerCase().includes(q.toLowerCase())),[cat,q]);
  const variants=fam?fam.variants:[];
  const named=variants.filter(v=>v.name);
  const step=!fam?1:(named.length>1&&!variant?2:3);
  const activeVariant=variant||(variants.length===1?variants[0]:named.length<=1?variants[0]:null);
  const rows=fam&&activeVariant?window.QB_ITEMS.filter(i=>i.family===fam.id&&i.variant===activeVariant.id):[];

  const back=()=>{if(step===3&&named.length>1){setVariant(null);}else{setFam(null);setVariant(null);}};
  const crumb=['','Choose a size'][0];

  return (
    <div style={{position:'fixed',inset:0,zIndex:200,display:'grid',placeItems:'center',padding:'24px'}}>
      <div onClick={onClose} style={{position:'absolute',inset:0,background:'var(--scrim-drawer)'}}></div>
      <div style={{position:'relative',width:'min(880px,100%)',maxHeight:'86vh',display:'flex',flexDirection:'column',background:'var(--paper)',borderRadius:'var(--r-lg)',boxShadow:'var(--shadow-lg)',overflow:'hidden'}}>
        <div style={{padding:'24px 32px 20px',borderBottom:'1px solid var(--line)'}}>
          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'20px'}}>
            <div style={{minWidth:0}}>
              <p style={{...qbLabel,margin:'0 0 10px',color:'var(--gold)',display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap',rowGap:'4px',lineHeight:1.5}}>
                <span>{cat.name}</span>
                {fam&&<React.Fragment><span style={{color:'var(--line)'}}>/</span><span style={{color:'var(--muted)'}}>{fam.name}</span></React.Fragment>}
                {fam&&activeVariant&&activeVariant.name&&<React.Fragment><span style={{color:'var(--line)'}}>/</span><span style={{color:'var(--muted)'}}>{activeVariant.name}</span></React.Fragment>}
              </p>
              <h2 style={{fontFamily:'var(--font-display)',fontSize:'27px',fontWeight:'var(--fw-semibold)',margin:0,lineHeight:1.15}}>
                {step===1?'What are you adding?':step===2?'Which one?':'Pick a pack size'}
              </h2>
            </div>
            <div style={{display:'flex',gap:'8px',flexShrink:0}}>
              {fam&&<button onClick={back} style={{height:'38px',padding:'0 16px',border:'1px solid var(--line)',borderRadius:'var(--r-pill)',background:'var(--paper)',color:'var(--ink)',fontFamily:'var(--font-ui)',fontSize:'var(--text-micro)',fontWeight:'var(--fw-bold)',cursor:'pointer'}}>← Back</button>}
              <button onClick={onClose} aria-label="Close" style={{width:'38px',height:'38px',border:'1px solid var(--line)',borderRadius:'var(--r-pill)',background:'var(--paper)',color:'var(--ink)',fontSize:'14px',cursor:'pointer'}}>✕</button>
            </div>
          </div>
          {step===1&&<div style={{display:'flex',alignItems:'center',gap:'12px',marginTop:'18px',padding:'0 18px',background:'#fff',border:'1px solid var(--line)',borderRadius:'var(--r-pill)'}}>
            <span style={{color:'var(--muted)',fontSize:'16px'}}>⌕</span>
            <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder={`Search ${cat.name.toLowerCase()}…`}
              style={{flex:1,minHeight:'46px',border:'none',background:'transparent',outline:'none',fontSize:'var(--text-body)',fontFamily:'var(--font-ui)',color:'var(--ink)'}}/>
          </div>}
        </div>

        <div style={{overflowY:'auto',padding:'20px 32px 28px'}}>
          {step===1&&<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'12px'}}>
            {families.length===0&&<p style={{fontSize:'var(--text-body-sm)',color:'var(--muted)'}}>Nothing matches “{q}”.</p>}
            {families.map(f=>{
              const its=window.QB_ITEMS.filter(i=>i.family===f.id);
              const low=Math.min.apply(null,its.map(i=>qbBest(i,allowed).price));
              const nv=f.variants.filter(v=>v.name).length;
              return (
                <button key={f.id} onClick={()=>{setFam(f);setVariant(null);}} style={{textAlign:'left',padding:'16px 18px',border:'1px solid var(--line)',borderRadius:'var(--r-md)',background:'var(--surface-card)',cursor:'pointer',fontFamily:'var(--font-ui)',transition:'border-color var(--dur-base),transform var(--dur-base)'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.transform='translateY(-2px)';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--line)';e.currentTarget.style.transform='none';}}>
                  <strong style={{display:'block',fontSize:'var(--text-body)',fontWeight:'var(--fw-semibold)',color:'var(--ink)',marginBottom:'5px'}}>{f.name}</strong>
                  <span style={{fontSize:'var(--text-micro)',color:'var(--muted)'}}>
                    {nv>1?nv+' options · ':''}{f.packs.length} pack size{f.packs.length>1?'s':''} · from {qbMoney(low)}
                  </span>
                </button>
              );
            })}
          </div>}

          {step===2&&<div style={{display:'flex',flexWrap:'wrap',gap:'10px'}}>
            {named.map(v=>(
              <button key={v.id} onClick={()=>setVariant(v)} style={{minHeight:'44px',whiteSpace:'nowrap',padding:'0 22px',border:'1px solid var(--line)',borderRadius:'var(--r-pill)',background:'var(--surface-card)',cursor:'pointer',fontFamily:'var(--font-ui)',fontSize:'var(--text-body-sm)',fontWeight:'var(--fw-semibold)',color:'var(--ink)'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.background='#fff';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--line)';e.currentTarget.style.background='var(--surface-card)';}}>{v.name}</button>
            ))}
          </div>}

          {step===3&&<div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            {rows.map(it=>{
              const b=qbBest(it,allowed); const n=packs[it.id]??1;
              const stores=window.QB_STORES.filter(s=>it.prices[s.key]!=null&&(!allowed||!allowed.length||allowed.indexOf(s.key)>=0));
              return (
                <div key={it.id} style={{...qbCard,padding:'18px 20px',display:'grid',gap:'14px'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'18px',flexWrap:'wrap'}}>
                    <div>
                      <strong style={{display:'block',fontSize:'var(--text-body-lg)',fontWeight:'var(--fw-semibold)',color:'var(--ink)'}}>{it.packLabel}</strong>
                      <span style={{fontSize:'var(--text-micro)',color:'var(--muted)'}}>{it.per} {it.unit}{it.per>1?'s':''} per pack · {qbMoney(b.price/it.per)} per {it.unit}</span>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <QBNumber value={n} onChange={e=>setPacks({...packs,[it.id]:Math.max(1,+e.target.value||1)})} width={78} align="center" min={1} suffix="pk"/>
                      <Button size="sm" variant={added[it.id]?'inkGhost':'primary'} onClick={()=>{onAdd(it,n);setAdded({...added,[it.id]:(added[it.id]||0)+n});}}>
                        {added[it.id]?`Added ${added[it.id]}`:'Add to quote'}
                      </Button>
                    </div>
                  </div>
                  {it.flat!=null
                    ? <p style={{margin:0,fontSize:'var(--text-body-sm)'}}><strong>{qbMoney(it.flat)}</strong> <span style={{color:'var(--muted)'}}>in-house rate, per pack</span></p>
                    : <div style={{display:'flex',flexWrap:'wrap',gap:'8px',paddingTop:'12px',borderTop:'1px solid var(--line)'}}>
                        {stores.map(s=>{
                          const best=it.prices[s.key]===b.price;
                          return (
                            <span key={s.key} style={{display:'inline-flex',alignItems:'baseline',gap:'7px',padding:'7px 14px',borderRadius:'var(--r-pill)',background:best?'var(--ink)':'var(--cream)',color:best?'#fff':'var(--ink)',fontSize:'var(--text-micro)'}}>
                              <span style={{opacity:best?.7:.6}}>{s.name}</span>
                              <strong style={{fontWeight:'var(--fw-bold)'}}>{qbMoney(it.prices[s.key])}</strong>
                              {best&&<span style={{color:'var(--gold-light)',fontSize:'9px',letterSpacing:'var(--track-meta)',textTransform:'uppercase',fontWeight:'var(--fw-bold)'}}>best</span>}
                            </span>
                          );
                        })}
                      </div>}
                </div>
              );
            })}
          </div>}
        </div>
      </div>
    </div>
  );
}

function QBShoppingList({lines,allowed}){
  const groups=[];
  const keys=window.QB_STORES.filter(s=>!allowed||!allowed.length||allowed.indexOf(s.key)>=0).map(s=>s.key).concat(['inhouse']);
  keys.forEach(k=>{
    const rows=lines.map(l=>({l,c:qbLineCalc(l,allowed)})).filter(r=>r.c.store===k||(k==='inhouse'&&r.c.item.flat!=null));
    if(rows.length) groups.push({key:k,name:k==='inhouse'?'In-house / rentals':qbStoreName(k),rows,total:rows.reduce((s,r)=>s+r.c.price,0)});
  });
  if(!groups.length) return null;
  return (
    <div style={{marginTop:'34px'}}>
      <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',gap:'16px',marginBottom:'16px'}}>
        <h2 style={{fontFamily:'var(--font-display)',fontSize:'24px',fontWeight:'var(--fw-semibold)',margin:0}}>Shopping list by store</h2>
        <span style={{fontSize:'var(--text-micro)',color:'var(--muted)'}}>{groups.length} stop{groups.length>1?'s':''}</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'16px'}}>
        {groups.map(g=>(
          <div key={g.key} style={{...qbCard,padding:'20px 22px',display:'flex',flexDirection:'column',gap:'12px'}}>
            <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',gap:'12px',paddingBottom:'10px',borderBottom:'1px solid var(--ink)'}}>
              <strong style={{fontFamily:'var(--font-display)',fontSize:'19px',fontWeight:'var(--fw-semibold)'}}>{g.name}</strong>
              <strong style={{fontSize:'var(--text-body-sm)'}}>{qbMoney(g.total)}</strong>
            </div>
            {g.rows.map(({l,c})=>(
              <div key={l.id} style={{display:'flex',justifyContent:'space-between',gap:'14px',fontSize:'var(--text-body-sm)'}}>
                <span style={{color:'var(--ink)'}}>{l.packs}× <span style={{color:'var(--muted)'}}>{c.item.short} · {c.item.packLabel}</span></span>
                <span style={{whiteSpace:'nowrap',color:'var(--muted)'}}>{qbMoney(c.price)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function QBSavedQuotes({saved,onLoad,onDelete,onDuplicate,onRename}){
  const [editing,setEditing]=useState(null);
  const [draft,setDraft]=useState('');
  const linkBtn=(label,onClick,strong)=>(
    <button onClick={onClick} style={{padding:0,border:'none',background:'none',cursor:'pointer',fontFamily:'var(--font-ui)',fontSize:'var(--text-micro)',fontWeight:strong?'var(--fw-bold)':'var(--fw-regular)',color:strong?'var(--gold-dark)':'var(--muted)',textDecoration:'underline',textUnderlineOffset:'3px'}}>{label}</button>
  );
  if(!saved.length) return <p style={{margin:0,fontSize:'var(--text-body-sm)',color:'var(--muted)',lineHeight:'var(--lh-body)'}}>No saved quotes yet. Save one and it stays on this device.</p>;
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
      {saved.map(s=>(
        <div key={s.id} style={{...qbCard,padding:'14px 16px',display:'grid',gap:'8px'}}>
          {editing===s.id
            ? <div style={{display:'flex',gap:'8px'}}>
                <input autoFocus value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){onRename(s.id,draft);setEditing(null);}}}
                  style={{flex:1,minWidth:0,padding:'8px 10px',border:'1px solid var(--gold)',borderRadius:'var(--r-sm)',background:'#fff',fontFamily:'var(--font-ui)',fontSize:'var(--text-body-sm)',color:'var(--ink)',outline:'none'}}/>
                {linkBtn('Save',()=>{onRename(s.id,draft);setEditing(null);},true)}
              </div>
            : <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',gap:'12px'}}>
                <strong style={{fontSize:'var(--text-body-sm)',fontWeight:'var(--fw-semibold)',color:'var(--ink)'}}>{s.name||'Untitled event'}</strong>
                <span style={{fontSize:'var(--text-micro)',color:'var(--muted)',whiteSpace:'nowrap'}}>{s.date}</span>
              </div>}
          <div style={{display:'flex',gap:'16px',fontSize:'var(--text-micro)',color:'var(--muted)'}}>
            <span>Cost {qbMoney(s.cost)}</span><span>Charged {qbMoney(s.charge)}</span><span>Margin {s.charge?((s.charge-s.cost)/s.charge*100).toFixed(1):'0.0'}%</span>
          </div>
          <div style={{display:'flex',gap:'14px',flexWrap:'wrap'}}>
            {linkBtn('Load',()=>onLoad(s),true)}
            {linkBtn('Duplicate',()=>onDuplicate(s))}
            {linkBtn('Rename',()=>{setEditing(s.id);setDraft(s.name||'');})}
            {linkBtn('Delete',()=>onDelete(s.id))}
          </div>
        </div>
      ))}
    </div>
  );
}

function QBPrintSheet({name,guests,lines,charge,allowed}){
  const cats=window.QB_CATEGORIES.filter(c=>lines.some(l=>l.cat===c.id));
  return (
    <div className="qb-print">
      <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',borderBottom:'2px solid var(--ink)',paddingBottom:'14px',marginBottom:'26px'}}>
        <div>
          <p style={{...qbLabel,color:'var(--gold-dark)',margin:'0 0 6px'}}>Community Spark · Event Quote</p>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'34px',fontWeight:'var(--fw-semibold)',margin:0,lineHeight:1.1}}>{name||'Event quote'}</h1>
        </div>
        <p style={{margin:0,fontSize:'var(--text-meta)',color:'var(--muted)',textAlign:'right'}}>
          {new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}<br/>{guests} guests
        </p>
      </div>
      {cats.map(c=>(
        <div key={c.id} style={{marginBottom:'20px'}}>
          <p style={{...qbLabel,color:'var(--ink)',margin:'0 0 8px'}}>{c.name}</p>
          {lines.filter(l=>l.cat===c.id).map(l=>{const calc=qbLineCalc(l,allowed);return (
            <div key={l.id} style={{display:'flex',justifyContent:'space-between',gap:'20px',padding:'6px 0',borderBottom:'1px solid var(--line)',fontSize:'var(--text-body-sm)'}}>
              <span>{calc.item.name}{l.note?<em style={{color:'var(--muted)'}}> — {l.note}</em>:null}</span>
              <span style={{whiteSpace:'nowrap',color:'var(--muted)'}}>{qbNum(calc.units)} {calc.item.unit}{calc.units!==1?'s':''}</span>
            </div>
          );})}
        </div>
      ))}
      {!cats.length&&<p style={{fontSize:'var(--text-body-sm)',color:'var(--muted)'}}>No line items on this quote yet.</p>}
      <div style={{marginTop:'30px',paddingTop:'16px',borderTop:'2px solid var(--ink)',display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
        <strong style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:'var(--fw-semibold)'}}>Total</strong>
        <strong style={{fontFamily:'var(--font-display)',fontSize:'30px',fontWeight:'var(--fw-bold)'}}>{qbMoney(charge)}</strong>
      </div>
      <p style={{marginTop:'14px',fontSize:'var(--text-micro)',color:'var(--muted)',lineHeight:'var(--lh-body)'}}>Quote includes planning, sourcing, setup, and teardown as listed. Valid 30 days. Final counts confirmed one week before the event.</p>
    </div>
  );
}

Object.assign(window,{QBPicker,QBSavedQuotes,QBPrintSheet,QBShoppingList,QBNumber,qbMoney,qbNum,qbStoreName,qbItem,qbBest,qbLineCalc,qbLabel,qbCard});
