var T=Object.defineProperty;var k=(e,o,r)=>o in e?T(e,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[o]=r;var E=(e,o,r)=>(k(e,typeof o!="symbol"?o+"":o,r),r),C=(e,o,r)=>{if(!o.has(e))throw TypeError("Cannot "+r)};var _=(e,o,r)=>(C(e,o,"read from private field"),r?r.call(e):o.get(e)),$=(e,o,r)=>{if(o.has(e))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(e):o.set(e,r)},p=(e,o,r,h)=>(C(e,o,"write to private field"),h?h.call(e,r):o.set(e,r),r);(function(e,o){typeof exports=="object"&&typeof module!="undefined"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(e=typeof globalThis!="undefined"?globalThis:e||self,o(e.__LAKE__={}))})(this,function(e){var a;"use strict";function o(n,t){if(!n)throw new Error(t||"unexpected condition")}const r=(n,t)=>Array.from((t!=null?t:document).querySelectorAll(n)),h=n=>typeof n=="function";function v(){}class M{constructor(t){E(this,"parent",null);E(this,"children",[]);$(this,a,void 0);p(this,a,t||v)}unmount(){_(this,a).call(this),this.children.forEach(t=>t.unmount())}addChild(t){this.children.push(t),t.parent=this}}a=new WeakMap;function m({setup:n,components:t}){return(i,c)=>{const d=new M(n(i,c));return t&&Object.entries(t).forEach(([u,s])=>{r(u).forEach(F=>{const q=s.props||{},I=m(s)(F,q);d.addChild(I)})}),d}}const f=new Map,l=new WeakMap;function R(n,t){l.set(n,t)}function g(n){return n}function y(n,t){return o(!f.has(n),`${n} was already registered`),f.set(n,m(t)),f}function S(n){return o(f.has(n),`${n} does not registered`),f.delete(n),f}function A(n,t,i){o(f.has(i),`${i} was never registered`);const c=f.get(i);R(n,c(n,t))}function P(n,t=document.body){r(n,t).filter(i=>l.has(i)).forEach(i=>l.get(i).unmount())}let x;function w(){throw new Error("Function called outside component initialization")}function N(n){w().$$.on_destroy.push(n)}function O(n){return w().$$.context.get(n)}Promise.resolve();function b(n,t){const i=u=>{const s=r(`[data-ref="${u}"]`,t);return c(s,u)},c=(u,s)=>{switch(u.length){case 0:throw new Error(`data-ref="${s}" does not exist`);case 1:return u[0];default:return u}};return[...n].reduce((u,s)=>(u[s]=i(s),u),{})}function D(n){return{setup(t,i){const c=new Map;c.set("$",{rootRef:t,useDOMRef:(...u)=>({refs:b(new Set(u),t)})});const d=new n({target:t,props:i,context:c});return()=>{d.$destroy(),c.clear()}}}}function L(){return O("$")}function j(n,t,i,c){const d=Array.isArray(n);d?n.forEach(u=>u.addEventListener(t,i,c)):n.addEventListener(t,i,c),N(()=>{d?n.forEach(u=>u.removeEventListener(t,i,c)):n.removeEventListener(t,i,c)})}e.assert=o,e.defineComponent=g,e.getContext$=L,e.isFunc=h,e.mount=A,e.q=r,e.register=y,e.unmount=P,e.unregister=S,e.useEvent=j,e.withSvelte=D,Object.defineProperties(e,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
