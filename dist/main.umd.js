var J=Object.defineProperty;var T=Object.getOwnPropertySymbols;var Q=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable;var N=(t,o,r)=>o in t?J(t,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[o]=r,m=(t,o)=>{for(var r in o||(o={}))Q.call(o,r)&&N(t,r,o[r]);if(T)for(var r of T(o))X.call(o,r)&&N(t,r,o[r]);return t};var d=(t,o,r)=>(N(t,typeof o!="symbol"?o+"":o,r),r),$=(t,o,r)=>{if(!o.has(t))throw TypeError("Cannot "+r)};var R=(t,o,r)=>($(t,o,"read from private field"),r?r.call(t):o.get(t)),U=(t,o,r)=>{if(o.has(t))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(t):o.set(t,r)},C=(t,o,r,p)=>($(t,o,"write to private field"),p?p.call(t,r):o.set(t,r),r);(function(t,o){typeof exports=="object"&&typeof module!="undefined"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(t=typeof globalThis!="undefined"?globalThis:t||self,o(t.__LAKE__={}))})(this,function(t){var a,h,G,H;"use strict";const o=(e,n)=>Array.from((n!=null?n:document).querySelectorAll(e));class r{constructor(n){U(this,a,void 0);C(this,a,n)}get value(){return R(this,a)}set value(n){C(this,a,n)}}a=new WeakMap;const p=e=>new r(e);class I{constructor(n){U(this,h,void 0);C(this,h,n)}get value(){return R(this,h).value}}h=new WeakMap;const x=e=>new I(e),D=e=>console.warn(e),b=e=>e.forEach(n=>n());function W(e,n){if(!e)throw new Error(n||"unexpected condition")}var f=(e=>(e.MOUNTED="onMounted",e.UNMOUNTED="onUnmounted",e))(f||{});const y=e=>n=>{E(e)[e].push(n)},j=y("onMounted"),M=y("onUnmounted");let v=null;const A=e=>v=e,E=e=>(W(v,`"${e}" called outside setup() will never be run.`),v);let q=0;class L{constructor(n){d(this,G,[]);d(this,H,[]);d(this,"uid");d(this,"parent",null);d(this,"children",[]);d(this,"mount",()=>{b([...this[f.MOUNTED],...this.children.flatMap(n=>n.mount)])});d(this,"unmount",()=>{b([...this[f.UNMOUNTED],...this.children.flatMap(n=>n.unmount)])});d(this,"addChild",n=>{this.children.push(n),n.parent=this});d(this,"removeChild",n=>{const u=this.children.findIndex(s=>s===n);u!==-1&&(this.children.splice(u,1),n.parent=null)});this.element=n,this.uid=n.id||q++}}G=f.MOUNTED,H=f.UNMOUNTED;function O(e){const n=v;return(u,s)=>{const l=A(new L(u));return e.setup(u,m(m({},e.props),s)),A(n),l}}const w=new WeakMap,P=(e,n,u)=>{w.has(e)&&D(`The DOM of ${u} was already bind.`),w.set(e,n)},_=e=>e;function g(){return{component(e){return(n,u)=>{const s=O(e)(n,u);P(n,s),s.mount()}},unmount(e,n){o(e,n).filter(u=>w.get(u)).map(u=>w.get(u).unmount())}}}function k(){const e=E("children");return{addChild(n,u,s){const l=[],c=i=>{const S=O(u)(i,m(m({},u.props),s));e.addChild(S),l.push(S)};return Array.isArray(n)?n.forEach(i=>c(i)):c(n),l},removeChild(n){e.removeChild(n)}}}const K=(e,n,u,s)=>{e.addEventListener(n,u,s),M(()=>{e.removeEventListener(n,u,s)})};function V(e,n){const u=c=>{const i=o(`[data-ref="${c}"]`,n);return s(i,c)},s=(c,i)=>{switch(c.length){case 0:return D(`[data-ref="${i}"] does not exist.`),null;case 1:return c[0];default:return c}};return[...e].reduce((c,i)=>(c[i]=u(i),c),{})}function z(...e){const n=E("domRef");return{refs:V(new Set(e),n.element)}}const B=(e,n,u={rootMargin:"0px",threshold:.1})=>{const s=new IntersectionObserver(n,u);return Array.isArray(e)?e.forEach(c=>s.observe(c)):s.observe(e),M(()=>{s.disconnect()}),{unwatch:c=>{s.unobserve(c)}}};function F(e){return _({setup(n,u){const s=new Map([["$",{rootRef:n}]]),l=new e({target:n,props:u,context:s});M(()=>{l.$destroy()})}})}t.children=k,t.createApp=g,t.defineComponent=_,t.onMounted=j,t.onUnmounted=M,t.q=o,t.readonly=x,t.ref=p,t.useDOMRef=z,t.useEvent=K,t.useIntersectionWatch=B,t.withSvelte=F,Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
