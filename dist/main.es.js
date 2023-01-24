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
const warn = (message) => console.warn(message);
const allRun = (fns) => fns.forEach((fn) => fn());
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || `unexpected condition`);
  }
}
var LifecycleHooks = /* @__PURE__ */ ((LifecycleHooks2) => {
  LifecycleHooks2["MOUNTED"] = "onMounted";
  LifecycleHooks2["UNMOUNTED"] = "onUnmounted";
  return LifecycleHooks2;
})(LifecycleHooks || {});
const createHook = (lifecycleType) => {
  return (hook) => {
    const context = getCurrentComponent(lifecycleType);
    context[lifecycleType].push(hook);
  };
};
const onMounted = createHook("onMounted");
const onUnmounted = createHook("onUnmounted");
let currentComponent = null;
const setCurrentComponent = (context) => currentComponent = context;
const getCurrentComponent = (hookName) => {
  assert(currentComponent, `"${hookName}" called outside setup() will never be run.`);
  return currentComponent;
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
    __publicField(this, "addChild", (child) => {
      this.children.push(child);
      child.parent = this;
    });
    __publicField(this, "removeChild", (child) => {
      const index = this.children.findIndex((context) => context === child);
      if (index === -1) {
        return;
      }
      this.children.splice(index, 1);
      child.parent = null;
    });
    this.element = element;
    this.uid = element.id || uid++;
  }
}
_a = LifecycleHooks.MOUNTED, _b = LifecycleHooks.UNMOUNTED;
function createComponent(wrap) {
  const parentContext = currentComponent;
  return (root, props) => {
    const context = setCurrentComponent(new ComponentContext(root));
    wrap.setup(root, __spreadValues(__spreadValues({}, wrap.props), props));
    setCurrentComponent(parentContext);
    return context;
  };
}
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
    component(wrap) {
      return (el, props) => {
        const component = createComponent(wrap)(el, props);
        bindDOMNodeToComponent(el, component);
        component.mount();
      };
    },
    unmount(selector, scope) {
      q(selector, scope).filter((el) => DOM_COMPONENT_INSTANCE.get(el)).map((el) => DOM_COMPONENT_INSTANCE.get(el).unmount());
    }
  };
}
function children() {
  const context = getCurrentComponent("children");
  return {
    addChild(targetOrTargets, child, props) {
      const results = [];
      const create = (el) => {
        const component = createComponent(child)(el, __spreadValues(__spreadValues({}, child.props), props));
        context.addChild(component);
        results.push(component);
      };
      if (Array.isArray(targetOrTargets)) {
        targetOrTargets.forEach((el) => create(el));
      } else {
        create(targetOrTargets);
      }
      return results;
    },
    removeChild(child) {
      context.removeChild(child);
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
  const context = getCurrentComponent("domRef");
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
export { children, createApp, defineComponent, onMounted, onUnmounted, q, readonly, ref, useDOMRef, useEvent, useIntersectionWatch, withSvelte };
