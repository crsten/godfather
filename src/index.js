import Popper from 'popper.js';
import './styles/main.scss';

let entries = [];
let defaultOptions = {
  next: null,
  hint: false,
  title: null,
  content: null,
  image: null,
  clean: false,
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
  let target = entry.target instanceof HTMLElement ? entry.target : document.querySelector(entry.target);
  if(!target) throw new Error('Invalig target');
  return target;
}

function init(entry){
  if(document.body.contains(entry.element)) return;

  entry.target = resolveTarget(entry);
  entry.element = document.createElement('div');
  entry.element.classList.add('godfather-entry');

  let prev = entries.find(e => e.options.next === entry.id);
  if(prev) {
    entry.options.prev = prev.id;
  }

  entry.element.innerHTML = template(entry);

  Object.keys(entry.options.theme).forEach(key => {
    entry.element.firstElementChild.style[key] = entry.options.theme[key];
  });

  entry.element.querySelector('.godfather-close').addEventListener('click', function(){
    destroy(entry);
  });
  if(entry.options.prev) entry.element.querySelector('.godfather-prev').addEventListener('click', function(){
    destroy(entry);
    let prev = entries.find(e => e.id === entry.options.prev);
    init(prev);
  });
  if(entry.options.next) entry.element.querySelector('.godfather-next').addEventListener('click', function(){
    destroy(entry);
    let next = entries.find(e => e.id === entry.options.next);
    init(next);
  });

  document.body.appendChild(entry.element);

  entry.popper = new Popper(entry.target, entry.element, {
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
  entry.popper.destroy();
  document.body.removeChild(entry.element);
}

function renderHint(entry) {
  entry.target = resolveTarget(entry);
  let style = window.getComputedStyle(entry.target);
  let position = style.getPropertyValue('position');
  if(position === 'static') entry.target.style.position = 'relative';

  let hint = document.createElement('hint');
  hint.classList.add('godfather-hint');
  hint.style.color = entry.options.theme.background;

  hint.addEventListener('click', (function(entry) {
    event.preventDefault();
    if(document.body.contains(entry.element)) hide(entry.id);
    else show(entry.id);
  }).bind(null, entry))

  entry.hint = hint;
  entry.target.appendChild(hint);
}

function destroyHint(entry) {
  entry.target.removeChild(entry.hint);
}

function template(entry) {
  return `
    <div class="godfather-animation">
      <div class="popper__arrow tooltip-arrow" x-arrow style="color: ${entry.options.theme.background}"></div>
      <div class="godfather-container">
        ${entry.options.image ? `<div class="godfather-image" style="background-image: url('${entry.options.image}')"></div>` : '' }
        <div class="godfather-inner-container">
          <div class="godfather-content-container">
            ${entry.options.title ? `<div class="godfather-title">${entry.options.title}</div><hr>` : '' }
            <div class="godfather-content">${entry.options.content}</div>
          </div>
          <div class="godfather-actions">
            <div>
              ${entry.options.prev ? `<button class="godfather-prev">${entry.options.labels.prev}</button>` : ''}
              ${entry.options.next ? `<button class="godfather-next">${entry.options.labels.next}</button>` : ''}
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
  if(!target) throw new Error('element is required');

  let newEntry = {
    id,
    target,
    options: Object.assign({}, defaultOptions, options)
  };

  entries.push(newEntry);

  if(newEntry.options.hint) renderHint(newEntry)
}

function unregister(id) {
  let entry = entries.find(e => e.id === id);
  if(!entry) return;

  destroy(entry);
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

export default {
  register,
  unregister,
  show,
  hide,
  setDefault
}
