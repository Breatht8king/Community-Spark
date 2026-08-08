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
if('IntersectionObserver' in window){
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});},{threshold:0.08,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el);});
}else{document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('visible');});}
var searchInput=document.getElementById('catalogSearch'),filterBtns=Array.from(document.querySelectorAll('.filter-btn')),eventCards=Array.from(document.querySelectorAll('.event-card')),emptyMsg=document.getElementById('catalog-empty'),activeFilter='all';
function updateCatalog(){var term=searchInput?searchInput.value.trim().toLowerCase():'',count=0;eventCards.forEach(function(card){var cats=card.dataset.category||'',name=card.dataset.name||'',show=(activeFilter==='all'||cats.indexOf(activeFilter)>-1)&&(!term||name.indexOf(term)>-1);card.hidden=!show;if(show)count++;});if(emptyMsg)emptyMsg.style.display=count===0?'block':'none';}
filterBtns.forEach(function(btn){btn.addEventListener('click',function(){filterBtns.forEach(function(b){b.classList.remove('active');});btn.classList.add('active');activeFilter=btn.dataset.filter||'all';updateCatalog();});});
if(searchInput)searchInput.addEventListener('input',updateCatalog);
var allDetails=Array.from(document.querySelectorAll('.event-details'));
allDetails.forEach(function(d){d.addEventListener('toggle',function(){if(!d.open)return;allDetails.forEach(function(o){if(o!==d&&o.open)o.open=false;});});});
var addonSelects=Array.from(document.querySelectorAll('.addon-qty')),addonTotal=document.getElementById('addonTotal');
function updateTotal(){var sum=addonSelects.reduce(function(a,s){return a+(Number(s.value)*Number(s.dataset.unit||0));},0);if(addonTotal)addonTotal.textContent='$'+sum.toLocaleString('en-US');}
addonSelects.forEach(function(s){s.addEventListener('change',updateTotal);});updateTotal();
var form=document.getElementById('contactForm'),formResponse=document.getElementById('formResponse');
if(form){form.addEventListener('submit',function(e){e.preventDefault();var req=Array.from(form.querySelectorAll('[required]')),first=req.find(function(f){return!String(f.value||'').trim();});if(first){first.focus();if(formResponse){formResponse.textContent='Please fill in all required fields before submitting.';formResponse.style.color='#c0392b';}return;}var submitBtn=form.querySelector('button[type="submit"]');if(submitBtn)submitBtn.disabled=true;fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(form)).toString()}).then(function(res){if(!res.ok)throw new Error('Network response was not ok');if(formResponse){formResponse.textContent='✓ Thank you! Your custom event request has been received. Griffin will follow up with you shortly.';formResponse.style.color='var(--gold)';}form.reset();}).catch(function(){if(formResponse){formResponse.textContent='Something went wrong sending your request. Please try again or email us directly.';formResponse.style.color='#c0392b';}}).finally(function(){if(submitBtn)submitBtn.disabled=false;});});}
var bookEventSelect=document.getElementById('bookEventSelect');
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
  var opt=selectedEventOption();
  if(!bookingEventNameEl||!bookingEventMetaEl)return;
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
    bookEstimateEventName=document.getElementById('bookEstimateEventName');

var calViewDate=null,selectedDateStr='',selectedTimeStr='';

function dateToStr(y,m,d){return y+'-'+pad2(m+1)+'-'+pad2(d);}

function updateContinueState(){
  if(!bookToStep3)return;
  var opt=selectedEventOption();
  var isAllDay=!!(opt&&opt.value&&opt.dataset.allday==='true');
  bookToStep3.disabled=!(selectedDateStr&&(isAllDay||selectedTimeStr));
}

function renderTimeSlots(){
  if(!timeSlotGrid||!timeSlotWrap)return;
  var opt=selectedEventOption();
  var isAllDay=!!(opt&&opt.value&&opt.dataset.allday==='true');
  if(isAllDay||!selectedDateStr){
    timeSlotWrap.style.display='none';
    if(bookingConflictNote)bookingConflictNote.style.display='none';
    return;
  }
  timeSlotWrap.style.display='';
  var durationHrs=opt&&opt.value?durationToHours(opt.dataset.duration):2;
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
  var todayReal=new Date();todayReal.setHours(0,0,0,0);
  var opt=selectedEventOption();
  var isAllDayEvent=!!(opt&&opt.value&&opt.dataset.allday==='true');

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
      var capReached=dailyBookingCount(dateStr)>=2;
      var allDayBlocked=dateHasAllDayBlock(dateStr);
      var conflictIfAllDay=isAllDayEvent&&dailyBookingCount(dateStr)>0;
      var disabled=tooEarly||capReached||allDayBlocked||conflictIfAllDay;
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
    var opt=selectedEventOption();
    if(bookEstimatePrice)bookEstimatePrice.textContent=opt?(opt.dataset.price||''):'';
    if(bookEstimateEventName)bookEstimateEventName.textContent=opt?opt.textContent:'this event';
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
    if(!bDate||bDate<minDate){
      if(bookingResponse){bookingResponse.textContent='Please pick a date at least 2 weeks out.';bookingResponse.style.color='#c0392b';}
      return;
    }
    var bOpt=selectedEventOption();
    var bIsAllDay=!!(bOpt&&bOpt.dataset.allday==='true');
    if(!bIsAllDay&&!selectedTimeStr){
      if(bookingResponse){bookingResponse.textContent='Please pick a start time.';bookingResponse.style.color='#c0392b';}
      return;
    }
    var bDurationHrs=bIsAllDay?null:durationToHours(bOpt?bOpt.dataset.duration:'');
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
