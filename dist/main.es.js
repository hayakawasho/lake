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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
const q = (query, scope) => {
  return Array.from((scope != null ? scope : document).querySelectorAll(query));
};
const isFunction = (value) => typeof value === "function";
const DOM_COMPONENT_INSTANCE_PROPERTY = /* @__PURE__ */ new WeakMap();
function bindDOMNode2Component(node, component) {
  DOM_COMPONENT_INSTANCE_PROPERTY.set(node, component);
}
function createSubComponents(components = {}) {
  return Object.entries(components).reduce((acc, [key, value]) => {
    acc[key] = createComponent(value);
    return acc;
  }, {});
}
class Component {
  constructor(_cleanup) {
    this._cleanup = _cleanup;
  }
  unmount() {
    return isFunction(this._cleanup) && this._cleanup();
  }
}
function createComponent(componentWrapper) {
  const { components } = componentWrapper;
  components && createSubComponents(components);
  return (_a) => {
    var _b = _a, { el } = _b, props = __objRest(_b, ["el"]);
    const cleanup = componentWrapper.setup(el, props);
    bindDOMNode2Component(el, new Component(cleanup));
  };
}
const REGISTERED_COMPONENTS_MAP = /* @__PURE__ */ new Map();
function defineComponent(options) {
  return __spreadValues({}, options);
}
function register(name, componentWrapper) {
  assert(!REGISTERED_COMPONENTS_MAP.has(name), `${name} was already registered`);
  REGISTERED_COMPONENTS_MAP.set(name, createComponent(componentWrapper));
  return REGISTERED_COMPONENTS_MAP;
}
function unregister(name) {
  assert(REGISTERED_COMPONENTS_MAP.has(name), `${name} does not registered`);
  REGISTERED_COMPONENTS_MAP.delete(name);
  return REGISTERED_COMPONENTS_MAP;
}
function mount(node, props = {}, componentName) {
  const mountComponent = REGISTERED_COMPONENTS_MAP.get(componentName);
  return mountComponent && mountComponent(__spreadValues({ el: node }, props));
}
function unmount(nodes) {
  return nodes.filter((node) => DOM_COMPONENT_INSTANCE_PROPERTY.has(node)).map((node) => {
    DOM_COMPONENT_INSTANCE_PROPERTY.get(node).unmount();
    return node;
  });
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
    return refOrRefs(nodes, query);
  };
  const refOrRefs = (nodes, query) => {
    switch (nodes.length) {
      case 0:
        throw new Error(`data-ref="${query}" does not exist`);
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
function withSvelte(SvelteApp) {
  return defineComponent({
    setup(el, props) {
      const context = /* @__PURE__ */ new Map();
      context.set("$", {
        rootRef: el,
        useDOMRef: (...ref) => ({
          refs: domRefs(new Set(ref), el)
        })
      });
      const app = new SvelteApp({
        target: el,
        props,
        context
      });
      return () => {
        app.$destroy();
      };
    }
  });
}
function getContext$() {
  return getContext("$");
}
function useEvent(targetOrTargets, eventType, handler, options) {
  const isArray = Array.isArray(targetOrTargets);
  isArray ? targetOrTargets.forEach((el) => el.addEventListener(eventType, handler, options)) : targetOrTargets.addEventListener(eventType, handler, options);
  onDestroy(() => {
    isArray ? targetOrTargets.forEach((el) => el.removeEventListener(eventType, handler, options)) : targetOrTargets.removeEventListener(eventType, handler, options);
  });
}
export { assert, getContext$, isFunction, mount, q, register, unmount, unregister, useEvent, withSvelte };
