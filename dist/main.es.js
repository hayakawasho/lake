var D = Object.defineProperty;
var R = (t, n, e) => n in t ? D(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var c = (t, n, e) => (R(t, typeof n != "symbol" ? n + "" : n, e), e), E = (t, n, e) => {
  if (!n.has(t))
    throw TypeError("Cannot " + e);
};
var i = (t, n, e) => (E(t, n, "read from private field"), e ? e.call(t) : n.get(t)), m = (t, n, e) => {
  if (n.has(t))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(t) : n.set(t, e);
}, f = (t, n, e, o) => (E(t, n, "write to private field"), o ? o.call(t, e) : n.set(t, e), e);
var h;
class O {
  constructor(n) {
    m(this, h, void 0);
    f(this, h, n);
  }
  get value() {
    return i(this, h);
  }
  set value(n) {
    f(this, h, n);
  }
}
h = new WeakMap();
const P = (t) => new O(t);
var l;
class b {
  constructor(n) {
    m(this, l, void 0);
    f(this, l, n);
  }
  get value() {
    return i(this, l).value;
  }
}
l = new WeakMap();
const V = (t) => new b(t);
function y(t, n) {
  if (!t)
    throw new Error(n || "unexpected condition");
}
var d = /* @__PURE__ */ ((t) => (t.MOUNTED = "Mounted", t.UNMOUNTED = "Unmounted", t))(d || {});
const C = (t) => (n) => {
  w(t)[t].push(n);
}, A = C(
  "Mounted"
  /* MOUNTED */
), v = C(
  "Unmounted"
  /* UNMOUNTED */
);
let p;
const U = (t) => p = t, w = (t) => (y(p, `"${t}" called outside setup() will never be run.`), p);
let S = 0;
var _, k, a;
class $ {
  constructor(n, e) {
    c(this, _, []);
    c(this, k, []);
    c(this, "parent", null);
    m(this, a, []);
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
    this.element = n, this.uid = `${e}.${S++}`;
  }
}
_ = d.MOUNTED, k = d.UNMOUNTED, a = new WeakMap();
const N = (t) => {
  const n = p;
  return (e, o) => {
    const s = new $(e, t.name), r = U(s), u = t.setup(e, o);
    return r.current = u || {}, U(n), r;
  };
}, M = /* @__PURE__ */ new WeakMap(), T = (t, n, e) => {
  if (M.has(t)) {
    console.error(`${e} was already bind.`);
    return;
  }
  M.set(t, n);
}, j = () => ({
  component(t) {
    return (n, e = {}) => {
      const o = N(t)(n, e);
      return T(n, o, t.name), o.onMount(), o;
    };
  },
  unmount(t) {
    t.filter((n) => M.has(n)).forEach((n) => M.get(n).onUnmount());
  }
}), I = (t) => t, z = (t, n, e, o) => {
  t.addEventListener(n, e, o), v(() => {
    t.removeEventListener(n, e, o);
  });
}, q = (t, n) => Array.from((n ?? document).querySelectorAll(t));
function W(t, n) {
  const e = (s) => {
    const r = q(`[data-ref="${s}"]`, n), { length: u } = r;
    return u === 0 ? null : {
      1: r[0]
    }[u] ?? r;
  };
  return [...t].reduce((s, r) => (s[r] = e(r), s), {});
}
function B(...t) {
  const n = w("DomRef");
  return {
    refs: W(new Set(t), n.element)
  };
}
const F = (t, n, e = {
  rootMargin: "0px",
  threshold: 0.1
}) => {
  const o = new IntersectionObserver(n, e), s = (u) => {
    Array.isArray(u) ? u.forEach((x) => o.observe(x)) : o.observe(u);
  };
  return A(() => {
    s(t);
  }), v(() => {
    o.disconnect();
  }), {
    unwatch: (u) => {
      o.unobserve(u);
    }
  };
}, G = () => {
  const t = w("Slot");
  return {
    addChild(n, e, o = {}) {
      const s = (r) => {
        const u = N(e)(r, o);
        return t.addChild(u), u;
      };
      return Array.isArray(n) ? n.map((r) => s(r)) : [s(n)];
    },
    removeChild(n) {
      n.forEach((e) => t.removeChild(e));
    }
  };
};
function H(t, n = "withSvelte") {
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
      v(() => {
        r.$destroy();
      });
    }
  });
}
export {
  j as create,
  I as defineComponent,
  V as readonly,
  P as ref,
  B as useDomRef,
  z as useEvent,
  F as useIntersectionWatch,
  A as useMount,
  G as useSlot,
  v as useUnmount,
  H as withSvelte
};
