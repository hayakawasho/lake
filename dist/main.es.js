var R = Object.defineProperty;
var N = (t) => {
  throw TypeError(t);
};
var A = (t, n, e) => n in t ? R(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var c = (t, n, e) => A(t, typeof n != "symbol" ? n + "" : n, e), v = (t, n, e) => n.has(t) || N("Cannot " + e);
var i = (t, n, e) => (v(t, n, "read from private field"), e ? e.call(t) : n.get(t)), l = (t, n, e) => n.has(t) ? N("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(t) : n.set(t, e), m = (t, n, e, o) => (v(t, n, "write to private field"), o ? o.call(t, e) : n.set(t, e), e);
var f;
class S {
  constructor(n) {
    l(this, f);
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
const L = (t) => new S(t);
var h;
class b {
  constructor(n) {
    l(this, h);
    m(this, h, n);
  }
  get value() {
    return i(this, h).value;
  }
}
h = new WeakMap();
const P = (t) => new b(t);
function T(t, n) {
  if (!t)
    throw new Error(n || "unexpected condition");
}
var d = /* @__PURE__ */ ((t) => (t.MOUNTED = "Mounted", t.UNMOUNTED = "Unmounted", t))(d || {});
function D(t) {
  return (n) => {
    M(t)[t].push(n);
  };
}
const $ = D(
  "Mounted"
  /* MOUNTED */
), x = D(
  "Unmounted"
  /* UNMOUNTED */
);
let p;
const U = (t) => (p = t, t);
function M(t) {
  return T(p, `"${t}" called outside setup() will never be run.`), p;
}
let I = 0;
var w, C, a;
C = d.MOUNTED, w = d.UNMOUNTED;
class q {
  constructor(n, e) {
    c(this, C, []);
    c(this, w, []);
    c(this, "parent", null);
    l(this, a, []);
    c(this, "uid");
    c(this, "current", {});
    c(this, "element");
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
    this.uid = `${e}.${I++}`, this.element = n;
  }
}
a = new WeakMap();
function y(t) {
  const n = p;
  return (e, o) => {
    const s = new q(e, t.name), r = U(s), u = t.setup(e, o);
    return r.current = u || {}, U(n), r;
  };
}
const E = /* @__PURE__ */ new WeakMap();
function J(t, n, e) {
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
function V() {
  return {
    component(t) {
      return (n, e = {}) => {
        const o = y(t)(n, e);
        return J(n, o, t.name), o.onMount(), o;
      };
    },
    unmount(t) {
      t.filter((n) => E.has(n)).forEach((n) => {
        E.get(n).onUnmount();
      });
    }
  };
}
const j = (t) => t;
function z(t, n, e, o) {
  t.addEventListener(n, e, o), x(() => {
    t.removeEventListener(n, e, o);
  });
}
const W = (t, n) => Array.from((n ?? document).querySelectorAll(t));
function _(t, n) {
  const e = (s) => {
    const r = W(`[data-ref="${s}"]`, n), { length: u } = r;
    return u === 0 ? null : {
      1: r[0]
    }[u] ?? r;
  };
  return [...t].reduce((s, r) => (s[r] = e(r), s), {});
}
function B(...t) {
  const n = M("useDomRef");
  return {
    refs: _(new Set(t), n.element)
  };
}
function F(t, n, e = {
  rootMargin: "0px",
  threshold: 0.1
}) {
  const o = new IntersectionObserver(n, e), s = (u) => {
    Array.isArray(u) ? u.forEach((O) => o.observe(O)) : o.observe(u);
  };
  return $(() => {
    s(t);
  }), x(() => {
    o.disconnect();
  }), {
    unwatch: (u) => {
      o.unobserve(u);
    }
  };
}
function G() {
  const t = M("useSlot");
  return {
    addChild(n, e, o = {}) {
      const s = (r) => {
        const u = y(e)(r, o);
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
  V as create,
  j as defineComponent,
  P as readonly,
  L as ref,
  B as useDomRef,
  z as useEvent,
  F as useIntersectionWatch,
  $ as useMount,
  G as useSlot,
  x as useUnmount
};
