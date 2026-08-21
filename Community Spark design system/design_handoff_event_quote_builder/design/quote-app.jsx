const { useState, useEffect, useRef } = React;
const { Button, SectionLabel, BrandMark } = window.CommunitySparkDesignSystem_6bcc19;
const QB_KEY='cs-event-quote-builder-v1';

function QBSummary({cost,charge,profit,margin,target,guests}){
  const cells=[['Total cost',qbMoney(cost)],['Per guest',guests>0?qbMoney(cost/guests):'—'],['Charging client',qbMoney(charge)],['Profit',qbMoney(profit)],['Margin',charge?margin.toFixed(1)+'%':'—']];
  const low=charge>0&&margin<target;
  return (
    <div style={{position:'sticky',top:0,zIndex:60,background:'var(--ink)',color:'#fff'}}>
      <div className="qb-wrap" style={{padding:'18px clamp(20px,3.5vw,56px)',display:'flex',alignItems:'center',gap:'clamp(20px,4vw,54px)',flexWrap:'wrap'}}>
        {cells.map(([l,v],i)=>(
          <div key={l} style={{display:'flex',flexDirection:'column',gap:'5px',paddingLeft:i?'clamp(20px,4vw,54px)':0,borderLeft:i?'1px solid rgba(255,255,255,.16)':'none'}}>
            <span style={{...qbLabel,color:'var(--gold-light)'}}>{l}</span>
            <strong style={{fontFamily:'var(--font-display)',fontSize:'27px',fontWeight:'var(--fw-bold)',lineHeight:1}}>{v}</strong>
          </div>
        ))}
        {low&&<span style={{marginLeft:'auto',fontSize:'var(--text-micro)',color:'var(--gold-light)',border:'1px solid rgba(232,201,122,.4)',borderRadius:'var(--r-pill)',padding:'7px 14px'}}>Below your {target}% target</span>}
      </div>
    </div>
  );
}

function QBLine({line,onChange,onRemove,allowed}){
  const calc=qbLineCalc(line,allowed); const item=calc.item; if(!item) return null;
  const [noteOpen,setNoteOpen]=useState(!!line.note);
  const stores=window.QB_STORES.filter(s=>item.prices[s.key]!=null&&(!allowed.length||allowed.indexOf(s.key)>=0));
  return (
    <div className="qb-line">
      <div className="qb-row">
        <div style={{minWidth:0}}>
          <p style={{margin:'0 0 4px',fontSize:'var(--text-body-sm)',fontWeight:'var(--fw-semibold)',color:'var(--ink)',lineHeight:1.35}}>{item.short||item.name}</p>
          <div style={{display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap'}}>
            <span style={{fontSize:'var(--text-micro)',color:'var(--muted)'}}>{item.packLabel}</span>
            <button onClick={()=>setNoteOpen(!noteOpen)} style={{padding:0,border:'none',background:'none',cursor:'pointer',fontFamily:'var(--font-ui)',fontSize:'var(--text-micro)',color:'var(--gold-dark)'}}>
              {noteOpen?'Hide note':line.note?'Note added':'+ Note'}
            </button>
          </div>
        </div>
        <QBNumber value={line.packs} min={1} width={84} align="center" onChange={e=>onChange({...line,packs:Math.max(0,+e.target.value||0)})}/>
        <span style={{fontFamily:'var(--font-display)',fontWeight:'var(--fw-semibold)',fontSize:'var(--text-body-sm)',color:'var(--ink)',textAlign:'right'}}>{qbMoney(calc.unitPrice)} <em style={{display:'block',fontFamily:'var(--font-ui)',fontWeight:'var(--fw-regular)',fontStyle:'normal',fontSize:'var(--text-micro)',color:'var(--muted)'}}>/ pack</em></span>
        <span style={{fontSize:'var(--text-body-sm)',color:'var(--ink)',textAlign:'right'}}>{qbNum(calc.units)} <em style={{fontStyle:'normal',color:'var(--muted)'}}>{item.unit}{calc.units!==1?'s':''}</em></span>
        <span className="qb-perunit" style={{fontFamily:'var(--font-display)',fontSize:'var(--text-body-sm)',color:'var(--muted)',textAlign:'right'}}>{qbMoney(calc.perUnit)}</span>
        <div className="qb-store" style={{textAlign:'left'}}>
          {item.flat
            ? <span style={{fontSize:'var(--text-micro)',color:'var(--muted)'}}>In-house rate</span>
            : <select value={line.store||'best'} onChange={e=>onChange({...line,store:e.target.value})}
              style={{width:'100%',padding:'8px 10px',border:'1px solid var(--line)',borderRadius:'var(--r-pill)',background:'#fff',fontFamily:'var(--font-ui)',fontSize:'var(--text-micro)',color:'var(--ink)',cursor:'pointer'}}>
                <option value="best">Best · {qbStoreName(calc.best.store)}</option>
                {stores.map(s=><option key={s.key} value={s.key}>{s.name} · {qbMoney(item.prices[s.key])}</option>)}
              </select>}
        </div>
        <strong style={{fontFamily:'var(--font-display)',fontSize:'var(--text-body)',fontWeight:'var(--fw-semibold)',textAlign:'right'}}>{qbMoney(calc.price)}</strong>
        <button onClick={onRemove} aria-label="Remove line" style={{width:'28px',height:'28px',border:'1px solid var(--line)',borderRadius:'var(--r-pill)',background:'transparent',color:'var(--muted)',fontSize:'11px',cursor:'pointer'}}>✕</button>
      </div>
      {noteOpen&&<div style={{padding:'0 12px 14px'}}>
        <input value={line.note||''} onChange={e=>onChange({...line,note:e.target.value})} placeholder="e.g. cherry flavor only, deliver Friday"
          style={{width:'100%',padding:'10px 13px',border:'1px solid var(--line)',borderRadius:'var(--r-sm)',background:'var(--cream)',fontFamily:'var(--font-ui)',fontSize:'var(--text-body-sm)',color:'var(--ink)',outline:'none'}}/>
      </div>}
    </div>
  );
}

function QBApp(){
  const load=()=>{try{return JSON.parse(localStorage.getItem(QB_KEY))||{}}catch(e){return {}}};
  const init=load();
  const [lines,setLines]=useState(init.lines||[]);
  const [name,setName]=useState(init.name||'');
  const [guests,setGuests]=useState(init.guests??60);
  const [charge,setCharge]=useState(init.charge??0);
  const [taxPct,setTaxPct]=useState(init.taxPct??7);
  const [delivery,setDelivery]=useState(init.delivery??0);
  const [target,setTarget]=useState(init.target??35);
  const [saved,setSaved]=useState(init.saved||[]);
  const [allowed,setAllowed]=useState(init.allowed||window.QB_STORES.map(s=>s.key));
  const [picker,setPicker]=useState(null);
  const uid=useRef(Date.now());

  useEffect(()=>{localStorage.setItem(QB_KEY,JSON.stringify({lines,name,guests,charge,taxPct,delivery,target,saved,allowed}));},[lines,name,guests,charge,taxPct,delivery,target,saved,allowed]);

  const goods=lines.reduce((s,l)=>s+qbLineCalc(l,allowed).price,0);
  const tax=goods*(taxPct/100);
  const cost=goods+tax+(+delivery||0);
  const profit=(+charge||0)-cost;
  const margin=charge>0?profit/charge*100:0;
  const markup=cost>0?profit/cost*100:0;

  const addLine=(it,packs)=>{uid.current++;setLines(ls=>[...ls,{id:'l'+uid.current,cat:it.cat,item:it.id,packs,store:'best',note:''}]);};
  const scaleToGuests=()=>setLines(ls=>ls.map(l=>{const it=qbItem(l.item);if(!it||!it.perGuest)return l;return {...l,packs:Math.max(1,Math.ceil(guests*it.perGuest/it.per))};}));
  const loadSample=()=>{let n=uid.current;setLines(window.QB_SAMPLE.map(s=>({id:'s'+(++n),cat:s.cat,item:s.item,packs:s.packs,store:'best',note:''})));uid.current=n;};
  const clearAll=()=>{setLines([]);setCharge(0);setDelivery(0);setName('');};
  const saveQuote=()=>{if(!lines.length)return;setSaved(s=>[{id:'q'+Date.now(),name,date:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),cost,charge:+charge||0,lines,guests,taxPct,delivery,allowed},...s].slice(0,12));};
  const loadQuote=q=>{setLines(q.lines);setName(q.name);setCharge(q.charge);setGuests(q.guests??60);setTaxPct(q.taxPct??7);setDelivery(q.delivery??0);if(q.allowed)setAllowed(q.allowed);window.scrollTo({top:0,behavior:'smooth'});};
  const duplicateQuote=q=>setSaved(s=>[{...q,id:'q'+Date.now(),name:(q.name||'Untitled event')+' (copy)',date:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})},...s].slice(0,12));
  const renameQuote=(id,newName)=>setSaved(s=>s.map(x=>x.id===id?{...x,name:newName}:x));
  const toggleStore=k=>setAllowed(a=>a.indexOf(k)>=0?(a.length>1?a.filter(x=>x!==k):a):[...a,k]);

  const exportCSV=()=>{
    const esc=v=>'"'+String(v).replace(/"/g,'""')+'"';
    const rows=[['Category','Item','Pack size','Packs','Units','Unit','Priced at','Price per pack','Line cost','Note']];
    window.QB_CATEGORIES.forEach(c=>lines.filter(l=>l.cat===c.id).forEach(l=>{
      const k=qbLineCalc(l,allowed);
      rows.push([c.name,k.item.short,k.item.packLabel,l.packs,k.units,k.item.unit,k.item.flat!=null?'In-house':qbStoreName(k.store),k.unitPrice.toFixed(2),k.price.toFixed(2),l.note||'']);
    }));
    rows.push([]);
    rows.push(['Guests',guests]);
    rows.push(['Items subtotal','','','','','','','',goods.toFixed(2)]);
    rows.push(['Tax '+(taxPct||0)+'%','','','','','','','',tax.toFixed(2)]);
    rows.push(['Delivery & fees','','','','','','','',(+delivery||0).toFixed(2)]);
    rows.push(['Total cost','','','','','','','',cost.toFixed(2)]);
    rows.push(['Cost per guest','','','','','','','',guests>0?(cost/guests).toFixed(2):'']);
    rows.push(['Charging client','','','','','','','',(+charge||0).toFixed(2)]);
    rows.push(['Profit','','','','','','','',profit.toFixed(2)]);
    rows.push(['Margin','','','','','','','',(charge>0?margin.toFixed(1):'0')+'%']);
    const csv=rows.map(r=>r.map(esc).join(',')).join('\r\n');
    const a=document.createElement('a');
    a.href=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));
    a.download=((name||'event-quote').replace(/[^a-z0-9]+/gi,'-').toLowerCase())+'.csv';
    document.body.appendChild(a);a.click();a.remove();
  };

  const railStat=(l,v,sub)=>(
    <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
      <span style={qbLabel}>{l}</span>
      <strong style={{fontFamily:'var(--font-display)',fontSize:'26px',fontWeight:'var(--fw-bold)',lineHeight:1,color:'var(--ink)'}}>{v}</strong>
      {sub&&<span style={{fontSize:'var(--text-micro)',color:'var(--muted)'}}>{sub}</span>}
    </div>
  );
  const railField=(label,node,help)=>(
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
      <span style={{fontSize:'var(--text-body-sm)',color:'var(--ink)'}}>{label}{help&&<em style={{display:'block',fontStyle:'normal',fontSize:'var(--text-micro)',color:'var(--muted)'}}>{help}</em>}</span>
      {node}
    </div>
  );

  return (
    <React.Fragment>
      <div className="qb-screen">
        <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'20px',height:'var(--header-height)',borderBottom:'1px solid var(--line)',background:'var(--paper)'}}>
          <div className="qb-wrap" style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'20px'}}>
            <BrandMark tagline="Internal tools" titleSize={17}/>
            <span style={{...qbLabel,color:'var(--muted)'}}>Event Quote Builder</span>
          </div>
        </header>

        <QBSummary cost={cost} charge={+charge||0} profit={profit} margin={margin} target={+target||0} guests={+guests||0}/>

        <div className="qb-wrap" style={{padding:'44px clamp(20px,3.5vw,56px) 90px'}}>
          <div className="qb-grid">
            <main>
              <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:'24px',flexWrap:'wrap',marginBottom:'26px'}}>
                <div>
                  <SectionLabel>This event</SectionLabel>
                  <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(30px,4vw,44px)',fontWeight:'var(--fw-semibold)',lineHeight:'var(--lh-tight)',margin:'0 0 8px'}}>Build the quote</h1>
                  <p style={{margin:0,fontSize:'var(--text-body)',color:'var(--muted)',lineHeight:'var(--lh-body)',maxWidth:'46ch'}}>Add what the event needs by category. Each line prices at the cheapest warehouse unless you pick one.</p>
                </div>
                <div style={{display:'flex',gap:'10px'}}>
                  <Button size="sm" variant="inkGhost" onClick={loadSample}>Load sample lines</Button>
                  <Button size="sm" variant="inkGhost" onClick={clearAll}>Clear all</Button>
                </div>
              </div>

              <div className="qb-row qb-head">
                <span>Item</span><span style={{textAlign:'center'}}>Packs</span><span style={{textAlign:'right'}}>Per pack</span><span style={{textAlign:'right'}}>Units</span><span className="qb-perunit" style={{textAlign:'right'}}>Per unit</span><span className="qb-store">Priced at</span><span style={{textAlign:'right'}}>Cost</span><span></span>
              </div>

              {window.QB_CATEGORIES.map(cat=>{
                const catLines=lines.filter(l=>l.cat===cat.id);
                const sub=catLines.reduce((s,l)=>s+qbLineCalc(l,allowed).price,0);
                return (
                  <section key={cat.id} style={{marginBottom:catLines.length?'14px':'2px'}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px',padding:'18px 12px 10px',borderBottom:catLines.length?'1px solid var(--ink)':'1px solid var(--line)'}}>
                      <div style={{display:'flex',alignItems:'baseline',gap:'12px',flexWrap:'wrap'}}>
                        <h2 style={{fontFamily:'var(--font-display)',fontSize:'21px',fontWeight:'var(--fw-semibold)',margin:0}}>{cat.name}</h2>
                        <button onClick={()=>setPicker(cat)} style={{padding:0,border:'none',background:'none',cursor:'pointer',fontFamily:'var(--font-ui)',fontSize:'var(--text-micro)',fontWeight:'var(--fw-bold)',letterSpacing:'var(--track-meta)',textTransform:'uppercase',color:'var(--gold-dark)'}}>+ Add {catLines.length?'another':cat.name.toLowerCase()}</button>
                      </div>
                      <span style={{fontSize:'var(--text-body-sm)',fontWeight:'var(--fw-semibold)',color:catLines.length?'var(--ink)':'var(--muted)'}}>{catLines.length?qbMoney(sub):'—'}</span>
                    </div>
                    {catLines.map(l=>(
                      <QBLine key={l.id} line={l} allowed={allowed}
                        onChange={nl=>setLines(ls=>ls.map(x=>x.id===nl.id?nl:x))}
                        onRemove={()=>setLines(ls=>ls.filter(x=>x.id!==l.id))}/>
                    ))}
                  </section>
                );
              })}

              <div className="qb-totals">
                <div className="qb-totals-parts">
                  {[['Items subtotal',qbMoney(goods),lines.length+' line'+(lines.length===1?'':'s')],[`Tax`,qbMoney(tax),(taxPct||0)+'% of items'],['Delivery & fees',qbMoney(+delivery||0),'flat add-on']].map(([l,v,sub],i)=>(
                    <div key={l} style={{display:'flex',flexDirection:'column',gap:'6px',paddingLeft:i?'clamp(18px,3vw,34px)':0,borderLeft:i?'1px solid var(--line)':'none'}}>
                      <span style={qbLabel}>{l}</span>
                      <strong style={{fontFamily:'var(--font-display)',fontSize:'26px',fontWeight:'var(--fw-semibold)',lineHeight:1,color:'var(--ink)'}}>{v}</strong>
                      <span style={{fontSize:'var(--text-micro)',color:'var(--muted)'}}>{sub}</span>
                    </div>
                  ))}
                </div>
                <div className="qb-totals-sum">
                  <span style={{...qbLabel,color:'var(--gold-light)'}}>Total event cost</span>
                  <strong style={{fontFamily:'var(--font-display)',fontSize:'clamp(32px,3.4vw,42px)',fontWeight:'var(--fw-bold)',lineHeight:1,color:'#fff'}}>{qbMoney(cost)}</strong>
                  <span style={{fontSize:'var(--text-micro)',color:'rgba(255,255,255,.6)'}}>{guests>0?qbMoney(cost/guests)+' per guest · '+guests+' guests':'set a guest count'}</span>
                </div>
              </div>

              <QBShoppingList lines={lines} allowed={allowed}/>
            </main>

            <aside className="qb-rail">
              <div style={{...qbCard,padding:'24px',display:'flex',flexDirection:'column',gap:'18px'}}>
                <p style={{...qbLabel,color:'var(--gold)',margin:0}}>The numbers</p>
                <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  <span style={{fontSize:'var(--text-body-sm)',color:'var(--ink)'}}>Shopping at<em style={{display:'block',fontStyle:'normal',fontSize:'var(--text-micro)',color:'var(--muted)'}}>Only these stores are priced</em></span>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'7px'}}>
                    {window.QB_STORES.map(s=>{const on=allowed.indexOf(s.key)>=0;return (
                      <button key={s.key} onClick={()=>toggleStore(s.key)} style={{padding:'7px 14px',borderRadius:'var(--r-pill)',border:'1px solid '+(on?'var(--ink)':'var(--line)'),background:on?'var(--ink)':'transparent',color:on?'#fff':'var(--muted)',fontFamily:'var(--font-ui)',fontSize:'var(--text-micro)',fontWeight:'var(--fw-semibold)',cursor:'pointer',transition:'all var(--dur-base)'}}>{s.name}</button>
                    );})}
                  </div>
                </div>
                <div style={{height:'1px',background:'var(--line)'}}></div>
                {railField('Guest count',<QBNumber value={guests} onChange={e=>setGuests(+e.target.value||0)} width={84} align="center"/>)}
                <Button size="sm" variant="inkGhost" fullWidth onClick={scaleToGuests}>Scale quantities to {guests||0} guests</Button>
                <div style={{height:'1px',background:'var(--line)'}}></div>
                {railField('Charging the client',<QBNumber value={charge} onChange={e=>setCharge(+e.target.value||0)} prefix="$" width={116}/>)}
                {railField('Tax',<QBNumber value={taxPct} onChange={e=>setTaxPct(+e.target.value||0)} suffix="%" width={90} step={0.25}/>)}
                {railField('Delivery & fees',<QBNumber value={delivery} onChange={e=>setDelivery(+e.target.value||0)} prefix="$" width={116}/>)}
                {railField('Target margin',<QBNumber value={target} onChange={e=>setTarget(+e.target.value||0)} suffix="%" width={90}/>)}
                <div style={{height:'1px',background:'var(--line)'}}></div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'18px'}}>
                  {railStat('Profit',qbMoney(profit))}
                  {railStat('Margin',charge>0?margin.toFixed(1)+'%':'—','markup '+(cost>0?markup.toFixed(1)+'%':'—'))}
                </div>
                {charge>0&&margin<target&&<p style={{margin:0,fontSize:'var(--text-micro)',color:'var(--gold-dark)',lineHeight:'var(--lh-body)'}}>{qbMoney(cost/(1-target/100)-charge)} more gets you to {target}%.</p>}
              </div>

              <div style={{...qbCard,padding:'24px',display:'flex',flexDirection:'column',gap:'14px'}}>
                <p style={{...qbLabel,color:'var(--gold)',margin:0}}>This quote</p>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Event / community name"
                  style={{width:'100%',padding:'12px 14px',border:'1px solid var(--line)',borderRadius:'var(--r-sm)',background:'var(--cream)',fontFamily:'var(--font-ui)',fontSize:'var(--text-body-sm)',color:'var(--ink)',outline:'none'}}/>
                <Button size="sm" fullWidth onClick={saveQuote} disabled={!lines.length}>Save quote</Button>
                <Button size="sm" variant="inkGhost" fullWidth onClick={()=>window.print()}>Print client quote</Button>
                <Button size="sm" variant="inkGhost" fullWidth onClick={exportCSV} disabled={!lines.length}>Export to Excel (CSV)</Button>
              </div>

              <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                <p style={{...qbLabel,color:'var(--gold)',margin:0}}>Saved quotes</p>
                <QBSavedQuotes saved={saved} onLoad={loadQuote} onDuplicate={duplicateQuote} onRename={renameQuote} onDelete={id=>setSaved(s=>s.filter(x=>x.id!==id))}/>
              </div>
            </aside>
          </div>
        </div>
        {picker&&<QBPicker cat={picker} onAdd={addLine} allowed={allowed} onClose={()=>setPicker(null)}/>}
      </div>
      <QBPrintSheet name={name} guests={guests} lines={lines} charge={+charge||0} allowed={allowed}/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<QBApp/>);
