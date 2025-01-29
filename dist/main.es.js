var y = Object.defineProperty;
var D = (t, n, e) => n in t ? y(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var c = (t, n, e) => (D(t, typeof n != "symbol" ? n + "" : n, e), e), E = (t, n, e) => {
  if (!n.has(t))
    throw TypeError("Cannot " + e);
};
var i = (t, n, e) => (E(t, n, "read from private field"), e ? e.call(t) : n.get(t)), f = (t, n, e) => {
  if (n.has(t))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(t) : n.set(t, e);
}, m = (t, n, e, o) => (E(t, n, "write to private field"), o ? o.call(t, e) : n.set(t, e), e);
var h;
class O {
  constructor(n) {
    f(this, h, void 0);
    m(this, h, n);
  }
  get value() {
    return i(this, h);
  }
  set value(n) {
    m(this, h, n);
  }
}
h = new WeakMap();
const L = (t) => new O(t);
var l;
class R {
  constructor(n) {
    f(this, l, void 0);
    m(this, l, n);
  }
  get value() {
    return i(this, l).value;
  }
}
l = new WeakMap();
const P = (t) => new R(t);
function S(t, n) {
  if (!t)
    throw new Error(n || "unexpected condition");
}
var d = /* @__PURE__ */ ((t) => (t.MOUNTED = "Mounted", t.UNMOUNTED = "Unmounted", t))(d || {});
const U = (t) => (n) => {
  v(t)[t].push(n);
}, A = U(
  "Mounted"
  /* MOUNTED */
), M = U(
  "Unmounted"
  /* UNMOUNTED */
);
let p;
const N = (t) => p = t, v = (t) => (S(p, `"${t}" called outside setup() will never be run.`), p);
let b = 0;
var W, _, a;
class $ {
  constructor(n, e) {
    c(this, W, []);
    c(this, _, []);
    c(this, "parent", null);
    f(this, a, []);
    c(this, "uid");
    c(this, "current", {});
    c(this, "onMount", () => {
      const n = this[d.MOUNTED].map((e) => e()).filter((e) => typeof e == "function");
      this[d.UNMOUNTED].push(...n);
    });
    c(this, "onUnmount", () => {
      [
        ...this[d.UNMOUNTED],
        ...i(this, a).flatMap((e) => e.onUnmount)
      ].forEach((e) => e());
    });
    c(this, "addChild", (n) => {
      i(this, a).push(n), n.parent = this, n.onMount();
    });
    c(this, "removeChild", (n) => {
      const e = i(this, a).indexOf(n);
      e !== -1 && (i(this, a).splice(e, 1), n.parent = null, n.onUnmount());
    });
    this.element = n, this.uid = `${e}.${b++}`;
  }
}
W = d.MOUNTED, _ = d.UNMOUNTED, a = new WeakMap();
const C = (t) => {
  const n = p;
  return (e, o) => {
    const s = new $(e, t.name), r = N(s), u = t.setup(e, o);
    return r.current = u || {}, N(n), r;
  };
}, w = /* @__PURE__ */ new WeakMap(), T = (t, n, e) => {
  if (w.has(t)) {
    const o = {
      payload: {
        el: t,
        component: n,
        name: e
      },
      reason: ""
    };
    throw new Error(JSON.stringify(o));
  }
  try {
    w.set(t, n);
  } catch {
    const s = {
      payload: {
        el: t,
        component: n,
        name: e
      },
      reason: ""
    };
    throw new Error(JSON.stringify(s));
  }
}, V = () => ({
  component(t) {
    return (n, e = {}) => {
      const o = C(t)(n, e);
      return T(n, o, t.name), o.onMount(), o;
    };
  },
  unmount(t) {
    t.filter((n) => w.has(n)).forEach((n) => w.get(n).onUnmount());
  }
}), I = (t) => t, g = (t, n, e, o) => {
  t.addEventListener(n, e, o), M(() => {
    t.removeEventListener(n, e, o);
  });
}, q = (t, n) => Array.from((n ?? document).querySelectorAll(t));
function J(t, n) {
  const e = (s) => {
    const r = q(`[data-ref="${s}"]`, n), { length: u } = r;
    return u === 0 ? null : {
      1: r[0]
    }[u] ?? r;
  };
  return [...t].reduce((s, r) => (s[r] = e(r), s), {});
}
function j(...t) {
  const n = v("DomRef");
  return {
    refs: J(new Set(t), n.element)
  };
}
const z = (t, n, e = {
  rootMargin: "0px",
  threshold: 0.1
}) => {
  const o = new IntersectionObserver(n, e), s = (u) => {
    Array.isArray(u) ? u.forEach((x) => o.observe(x)) : o.observe(u);
  };
  return A(() => {
    s(t);
  }), M(() => {
    o.disconnect();
  }), {
    unwatch: (u) => {
      o.unobserve(u);
    }
  };
}, B = () => {
  const t = v("Slot");
  return {
    addChild(n, e, o = {}) {
      const s = (r) => {
        const u = C(e)(r, o);
        return t.addChild(u), u;
      };
      return Array.isArray(n) ? n.map((r) => s(r)) : [s(n)];
    },
    removeChild(n) {
      n.forEach((e) => t.removeChild(e));
    }
  };
};
function F(t, n = "withSvelte") {
  return I({
    name: n,
    setup(e, o) {
      const s = /* @__PURE__ */ new Map([
        [
          "$",
          {
            rootRef: e,
            ...o
          }
        ]
      ]), r = new t({
        target: e,
        context: s
      });
      M(() => {
        r.$destroy();
      });
    }
  });
}
export {
  V as create,
  I as defineComponent,
  P as readonly,
  L as ref,
  j as useDomRef,
  g as useEvent,
  z as useIntersectionWatch,
  A as useMount,
  B as useSlot,
  M as useUnmount,
  F as withSvelte
};
