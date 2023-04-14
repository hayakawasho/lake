(function(t,o){typeof exports=="object"&&typeof module<"u"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(t=typeof globalThis<"u"?globalThis:t||self,o(t.__LAKE__={}))})(this,function(t){var h,v,q,z,l;"use strict";var B=Object.defineProperty;var F=(t,o,c)=>o in t?B(t,o,{enumerable:!0,configurable:!0,writable:!0,value:c}):t[o]=c;var d=(t,o,c)=>(F(t,typeof o!="symbol"?o+"":o,c),c),$=(t,o,c)=>{if(!o.has(t))throw TypeError("Cannot "+c)};var f=(t,o,c)=>($(t,o,"read from private field"),c?c.call(t):o.get(t)),E=(t,o,c)=>{if(o.has(t))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(t):o.set(t,c)},N=(t,o,c,p)=>($(t,o,"write to private field"),p?p.call(t,c):o.set(t,c),c);class o{constructor(e){E(this,h,void 0);N(this,h,e)}get value(){return f(this,h)}set value(e){N(this,h,e)}}h=new WeakMap;const c=n=>new o(n);class p{constructor(e){E(this,v,void 0);N(this,v,e)}get value(){return f(this,v).value}}v=new WeakMap;const A=n=>new p(n);function O(n,e){if(!n)throw new Error(e||"unexpected condition")}const U=n=>n.forEach(e=>e());var m=(n=>(n.MOUNTED="Mounted",n.UNMOUNTED="Unmounted",n))(m||{});const D=n=>e=>{R(n)[n].push(e)},_=D("Mounted"),M=D("Unmounted");let w;const b=n=>w=n,R=n=>(O(w,`"${n}" called outside setup() will never be run.`),w);let T=0;class I{constructor(e,r){d(this,q,[]);d(this,z,[]);d(this,"parent",null);E(this,l,[]);d(this,"current",{});d(this,"mount",()=>{U(this[m.MOUNTED])});d(this,"unmount",()=>{U([...this[m.UNMOUNTED],...f(this,l).flatMap(e=>e.unmount)])});d(this,"addChild",e=>{f(this,l).push(e),e.parent=this,e.mount()});d(this,"removeChild",e=>{const r=f(this,l).indexOf(e);r!==-1&&(f(this,l).splice(r,1),e.parent=null,e.unmount())});this.element=e,this.element.dataset[`${r.toLowerCase()}Id`]=T+++""}}q=m.MOUNTED,z=m.UNMOUNTED,l=new WeakMap;const y=n=>{const e=w;return(r,s)=>{const a=new I(r,n.tag),u=b(a),i=n.setup(r,s);return u.current=i||{},b(e),u}},C=new WeakMap,x=(n,e,r)=>{if(C.has(n)){console.error(`${r} was already bind.`);return}C.set(n,e)},L=()=>({component(n){return(e,r={})=>{const s=y(n)(e,r);return x(e,s,n.tag),s.mount(),s}},unmount(n){n.filter(e=>C.has(e)).forEach(e=>C.get(e).unmount())}}),S=n=>n,W=(n,e,r,s)=>{n.addEventListener(e,r,s),M(()=>{n.removeEventListener(e,r,s)})},g=(n,e)=>Array.from((e??document).querySelectorAll(n));function j(n,e){const r=u=>{const i=g(`[data-ref="${u}"]`,e);return s(i,u)},s=(u,i)=>{switch(u.length){case 0:return console.error(`[data-ref="${i}"] does not exist.`),null;case 1:return u[0];default:return u}};return[...n].reduce((u,i)=>(u[i]=r(i),u),{})}function P(...n){const e=R("DomRef");return{refs:j(new Set(n),e.element)}}const k=(n,e,r={rootMargin:"0px",threshold:.1})=>{const s=new IntersectionObserver(e,r);return Array.isArray(n)?n.forEach(u=>s.observe(u)):s.observe(n),M(()=>{s.disconnect()}),{unwatch:u=>{s.unobserve(u)}}},K=()=>{const n=R("Slot");return{addChild(e,r,s={}){const a=u=>{const i=y(r)(u,s);return n.addChild(i),i};return Array.isArray(e)?e.map(u=>a(u)):[a(e)]},removeChild(e){e.forEach(r=>n.removeChild(r))}}};function V(n,e){return S({tag:e,setup(r,s){const a=new Map([["$",{rootRef:r,...s}]]),u=new n({target:r,context:a});M(()=>{u.$destroy()})}})}t.default=L,t.defineComponent=S,t.readonly=A,t.ref=c,t.useDomRef=P,t.useEvent=W,t.useIntersectionWatch=k,t.useMount=_,t.useSlot=K,t.useUnmount=M,t.withSvelte=V,Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
