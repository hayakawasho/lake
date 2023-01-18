var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _rawValue, _ref, _a, _b;
const q = (query, scope) => Array.from((scope != null ? scope : document).querySelectorAll(query));
class Ref {
  constructor(value) {
    __privateAdd(this, _rawValue, void 0);
    __privateSet(this, _rawValue, value);
  }
  get value() {
    return __privateGet(this, _rawValue);
  }
  set value(newVal) {
    __privateSet(this, _rawValue, newVal);
  }
}
_rawValue = new WeakMap();
const ref = (val) => new Ref(val);
class ReadonlyRef {
  constructor(value) {
    __privateAdd(this, _ref, void 0);
    __privateSet(this, _ref, value);
  }
  get value() {
    return __privateGet(this, _ref).value;
  }
}
_ref = new WeakMap();
const readonly = (ref2) => new ReadonlyRef(ref2);
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || `unexpected condition`);
  }
}
const warn = (message) => console.warn(message);
const allRun = (fns) => fns.forEach((fn) => fn());
var LifecycleHooks = /* @__PURE__ */ ((LifecycleHooks2) => {
  LifecycleHooks2["MOUNTED"] = "onMounted";
  LifecycleHooks2["UNMOUNTED"] = "onUnmounted";
  return LifecycleHooks2;
})(LifecycleHooks || {});
const createHook = (lifecycleType) => {
  return (hook) => {
    const context = getOwner(lifecycleType);
    context[lifecycleType].push(hook);
  };
};
const onMounted = createHook("onMounted");
const onUnmounted = createHook("onUnmounted");
let Owner = null;
const setOwner = (context) => Owner = context;
const unsetOwner = () => Owner = null;
const getOwner = (hookName) => {
  assert(Owner, `"${hookName}" called outside setup() will never be run.`);
  return Owner;
};
let uid = 0;
class ComponentContext {
  constructor(element) {
    __publicField(this, _a, []);
    __publicField(this, _b, []);
    __publicField(this, "uid");
    __publicField(this, "parent", null);
    __publicField(this, "children", []);
    __publicField(this, "mount", () => {
      allRun([
        ...this[LifecycleHooks.MOUNTED],
        ...this.children.flatMap((child) => child.mount)
      ]);
    });
    __publicField(this, "unmount", () => {
      allRun([
        ...this[LifecycleHooks.UNMOUNTED],
        ...this.children.flatMap((child) => child.unmount)
      ]);
    });
    this.element = element;
    this.uid = element.id || uid++;
  }
  addChild(child) {
    this.children.push(child);
    child.parent = this;
  }
  removeChild(child) {
    const index = this.children.findIndex((context) => context === child);
    if (index === -1) {
      return;
    }
    this.children.splice(index, 1);
    child.parent = null;
  }
}
_a = LifecycleHooks.MOUNTED, _b = LifecycleHooks.UNMOUNTED;
function createComponent(wrap) {
  return (root, props) => {
    const context = new ComponentContext(root);
    setOwner(context);
    const created = wrap.setup(root, __spreadValues(__spreadValues({}, wrap.props), props));
    const provides = created || {};
    if (wrap.components) {
      Object.entries(wrap.components).forEach(([selector, sub]) => {
        q(selector, root).forEach((el) => {
          const child = createSubComponent(el, sub, provides);
          context.addChild(child);
        });
      });
    }
    unsetOwner();
    return context;
  };
}
function createSubComponent(el, child, parentProvides) {
  const props = __spreadValues(__spreadValues({}, child.props), parentProvides);
  return createComponent(child)(el, props);
}
const COMPONENT_REGISTRY_MAP = /* @__PURE__ */ new Map();
const DOM_COMPONENT_INSTANCE = /* @__PURE__ */ new WeakMap();
const bindDOMNodeToComponent = (el, component, name) => {
  if (DOM_COMPONENT_INSTANCE.has(el)) {
    warn(`The DOM of ${name} was already bind.`);
  }
  DOM_COMPONENT_INSTANCE.set(el, component);
};
const defineComponent = (options) => options;
function createApp() {
  return {
    register(name, wrap) {
      assert(!COMPONENT_REGISTRY_MAP.has(name), `${name} was already registered.`);
      COMPONENT_REGISTRY_MAP.set(name, createComponent(wrap));
      return COMPONENT_REGISTRY_MAP;
    },
    unregister(name) {
      assert(COMPONENT_REGISTRY_MAP.has(name), `${name} does not registered.`);
      COMPONENT_REGISTRY_MAP.delete(name);
      return COMPONENT_REGISTRY_MAP;
    },
    mount(el, props, name) {
      assert(COMPONENT_REGISTRY_MAP.has(name), `${name} was never registered.`);
      const component = COMPONENT_REGISTRY_MAP.get(name)(el, props);
      bindDOMNodeToComponent(el, component, name);
      component.mount();
    },
    unmount(selector, scope) {
      q(selector, scope).filter((el) => DOM_COMPONENT_INSTANCE.has(el)).forEach((el) => DOM_COMPONENT_INSTANCE.get(el).unmount());
    }
  };
}
const useEvent = (target, eventType, listener, optionsOrUseCapture) => {
  target.addEventListener(eventType, listener, optionsOrUseCapture);
  onUnmounted(() => {
    target.removeEventListener(eventType, listener, optionsOrUseCapture);
  });
};
function domRefs(ref2, scope) {
  const findRef = (query) => {
    const nodes = q(`[data-ref="${query}"]`, scope);
    return reducer(nodes, query);
  };
  const reducer = (nodes, query) => {
    switch (nodes.length) {
      case 0:
        warn(`[data-ref="${query}"] does not exist.`);
        return null;
      case 1:
        return nodes[0];
      default:
        return nodes;
    }
  };
  const childRef = [...ref2].reduce((acc, cur) => {
    acc[cur] = findRef(cur);
    return acc;
  }, {});
  return childRef;
}
function useDOMRef(...refKey) {
  const context = getOwner("domRef");
  return {
    refs: domRefs(new Set(refKey), context.element)
  };
}
const useIntersectionWatch = (targetOrTargets, cb, opts = {
  rootMargin: "0px",
  threshold: 0.1
}) => {
  const io = new IntersectionObserver(cb, opts);
  if (Array.isArray(targetOrTargets)) {
    targetOrTargets.forEach((el) => io.observe(el));
  } else {
    io.observe(targetOrTargets);
  }
  onUnmounted(() => {
    io.disconnect();
  });
  const unwatch = (el) => {
    io.unobserve(el);
  };
  return {
    unwatch
  };
};
function withSvelte(App) {
  return defineComponent({
    setup(el, props) {
      const context = /* @__PURE__ */ new Map([
        [
          "$",
          {
            rootRef: el
          }
        ]
      ]);
      const app = new App({
        target: el,
        props,
        context
      });
      onUnmounted(() => {
        app.$destroy();
      });
    }
  });
}
export { createApp, defineComponent, onMounted, onUnmounted, q, readonly, ref, useDOMRef, useEvent, useIntersectionWatch, withSvelte };
