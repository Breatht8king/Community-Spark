(function(){
"use strict";
var heroBg=document.getElementById('heroBg');
if(heroBg){heroBg.style.backgroundImage='url("images/photo-7.jpg")';heroBg.style.backgroundImage='image-set(url("images/photo-7.webp") type("image/webp"),url("images/photo-7.jpg") type("image/jpeg"))';heroBg.style.backgroundSize='cover';heroBg.style.backgroundPosition='center';setTimeout(function(){heroBg.classList.add('loaded');},100);}
var header=document.getElementById('site-header');
window.addEventListener('scroll',function(){if(header)header.classList.toggle('scrolled',window.scrollY>20);},{passive:true});
var toggle=document.getElementById('mobileToggle'),drawer=document.getElementById('mobileDrawer'),backdrop=document.getElementById('drawerBackdrop'),closeBtn=document.getElementById('drawerClose');
function drawerFocusable(){return drawer?Array.from(drawer.querySelectorAll('button,a[href]')):[];}
function openDrawer(){
  drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');toggle.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';
  if(closeBtn)closeBtn.focus();
}
function closeDrawer(){
  drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');toggle.setAttribute('aria-expanded','false');document.body.style.overflow='';
  if(toggle)toggle.focus();
}
if(toggle)toggle.addEventListener('click',openDrawer);
if(backdrop)backdrop.addEventListener('click',closeDrawer);
if(closeBtn)closeBtn.addEventListener('click',closeDrawer);
(drawer?drawer.querySelectorAll('a'):[]).forEach(function(l){l.addEventListener('click',closeDrawer);});
document.addEventListener('keydown',function(e){
  if(!drawer||!drawer.classList.contains('open'))return;
  if(e.key==='Escape'){closeDrawer();return;}
  if(e.key!=='Tab')return;
  var focusable=drawerFocusable();
  if(!focusable.length)return;
  var first=focusable[0],last=focusable[focusable.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
});
document.documentElement.classList.add('js');
Array.from(document.querySelectorAll('input[type="tel"]')).forEach(function(input){
  input.addEventListener('input',function(){
    var digits=input.value.replace(/\D/g,'').slice(0,10);
    var out=digits;
    if(digits.length>6){out='('+digits.slice(0,3)+') '+digits.slice(3,6)+'-'+digits.slice(6);}
    else if(digits.length>3){out='('+digits.slice(0,3)+') '+digits.slice(3);}
    else if(digits.length>0){out='('+digits;}
    input.value=out;
  });
});
var PLACES_AUTOCOMPLETE_ENDPOINT='https://community-spark-places-autocomplete.YOUR-SUBDOMAIN.workers.dev';
var placesFailures=0,placesDisabled=false;
function initLocationAutocomplete(inputEl){
  if(!inputEl)return;
  var wrap=inputEl.closest('.location-field');
  if(!wrap)return;
  var list=document.createElement('ul');
  list.className='location-suggestions';
  list.hidden=true;
  wrap.appendChild(list);
  var debounceTimer=null,activeIndex=-1,currentSuggestions=[];
  var fallbackNote=document.createElement('span');
  fallbackNote.className='field-help';
  fallbackNote.hidden=true;
  fallbackNote.textContent='Address suggestions are unavailable right now — please type the full street address.';
  wrap.appendChild(fallbackNote);
  function closeList(){list.hidden=true;list.innerHTML='';activeIndex=-1;currentSuggestions=[];}
  function selectSuggestion(s){
    if(s&&s.placePrediction&&s.placePrediction.text)inputEl.value=s.placePrediction.text.text;
    closeList();
  }
  function renderSuggestions(suggestions){
    currentSuggestions=suggestions.slice(0,5);
    activeIndex=-1;
    list.innerHTML='';
    if(!currentSuggestions.length){closeList();return;}
    currentSuggestions.forEach(function(s){
      var pred=s.placePrediction;
      if(!pred||!pred.text)return;
      var item=document.createElement('li');
      var btn=document.createElement('button');
      btn.type='button';
      btn.className='location-suggestion-item';
      var hasStructured=pred.structuredFormat&&pred.structuredFormat.mainText;
      btn.textContent=hasStructured?pred.structuredFormat.mainText.text:pred.text.text;
      if(hasStructured&&pred.structuredFormat.secondaryText){
        var sec=document.createElement('span');
        sec.textContent=pred.structuredFormat.secondaryText.text;
        btn.appendChild(sec);
      }
      btn.addEventListener('click',function(){selectSuggestion(s);});
      item.appendChild(btn);
      list.appendChild(item);
    });
    list.hidden=false;
  }
  function fetchSuggestions(query){
    fetch(PLACES_AUTOCOMPLETE_ENDPOINT,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({input:query})
    }).then(function(res){
      if(!res.ok)throw new Error('Places request failed: '+res.status);
      return res.json();
    }).then(function(data){
      placesFailures=0;
      renderSuggestions(data.suggestions||[]);
    }).catch(function(err){
      console.warn('[Community Spark] Address autocomplete unavailable:',err.message);
      closeList();
      placesFailures++;
      if(placesFailures>=2&&!placesDisabled){
        placesDisabled=true;
        fallbackNote.hidden=false;
        inputEl.setAttribute('autocomplete','street-address');
      }
    });
  }
  inputEl.addEventListener('input',function(){
    var query=inputEl.value.trim();
    if(debounceTimer)clearTimeout(debounceTimer);
    if(placesDisabled){fallbackNote.hidden=false;closeList();return;}
    if(query.length<3){closeList();return;}
    debounceTimer=setTimeout(function(){fetchSuggestions(query);},250);
  });
  inputEl.addEventListener('keydown',function(e){
    if(list.hidden||!currentSuggestions.length)return;
    var items=Array.from(list.querySelectorAll('.location-suggestion-item'));
    if(e.key==='ArrowDown'){
      e.preventDefault();
      activeIndex=Math.min(activeIndex+1,items.length-1);
      items.forEach(function(it,i){it.classList.toggle('active',i===activeIndex);});
    }else if(e.key==='ArrowUp'){
      e.preventDefault();
      activeIndex=Math.max(activeIndex-1,0);
      items.forEach(function(it,i){it.classList.toggle('active',i===activeIndex);});
    }else if(e.key==='Enter'){
      if(activeIndex>-1&&currentSuggestions[activeIndex]){
        e.preventDefault();
        selectSuggestion(currentSuggestions[activeIndex]);
      }
    }else if(e.key==='Escape'){
      closeList();
    }
  });
  document.addEventListener('click',function(e){
    if(!wrap.contains(e.target))closeList();
  });
}
initLocationAutocomplete(document.getElementById('bookLocation'));
initLocationAutocomplete(document.getElementById('location'));
initLocationAutocomplete(document.getElementById('sponsorArea'));
var searchInput=document.getElementById('catalogSearch'),filterBtns=Array.from(document.querySelectorAll('[data-filter]')),priceFilterBtns=Array.from(document.querySelectorAll('[data-price-filter]')),eventCards=Array.from(document.querySelectorAll('.event-card')),emptyMsg=document.getElementById('catalog-empty'),catalogCount=document.getElementById('catalogCount'),catalogClear=document.getElementById('catalogClear'),catalogEmptyClear=document.getElementById('catalogEmptyClear'),activeFilter='all',activePriceFilter='all';
function clearCatalogFilters(){if(searchInput)searchInput.value='';activeFilter='all';activePriceFilter='all';filterBtns.forEach(function(b){var on=b.dataset.filter==='all';b.classList.toggle('active',on);b.setAttribute('aria-pressed',on?'true':'false');});priceFilterBtns.forEach(function(b){var on=b.dataset.priceFilter==='all';b.classList.toggle('active',on);b.setAttribute('aria-pressed',on?'true':'false');});updateCatalog();}
function updateCatalog(){var term=searchInput?searchInput.value.trim().toLowerCase():'',count=0;eventCards.forEach(function(card){var cats=card.dataset.category||'',name=card.dataset.name||'',priceBand=card.dataset.priceBand||'',show=(activeFilter==='all'||cats.indexOf(activeFilter)>-1)&&(activePriceFilter==='all'||priceBand===activePriceFilter)&&(!term||name.indexOf(term)>-1);card.hidden=!show;if(show)count++;});if(emptyMsg)emptyMsg.style.display=count===0?'block':'none';if(catalogCount)catalogCount.textContent=count;if(catalogClear)catalogClear.hidden=!(term||activeFilter!=='all'||activePriceFilter!=='all');}
filterBtns.forEach(function(btn){btn.addEventListener('click',function(){filterBtns.forEach(function(b){b.classList.remove('active');b.setAttribute('aria-pressed','false');});btn.classList.add('active');btn.setAttribute('aria-pressed','true');activeFilter=btn.dataset.filter||'all';updateCatalog();});});
priceFilterBtns.forEach(function(btn){btn.addEventListener('click',function(){priceFilterBtns.forEach(function(b){b.classList.remove('active');b.setAttribute('aria-pressed','false');});btn.classList.add('active');btn.setAttribute('aria-pressed','true');activePriceFilter=btn.dataset.priceFilter||'all';updateCatalog();});});
if(searchInput)searchInput.addEventListener('input',updateCatalog);
if(catalogClear)catalogClear.addEventListener('click',clearCatalogFilters);
if(catalogEmptyClear)catalogEmptyClear.addEventListener('click',clearCatalogFilters);
var allDetails=Array.from(document.querySelectorAll('.event-details'));
allDetails.forEach(function(d){d.addEventListener('toggle',function(){if(!d.open)return;allDetails.forEach(function(o){if(o!==d&&o.open)o.open=false;});});});
var faqItems=Array.from(document.querySelectorAll('.faq-item')),openFaqQueue=[];
faqItems.forEach(function(d){
  d.addEventListener('toggle',function(){
    if(d.open){
      openFaqQueue.push(d);
      if(openFaqQueue.length>2){
        var oldest=openFaqQueue.shift();
        if(oldest!==d)oldest.open=false;
      }
    }else{
      var idx=openFaqQueue.indexOf(d);
      if(idx>-1)openFaqQueue.splice(idx,1);
    }
  });
});
var addonSelects=Array.from(document.querySelectorAll('.addon-qty')),addonTotal=document.getElementById('addonTotal');
function updateTotal(){var sum=addonSelects.reduce(function(a,s){return a+(Number(s.value)*Number(s.dataset.unit||0));},0);if(addonTotal)addonTotal.textContent='$'+sum.toLocaleString('en-US');}
addonSelects.forEach(function(s){s.addEventListener('change',updateTotal);});updateTotal();
function findFirstEmptyRequired(container){
  return Array.from(container.querySelectorAll('[required]')).find(function(f){return f.type!=='radio'&&!String(f.value||'').trim();});
}
function submitNetlifyForm(form,responseEl,opts){
  opts=opts||{};
  form.noValidate=true;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!opts.skipRequiredCheck){
      var first=findFirstEmptyRequired(form);
      if(first){first.focus();if(responseEl){responseEl.textContent='Please fill in all required fields before submitting.';responseEl.style.color='var(--error)';}return;}
    }
    if(opts.validate){
      var err=opts.validate();
      if(err){if(responseEl){responseEl.textContent=err;responseEl.style.color='var(--error)';}return;}
    }
    var submitBtn=form.querySelector('button[type="submit"]');
    if(submitBtn)submitBtn.disabled=true;
    var formData=opts.buildFormData?opts.buildFormData():new FormData(form);
    fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(formData).toString()})
      .then(function(res){
        if(!res.ok)throw new Error('Network response was not ok');
        if(opts.onSuccess){opts.onSuccess();}
        else{
          if(responseEl&&opts.successMessage){responseEl.textContent=opts.successMessage;responseEl.style.color='var(--gold)';}
          form.reset();
        }
      })
      .catch(function(){
        if(responseEl){responseEl.textContent='Something went wrong sending your request. Please try again or email us directly.';responseEl.style.color='var(--error)';}
      })
      .finally(function(){if(submitBtn)submitBtn.disabled=false;});
  });
}
var form=document.getElementById('contactForm'),formResponse=document.getElementById('formResponse'),eventDateInput=document.getElementById('eventDate');
if(eventDateInput){eventDateInput.min=toISODate(minBookableDate());eventDateInput.max=toISODate(maxBookableDate());}
function swapFormForConfirmation(form,successId,actionsId){
  var successEl=document.getElementById(successId),actionsEl=document.getElementById(actionsId);
  form.hidden=true;
  if(successEl){successEl.hidden=false;successEl.scrollIntoView({behavior:'smooth',block:'center'});}
  if(actionsEl)actionsEl.hidden=false;
}
function wireSendAnother(buttonId,form,responseEl,successId,actionsId){
  var btn=document.getElementById(buttonId);
  if(!btn)return;
  btn.addEventListener('click',function(){
    form.reset();
    form.hidden=false;
    var successEl=document.getElementById(successId),actionsEl=document.getElementById(actionsId);
    if(successEl)successEl.hidden=true;
    if(actionsEl)actionsEl.hidden=true;
    if(responseEl)responseEl.textContent='';
    form.scrollIntoView({behavior:'smooth',block:'center'});
  });
}
if(form){
  var cParams=new URLSearchParams(window.location.search);
  var cEvent=cParams.get('event')||'';
  var cAsking=cParams.get('intent')==='question';
  if(cEvent){
    var cPrefill=document.getElementById('contactPrefill'),cPrefillEvent=document.getElementById('contactPrefillEvent');
    if(cPrefill&&cPrefillEvent){cPrefillEvent.textContent=cEvent;cPrefill.hidden=false;}
    var cSectionLabel=document.getElementById('contactSectionLabel'),cSectionTitle=document.getElementById('contactSectionTitle'),cFormHeading=document.getElementById('contactFormHeading'),cSubmitBtn=document.getElementById('contactSubmitBtn');
    if(cSectionLabel)cSectionLabel.textContent='Event inquiry';
    if(cSectionTitle)cSectionTitle.textContent='Tell us about your community.';
    if(cFormHeading)cFormHeading.textContent=cAsking?'Ask about this event':'Request this event';
    if(cSubmitBtn)cSubmitBtn.textContent=cAsking?'Send My Request →':'Request This Event →';
    var cEventDesc=document.getElementById('eventDesc');
    if(cEventDesc&&!cEventDesc.value)cEventDesc.value=cAsking?('I have a question about '+cEvent+': '):('We’re interested in booking '+cEvent+'. ');
  }
  submitNetlifyForm(form,formResponse,{
    validate:function(){
      if(eventDateInput&&eventDateInput.value){
        var minD=toISODate(minBookableDate()),maxD=toISODate(maxBookableDate());
        if(eventDateInput.value<minD||eventDateInput.value>maxD){
          eventDateInput.focus();
          return "Please choose an event date between 2 weeks and 6 months from today — or leave it blank and we'll confirm timing with you.";
        }
      }
      return null;
    },
    onSuccess:function(){swapFormForConfirmation(form,'contactSuccess','contactSuccessActions');}
  });
  wireSendAnother('contactSendAnother',form,formResponse,'contactSuccess','contactSuccessActions');
}
var sponsorForm=document.getElementById('sponsorForm'),sponsorResponse=document.getElementById('sponsorResponse');
if(sponsorForm){
  submitNetlifyForm(sponsorForm,sponsorResponse,{
    onSuccess:function(){swapFormForConfirmation(sponsorForm,'sponsorSuccess','sponsorSuccessActions');}
  });
  wireSendAnother('sponsorAddAnother',sponsorForm,sponsorResponse,'sponsorSuccess','sponsorSuccessActions');
}
var bookEventSelect=document.getElementById('bookEventSelect');
var bookingType='preset';
var bookEventAddonsGroup=document.getElementById('bookEventAddonsGroup'),
    bookEventAddonsList=document.getElementById('bookEventAddonsList'),
    bookPackageAddonsList=document.getElementById('bookPackageAddonsList');
function addonCheckboxLabel(text,fieldName,opts){
  opts=opts||{};
  var label=document.createElement('label');
  label.className='addon-check';
  var input=document.createElement('input');
  input.type='checkbox';
  input.name=fieldName;
  input.value=opts.price?(text+' — '+opts.price):text;
  label.appendChild(input);
  var body=document.createElement('span');
  body.className='addon-check-body';
  var nameEl=document.createElement('span');
  nameEl.className='addon-check-name';
  nameEl.textContent=text;
  body.appendChild(nameEl);
  if(opts.detail){var small=document.createElement('small');small.textContent=opts.detail;body.appendChild(small);}
  label.appendChild(body);
  if(opts.price){
    var priceEl=document.createElement('span');
    priceEl.className='addon-check-price';
    priceEl.textContent=opts.price;
    label.appendChild(priceEl);
  }else if(opts.pendingLabel){
    var pendingEl=document.createElement('span');
    pendingEl.className='addon-check-price-pending';
    pendingEl.textContent=opts.pendingLabel;
    label.appendChild(pendingEl);
  }
  return label;
}
function renderEventAddons(){
  if(!bookEventAddonsList||!bookEventAddonsGroup)return;
  bookEventAddonsList.innerHTML='';
  var opt=selectedEventOption();
  var items=(opt&&opt.value&&typeof EVENT_ADDONS!=='undefined')?EVENT_ADDONS[opt.value]:null;
  if(bookingType==='custom'||!items||!items.length){bookEventAddonsGroup.hidden=true;return;}
  items.forEach(function(item){bookEventAddonsList.appendChild(addonCheckboxLabel(item,'eventAddons',{pendingLabel:'Priced in proposal'}));});
  bookEventAddonsGroup.hidden=false;
}
function renderPackageAddons(){
  if(!bookPackageAddonsList||typeof GENERAL_ADDON_PACKAGES==='undefined')return;
  bookPackageAddonsList.innerHTML='';
  GENERAL_ADDON_PACKAGES.forEach(function(pkg){
    bookPackageAddonsList.appendChild(addonCheckboxLabel(pkg.name,'packageAddons',{price:pkg.price,detail:pkg.detail}));
  });
}
renderPackageAddons();
var TIME_SLOTS=[];
for(var bookHour=10;bookHour<=18;bookHour++){
  ['00','30'].forEach(function(m){
    if(bookHour===18&&m==='30')return;
    TIME_SLOTS.push((bookHour<10?'0'+bookHour:String(bookHour))+':'+m);
  });
}
function formatDateLong(iso){
  var p=iso.split('-');
  if(p.length!==3)return iso;
  var d=new Date(Number(p[0]),Number(p[1])-1,Number(p[2]));
  if(isNaN(d.getTime()))return iso;
  return d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
}
function to12h(t){
  var parts=t.split(':'),hh=Number(parts[0]),mm=parts[1],suffix=hh>=12?'PM':'AM',h12=hh%12;
  if(h12===0)h12=12;
  return h12+':'+mm+' '+suffix;
}
function durationToHours(text){
  if(!text)return 2;
  var t=text.toLowerCase();
  if(t.indexOf('multi-day')>-1)return null;
  var nums=t.match(/\d+(\.\d+)?/g);
  if(!nums)return 1;
  return Math.max.apply(Math,nums.map(Number));
}
function pad2(n){return n<10?'0'+n:String(n);}
function toISODate(d){return d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate());}
function minBookableDate(){var d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()+14);return d;}
function maxBookableDate(){var d=new Date();d.setHours(0,0,0,0);d.setMonth(d.getMonth()+6);return d;}
function isValidBooking(b){
  if(!b||typeof b.date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(b.date))return false;
  if(b.allDay)return !isNaN(new Date(b.date+'T00:00:00').getTime());
  if(typeof b.time!=='string'||!/^([01]\d|2[0-3]):[0-5]\d$/.test(b.time))return false;
  return !isNaN(new Date(b.date+'T'+b.time+':00').getTime());
}
function bufferWindow(booking){
  if(booking.allDay){
    var dayStart=new Date(booking.date+'T00:00:00'),dayEnd=new Date(booking.date+'T23:59:59');
    return {blockStart:dayStart,blockEnd:dayEnd,startTime:dayStart,allDay:true};
  }
  var start=new Date(booking.date+'T'+booking.time+':00');
  var durHrs=booking.durationHours!=null?booking.durationHours:3;
  var end=new Date(start.getTime()+durHrs*3600000);
  var blockStart=new Date(start.getTime()-1*3600000);
  var blockEnd=new Date(end.getTime()+1.5*3600000);
  return {blockStart:blockStart,blockEnd:blockEnd,startTime:start,allDay:false};
}
function findConflict(proposedDate,proposedTime,proposedDurationHrs){
  if(typeof CONFIRMED_BOOKINGS==='undefined')return null;
  var sameDay=CONFIRMED_BOOKINGS.filter(function(b){return b&&b.date===proposedDate;});
  if(sameDay.length>=2){
    return {reason:'cap',message:'This date already has 2 confirmed events — please choose another date.'};
  }
  for(var vi=0;vi<sameDay.length;vi++){
    if(!isValidBooking(sameDay[vi])){
      console.error('[Community Spark] Malformed entry in bookings-data.js — blocking this date as a precaution:',sameDay[vi]);
      return {reason:'invalid',message:'That date is unavailable — please choose another date.'};
    }
  }
  var proposedStart=proposedDurationHrs===null?null:new Date(proposedDate+'T'+proposedTime+':00');
  for(var ci=0;ci<sameDay.length;ci++){
    var win=bufferWindow(sameDay[ci]);
    if(win.allDay||proposedDurationHrs===null){
      return {reason:'allday',message:'That date is reserved for an all-day event — please choose another date.'};
    }
    if(proposedStart){
      var gapHrs=Math.abs(proposedStart-win.startTime)/3600000;
      if(gapHrs<4){
        return {reason:'gap',message:'That time is within 4 hours of another confirmed event that day — please pick a different time.'};
      }
    }
    var proposedEnd=new Date(proposedStart.getTime()+proposedDurationHrs*3600000);
    var proposedBlockStart=new Date(proposedStart.getTime()-1*3600000);
    var proposedBlockEnd=new Date(proposedEnd.getTime()+1.5*3600000);
    if(proposedBlockStart<win.blockEnd&&proposedBlockEnd>win.blockStart){
      return {reason:'buffer',message:'That time is too close to another confirmed event that day — please pick a different time.'};
    }
  }
  return null;
}
function dailyBookingCount(dateStr){
  if(typeof CONFIRMED_BOOKINGS==='undefined')return 0;
  return CONFIRMED_BOOKINGS.filter(function(b){return b&&b.date===dateStr;}).length;
}
function dateHasAllDayBlock(dateStr){
  if(typeof CONFIRMED_BOOKINGS==='undefined')return false;
  return CONFIRMED_BOOKINGS.some(function(b){return b&&b.date===dateStr&&b.allDay;});
}
function dateHasInvalidEntry(dateStr){
  if(typeof CONFIRMED_BOOKINGS==='undefined')return false;
  return CONFIRMED_BOOKINGS.some(function(b){return b&&b.date===dateStr&&!isValidBooking(b);});
}
var bookingEventNameEl=document.getElementById('bookingEventName'),
    bookingEventMetaEl=document.getElementById('bookingEventMeta');
function selectedEventOption(){
  return bookEventSelect&&bookEventSelect.selectedOptions?bookEventSelect.selectedOptions[0]:null;
}
function updateEventIntro(){
  renderEventAddons();
  if(!bookingEventNameEl||!bookingEventMetaEl)return;
  if(bookingType==='custom'){
    bookingEventNameEl.textContent='Booking: Custom Event';
    bookingEventMetaEl.textContent='Tell us about the event below — Griffin will price and confirm it after reviewing your details.';
    return;
  }
  var opt=selectedEventOption();
  if(opt&&opt.value){
    bookingEventNameEl.textContent='Booking: '+opt.textContent;
    bookingEventMetaEl.textContent=(opt.dataset.price||'')+(opt.dataset.duration?' · '+opt.dataset.duration:'');
  }else{
    bookingEventNameEl.textContent='Choose an event to book';
    bookingEventMetaEl.textContent='Select a preset event below, or browse the full catalog to compare options.';
  }
}
if(bookEventSelect)bookEventSelect.addEventListener('change',updateEventIntro);
updateEventIntro();
if(bookEventSelect){
  var urlParams=new URLSearchParams(window.location.search);
  var eventParam=urlParams.get('event');
  if(eventParam&&bookEventSelect.querySelector('option[value="'+eventParam+'"]')){
    bookEventSelect.value=eventParam;
    updateEventIntro();
  }
}

var bookStep1=document.getElementById('bookStep1'),
    bookStep2=document.getElementById('bookStep2'),
    bookStep3=document.getElementById('bookStep3'),
    bookScheduleBtn=document.getElementById('bookScheduleBtn'),
    bookStep1Response=document.getElementById('bookingStep1Response'),
    bookDateInput=document.getElementById('bookDate'),
    bookTimeInput=document.getElementById('bookTime'),
    calGrid=document.getElementById('calGrid'),
    calMonthLabel=document.getElementById('calMonthLabel'),
    calPrev=document.getElementById('calPrev'),
    calNext=document.getElementById('calNext'),
    timeSlotWrap=document.getElementById('bookTimeSlotWrap'),
    timeSlotGrid=document.getElementById('timeSlotGrid'),
    bookingConflictNote=document.getElementById('bookingConflictNote'),
    bookBackTo1=document.getElementById('bookBackTo1'),
    bookToStep3=document.getElementById('bookToStep3'),
    bookBackTo2=document.getElementById('bookBackTo2'),
    bookEstimatePrice=document.getElementById('bookEstimatePrice'),
    bookEstimateEventName=document.getElementById('bookEstimateEventName'),
    bookStep3Heading=document.getElementById('bookStep3Heading'),
    bookEstimateDescPreset=document.getElementById('bookEstimateDescPreset'),
    bookEstimateDescCustom=document.getElementById('bookEstimateDescCustom'),
    typePresetBtn=document.getElementById('typePresetBtn'),
    typeCustomBtn=document.getElementById('typeCustomBtn'),
    bookPresetFields=document.getElementById('bookPresetFields'),
    bookCustomFields=document.getElementById('bookCustomFields'),
    bookChangesGroup=document.getElementById('bookChangesGroup'),
    customEventDesc=document.getElementById('customEventDesc'),
    customDuration=document.getElementById('customDuration'),
    customAttendance=document.getElementById('customAttendance'),
    customInclusions=document.getElementById('customInclusions'),
    bookChanges=document.getElementById('bookChanges'),
    bookingTypeInput=document.getElementById('bookingType'),
    customEventNameFallback=document.getElementById('customEventNameFallback'),
    bookStep4=document.getElementById('bookStep4'),
    bookStartOver=document.getElementById('bookStartOver'),
    bookSuccessEvent=document.getElementById('bookSuccessEvent'),
    bookSuccessDate=document.getElementById('bookSuccessDate');

var calViewDate=null,selectedDateStr='',selectedTimeStr='';

function dateToStr(y,m,d){return y+'-'+pad2(m+1)+'-'+pad2(d);}

function getActiveEventInfo(){
  if(bookingType==='custom'){
    var durValue=customDuration?customDuration.value:'';
    return {
      durationHours:durationToHours(durValue),
      isAllDay:false,
      priceText:'',
      label:'Custom Event'
    };
  }
  var opt=selectedEventOption();
  var isAllDayPreset=!!(opt&&opt.value&&opt.dataset.allday==='true');
  return {
    durationHours:isAllDayPreset?null:durationToHours(opt?opt.dataset.duration:''),
    isAllDay:isAllDayPreset,
    priceText:opt?(opt.dataset.price||''):'',
    label:opt?opt.textContent:'this event'
  };
}

function setBookingType(type){
  bookingType=type;
  if(bookingTypeInput)bookingTypeInput.value=type;
  var isCustom=type==='custom';
  if(typePresetBtn){typePresetBtn.classList.toggle('active',!isCustom);typePresetBtn.setAttribute('aria-pressed',isCustom?'false':'true');}
  if(typeCustomBtn){typeCustomBtn.classList.toggle('active',isCustom);typeCustomBtn.setAttribute('aria-pressed',isCustom?'true':'false');}
  if(bookPresetFields)bookPresetFields.hidden=isCustom;
  if(bookCustomFields)bookCustomFields.hidden=!isCustom;
  if(bookChangesGroup)bookChangesGroup.hidden=isCustom;
  if(bookEventSelect){bookEventSelect.required=!isCustom;bookEventSelect.disabled=isCustom;}
  if(bookChanges)bookChanges.disabled=isCustom;
  if(customEventNameFallback)customEventNameFallback.disabled=!isCustom;
  if(customEventDesc){customEventDesc.required=isCustom;customEventDesc.disabled=!isCustom;}
  if(customDuration){customDuration.required=isCustom;customDuration.disabled=!isCustom;}
  if(customAttendance){customAttendance.required=isCustom;customAttendance.disabled=!isCustom;}
  if(customInclusions)customInclusions.disabled=!isCustom;
  updateEventIntro();
}
if(typePresetBtn)typePresetBtn.addEventListener('click',function(){setBookingType('preset');});
if(typeCustomBtn)typeCustomBtn.addEventListener('click',function(){setBookingType('custom');});
if(typePresetBtn||typeCustomBtn)setBookingType('preset');
var typeParam=new URLSearchParams(window.location.search).get('type');
if(typeParam==='custom'&&(typePresetBtn||typeCustomBtn))setBookingType('custom');

function resetBookingFlow(){
  if(bookingForm)bookingForm.reset();
  setBookingType('preset');
  selectedDateStr='';selectedTimeStr='';
  if(bookDateInput)bookDateInput.value='';
  if(bookTimeInput)bookTimeInput.value='';
  calViewDate=null;
  if(bookStep1Response)bookStep1Response.textContent='';
  if(bookingResponse)bookingResponse.textContent='';
  if(bookingConflictNote)bookingConflictNote.style.display='none';
  if(timeSlotWrap)timeSlotWrap.style.display='none';
  if(timeSlotGrid)timeSlotGrid.innerHTML='';
  if(bookToStep3)bookToStep3.disabled=true;
  updateEventIntro();
}

function updateContinueState(){
  if(!bookToStep3)return;
  var info=getActiveEventInfo();
  bookToStep3.disabled=!(selectedDateStr&&(info.isAllDay||selectedTimeStr));
}

function renderTimeSlots(){
  if(!timeSlotGrid||!timeSlotWrap)return;
  var info=getActiveEventInfo();
  if(info.isAllDay||!selectedDateStr){
    timeSlotWrap.style.display='none';
    if(bookingConflictNote)bookingConflictNote.style.display='none';
    return;
  }
  timeSlotWrap.style.display='';
  var durationHrs=info.durationHours!=null?info.durationHours:2;
  timeSlotGrid.innerHTML='';
  var allDisabled=true;
  TIME_SLOTS.forEach(function(slot){
    var conflict=findConflict(selectedDateStr,slot,durationHrs);
    var btn=document.createElement('button');
    btn.type='button';
    btn.className='time-slot';
    btn.textContent=to12h(slot);
    btn.disabled=!!conflict;
    if(!conflict){
      allDisabled=false;
      btn.addEventListener('click',function(){
        Array.from(timeSlotGrid.querySelectorAll('.time-slot')).forEach(function(b){b.classList.remove('selected');});
        btn.classList.add('selected');
        selectedTimeStr=slot;
        if(bookTimeInput)bookTimeInput.value=slot;
        if(bookingConflictNote)bookingConflictNote.style.display='none';
        updateContinueState();
      });
    }
    timeSlotGrid.appendChild(btn);
  });
  if(bookingConflictNote){
    if(allDisabled){
      bookingConflictNote.textContent='That date is fully booked — please choose another date.';
      bookingConflictNote.style.color='var(--error)';
      bookingConflictNote.style.display='block';
    }else{
      bookingConflictNote.style.display='none';
    }
  }
}

function renderCalendar(){
  if(!calGrid||!calMonthLabel)return;
  if(!calViewDate){
    var today0=new Date();today0.setHours(0,0,0,0);
    calViewDate=new Date(today0.getFullYear(),today0.getMonth(),1);
  }
  var year=calViewDate.getFullYear(),month=calViewDate.getMonth();
  var monthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];
  calMonthLabel.textContent=monthNames[month]+' '+year;
  var firstWeekday=new Date(year,month,1).getDay();
  var daysInMonth=new Date(year,month+1,0).getDate();
  var min=minBookableDate();
  var max=maxBookableDate();
  var todayReal=new Date();todayReal.setHours(0,0,0,0);
  var isAllDayEvent=getActiveEventInfo().isAllDay;

  calGrid.innerHTML='';
  for(var i=0;i<firstWeekday;i++){
    calGrid.appendChild(document.createElement('div'));
  }
  for(var day=1;day<=daysInMonth;day++){
    (function(day){
      var dateStr=dateToStr(year,month,day);
      var cellDate=new Date(year,month,day);
      var btn=document.createElement('button');
      btn.type='button';
      btn.className='cal-day';
      btn.textContent=String(day);
      var tooEarly=cellDate<min;
      var tooLate=cellDate>max;
      var capReached=dailyBookingCount(dateStr)>=2;
      var allDayBlocked=dateHasAllDayBlock(dateStr);
      var conflictIfAllDay=isAllDayEvent&&dailyBookingCount(dateStr)>0;
      var invalidEntry=dateHasInvalidEntry(dateStr);
      var disabled=tooEarly||tooLate||capReached||allDayBlocked||conflictIfAllDay||invalidEntry;
      btn.disabled=disabled;
      var weekdayNames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var fullDateLabel=weekdayNames[cellDate.getDay()]+', '+monthNames[month]+' '+day+', '+year;
      var reason='';
      if(tooEarly)reason=' — too soon, needs at least 2 weeks notice';
      else if(tooLate)reason=' — too far out, within 6 months only';
      else if(capReached)reason=' — fully booked';
      else if(allDayBlocked||conflictIfAllDay)reason=' — unavailable due to another booking';
      else if(invalidEntry)reason=' — unavailable';
      btn.setAttribute('aria-label',fullDateLabel+reason);
      if(disabled)btn.title=fullDateLabel+reason;
      if(dateStr===selectedDateStr)btn.classList.add('selected');
      if(!disabled){
        btn.addEventListener('click',function(){
          Array.from(calGrid.querySelectorAll('.cal-day')).forEach(function(b){b.classList.remove('selected');});
          btn.classList.add('selected');
          selectedDateStr=dateStr;
          selectedTimeStr='';
          if(bookDateInput)bookDateInput.value=selectedDateStr;
          if(bookTimeInput)bookTimeInput.value='';
          renderTimeSlots();
          updateContinueState();
        });
      }
      calGrid.appendChild(btn);
    })(day);
  }
  if(calPrev)calPrev.disabled=(year===todayReal.getFullYear()&&month===todayReal.getMonth());
  if(calNext)calNext.disabled=(year===max.getFullYear()&&month===max.getMonth());
}

if(calPrev)calPrev.addEventListener('click',function(){
  calViewDate=new Date(calViewDate.getFullYear(),calViewDate.getMonth()-1,1);
  renderCalendar();
});
if(calNext)calNext.addEventListener('click',function(){
  calViewDate=new Date(calViewDate.getFullYear(),calViewDate.getMonth()+1,1);
  renderCalendar();
});
if(bookScheduleBtn){
  bookScheduleBtn.addEventListener('click',function(){
    var first=findFirstEmptyRequired(bookStep1);
    if(first){
      first.focus();
      if(bookStep1Response){bookStep1Response.textContent='Please fill in all required fields before scheduling.';bookStep1Response.style.color='var(--error)';}
      return;
    }
    var sponsorRadios=Array.from(bookStep1.querySelectorAll('input[name="sponsorInterest"]'));
    if(sponsorRadios.length&&!sponsorRadios.some(function(r){return r.checked;})){
      if(bookStep1Response){bookStep1Response.textContent="Please answer whether you're open to a sponsor before scheduling.";bookStep1Response.style.color='var(--error)';}
      return;
    }
    if(bookStep1Response)bookStep1Response.textContent='';
    selectedDateStr='';selectedTimeStr='';
    if(bookDateInput)bookDateInput.value='';
    if(bookTimeInput)bookTimeInput.value='';
    calViewDate=null;
    bookStep1.hidden=true;
    bookStep2.hidden=false;
    renderCalendar();
    renderTimeSlots();
    updateContinueState();
  });
}
if(bookBackTo1)bookBackTo1.addEventListener('click',function(){bookStep2.hidden=true;bookStep1.hidden=false;});
if(bookToStep3){
  bookToStep3.addEventListener('click',function(){
    var info=getActiveEventInfo();
    var isCustomEstimate=bookingType==='custom';
    if(bookStep3Heading)bookStep3Heading.textContent=isCustomEstimate?'Pricing':'Estimated cost';
    if(bookEstimatePrice){bookEstimatePrice.textContent=isCustomEstimate?'':info.priceText;bookEstimatePrice.style.display=isCustomEstimate?'none':'';}
    if(bookEstimateEventName)bookEstimateEventName.textContent=info.label;
    if(bookEstimateDescPreset)bookEstimateDescPreset.hidden=isCustomEstimate;
    if(bookEstimateDescCustom)bookEstimateDescCustom.hidden=!isCustomEstimate;
    bookStep2.hidden=true;
    bookStep3.hidden=false;
  });
}
if(bookBackTo2)bookBackTo2.addEventListener('click',function(){bookStep3.hidden=true;bookStep2.hidden=false;});
if(bookStartOver)bookStartOver.addEventListener('click',function(){
  if(bookStep4)bookStep4.hidden=true;
  resetBookingFlow();
  bookStep1.hidden=false;
  bookStep1.scrollIntoView({behavior:'smooth',block:'start'});
});

var bookingForm=document.getElementById('bookingForm'),bookingResponse=document.getElementById('bookingResponse');
if(bookingForm){
  submitNetlifyForm(bookingForm,bookingResponse,{
    skipRequiredCheck:true,
    validate:function(){
      var bDate=bookDateInput?bookDateInput.value:'';
      var minDate=toISODate(minBookableDate());
      var maxDate=toISODate(maxBookableDate());
      if(!bDate||bDate<minDate)return 'Please pick a date at least 2 weeks out.';
      if(bDate>maxDate)return 'Please pick a date within the next 6 months.';
      var bInfo=getActiveEventInfo();
      if(!bInfo.isAllDay&&!selectedTimeStr)return 'Please pick a start time.';
      var bConflict=findConflict(bDate,bInfo.isAllDay?null:selectedTimeStr,bInfo.durationHours);
      if(bConflict)return bConflict.message+' Please go back and choose a different date or time.';
      return null;
    },
    buildFormData:function(){
      var bFormData=new FormData(bookingForm);
      if(bookingType==='preset'){
        var bSelectedOpt=selectedEventOption();
        if(bSelectedOpt&&bSelectedOpt.value)bFormData.set('eventName',bSelectedOpt.textContent.trim());
      }
      return bFormData;
    },
    onSuccess:function(){
      var doneLabel=getActiveEventInfo().label;
      var doneDate=formatDateLong(bookDateInput?bookDateInput.value:'');
      if(bookSuccessEvent)bookSuccessEvent.textContent=doneLabel;
      if(bookSuccessDate)bookSuccessDate.textContent=doneDate;
      resetBookingFlow();
      bookStep1.hidden=true;bookStep2.hidden=true;bookStep3.hidden=true;
      if(bookStep4){bookStep4.hidden=false;bookStep4.scrollIntoView({behavior:'smooth',block:'center'});}
    }
  });
}
})();
