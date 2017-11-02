(function(e,t){'object'==typeof exports&&'object'==typeof module?module.exports=t():'function'==typeof define&&define.amd?define([],t):'object'==typeof exports?exports.Godfather=t():e.Godfather=t()})(this,function(){return function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var o={};return t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var o=e&&e.__esModule?function(){return e['default']}:function(){return e};return t.d(o,'a',o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p='',t(t.s=0)}([function(e,t,o){'use strict';function n(e){let t=e.target instanceof HTMLElement?e.target:document.querySelector(e.target);if(!t)throw new Error('Invalig target');return t}function i(t){if(!document.body.contains(t.element)){t.target=n(t),t.element=document.createElement('div'),t.element.classList.add('godfather-entry');let e=h.find((o)=>o.options.next===t.id);e&&(t.options.prev=e.id),t.element.innerHTML=s(t),Object.keys(t.options.theme).forEach((e)=>{t.element.firstElementChild.style[e]=t.options.theme[e]}),t.element.querySelector('.godfather-close').addEventListener('click',function(){r(t)}),t.options.prev&&t.element.querySelector('.godfather-prev').addEventListener('click',function(){r(t);let e=h.find((o)=>o.id===t.options.prev);i(e)}),t.options.next&&t.element.querySelector('.godfather-next').addEventListener('click',function(){r(t);let e=h.find((o)=>o.id===t.options.next);i(e)}),document.body.appendChild(t.element),t.popper=new f.a(t.target,t.element,{placement:t.options.placement||'bottom',modifiers:{offset:{offset:'0,10'}}}),t.options.scrollIntoView&&setTimeout(()=>t.element.scrollIntoView({behavior:'smooth'}),0)}}function r(e){e.popper.destroy(),document.body.contains(e.element)&&document.body.removeChild(e.element)}function p(e){e.target=n(e);let t=window.getComputedStyle(e.target),o=t.getPropertyValue('position');'static'===o&&(e.target.style.position='relative');let i=document.createElement('hint');i.classList.add('godfather-hint'),i.style.color=e.options.theme.background,i.addEventListener('click',function(e){event.stopPropagation(),document.body.contains(e.element)?a(e.id):d(e.id)}.bind(null,e)),e.hint=i,e.target.appendChild(i)}function s(e){return`
    <div class="godfather-animation">
      <div class="popper__arrow tooltip-arrow" x-arrow style="color: ${e.options.theme.background}"></div>
      <div class="godfather-container">
        ${e.options.image?`<div class="godfather-image" style="background-image: url('${e.options.image}')"></div>`:''}
        <div class="godfather-inner-container">
          <div class="godfather-content-container">
            ${e.options.title?`<div class="godfather-title">${e.options.title}</div><hr>`:''}
            <div class="godfather-content">${e.options.content}</div>
          </div>
          <div class="godfather-actions">
            <div>
              ${e.options.prev?`<button class="godfather-prev">${e.options.labels.prev}</button>`:''}
              ${e.options.next?`<button class="godfather-next">${e.options.labels.next}</button>`:''}
            </div>
            <button class="godfather-close">${e.options.labels.close}</button>
          </div>
        </div>
      </div>
    </div>
  `}function d(t){let e=h.find((o)=>o.id===t);e&&i(e)}function a(t){let e=h.find((o)=>o.id===t);e&&r(e)}function l(e,t){return Object.keys(t).forEach((o)=>{null!==t[o]&&'object'==typeof t[o]&&(t[o]=l(e[o],t[o]))}),Object.assign({},e,t)}Object.defineProperty(t,'__esModule',{value:!0});var f=o(1),m=o(3),c=o.n(m);let h=[],u={next:null,hint:!1,title:null,content:null,image:null,clean:!1,scrollIntoView:!0,theme:{background:'#222',color:'white'},labels:{prev:'<',next:'>',close:'\u2715'}};t['default']={register:function(e,t,o){if(!e)throw new Error('id is required');if(!t)throw new Error('element is required');let n={id:e,target:t,options:Object.assign({},u,o)};h.push(n),n.options.hint&&p(n)},unregister:function(t){let e=h.find((o)=>o.id===t);e&&(r(e),h=h.filter((o)=>o.id!==t))},show:d,hide:a,setDefault:function(e){u=l(u,e)}}},function(e,t,o){'use strict';(function(e){function o(e){return e&&'[object Function]'==={}.toString.call(e)}function n(e,t){if(1!==e.nodeType)return[];var o=window.getComputedStyle(e,null);return t?o[t]:o}function r(e){return'HTML'===e.nodeName?e:e.parentNode||e.host}function p(e){if(!e)return window.document.body;switch(e.nodeName){case'HTML':case'BODY':return e.ownerDocument.body;case'#document':return e.body;}var t=n(e),o=t.overflow,i=t.overflowX,s=t.overflowY;return /(auto|scroll)/.test(o+s+i)?e:p(r(e))}function s(e){var t=e&&e.offsetParent,o=t&&t.nodeName;return o&&'BODY'!==o&&'HTML'!==o?-1!==['TD','TABLE'].indexOf(t.nodeName)&&'static'===n(t,'position')?s(t):t:e?e.ownerDocument.documentElement:window.document.documentElement}function d(e){var t=e.nodeName;return'BODY'!==t&&('HTML'===t||s(e.firstElementChild)===e)}function a(e){return null===e.parentNode?e:a(e.parentNode)}function l(e,t){if(!e||!e.nodeType||!t||!t.nodeType)return window.document.documentElement;var o=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,n=o?e:t,i=o?t:e,r=document.createRange();r.setStart(n,0),r.setEnd(i,0);var p=r.commonAncestorContainer;if(e!==p&&t!==p||n.contains(i))return d(p)?p:s(p);var f=a(e);return f.host?l(f.host,t):l(e,a(t).host)}function f(e){var t=1<arguments.length&&arguments[1]!==void 0?arguments[1]:'top',o='top'===t?'scrollTop':'scrollLeft',n=e.nodeName;if('BODY'===n||'HTML'===n){var i=e.ownerDocument.documentElement,r=e.ownerDocument.scrollingElement||i;return r[o]}return e[o]}function m(e,t){var o=2<arguments.length&&void 0!==arguments[2]&&arguments[2],n=f(t,'top'),i=f(t,'left'),r=o?-1:1;return e.top+=n*r,e.bottom+=n*r,e.left+=i*r,e.right+=i*r,e}function c(e,t){var o='x'===t?'Left':'Top',n='Left'==o?'Right':'Bottom';return+e['border'+o+'Width'].split('px')[0]+ +e['border'+n+'Width'].split('px')[0]}function h(e,t,o,n){return $(t['offset'+e],t['scroll'+e],o['client'+e],o['offset'+e],o['scroll'+e],re()?o['offset'+e]+n['margin'+('Height'===e?'Top':'Left')]+n['margin'+('Height'===e?'Bottom':'Right')]:0)}function u(){var e=window.document.body,t=window.document.documentElement,o=re()&&window.getComputedStyle(t);return{height:h('Height',e,t,o),width:h('Width',e,t,o)}}function g(e){return ae({},e,{right:e.left+e.width,bottom:e.top+e.height})}function b(e){var t={};if(re())try{t=e.getBoundingClientRect();var o=f(e,'top'),i=f(e,'left');t.top+=o,t.left+=i,t.bottom+=o,t.right+=i}catch(e){}else t=e.getBoundingClientRect();var r={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},p='HTML'===e.nodeName?u():{},s=p.width||e.clientWidth||r.right-r.left,d=p.height||e.clientHeight||r.bottom-r.top,a=e.offsetWidth-s,l=e.offsetHeight-d;if(a||l){var m=n(e);a-=c(m,'x'),l-=c(m,'y'),r.width-=a,r.height-=l}return g(r)}function y(e,t){var o=re(),i='HTML'===t.nodeName,r=b(e),s=b(t),d=p(e),a=n(t),l=+a.borderTopWidth.split('px')[0],f=+a.borderLeftWidth.split('px')[0],c=g({top:r.top-s.top-l,left:r.left-s.left-f,width:r.width,height:r.height});if(c.marginTop=0,c.marginLeft=0,!o&&i){var h=+a.marginTop.split('px')[0],u=+a.marginLeft.split('px')[0];c.top-=l-h,c.bottom-=l-h,c.left-=f-u,c.right-=f-u,c.marginTop=h,c.marginLeft=u}return(o?t.contains(d):t===d&&'BODY'!==d.nodeName)&&(c=m(c,t)),c}function w(e){var t=e.ownerDocument.documentElement,o=y(e,t),n=$(t.clientWidth,window.innerWidth||0),i=$(t.clientHeight,window.innerHeight||0),r=f(t),p=f(t,'left'),s={top:r-o.top+o.marginTop,left:p-o.left+o.marginLeft,width:n,height:i};return g(s)}function v(e){var t=e.nodeName;return'BODY'===t||'HTML'===t?!1:!('fixed'!==n(e,'position'))||v(r(e))}function E(e,t,o,n){var i={top:0,left:0},s=l(e,t);if('viewport'===n)i=w(s);else{var d;'scrollParent'===n?(d=p(r(e)),'BODY'===d.nodeName&&(d=e.ownerDocument.documentElement)):'window'===n?d=e.ownerDocument.documentElement:d=n;var a=y(d,s);if('HTML'===d.nodeName&&!v(s)){var f=u(),m=f.height,c=f.width;i.top+=a.top-a.marginTop,i.bottom=m+a.top,i.left+=a.left-a.marginLeft,i.right=c+a.left}else i=a}return i.left+=o,i.top+=o,i.right-=o,i.bottom-=o,i}function x(e){var t=e.width,o=e.height;return t*o}function L(e,t,o,n,i){var r=5<arguments.length&&arguments[5]!==void 0?arguments[5]:0;if(-1===e.indexOf('auto'))return e;var p=E(o,n,r,i),s={top:{width:p.width,height:t.top-p.top},right:{width:p.right-t.right,height:p.height},bottom:{width:p.width,height:p.bottom-t.bottom},left:{width:t.left-p.left,height:p.height}},d=Object.keys(s).map(function(e){return ae({key:e},s[e],{area:x(s[e])})}).sort(function(e,t){return t.area-e.area}),a=d.filter(function(e){var t=e.width,n=e.height;return t>=o.clientWidth&&n>=o.clientHeight}),l=0<a.length?a[0].key:d[0].key,f=e.split('-')[1];return l+(f?'-'+f:'')}function O(e,t,o){var n=l(t,o);return y(o,n)}function S(e){var t=window.getComputedStyle(e),o=parseFloat(t.marginTop)+parseFloat(t.marginBottom),n=parseFloat(t.marginLeft)+parseFloat(t.marginRight),i={width:e.offsetWidth+n,height:e.offsetHeight+o};return i}function k(e){var t={left:'right',right:'left',bottom:'top',top:'bottom'};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function C(e,t,o){o=o.split('-')[0];var n=S(e),i={width:n.width,height:n.height},r=-1!==['right','left'].indexOf(o),p=r?'top':'left',s=r?'left':'top',d=r?'height':'width',a=r?'width':'height';return i[p]=t[p]+t[d]/2-n[d]/2,i[s]=o===s?t[s]-n[a]:t[k(s)],i}function T(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function D(e,t,o){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===o});var n=T(e,function(e){return e[t]===o});return e.indexOf(n)}function N(e,t,n){var i=void 0===n?e:e.slice(0,D(e,'name',n));return i.forEach(function(e){e['function']&&console.warn('`modifier.function` is deprecated, use `modifier.fn`!');var n=e['function']||e.fn;e.enabled&&o(n)&&(t.offsets.popper=g(t.offsets.popper),t.offsets.reference=g(t.offsets.reference),t=n(t,e))}),t}function P(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=O(this.state,this.popper,this.reference),e.placement=L(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.offsets.popper=C(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position='absolute',e=N(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function W(e,t){return e.some(function(e){var o=e.name,n=e.enabled;return n&&o===t})}function B(e){for(var t=[!1,'ms','Webkit','Moz','O'],o=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<t.length-1;n++){var i=t[n],r=i?''+i+o:e;if('undefined'!=typeof window.document.body.style[r])return r}return null}function I(){return this.state.isDestroyed=!0,W(this.modifiers,'applyStyle')&&(this.popper.removeAttribute('x-placement'),this.popper.style.left='',this.popper.style.position='',this.popper.style.top='',this.popper.style[B('transform')]=''),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function H(e){var t=e.ownerDocument;return t?t.defaultView:window}function A(e,t,o,n){var i='BODY'===e.nodeName,r=i?e.ownerDocument.defaultView:e;r.addEventListener(t,o,{passive:!0}),i||A(p(r.parentNode),t,o,n),n.push(r)}function M(e,t,o,n){o.updateBound=n,H(e).addEventListener('resize',o.updateBound,{passive:!0});var i=p(e);return A(i,'scroll',o.updateBound,o.scrollParents),o.scrollElement=i,o.eventsEnabled=!0,o}function R(){this.state.eventsEnabled||(this.state=M(this.reference,this.options,this.state,this.scheduleUpdate))}function U(e,t){return H(e).removeEventListener('resize',t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener('scroll',t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function q(){this.state.eventsEnabled&&(window.cancelAnimationFrame(this.scheduleUpdate),this.state=U(this.reference,this.state))}function Y(e){return''!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function j(e,t){Object.keys(t).forEach(function(o){var n='';-1!==['width','height','top','right','bottom','left'].indexOf(o)&&Y(t[o])&&(n='px'),e.style[o]=t[o]+n})}function V(e,t){Object.keys(t).forEach(function(o){var n=t[o];!1===n?e.removeAttribute(o):e.setAttribute(o,t[o])})}function F(e,t,o){var n=T(e,function(e){var o=e.name;return o===t}),i=!!n&&e.some(function(e){return e.name===o&&e.enabled&&e.order<n.order});if(!i){var r='`'+t+'`';console.warn('`'+o+'`'+' modifier is required by '+r+' modifier in order to work, be sure to include it before '+r+'!')}return i}function _(e){if('end'===e)return'start';return'start'===e?'end':e}function G(e){var t=1<arguments.length&&arguments[1]!==void 0&&arguments[1],o=fe.indexOf(e),n=fe.slice(o+1).concat(fe.slice(0,o));return t?n.reverse():n}function K(e,t,o,n){var i=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+i[1],p=i[2];if(!r)return e;if(0===p.indexOf('%')){var s;switch(p){case'%p':s=o;break;case'%':case'%r':default:s=n;}var d=g(s);return d[t]/100*r}if('vh'===p||'vw'===p){var a;return a='vh'===p?$(document.documentElement.clientHeight,window.innerHeight||0):$(document.documentElement.clientWidth,window.innerWidth||0),a/100*r}return r}function z(e,t,o,n){var i=[0,0],r=-1!==['right','left'].indexOf(n),p=e.split(/(\+|\-)/).map(function(e){return e.trim()}),s=p.indexOf(T(p,function(e){return-1!==e.search(/,|\s/)}));p[s]&&-1===p[s].indexOf(',')&&console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');var d=/\s*,\s*|\s+/,a=-1===s?[p]:[p.slice(0,s).concat([p[s].split(d)[0]]),[p[s].split(d)[1]].concat(p.slice(s+1))];return a=a.map(function(e,n){var i=(1===n?!r:r)?'height':'width',p=!1;return e.reduce(function(e,t){return''===e[e.length-1]&&-1!==['+','-'].indexOf(t)?(e[e.length-1]=t,p=!0,e):p?(e[e.length-1]+=t,p=!1,e):e.concat(t)},[]).map(function(e){return K(e,i,t,o)})}),a.forEach(function(e,t){e.forEach(function(o,n){Y(o)&&(i[t]+=o*('-'===e[n-1]?-1:1))})}),i}function X(e,t){var o,n=t.offset,i=e.placement,r=e.offsets,p=r.popper,s=r.reference,d=i.split('-')[0];return o=Y(+n)?[+n,0]:z(n,p,s,d),'left'===d?(p.top+=o[0],p.left-=o[1]):'right'===d?(p.top+=o[0],p.left+=o[1]):'top'===d?(p.left+=o[0],p.top-=o[1]):'bottom'===d&&(p.left+=o[0],p.top+=o[1]),e.popper=p,e}/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.12.6
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */for(var Q=Math.min,Z=Math.floor,$=Math.max,J='undefined'!=typeof window&&'undefined'!=typeof window.document,ee=['Edge','Trident','Firefox'],te=0,oe=0;oe<ee.length;oe+=1)if(J&&0<=navigator.userAgent.indexOf(ee[oe])){te=1;break}var i,ne=J&&window.Promise,ie=ne?function(e){var t=!1;return function(){t||(t=!0,Promise.resolve().then(function(){t=!1,e()}))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},te))}},re=function(){return void 0==i&&(i=-1!==navigator.appVersion.indexOf('MSIE 10')),i},pe=function(e,t){if(!(e instanceof t))throw new TypeError('Cannot call a class as a function')},se=function(){function e(e,t){for(var o,n=0;n<t.length;n++)o=t[n],o.enumerable=o.enumerable||!1,o.configurable=!0,'value'in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),de=function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e},ae=Object.assign||function(e){for(var t,o=1;o<arguments.length;o++)for(var n in t=arguments[o],t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},le=['auto-start','auto','auto-end','top-start','top','top-end','right-start','right','right-end','bottom-end','bottom','bottom-start','left-end','left','left-start'],fe=le.slice(3),me={FLIP:'flip',CLOCKWISE:'clockwise',COUNTERCLOCKWISE:'counterclockwise'},ce=function(){function e(t,n){var i=this,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};pe(this,e),this.scheduleUpdate=function(){return requestAnimationFrame(i.update)},this.update=ie(this.update.bind(this)),this.options=ae({},e.Defaults,r),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=t&&t.jquery?t[0]:t,this.popper=n&&n.jquery?n[0]:n,this.options.modifiers={},Object.keys(ae({},e.Defaults.modifiers,r.modifiers)).forEach(function(t){i.options.modifiers[t]=ae({},e.Defaults.modifiers[t]||{},r.modifiers?r.modifiers[t]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return ae({name:e},i.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(e){e.enabled&&o(e.onLoad)&&e.onLoad(i.reference,i.popper,i.options,e,i.state)}),this.update();var p=this.options.eventsEnabled;p&&this.enableEventListeners(),this.state.eventsEnabled=p}return se(e,[{key:'update',value:function(){return P.call(this)}},{key:'destroy',value:function(){return I.call(this)}},{key:'enableEventListeners',value:function(){return R.call(this)}},{key:'disableEventListeners',value:function(){return q.call(this)}}]),e}();ce.Utils=('undefined'==typeof window?e:window).PopperUtils,ce.placements=le,ce.Defaults={placement:'bottom',eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,o=t.split('-')[0],n=t.split('-')[1];if(n){var i=e.offsets,r=i.reference,p=i.popper,s=-1!==['bottom','top'].indexOf(o),d=s?'left':'top',a=s?'width':'height',l={start:de({},d,r[d]),end:de({},d,r[d]+r[a]-p[a])};e.offsets.popper=ae({},p,l[n])}return e}},offset:{order:200,enabled:!0,fn:X,offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var o=t.boundariesElement||s(e.instance.popper);e.instance.reference===o&&(o=s(o));var n=E(e.instance.popper,e.instance.reference,t.padding,o);t.boundaries=n;var i=t.priority,r=e.offsets.popper,p={primary:function(e){var o=r[e];return r[e]<n[e]&&!t.escapeWithReference&&(o=$(r[e],n[e])),de({},e,o)},secondary:function(e){var o='right'===e?'left':'top',i=r[o];return r[e]>n[e]&&!t.escapeWithReference&&(i=Q(r[o],n[e]-('right'===e?r.width:r.height))),de({},o,i)}};return i.forEach(function(e){var t=-1===['left','top'].indexOf(e)?'secondary':'primary';r=ae({},r,p[t](e))}),e.offsets.popper=r,e},priority:['left','right','top','bottom'],padding:5,boundariesElement:'scrollParent'},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,o=t.popper,n=t.reference,i=e.placement.split('-')[0],r=Z,p=-1!==['top','bottom'].indexOf(i),s=p?'right':'bottom',d=p?'left':'top',a=p?'width':'height';return o[s]<r(n[d])&&(e.offsets.popper[d]=r(n[d])-o[a]),o[d]>r(n[s])&&(e.offsets.popper[d]=r(n[s])),e}},arrow:{order:500,enabled:!0,fn:function(e,t){if(!F(e.instance.modifiers,'arrow','keepTogether'))return e;var o=t.element;if('string'==typeof o){if(o=e.instance.popper.querySelector(o),!o)return e;}else if(!e.instance.popper.contains(o))return console.warn('WARNING: `arrow.element` must be child of its popper element!'),e;var i=e.placement.split('-')[0],r=e.offsets,p=r.popper,s=r.reference,d=-1!==['left','right'].indexOf(i),a=d?'height':'width',l=d?'Top':'Left',f=l.toLowerCase(),m=d?'left':'top',c=d?'bottom':'right',h=S(o)[a];s[c]-h<p[f]&&(e.offsets.popper[f]-=p[f]-(s[c]-h)),s[f]+h>p[c]&&(e.offsets.popper[f]+=s[f]+h-p[c]);var u=s[f]+s[a]/2-h/2,b=n(e.instance.popper,'margin'+l).replace('px',''),y=u-g(e.offsets.popper)[f]-b;return y=$(Q(p[a]-h,y),0),e.arrowElement=o,e.offsets.arrow={},e.offsets.arrow[f]=Math.round(y),e.offsets.arrow[m]='',e},element:'[x-arrow]'},flip:{order:600,enabled:!0,fn:function(e,t){if(W(e.instance.modifiers,'inner'))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var o=E(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement),n=e.placement.split('-')[0],i=k(n),r=e.placement.split('-')[1]||'',p=[];switch(t.behavior){case me.FLIP:p=[n,i];break;case me.CLOCKWISE:p=G(n);break;case me.COUNTERCLOCKWISE:p=G(n,!0);break;default:p=t.behavior;}return p.forEach(function(s,d){if(n!==s||p.length===d+1)return e;n=e.placement.split('-')[0],i=k(n);var a=e.offsets.popper,l=e.offsets.reference,f=Z,m='left'===n&&f(a.right)>f(l.left)||'right'===n&&f(a.left)<f(l.right)||'top'===n&&f(a.bottom)>f(l.top)||'bottom'===n&&f(a.top)<f(l.bottom),c=f(a.left)<f(o.left),h=f(a.right)>f(o.right),u=f(a.top)<f(o.top),g=f(a.bottom)>f(o.bottom),b='left'===n&&c||'right'===n&&h||'top'===n&&u||'bottom'===n&&g,y=-1!==['top','bottom'].indexOf(n),w=!!t.flipVariations&&(y&&'start'===r&&c||y&&'end'===r&&h||!y&&'start'===r&&u||!y&&'end'===r&&g);(m||b||w)&&(e.flipped=!0,(m||b)&&(n=p[d+1]),w&&(r=_(r)),e.placement=n+(r?'-'+r:''),e.offsets.popper=ae({},e.offsets.popper,C(e.instance.popper,e.offsets.reference,e.placement)),e=N(e.instance.modifiers,e,'flip'))}),e},behavior:'flip',padding:5,boundariesElement:'viewport'},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,o=t.split('-')[0],n=e.offsets,i=n.popper,r=n.reference,p=-1!==['left','right'].indexOf(o),s=-1===['top','left'].indexOf(o);return i[p?'left':'top']=r[o]-(s?i[p?'width':'height']:0),e.placement=k(t),e.offsets.popper=g(i),e}},hide:{order:800,enabled:!0,fn:function(e){if(!F(e.instance.modifiers,'hide','preventOverflow'))return e;var t=e.offsets.reference,o=T(e.instance.modifiers,function(e){return'preventOverflow'===e.name}).boundaries;if(t.bottom<o.top||t.left>o.right||t.top>o.bottom||t.right<o.left){if(!0===e.hide)return e;e.hide=!0,e.attributes['x-out-of-boundaries']=''}else{if(!1===e.hide)return e;e.hide=!1,e.attributes['x-out-of-boundaries']=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var o=t.x,n=t.y,i=e.offsets.popper,r=T(e.instance.modifiers,function(e){return'applyStyle'===e.name}).gpuAcceleration;void 0!==r&&console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');var p,d,a=void 0===r?t.gpuAcceleration:r,l=s(e.instance.popper),f=b(l),m={position:i.position},c={left:Z(i.left),top:Z(i.top),bottom:Z(i.bottom),right:Z(i.right)},h='bottom'===o?'top':'bottom',u='right'===n?'left':'right',g=B('transform');if(d='bottom'==h?-f.height+c.bottom:c.top,p='right'==u?-f.width+c.right:c.left,a&&g)m[g]='translate3d('+p+'px, '+d+'px, 0)',m[h]=0,m[u]=0,m.willChange='transform';else{var y='bottom'==h?-1:1,w='right'==u?-1:1;m[h]=d*y,m[u]=p*w,m.willChange=h+', '+u}var v={"x-placement":e.placement};return e.attributes=ae({},v,e.attributes),e.styles=ae({},m,e.styles),e.arrowStyles=ae({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:'bottom',y:'right'},applyStyle:{order:900,enabled:!0,fn:function(e){return j(e.instance.popper,e.styles),V(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&j(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,o,n,i){var r=O(i,t,e),p=L(o.placement,r,t,e,o.modifiers.flip.boundariesElement,o.modifiers.flip.padding);return t.setAttribute('x-placement',p),j(t,{position:'absolute'}),o},gpuAcceleration:void 0}}},t.a=ce}).call(t,o(2))},function(e){var t=function(){return this}();try{t=t||Function('return this')()||(1,eval)('this')}catch(o){'object'==typeof window&&(t=window)}e.exports=t},function(){}])['default']});