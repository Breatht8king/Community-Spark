(function(){
"use strict";
var heroBg=document.getElementById('heroBg');
if(heroBg){heroBg.style.backgroundImage='url("images/photo-7.jpg")';heroBg.style.backgroundSize='cover';heroBg.style.backgroundPosition='center';setTimeout(function(){heroBg.classList.add('loaded');},100);}
var header=document.getElementById('site-header');
window.addEventListener('scroll',function(){if(header)header.classList.toggle('scrolled',window.scrollY>20);},{passive:true});
var toggle=document.getElementById('mobileToggle'),drawer=document.getElementById('mobileDrawer'),backdrop=document.getElementById('drawerBackdrop'),closeBtn=document.getElementById('drawerClose');
function openDrawer(){drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');toggle.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';}
function closeDrawer(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');toggle.setAttribute('aria-expanded','false');document.body.style.overflow='';}
if(toggle)toggle.addEventListener('click',openDrawer);
if(backdrop)backdrop.addEventListener('click',closeDrawer);
if(closeBtn)closeBtn.addEventListener('click',closeDrawer);
(drawer?drawer.querySelectorAll('a'):[]).forEach(function(l){l.addEventListener('click',closeDrawer);});
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
var GOOGLE_PLACES_API_KEY='AIzaSyBzIF6tDgzrCOLRQHh63R5WUlhk-W9KQ4o';
var GOOGLE_PLACES_ENDPOINT='https://places.googleapis.com/v1/places:autocomplete';
var GOOGLE_PLACES_FIELD_MASK='suggestions.placePrediction.text.text,suggestions.placePrediction.structuredFormat.mainText.text,suggestions.placePrediction.structuredFormat.secondaryText.text';
var INDIANA_BOUNDS={low:{latitude:37.77,longitude:-88.10},high:{latitude:41.76,longitude:-84.78}};
function initLocationAutocomplete(inputEl){
  if(!inputEl)return;
  var wrap=inputEl.closest('.location-field');
  if(!wrap)return;
  var list=document.createElement('ul');
  list.className='location-suggestions';
  list.hidden=true;
  wrap.appendChild(list);
  var debounceTimer=null,activeIndex=-1,currentSuggestions=[];
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
    fetch(GOOGLE_PLACES_ENDPOINT,{
      method:'POST',
      headers:{'Content-Type':'application/json','X-Goog-Api-Key':GOOGLE_PLACES_API_KEY,'X-Goog-FieldMask':GOOGLE_PLACES_FIELD_MASK},
      body:JSON.stringify({input:query,includedRegionCodes:['us'],locationBias:{rectangle:{low:INDIANA_BOUNDS.low,high:INDIANA_BOUNDS.high}}})
    }).then(function(res){
      if(!res.ok)throw new Error('Places request failed');
      return res.json();
    }).then(function(data){
      renderSuggestions(data.suggestions||[]);
    }).catch(function(){closeList();});
  }
  inputEl.addEventListener('input',function(){
    var query=inputEl.value.trim();
    if(debounceTimer)clearTimeout(debounceTimer);
    if(query.length<3||!GOOGLE_PLACES_API_KEY){closeList();return;}
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
if('IntersectionObserver' in window){
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});},{threshold:0.08,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el);});
}else{document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('visible');});}
var searchInput=document.getElementById('catalogSearch'),filterBtns=Array.from(document.querySelectorAll('[data-filter]')),priceFilterBtns=Array.from(document.querySelectorAll('[data-price-filter]')),eventCards=Array.from(document.querySelectorAll('.event-card')),emptyMsg=document.getElementById('catalog-empty'),activeFilter='all',activePriceFilter='all';
function updateCatalog(){var term=searchInput?searchInput.value.trim().toLowerCase():'',count=0;eventCards.forEach(function(card){var cats=card.dataset.category||'',name=card.dataset.name||'',priceBand=card.dataset.priceBand||'',show=(activeFilter==='all'||cats.indexOf(activeFilter)>-1)&&(activePriceFilter==='all'||priceBand===activePriceFilter)&&(!term||name.indexOf(term)>-1);card.hidden=!show;if(show)count++;});if(emptyMsg)emptyMsg.style.display=count===0?'block':'none';}
filterBtns.forEach(function(btn){btn.addEventListener('click',function(){filterBtns.forEach(function(b){b.classList.remove('active');});btn.classList.add('active');activeFilter=btn.dataset.filter||'all';updateCatalog();});});
priceFilterBtns.forEach(function(btn){btn.addEventListener('click',function(){priceFilterBtns.forEach(function(b){b.classList.remove('active');});btn.classList.add('active');activePriceFilter=btn.dataset.priceFilter||'all';updateCatalog();});});
if(searchInput)searchInput.addEventListener('input',updateCatalog);
var allDetails=Array.from(document.querySelectorAll('.event-details'));
allDetails.forEach(function(d){d.addEventListener('toggle',function(){if(!d.open)return;allDetails.forEach(function(o){if(o!==d&&o.open)o.open=false;});});});
var addonSelects=Array.from(document.querySelectorAll('.addon-qty')),addonTotal=document.getElementById('addonTotal');
function updateTotal(){var sum=addonSelects.reduce(function(a,s){return a+(Number(s.value)*Number(s.dataset.unit||0));},0);if(addonTotal)addonTotal.textContent='$'+sum.toLocaleString('en-US');}
addonSelects.forEach(function(s){s.addEventListener('change',updateTotal);});updateTotal();
var form=document.getElementById('contactForm'),formResponse=document.getElementById('formResponse');
if(form){form.addEventListener('submit',function(e){e.preventDefault();var req=Array.from(form.querySelectorAll('[required]')),first=req.find(function(f){return!String(f.value||'').trim();});if(first){first.focus();if(formResponse){formResponse.textContent='Please fill in all required fields before submitting.';formResponse.style.color='#c0392b';}return;}var submitBtn=form.querySelector('button[type="submit"]');if(submitBtn)submitBtn.disabled=true;fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(form)).toString()}).then(function(res){if(!res.ok)throw new Error('Network response was not ok');if(formResponse){formResponse.textContent='✓ Thank you! Your custom event request has been received. Griffin will follow up with you shortly.';formResponse.style.color='var(--gold)';}form.reset();}).catch(function(){if(formResponse){formResponse.textContent='Something went wrong sending your request. Please try again or email us directly.';formResponse.style.color='#c0392b';}}).finally(function(){if(submitBtn)submitBtn.disabled=false;});});}
var bookEventSelect=document.getElementById('bookEventSelect');
var bookingType='preset';
var TIME_SLOTS=[];
for(var bookHour=10;bookHour<=18;bookHour++){
  ['00','30'].forEach(function(m){
    if(bookHour===18&&m==='30')return;
    TIME_SLOTS.push((bookHour<10?'0'+bookHour:String(bookHour))+':'+m);
  });
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
function bufferWindow(booking){
  if(booking.allDay){
    var dayStart=new Date(booking.date+'T00:00:00'),dayEnd=new Date(booking.date+'T23:59:59');
    return {blockStart:dayStart,blockEnd:dayEnd,startTime:dayStart,allDay:true};
  }
  var start=new Date(booking.date+'T'+booking.time+':00');
  var durHrs=booking.durationHours!=null?booking.durationHours:1;
  var end=new Date(start.getTime()+durHrs*3600000);
  var blockStart=new Date(start.getTime()-1*3600000);
  var blockEnd=new Date(end.getTime()+1.5*3600000);
  return {blockStart:blockStart,blockEnd:blockEnd,startTime:start,allDay:false};
}
function findConflict(proposedDate,proposedTime,proposedDurationHrs){
  if(typeof CONFIRMED_BOOKINGS==='undefined')return null;
  var sameDay=CONFIRMED_BOOKINGS.filter(function(b){return b.date===proposedDate;});
  if(sameDay.length>=2){
    return {reason:'cap',message:'This date already has 2 confirmed events — please choose another date.'};
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
  return CONFIRMED_BOOKINGS.filter(function(b){return b.date===dateStr;}).length;
}
function dateHasAllDayBlock(dateStr){
  if(typeof CONFIRMED_BOOKINGS==='undefined')return false;
  return CONFIRMED_BOOKINGS.some(function(b){return b.date===dateStr&&b.allDay;});
}
var bookingEventNameEl=document.getElementById('bookingEventName'),
    bookingEventMetaEl=document.getElementById('bookingEventMeta');
function selectedEventOption(){
  return bookEventSelect&&bookEventSelect.selectedOptions?bookEventSelect.selectedOptions[0]:null;
}
function updateEventIntro(){
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
    bookingEventNameEl.textContent='Select an event above to begin';
    bookingEventMetaEl.textContent='Pick "Book This Event" on any event card, or choose one below.';
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
    customEventNameFallback=document.getElementById('customEventNameFallback');

var calViewDate=null,selectedDateStr='',selectedTimeStr='';

function dateToStr(y,m,d){return y+'-'+pad2(m+1)+'-'+pad2(d);}

function getActiveEventInfo(){
  if(bookingType==='custom'){
    var durValue=customDuration?customDuration.value:'';
    var isAllDay=durValue==='allday';
    return {
      durationHours:isAllDay?null:durationToHours(durValue),
      isAllDay:isAllDay,
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
  if(typePresetBtn)typePresetBtn.classList.toggle('active',!isCustom);
  if(typeCustomBtn)typeCustomBtn.classList.toggle('active',isCustom);
  if(bookPresetFields)bookPresetFields.hidden=isCustom;
  if(bookCustomFields)bookCustomFields.hidden=!isCustom;
  if(bookChangesGroup)bookChangesGroup.hidden=isCustom;
  if(bookEventSelect){bookEventSelect.required=!isCustom;bookEventSelect.disabled=isCustom;}
  if(bookChanges)bookChanges.disabled=isCustom;
  if(customEventNameFallback)customEventNameFallback.disabled=!isCustom;
  if(customEventDesc){customEventDesc.required=isCustom;customEventDesc.disabled=!isCustom;}
  if(customDuration){customDuration.required=isCustom;customDuration.disabled=!isCustom;}
  if(customAttendance)customAttendance.disabled=!isCustom;
  if(customInclusions)customInclusions.disabled=!isCustom;
  updateEventIntro();
}
if(typePresetBtn)typePresetBtn.addEventListener('click',function(){setBookingType('preset');});
if(typeCustomBtn)typeCustomBtn.addEventListener('click',function(){setBookingType('custom');});
if(typePresetBtn||typeCustomBtn)setBookingType('preset');

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
      bookingConflictNote.style.color='#c0392b';
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
      var disabled=tooEarly||tooLate||capReached||allDayBlocked||conflictIfAllDay;
      btn.disabled=disabled;
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
    var step1Fields=Array.from(bookStep1.querySelectorAll('[required]'));
    var first=step1Fields.find(function(f){return f.type!=='radio'&&!String(f.value||'').trim();});
    if(first){
      first.focus();
      if(bookStep1Response){bookStep1Response.textContent='Please fill in all required fields before scheduling.';bookStep1Response.style.color='#c0392b';}
      return;
    }
    var sponsorRadios=Array.from(bookStep1.querySelectorAll('input[name="sponsorInterest"]'));
    if(sponsorRadios.length&&!sponsorRadios.some(function(r){return r.checked;})){
      if(bookStep1Response){bookStep1Response.textContent="Please answer whether you're open to a sponsor before scheduling.";bookStep1Response.style.color='#c0392b';}
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

var bookingForm=document.getElementById('bookingForm'),bookingResponse=document.getElementById('bookingResponse');
if(bookingForm){
  bookingForm.addEventListener('submit',function(e){
    e.preventDefault();
    var bDate=bookDateInput?bookDateInput.value:'';
    var minDate=toISODate(minBookableDate());
    var maxDate=toISODate(maxBookableDate());
    if(!bDate||bDate<minDate){
      if(bookingResponse){bookingResponse.textContent='Please pick a date at least 2 weeks out.';bookingResponse.style.color='#c0392b';}
      return;
    }
    if(bDate>maxDate){
      if(bookingResponse){bookingResponse.textContent='Please pick a date within the next 6 months.';bookingResponse.style.color='#c0392b';}
      return;
    }
    var bInfo=getActiveEventInfo();
    var bIsAllDay=bInfo.isAllDay;
    if(!bIsAllDay&&!selectedTimeStr){
      if(bookingResponse){bookingResponse.textContent='Please pick a start time.';bookingResponse.style.color='#c0392b';}
      return;
    }
    var bDurationHrs=bInfo.durationHours;
    var bConflict=findConflict(bDate,bIsAllDay?null:selectedTimeStr,bDurationHrs);
    if(bConflict){
      if(bookingResponse){bookingResponse.textContent=bConflict.message+' Please go back and choose a different date or time.';bookingResponse.style.color='#c0392b';}
      return;
    }
    var bookSubmitBtn=bookingForm.querySelector('button[type="submit"]');
    if(bookSubmitBtn)bookSubmitBtn.disabled=true;
    fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(bookingForm)).toString()})
      .then(function(res){
        if(!res.ok)throw new Error('Network response was not ok');
        if(bookingResponse){bookingResponse.textContent='✓ Request received! No deposit is required right now — Griffin will follow up within 1–2 business days to confirm your date, and a deposit will only be collected once your event is fully confirmed.';bookingResponse.style.color='var(--gold)';}
        bookingForm.reset();
        selectedDateStr='';selectedTimeStr='';
        bookStep3.hidden=true;
        bookStep1.hidden=false;
        updateEventIntro();
      })
      .catch(function(){
        if(bookingResponse){bookingResponse.textContent='Something went wrong sending your request. Please try again or email us directly.';bookingResponse.style.color='#c0392b';}
      })
      .finally(function(){if(bookSubmitBtn)bookSubmitBtn.disabled=false;});
  });
}
})();
