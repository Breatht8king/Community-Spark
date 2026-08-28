import { inView, animate, stagger } from './vendor/motion.js';

var spring = { type: 'spring', stiffness: 100, damping: 18, mass: 0.6 };
var trigger = { margin: '0px 0px -40px 0px', amount: 0.08 };

inView('.reveal', function(info){
  if (info.target.closest('[data-stagger]')) return;
  animate(info.target, { opacity: 1, transform: 'translateY(0px)' }, spring);
}, trigger);

inView('[data-stagger]', function(info){
  var items = info.target.querySelectorAll('.reveal');
  if (!items.length) return;
  animate(items, { opacity: 1, transform: 'translateY(0px)' }, Object.assign({ delay: stagger(0.08) }, spring));
}, trigger);

// FAQ accordion smooth open/close — every page's .faq-item, not just about.html
var faqEase = { duration: 0.3, easing: [0.22, 1, 0.36, 1] };

document.querySelectorAll('.faq-item').forEach(function(item){
  var summary = item.querySelector('summary');
  var content = item.querySelector('p');
  if (!summary || !content) return;
  var busy = false;
  function closeAnimated(){
    if (busy || !item.open) return;
    busy = true;
    var openHeight = content.scrollHeight;
    content.style.height = openHeight + 'px';
    content.offsetHeight; // force reflow so the browser registers the starting height before animating
    animate(content, { height: [openHeight + 'px', '0px'], opacity: [1, 0] }, faqEase).finished.then(function(){
      item.open = false;
      content.style.height = '';
      busy = false;
    });
  }
  // Exposed so script.js's "only 2 open at once" cap can close the oldest one with the
  // same animation as a user click, instead of snapping it shut via item.open = false.
  item.faqCloseAnimated = closeAnimated;
  summary.addEventListener('click', function(e){
    e.preventDefault();
    if (busy) return;
    if (item.open) {
      closeAnimated();
    } else {
      busy = true;
      item.open = true;
      var targetHeight = content.scrollHeight;
      animate(content, { height: [0, targetHeight + 'px'], opacity: [0, 1] }, faqEase).finished.then(function(){
        content.style.height = '';
        busy = false;
      });
    }
  });
});

// About-page-only enhancements below (guarded on the #about section, unique to about.html)
if (document.getElementById('about')) {
  var pressSpring = { type: 'spring', stiffness: 400, damping: 25 };
  document.querySelectorAll('#about .btn').forEach(function(btn){
    var pressAnim = null;
    btn.addEventListener('pointerdown', function(){
      pressAnim = animate(btn, { transform: 'scale(0.96)' }, pressSpring);
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function(evt){
      btn.addEventListener(evt, function(){
        // cancel the underlying WAAPI animation (not just clear inline style) so it
        // actually releases control back to CSS instead of continuing to composite scale(0.96)
        if (pressAnim && pressAnim.animations && pressAnim.animations[0]) {
          pressAnim.animations[0].cancel();
        }
        pressAnim = null;
        btn.style.transform = '';
      });
    });
  });
}
