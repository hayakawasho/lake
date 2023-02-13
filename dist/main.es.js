var D = Object.defineProperty;
var $ = (t, n, e) => n in t ? D(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var u = (t, n, e) => ($(t, typeof n != "symbol" ? n + "" : n, e), e), C = (t, n, e) => {
  if (!n.has(t))
    throw TypeError("Cannot " + e);
};
var i = (t, n, e) => (C(t, n, "read from private field"), e ? e.call(t) : n.get(t)), f = (t, n, e) => {
  if (n.has(t))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(t) : n.set(t, e);
}, m = (t, n, e, o) => (C(t, n, "write to private field"), o ? o.call(t, e) : n.set(t, e), e);
var d;
class b {
  constructor(n) {
    f(this, d, void 0);
    m(this, d, n);
  }
  get value() {
    return i(this, d);
  }
  set value(n) {
    m(this, d, n);
  }
}
d = new WeakMap();
const V = (t) => new b(t);
var h;
class y {
  constructor(n) {
    f(this, h, void 0);
    m(this, h, n);
  }
  get value() {
    return i(this, h).value;
  }
}
h = new WeakMap();
const j = (t) => new y(t);
function A(t, n) {
  if (!t)
    throw new Error(n || "unexpected condition");
}
const N = (t) => t.forEach((n) => n());
var l = /* @__PURE__ */ ((t) => (t.MOUNTED = "Mounted", t.UNMOUNTED = "Unmounted", t))(l || {});
const R = (t) => (n) => {
  M(t)[t].push(n);
}, q = R(
  "Mounted"
  /* MOUNTED */
), E = R(
  "Unmounted"
  /* UNMOUNTED */
);
let p;
const x = (t) => p = t, M = (t) => (A(p, `"${t}" called outside setup() will never be run.`), p);
let O = 0;
var k, L, a;
class S {
  constructor(n) {
    u(this, k, []);
    u(this, L, []);
    u(this, "parent", null);
    f(this, a, []);
    u(this, "uid");
    u(this, "current", {});
    u(this, "mount", () => {
      N([
        ...this[l.MOUNTED],
        ...i(this, a).flatMap((n) => n.mount)
      ]);
    });
    u(this, "unmount", () => {
      N([
        ...this[l.UNMOUNTED],
        ...i(this, a).flatMap((n) => n.unmount)
      ]);
    });
    u(this, "addChild", (n) => {
      i(this, a).push(n), n.parent = this;
    });
    u(this, "removeChild", (n) => {
      const e = i(this, a).findIndex((o) => o === n);
      e !== -1 && (i(this, a).splice(e, 1), n.parent = null);
    });
    this.element = n, this.uid = O++;
  }
}
k = l.MOUNTED, L = l.UNMOUNTED, a = new WeakMap();
const U = (t) => {
  const n = p;
  return (e, o) => {
    const c = x(new S(e)), r = t.setup(e, {
      ...t.props,
      ...o
    });
    return c.current = r || {}, x(n), c;
  };
}, v = /* @__PURE__ */ new WeakMap(), I = (t, n, e) => {
  if (v.has(t)) {
    console.error(`${e} was already bind.`);
    return;
  }
  v.set(t, n);
}, z = () => ({
  component(t) {
    return (n, e = {}) => {
      const o = U(t)(n, e);
      return I(n, o, t.tag || ""), o.mount(), o;
    };
  },
  unmount(t) {
    t.filter((n) => v.has(n)).forEach((n) => v.get(n).unmount());
  }
}), T = (t) => t, B = (t, n, e, o) => {
  t.addEventListener(n, e, o), E(() => {
    t.removeEventListener(n, e, o);
  });
}, W = (t, n) => Array.from((n ?? document).querySelectorAll(t));
function _(t, n) {
  const e = (r) => {
    const s = W(`[data-ref="${r}"]`, n);
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
function F(...t) {
  const n = M("DomRef");
  return {
    refs: _(new Set(t), n.element)
  };
}
const G = (t, n, e = {
  rootMargin: "0px",
  threshold: 0.1
}) => {
  const o = new IntersectionObserver(n, e);
  return Array.isArray(t) ? t.forEach((r) => o.observe(r)) : o.observe(t), E(() => {
    o.disconnect();
  }), {
    unwatch: (r) => {
      o.unobserve(r);
    }
  };
}, H = () => {
  const t = M("Slot");
  return {
    addChild(n, e, o = {}) {
      const c = [], r = (s) => {
        const w = U(e)(s, {
          ...e.props,
          ...o
        });
        t.addChild(w), c.push(w);
      };
      return Array.isArray(n) ? n.forEach((s) => r(s)) : r(n), c;
    },
    removeChild(n) {
      n.forEach((e) => t.removeChild(e));
    }
  };
};
function J(t) {
  return T({
    setup(n, e) {
      const o = /* @__PURE__ */ new Map([
        [
          "$",
          {
            rootRef: n,
            ...e
          }
        ]
      ]), c = new t({
        target: n,
        context: o
      });
      E(() => {
        c.$destroy();
      });
    }
  });
}
export {
  T as defineComponent,
  z as factory,
  j as readonly,
  V as ref,
  F as useDomRef,
  B as useEvent,
  G as useIntersectionWatch,
  q as useMount,
  H as useSlot,
  E as useUnmount,
  J as withSvelte
};
