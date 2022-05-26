(function(t,o){typeof exports=="object"&&typeof module!="undefined"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(t=typeof globalThis!="undefined"?globalThis:t||self,o(t.__LAKE__={}))})(this,function(t){"use strict";var q=Object.defineProperty;var C=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var a=(t,o,u)=>o in t?q(t,o,{enumerable:!0,configurable:!0,writable:!0,value:u}):t[o]=u,m=(t,o)=>{for(var u in o||(o={}))x.call(o,u)&&a(t,u,o[u]);if(C)for(var u of C(o))I.call(o,u)&&a(t,u,o[u]);return t};var l=(t,o,u)=>(a(t,typeof o!="symbol"?o+"":o,u),u);function o(n,e){if(!n)throw new Error(e||"unexpected condition")}const u=(n,e)=>Array.from((e!=null?e:document).querySelectorAll(n)),_=()=>{};class M{constructor(e){l(this,"onUnmount",[]);l(this,"unmount",()=>{this.onUnmount.forEach(e=>e())});const r=e||_;this.onUnmount.push(r)}addChild(e){this.onUnmount.push(e.unmount)}}function E(n){return(e,r)=>{const i=m(m({},n.props),r),f=n.setup(e,i),s=new M(f);return n.components&&Object.entries(n.components).forEach(([d,$])=>{u(d).forEach(L=>{const U=$.props||{},j=E($)(L,U);s.addChild(j)})}),s}}const c=new Map,h=new WeakMap,g=(n,e,r)=>{o(!h.has(n),`The DOM of ${r} was already bind`),h.set(n,e)},p=n=>n;function v(n,e){return o(!c.has(n),`${n} was already registered`),c.set(n,E(e)),c}function y(n){return o(c.has(n),`${n} does not registered`),c.delete(n),c}function S(n,e,r){o(c.has(r),`${r} was never registered`);const i=c.get(r);g(n,i(n,e),r)}function A(n,e){u(n,e).filter(r=>h.has(r)).forEach(r=>h.get(r).unmount())}let T;function w(){throw new Error("Function called outside component initialization")}function R(n){w().$$.on_destroy.push(n)}function N(n){return w().$$.context.get(n)}Promise.resolve();function P(n,e){const r=s=>{const d=u(`[data-ref="${s}"]`,e);return i(d,s)},i=(s,d)=>{switch(s.length){case 0:throw new Error(`[data-ref="${d}"] does not exist`);case 1:return s[0];default:return s}};return[...n].reduce((s,d)=>(s[d]=r(d),s),{})}function b(n){return p({setup(e,r){const i=new Map;i.set("$",{rootRef:e,useDOMRef:(...s)=>({refs:P(new Set(s),e)})});const f=new n({target:e,props:r,context:i});return()=>{f.$destroy()}}})}function D(){return N("$")}function O(n,e,r,i){const f=Array.isArray(n);f?n.forEach(s=>s.addEventListener(e,r,i)):n.addEventListener(e,r,i),R(()=>{f?n.forEach(s=>s.removeEventListener(e,r,i)):n.removeEventListener(e,r,i)})}t.assert=o,t.defineComponent=p,t.getContext$=D,t.mount=S,t.q=u,t.register=v,t.unmount=A,t.unregister=y,t.useEvent=O,t.withSvelte=b,Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
