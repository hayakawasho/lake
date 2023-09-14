var U = Object.defineProperty;
var D = (t, n, e) => n in t ? U(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var s = (t, n, e) => (D(t, typeof n != "symbol" ? n + "" : n, e), e), E = (t, n, e) => {
  if (!n.has(t))
    throw TypeError("Cannot " + e);
};
var i = (t, n, e) => (E(t, n, "read from private field"), e ? e.call(t) : n.get(t)), m = (t, n, e) => {
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
    return i(this, d);
  }
  set value(n) {
    f(this, d, n);
  }
}
d = new WeakMap();
const L = (t) => new $(t);
var h;
class b {
  constructor(n) {
    m(this, h, void 0);
    f(this, h, n);
  }
  get value() {
    return i(this, h).value;
  }
}
h = new WeakMap();
const P = (t) => new b(t);
function A(t, n) {
  if (!t)
    throw new Error(n || "unexpected condition");
}
const M = (t) => t.forEach((n) => n());
var l = /* @__PURE__ */ ((t) => (t.MOUNTED = "Mounted", t.UNMOUNTED = "Unmounted", t))(l || {});
const x = (t) => (n) => {
  C(t)[t].push(n);
}, V = x(
  "Mounted"
  /* MOUNTED */
), w = x(
  "Unmounted"
  /* UNMOUNTED */
);
let p;
const N = (t) => p = t, C = (t) => (A(p, `"${t}" called outside setup() will never be run.`), p);
let O = 0;
var _, k, a;
class S {
  constructor(n, e) {
    s(this, _, []);
    s(this, k, []);
    s(this, "parent", null);
    m(this, a, []);
    s(this, "uid");
    s(this, "current", {});
    s(this, "mount", () => {
      M(this[l.MOUNTED]);
    });
    s(this, "unmount", () => {
      M([
        ...this[l.UNMOUNTED],
        ...i(this, a).flatMap((n) => n.unmount)
      ]);
    });
    s(this, "addChild", (n) => {
      i(this, a).push(n), n.parent = this, n.mount();
    });
    s(this, "removeChild", (n) => {
      const e = i(this, a).indexOf(n);
      e !== -1 && (i(this, a).splice(e, 1), n.parent = null, n.unmount());
    });
    this.element = n, this.uid = `${e}.${O++}`;
  }
}
_ = l.MOUNTED, k = l.UNMOUNTED, a = new WeakMap();
const R = (t) => {
  const n = p;
  return (e, o) => {
    const c = new S(e, t.name), r = N(c), u = t.setup(e, o);
    return r.current = u || {}, N(n), r;
  };
}, v = /* @__PURE__ */ new WeakMap(), y = (t, n, e) => {
  if (v.has(t)) {
    console.error(`${e} was already bind.`);
    return;
  }
  v.set(t, n);
}, j = () => ({
  component(t) {
    return (n, e = {}) => {
      const o = R(t)(n, e);
      return y(n, o, t.name), o.mount(), o;
    };
  },
  unmount(t) {
    t.filter((n) => v.has(n)).forEach((n) => v.get(n).unmount());
  }
}), I = (t) => t, z = (t, n, e, o) => {
  t.addEventListener(n, e, o), w(() => {
    t.removeEventListener(n, e, o);
  });
}, T = (t, n) => Array.from((n ?? document).querySelectorAll(t));
function W(t, n) {
  const e = (r) => {
    const u = T(`[data-ref="${r}"]`, n);
    return o(u);
  }, o = (r) => ({
    0: null,
    1: r[0]
  })[r.length] ?? r;
  return [...t].reduce((r, u) => (r[u] = e(u), r), {});
}
function B(...t) {
  const n = C("DomRef");
  return {
    refs: W(new Set(t), n.element)
  };
}
const F = (t, n, e = {
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
}, G = () => {
  const t = C("Slot");
  return {
    addChild(n, e, o = {}) {
      const c = (r) => {
        const u = R(e)(r, o);
        return t.addChild(u), u;
      };
      return Array.isArray(n) ? n.map((r) => c(r)) : [c(n)];
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
  j as create,
  I as defineComponent,
  P as readonly,
  L as ref,
  B as useDomRef,
  z as useEvent,
  F as useIntersectionWatch,
  V as useMount,
  G as useSlot,
  w as useUnmount,
  H as withSvelte
};
