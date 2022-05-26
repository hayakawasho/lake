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
function assert(condition, msg) {
  if (!condition) {
    throw new Error(msg || `unexpected condition`);
  }
}
const q = (query, scope) => {
  return Array.from((scope != null ? scope : document).querySelectorAll(query));
};
const noop = () => {
};
class ComponentContext {
  constructor(create) {
    __publicField(this, "onUnmount", []);
    __publicField(this, "unmount", () => {
      this.onUnmount.forEach((fn) => fn());
    });
    const cleanup = create || noop;
    this.onUnmount.push(cleanup);
  }
  addChild(child) {
    this.onUnmount.push(child.unmount);
  }
}
function createComponent(wrap) {
  return (el, props) => {
    const mergedProps = __spreadValues(__spreadValues({}, wrap.props), props);
    const created = wrap.setup(el, mergedProps);
    const context = new ComponentContext(created);
    if (wrap.components) {
      Object.entries(wrap.components).forEach(([selector, subComponent]) => {
        q(selector).forEach((i) => {
          const subComponentProps = subComponent.props || {};
          const child = createComponent(subComponent)(i, subComponentProps);
          context.addChild(child);
        });
      });
    }
    return context;
  };
}
const REGISTERED_COMPONENTS_MAP = /* @__PURE__ */ new Map();
const DOM_COMPONENT_INSTANCE = /* @__PURE__ */ new WeakMap();
const bindDOMNodeToComponent = (el, component, componentName) => {
  assert(!DOM_COMPONENT_INSTANCE.has(el), `The DOM of ${componentName} was already bind`);
  DOM_COMPONENT_INSTANCE.set(el, component);
};
const defineComponent = (options) => options;
function register(name, wrap) {
  assert(!REGISTERED_COMPONENTS_MAP.has(name), `${name} was already registered`);
  REGISTERED_COMPONENTS_MAP.set(name, createComponent(wrap));
  return REGISTERED_COMPONENTS_MAP;
}
function unregister(name) {
  assert(REGISTERED_COMPONENTS_MAP.has(name), `${name} does not registered`);
  REGISTERED_COMPONENTS_MAP.delete(name);
  return REGISTERED_COMPONENTS_MAP;
}
function mount(el, props, name) {
  assert(REGISTERED_COMPONENTS_MAP.has(name), `${name} was never registered`);
  const component = REGISTERED_COMPONENTS_MAP.get(name);
  bindDOMNodeToComponent(el, component(el, props), name);
}
function unmount(selector, scope) {
  q(selector, scope).filter((el) => DOM_COMPONENT_INSTANCE.has(el)).forEach((el) => DOM_COMPONENT_INSTANCE.get(el).unmount());
}
let current_component;
function get_current_component() {
  throw new Error("Function called outside component initialization");
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
Promise.resolve();
function domRefs(ref, scope) {
  const findRef = (query) => {
    const nodes = q(`[data-ref="${query}"]`, scope);
    return reducer(nodes, query);
  };
  const reducer = (nodes, query) => {
    switch (nodes.length) {
      case 0:
        throw new Error(`[data-ref="${query}"] does not exist`);
      case 1:
        return nodes[0];
      default:
        return nodes;
    }
  };
  const childRef = [...ref].reduce((acc, cur) => {
    acc[cur] = findRef(cur);
    return acc;
  }, {});
  return childRef;
}
const withSvelte = (App) => {
  return defineComponent({
    setup(el, props) {
      const context = /* @__PURE__ */ new Map();
      context.set("$", {
        rootRef: el,
        useDOMRef: (...ref) => ({
          refs: domRefs(new Set(ref), el)
        })
      });
      const app = new App({
        target: el,
        props,
        context
      });
      return () => {
        app.$destroy();
      };
    }
  });
};
const getContext$ = () => getContext("$");
const useEvent = (target, eventType, listener) => {
  target.addEventListener(eventType, listener);
  onDestroy(() => {
    target.removeEventListener(eventType, listener);
  });
};
export { assert, defineComponent, getContext$, mount, q, register, unmount, unregister, useEvent, withSvelte };
