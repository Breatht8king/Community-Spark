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
