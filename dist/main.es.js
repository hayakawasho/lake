var U = Object.defineProperty;
var D = (n, t, e) => t in n ? U(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var u = (n, t, e) => (D(n, typeof t != "symbol" ? t + "" : t, e), e), E = (n, t, e) => {
  if (!t.has(n))
    throw TypeError("Cannot " + e);
};
var a = (n, t, e) => (E(n, t, "read from private field"), e ? e.call(n) : t.get(n)), m = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
}, f = (n, t, e, o) => (E(n, t, "write to private field"), o ? o.call(n, e) : t.set(n, e), e);
var d;
class $ {
  constructor(t) {
    m(this, d, void 0);
    f(this, d, t);
  }
  get value() {
    return a(this, d);
  }
  set value(t) {
    f(this, d, t);
  }
}
d = new WeakMap();
const P = (n) => new $(n);
var h;
class b {
  constructor(t) {
    m(this, h, void 0);
    f(this, h, t);
  }
  get value() {
    return a(this, h).value;
  }
}
h = new WeakMap();
const V = (n) => new b(n);
function A(n, t) {
  if (!n)
    throw new Error(t || "unexpected condition");
}
const M = (n) => n.forEach((t) => t());
var l = /* @__PURE__ */ ((n) => (n.MOUNTED = "Mounted", n.UNMOUNTED = "Unmounted", n))(l || {});
const x = (n) => (t) => {
  C(n)[n].push(t);
}, g = x(
  "Mounted"
  /* MOUNTED */
), w = x(
  "Unmounted"
  /* UNMOUNTED */
);
let p;
const N = (n) => p = n, C = (n) => (A(p, `"${n}" called outside setup() will never be run.`), p);
let O = 0;
var _, k, i;
class S {
  constructor(t, e) {
    u(this, _, []);
    u(this, k, []);
    u(this, "parent", null);
    m(this, i, []);
    u(this, "uid");
    u(this, "current", {});
    u(this, "mount", () => {
      M(this[l.MOUNTED]);
    });
    u(this, "unmount", () => {
      M([
        ...this[l.UNMOUNTED],
        ...a(this, i).flatMap((t) => t.unmount)
      ]);
    });
    u(this, "addChild", (t) => {
      a(this, i).push(t), t.parent = this, t.mount();
    });
    u(this, "removeChild", (t) => {
      const e = a(this, i).indexOf(t);
      e !== -1 && (a(this, i).splice(e, 1), t.parent = null, t.unmount());
    });
    this.element = t, this.uid = `${e}.${O++}`;
  }
}
_ = l.MOUNTED, k = l.UNMOUNTED, i = new WeakMap();
const R = (n) => {
  const t = p;
  return (e, o) => {
    const c = new S(e, n.tagName), r = N(c), s = n.setup(e, o);
    return r.current = s || {}, N(t), r;
  };
}, v = /* @__PURE__ */ new WeakMap(), y = (n, t, e) => {
  if (v.has(n)) {
    console.error(`${e} was already bind.`);
    return;
  }
  v.set(n, t);
}, j = () => ({
  component(n) {
    return (t, e = {}) => {
      const o = R(n)(t, e);
      return y(t, o, n.tagName), o.mount(), o;
    };
  },
  unmount(n) {
    n.filter((t) => v.has(t)).forEach((t) => v.get(t).unmount());
  }
}), I = (n) => n, q = (n, t, e, o) => {
  n.addEventListener(t, e, o), w(() => {
    n.removeEventListener(t, e, o);
  });
}, T = (n, t) => Array.from((t ?? document).querySelectorAll(n));
function W(n, t) {
  const e = (r) => {
    const s = T(`[data-ref="${r}"]`, t);
    return o(s, r);
  }, o = (r, s) => {
    switch (r.length) {
      case 0:
        return console.error(`[data-ref="${s}"] does not exist.`), null;
      case 1:
        return r[0];
      default:
        return r;
    }
  };
  return [...n].reduce((r, s) => (r[s] = e(s), r), {});
}
function z(...n) {
  const t = C("DomRef");
  return {
    refs: W(new Set(n), t.element)
  };
}
const B = (n, t, e = {
  rootMargin: "0px",
  threshold: 0.1
}) => {
  const o = new IntersectionObserver(t, e);
  return Array.isArray(n) ? n.forEach((r) => o.observe(r)) : o.observe(n), w(() => {
    o.disconnect();
  }), {
    unwatch: (r) => {
      o.unobserve(r);
    }
  };
}, F = () => {
  const n = C("Slot");
  return {
    addChild(t, e, o = {}) {
      const c = (r) => {
        const s = R(e)(r, o);
        return n.addChild(s), s;
      };
      return Array.isArray(t) ? t.map((r) => c(r)) : [c(t)];
    },
    removeChild(t) {
      t.forEach((e) => n.removeChild(e));
    }
  };
};
function G(n, t = "WithSvelte") {
  return I({
    tagName: t,
    setup(e, o) {
      const c = /* @__PURE__ */ new Map([
        [
          "$",
          {
            rootRef: e,
            ...o
          }
        ]
      ]), r = new n({
        target: e,
        context: c
      });
      w(() => {
        r.$destroy();
      });
    }
  });
}
export {
  j as default,
  I as defineComponent,
  V as readonly,
  P as ref,
  z as useDomRef,
  q as useEvent,
  B as useIntersectionWatch,
  g as useMount,
  F as useSlot,
  w as useUnmount,
  G as withSvelte
};
