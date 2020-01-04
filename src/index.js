import Popper from "popper.js";
import "./polyfills/find.js";
import "./polyfills/assign.js";
import "./styles/main.scss";

let overlay = document.createElement("div");
overlay.classList.add("godfather-overlay");
let entries = [];
let defaultOptions = {
  prev: null,
  next: null,
  hint: false,
  title: null,
  content: null,
  image: null,
  clean: false,
  overlay: false,
  clickAway: true,
  scrollIntoView: true,
  theme: {
    background: "#222",
    color: "white"
  },
  labels: {
    prev: "<",
    next: ">",
    close: "✕"
  }
};

function resolveTarget(entry) {
  return entry.target instanceof HTMLElement
    ? entry.target
    : document.querySelector(entry.target);
}

function addOverlay(entry) {
  let target = resolveTarget(entry);
  if (!document.body.contains(overlay)) document.body.appendChild(overlay);

  if (target) {
    let style = window.getComputedStyle(target);
    let position = style.getPropertyValue("position");
    if (position === "static") target.style.position = "relative";
    target.style.zIndex = 9;
  }
}

function removeOverlay(entry) {
  let target = resolveTarget(entry);
  if (target) target.style.zIndex = null;
  if (document.body.contains(overlay)) document.body.removeChild(overlay);
}

function getNext(entry) {
  if (!entry.options.next) return null;
  if (isFunction(entry.options.next)) return entry.options.next;

  let next = entries.find(e => e.id === entry.options.next);
  if (!next) return null;

  let hasTarget = next.target ? true : false;
  if (!hasTarget) return next;
  else {
    let target = resolveTarget(next);
    if (!target || !document.body.contains(target)) return getNext(next);
    else return next;
  }
}

function getPrev(entry) {
  if (isFunction(entry.options.prev)) return entry.options.prev;
  let prev = entries.find(e => e.options.next === entry.id);
  if (!prev) return null;

  let hasTarget = prev.target ? true : false;
  if (!hasTarget) return prev;
  else {
    let target = resolveTarget(prev);
    if (!target || !document.body.contains(target)) return getPrev(prev);
    else return prev;
  }
}

function init(entry) {
  if (entry.initialized) return console.log("Target already initialized");
  entry.initialized = true;

  let showPromise = [];
  if ("show" in entry.events)
    showPromise = entry.events["show"]
      .map(f => f(entry.instance))
      .filter(p => p instanceof Promise);

  Promise.all(showPromise).then(() => {
    let prev = getPrev(entry);
    let next = getNext(entry);

    let hasTarget = entry.target ? true : false;
    let target = entry.target ? resolveTarget(entry) : null;

    if (hasTarget && !target) return console.log("Target not found");

    target.classList.add("godfather--active");

    entry.element = document.createElement("div");
    entry.element.classList.add("godfather-entry");

    entry.element.innerHTML = template(entry);

    if (entry.options.image) {
      let img = new Image();
      img.src = entry.options.image;
      let imageEl = entry.element.querySelector(".godfather-image");
      img.addEventListener("load", () => {
        imageEl.style.backgroundImage = "url(" + entry.options.image + ")";
        imageEl.classList.remove("godfather-image-loader");
      });
    }

    Object.keys(entry.options.theme).forEach(key => {
      entry.element.firstElementChild.style[key] = entry.options.theme[key];
    });

    if (entry.options.overlay) addOverlay(entry);

    entry.element
      .querySelector(".godfather-close")
      .addEventListener("click", function() {
        destroy(entry);
      });

    if (prev)
      entry.element
        .querySelector(".godfather-prev")
        .addEventListener("click", function() {
          destroy(entry);
          if ("prev" in entry.events)
            entry.events["prev"].forEach(f => f(entry.instance));

          if (isFunction(prev)) prev();
          else init(prev);
        });

    if (next)
      entry.element
        .querySelector(".godfather-next")
        .addEventListener("click", function() {
          destroy(entry);
          if ("next" in entry.events)
            entry.events["next"].forEach(f => f(entry.instance));

          if (isFunction(next)) next();
          else init(next);
        });

    document.body.appendChild(entry.element);

    if (entry.options.clickAway)
      entry.clickAway = clickAway(entry.element, hide.bind(null, entry.id));

    if (target)
      entry.popper = new Popper(target, entry.element, {
        placement: entry.options.placement || "bottom",
        modifiers: {
          offset: {
            offset: "0,10"
          }
        }
      });

    if (entry.options.scrollIntoView)
      setTimeout(
        () => (target || entry.element).scrollIntoView({ behavior: "smooth" }),
        0
      );
  });
}

function destroy(entry) {
  if (entry.target) {
    let target = resolveTarget(entry);
    if (target) target.classList.remove("godfather--active");
  }
  if (entry.popper) entry.popper.destroy();
  if (entry.options.overlay) removeOverlay(entry);
  if (entry.clickAway) window.removeEventListener("click", entry.clickAway);
  if (document.body.contains(entry.element)) {
    document.body.removeChild(entry.element);
    if ("hide" in entry.events)
      entry.events["hide"].forEach(f => f(entry.instance));
  }

  entry.initialized = false;
}

function renderHint(entry) {
  let target = resolveTarget(entry);
  if (!target) return;
  let style = window.getComputedStyle(target);
  let position = style.getPropertyValue("position");
  if (position === "static") target.style.position = "relative";

  let hint = document.createElement("hint");
  hint.classList.add("godfather-hint");
  hint.style.color = entry.options.theme.background;

  hint.addEventListener("click", function(event) {
    if (document.body.contains(entry.element)) hide(entry.id);
    else show(entry.id);
  });

  entry.hint = hint;
  target.appendChild(hint);
}

function destroyHint(entry) {
  let target = resolveTarget(entry);
  if (!target) return;
  target.removeChild(entry.hint);
}

function template(entry) {
  let prev = getPrev(entry);
  let next = getNext(entry);

  return `
    <div class="godfather-animation">
      <div class="popper__arrow tooltip-arrow" x-arrow style="color: ${
        entry.options.theme.background
      }"></div>
      <div class="godfather-container">
        ${
          entry.options.image
            ? `<div class="godfather-image godfather-image-loader"></div>`
            : ""
        }
        <div class="godfather-inner-container">
          <div class="godfather-content-container">
            ${
              entry.options.title
                ? `<div class="godfather-title">${entry.options.title}</div><hr>`
                : ""
            }
            <div class="godfather-content">${entry.options.content}</div>
          </div>
          <div class="godfather-actions">
            <div>
              ${
                prev
                  ? `<button class="godfather-prev">${entry.options.labels.prev}</button>`
                  : ""
              }
              ${
                next
                  ? `<button class="godfather-next">${entry.options.labels.next}</button>`
                  : ""
              }
            </div>
            <button class="godfather-close">${
              entry.options.labels.close
            }</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function register(id, target, options) {
  if (!id) return new Error("ID is required");
  if (entries.find(e => e.id === id))
    return new Error("Skipping registration: Duplicate ID");

  let newEntry = {
    id,
    target,
    initialized: false,
    events: {},
    instance: {
      show() {
        return show(id);
      },
      hide() {
        return hide(id);
      },
      unregister() {
        return unregister(id);
      },
      addEventListener(ev, func) {
        if (ev in newEntry.events) newEntry.events[ev].push(func);
        else newEntry.events[ev] = [func];
      },
      removeEventListener(ev, func) {
        if (!newEntry.events[ev]) return;
        newEntry.events[ev] = newEntry.events[ev].filter(f => f !== func);
      }
    },
    options: Object.assign({}, defaultOptions, options)
  };

  entries.push(newEntry);

  if (newEntry.target && newEntry.options.hint) renderHint(newEntry);

  return newEntry.instance;
}

function unregister(id) {
  let entry = entries.find(e => e.id === id);
  if (!entry) return;

  destroy(entry);
  if (entry.hint) destroyHint(entry);
  entries = entries.filter(e => e.id !== id);
}

function show(id) {
  let entry = entries.find(e => e.id === id);
  if (entry) init(entry);
}

function hide(id) {
  let entry = entries.find(e => e.id === id);
  if (entry) destroy(entry);
}

function isFunction(value) {
  return typeof value === "function";
}

function setDefault(options) {
  defaultOptions = merge(defaultOptions, options);
}

function merge(a, b) {
  Object.keys(b).forEach(key => {
    if (b[key] !== null && typeof b[key] === "object")
      b[key] = merge(a[key], b[key]);
  });

  return Object.assign({}, a, b);
}

function clickAway(target, cb) {
  let func = function(event) {
    if (target.contains(event.target) || target === event.target) return;
    cb();
  };

  setTimeout(() => window.addEventListener("click", func));

  return func;
}

let Godfather = {
  register,
  unregister,
  show,
  hide,
  setDefault
};

export default Godfather;
