import Popper from 'popper.js';
import './polyfills/find.js';
import './polyfills/assign.js';
import './styles/main.scss';

let overlay = document.createElement('div');
overlay.classList.add('godfather-overlay');
let entries = [];
let defaultOptions = {
  next: null,
  hint: false,
  title: null,
  content: null,
  image: null,
  clean: false,
  overlay: false,
  scrollIntoView: true,
  theme: {
    background: '#222',
    color: 'white'
  },
  labels: {
    prev: '<',
    next: '>',
    close: '✕'
  }
}

function resolveTarget(entry) {
  return entry.target instanceof HTMLElement ? entry.target : document.querySelector(entry.target);
}

function addOverlay(entry) {
  let target = resolveTarget(entry);
  if(!document.body.contains(overlay)) document.body.appendChild(overlay);

  if(target) {
    let style = window.getComputedStyle(target);
    let position = style.getPropertyValue('position');
    if(position === 'static') target.style.position = 'relative';
    target.style.zIndex = 9;
  }
}

function removeOverlay(entry) {
  let target = resolveTarget(entry);
  if(target) target.style.zIndex = null;
  if(document.body.contains(overlay)) document.body.removeChild(overlay);
}

function getNext(entry) {
  if(!entry.options.next) return null;
  let next = entries.find(e => e.id === entry.options.next);
  if(!next) return null;

  let hasTarget = next.target ? true : false ;
  if(!hasTarget) return next;
  else {
    let target = resolveTarget(next);
    if(!target || !document.body.contains(target)) return getNext(next);
    else return next;
  }
}

function getPrev(entry){
  let prev = entries.find(e => e.options.next === entry.id);
  if(!prev) return null;

  let hasTarget = prev.target ? true : false ;
  if(!hasTarget) return prev;
  else {
    let target = resolveTarget(prev);
    if(!target || !document.body.contains(target)) return getPrev(prev);
    else return prev;
  }
}

function init(entry){
  if(document.body.contains(entry.element)) return console.log('Target already visible');

  let prev = getPrev(entry);
  let next = getNext(entry);
  if(prev) {
    entry.options.prev = prev.id;
  }

  let hasTarget = entry.target ? true : false ;
  let target = entry.target ? resolveTarget(entry) : null ;

  if(hasTarget && !target) return console.log('Target not found');

  entry.element = document.createElement('div');
  entry.element.classList.add('godfather-entry');


  entry.element.innerHTML = template(entry);

  if(entry.options.image) {
    let img = new Image();
    img.src = entry.options.image;
    let imageEl = entry.element.querySelector('.godfather-image');
    img.addEventListener('load', () => {
      imageEl.style.backgroundImage = 'url(' + entry.options.image + ')';
      imageEl.classList.remove('godfather-image-loader')
    });
  }

  Object.keys(entry.options.theme).forEach(key => {
    entry.element.firstElementChild.style[key] = entry.options.theme[key];
  });

  if(entry.options.overlay) addOverlay(entry);

  entry.element.querySelector('.godfather-close').addEventListener('click', function(){
    destroy(entry);
  });
  if(entry.options.prev) entry.element.querySelector('.godfather-prev').addEventListener('click', function(){
    destroy(entry);
    let prev = entries.find(e => e.id === entry.options.prev);
    init(prev);
  });
  if(next) entry.element.querySelector('.godfather-next').addEventListener('click', function(){
    destroy(entry);
    init(next);
  });

  document.body.appendChild(entry.element);

  if(target) entry.popper = new Popper(target, entry.element, {
    placement: entry.options.placement || 'bottom',
    modifiers: {
      offset: {
        offset: '0,10'
      }
    }
  });

  if(entry.options.scrollIntoView) setTimeout(() => entry.element.scrollIntoView({ behavior: 'smooth' }), 0)
}

function destroy(entry) {
  if(entry.popper) entry.popper.destroy();
  if(entry.options.overlay) removeOverlay(entry);
  if(document.body.contains(entry.element)) document.body.removeChild(entry.element);
}

function renderHint(entry) {
  let target = resolveTarget(entry);
  if(!target) return;
  let style = window.getComputedStyle(target);
  let position = style.getPropertyValue('position');
  if(position === 'static') target.style.position = 'relative';

  let hint = document.createElement('hint');
  hint.classList.add('godfather-hint');
  hint.style.color = entry.options.theme.background;

  hint.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    if(document.body.contains(entry.element)) hide(entry.id);
    else show(entry.id);
  })

  entry.hint = hint;
  target.appendChild(hint);
}

function destroyHint(entry) {
  let target = resolveTarget(entry);
  if(!target) return;
  target.removeChild(entry.hint);
}

function template(entry) {
  let prev = getPrev(entry);
  let next = getNext(entry);

  return `
    <div class="godfather-animation">
      <div class="popper__arrow tooltip-arrow" x-arrow style="color: ${entry.options.theme.background}"></div>
      <div class="godfather-container">
        ${entry.options.image ? `<div class="godfather-image godfather-image-loader"></div>` : '' }
        <div class="godfather-inner-container">
          <div class="godfather-content-container">
            ${entry.options.title ? `<div class="godfather-title">${entry.options.title}</div><hr>` : '' }
            <div class="godfather-content">${entry.options.content}</div>
          </div>
          <div class="godfather-actions">
            <div>
              ${prev ? `<button class="godfather-prev">${entry.options.labels.prev}</button>` : ''}
              ${next ? `<button class="godfather-next">${entry.options.labels.next}</button>` : ''}
            </div>
            <button class="godfather-close">${entry.options.labels.close}</button>
          </div>
        </div>
      </div>
    </div>
  `
}

function register(id, target, options) {
  if(!id) throw new Error('id is required');
  if(entries.find(e => e.id === id)) throw new Error('Duplicate id');

  let newEntry = {
    id,
    target,
    options: Object.assign({}, defaultOptions, options)
  };

  entries.push(newEntry);

  if(newEntry.target && newEntry.options.hint) renderHint(newEntry)
}

function unregister(id) {
  let entry = entries.find(e => e.id === id);
  if(!entry) return;

  destroy(entry);
  if(entry.hint) destroyHint(entry);
  entries = entries.filter(e => e.id !== id);
}

function show(id) {
  let entry = entries.find(e => e.id === id);
  if(entry) init(entry);
}

function hide(id) {
  let entry = entries.find(e => e.id === id);
  if(entry) destroy(entry);
}

function setDefault(options){
  defaultOptions = merge(defaultOptions, options);
}

function merge(a,b){
  Object.keys(b).forEach(key => {
    if(b[key] !== null && typeof b[key] === 'object') b[key] = merge(a[key], b[key]);
  });

  return Object.assign({}, a, b);
}

let Godfather = {
  register,
  unregister,
  show,
  hide,
  setDefault
};

export default Godfather
