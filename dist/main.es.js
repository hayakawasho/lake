var D = Object.defineProperty;
var y = (t, n, e) => n in t ? D(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var c = (t, n, e) => (y(t, typeof n != "symbol" ? n + "" : n, e), e), N = (t, n, e) => {
  if (!n.has(t))
    throw TypeError("Cannot " + e);
};
var i = (t, n, e) => (N(t, n, "read from private field"), e ? e.call(t) : n.get(t)), l = (t, n, e) => {
  if (n.has(t))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(t) : n.set(t, e);
}, m = (t, n, e, o) => (N(t, n, "write to private field"), o ? o.call(t, e) : n.set(t, e), e);
var f;
class O {
  constructor(n) {
    l(this, f, void 0);
    m(this, f, n);
  }
  get value() {
    return i(this, f);
  }
  set value(n) {
    m(this, f, n);
  }
}
f = new WeakMap();
const k = (t) => new O(t);
var h;
class R {
  constructor(n) {
    l(this, h, void 0);
    m(this, h, n);
  }
  get value() {
    return i(this, h).value;
  }
}
h = new WeakMap();
const L = (t) => new R(t);
function A(t, n) {
  if (!t)
    throw new Error(n || "unexpected condition");
}
var d = /* @__PURE__ */ ((t) => (t.MOUNTED = "Mounted", t.UNMOUNTED = "Unmounted", t))(d || {});
function U(t) {
  return (n) => {
    M(t)[t].push(n);
  };
}
const S = U(
  "Mounted"
  /* MOUNTED */
), w = U(
  "Unmounted"
  /* UNMOUNTED */
);
let p;
const v = (t) => p = t;
function M(t) {
  return A(p, `"${t}" called outside setup() will never be run.`), p;
}
let b = 0;
var J, W, a;
class T {
  constructor(n, e) {
    c(this, J, []);
    c(this, W, []);
    c(this, "parent", null);
    l(this, a, []);
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
J = d.MOUNTED, W = d.UNMOUNTED, a = new WeakMap();
function C(t) {
  const n = p;
  return (e, o) => {
    const s = new T(e, t.name), r = v(s), u = t.setup(e, o);
    return r.current = u || {}, v(n), r;
  };
}
const E = /* @__PURE__ */ new WeakMap();
function $(t, n, e) {
  if (E.has(t)) {
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
    E.set(t, n);
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
}
function P() {
  return {
    component(t) {
      return (n, e = {}) => {
        const o = C(t)(n, e);
        return $(n, o, t.name), o.onMount(), o;
      };
    },
    unmount(t) {
      t.filter((n) => E.has(n)).forEach((n) => E.get(n).onUnmount());
    }
  };
}
const V = (t) => t;
function j(t, n, e, o) {
  t.addEventListener(n, e, o), w(() => {
    t.removeEventListener(n, e, o);
  });
}
const I = (t, n) => Array.from((n ?? document).querySelectorAll(t));
function q(t, n) {
  const e = (s) => {
    const r = I(`[data-ref="${s}"]`, n), { length: u } = r;
    return u === 0 ? null : {
      1: r[0]
    }[u] ?? r;
  };
  return [...t].reduce((s, r) => (s[r] = e(r), s), {});
}
function z(...t) {
  const n = M("useDomRef");
  return {
    refs: q(new Set(t), n.element)
  };
}
function B(t, n, e = {
  rootMargin: "0px",
  threshold: 0.1
}) {
  const o = new IntersectionObserver(n, e), s = (u) => {
    Array.isArray(u) ? u.forEach((x) => o.observe(x)) : o.observe(u);
  };
  return S(() => {
    s(t);
  }), w(() => {
    o.disconnect();
  }), {
    unwatch: (u) => {
      o.unobserve(u);
    }
  };
}
function F() {
  const t = M("useSlot");
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
}
export {
  P as create,
  V as defineComponent,
  L as readonly,
  k as ref,
  z as useDomRef,
  j as useEvent,
  B as useIntersectionWatch,
  S as useMount,
  F as useSlot,
  w as useUnmount
};
