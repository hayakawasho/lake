var U = Object.defineProperty;
var D = (t, n, e) => n in t ? U(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var u = (t, n, e) => (D(t, typeof n != "symbol" ? n + "" : n, e), e), E = (t, n, e) => {
  if (!n.has(t))
    throw TypeError("Cannot " + e);
};
var a = (t, n, e) => (E(t, n, "read from private field"), e ? e.call(t) : n.get(t)), m = (t, n, e) => {
  if (n.has(t))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(t) : n.set(t, e);
}, f = (t, n, e, o) => (E(t, n, "write to private field"), o ? o.call(t, e) : n.set(t, e), e);
var d;
class $ {
  constructor(n) {
    m(this, d, void 0);
    f(this, d, n);
  }
  get value() {
    return a(this, d);
  }
  set value(n) {
    f(this, d, n);
  }
}
d = new WeakMap();
const P = (t) => new $(t);
var h;
class b {
  constructor(n) {
    m(this, h, void 0);
    f(this, h, n);
  }
  get value() {
    return a(this, h).value;
  }
}
h = new WeakMap();
const V = (t) => new b(t);
function A(t, n) {
  if (!t)
    throw new Error(n || "unexpected condition");
}
const M = (t) => t.forEach((n) => n());
var l = /* @__PURE__ */ ((t) => (t.MOUNTED = "Mounted", t.UNMOUNTED = "Unmounted", t))(l || {});
const x = (t) => (n) => {
  C(t)[t].push(n);
}, g = x(
  "Mounted"
  /* MOUNTED */
), w = x(
  "Unmounted"
  /* UNMOUNTED */
);
let p;
const N = (t) => p = t, C = (t) => (A(p, `"${t}" called outside setup() will never be run.`), p);
let O = 0;
var _, k, i;
class y {
  constructor(n, e) {
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
        ...a(this, i).flatMap((n) => n.unmount)
      ]);
    });
    u(this, "addChild", (n) => {
      a(this, i).push(n), n.parent = this, n.mount();
    });
    u(this, "removeChild", (n) => {
      const e = a(this, i).indexOf(n);
      e !== -1 && (a(this, i).splice(e, 1), n.parent = null, n.unmount());
    });
    this.element = n, this.uid = `${e}.${O++}`;
  }
}
_ = l.MOUNTED, k = l.UNMOUNTED, i = new WeakMap();
const R = (t) => {
  const n = p;
  return (e, o) => {
    const c = new y(e, t.tagName), r = N(c), s = t.setup(e, o);
    return r.current = s || {}, N(n), r;
  };
}, v = /* @__PURE__ */ new WeakMap(), S = (t, n, e) => {
  if (v.has(t)) {
    console.error(`${e} was already bind.`);
    return;
  }
  v.set(t, n);
}, j = () => ({
  component(t) {
    return (n, e = {}) => {
      const o = R(t)(n, e);
      return S(n, o, t.tagName), o.mount(), o;
    };
  },
  unmount(t) {
    t.filter((n) => v.has(n)).forEach((n) => v.get(n).unmount());
  }
}), I = (t) => t, q = (t, n, e, o) => {
  t.addEventListener(n, e, o), w(() => {
    t.removeEventListener(n, e, o);
  });
}, T = (t, n) => Array.from((n ?? document).querySelectorAll(t));
function W(t, n) {
  const e = (r) => {
    const s = T(`[data-ref="${r}"]`, n);
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
  return [...t].reduce((r, s) => (r[s] = e(s), r), {});
}
function z(...t) {
  const n = C("DomRef");
  return {
    refs: W(new Set(t), n.element)
  };
}
const B = (t, n, e = {
  rootMargin: "0px",
  threshold: 0.1
}) => {
  const o = new IntersectionObserver(n, e);
  return Array.isArray(t) ? t.forEach((r) => o.observe(r)) : o.observe(t), w(() => {
    o.disconnect();
  }), {
    unwatch: (r) => {
      o.unobserve(r);
    }
  };
}, F = () => {
  const t = C("Slot");
  return {
    addChild(n, e, o = {}) {
      const c = (r) => {
        const s = R(e)(r, o);
        return t.addChild(s), s;
      };
      return Array.isArray(n) ? n.map((r) => c(r)) : [c(n)];
    },
    removeChild(n) {
      n.forEach((e) => t.removeChild(e));
    }
  };
};
function G(t, n) {
  return I({
    tagName: n,
    setup(e, o) {
      const c = /* @__PURE__ */ new Map([
        [
          "$",
          {
            rootRef: e,
            ...o
          }
        ]
      ]), r = new t({
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
