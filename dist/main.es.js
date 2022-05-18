var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
const isFunc = (value) => typeof value === "function";
function noop() {
}
class ComponentContext {
  constructor(_cleanup, props) {
    __publicField(this, "parent", null);
    __publicField(this, "children");
    this._cleanup = _cleanup;
    this.children = props.children;
  }
  unmount() {
    const cleanup = this._cleanup || noop;
    cleanup();
  }
}
const DOM_COMPONENT_INSTANCE_PROPERTY = /* @__PURE__ */ new WeakMap();
function connectDOM2Component(node, component2) {
  DOM_COMPONENT_INSTANCE_PROPERTY.set(node, component2);
}
function createComponent(componentWrapper) {
  const { components } = componentWrapper;
  const children = createSubComponents(components != null ? components : {});
  return (el, props) => {
    const cleanup = componentWrapper.setup(el, props);
    connectDOM2Component(el, new ComponentContext(cleanup, { children }));
  };
}
function createSubComponents(components) {
  return Object.entries(components).reduce((acc, [key, value]) => {
    acc[key] = createComponent(value);
    return acc;
  }, {});
}
const REGISTERED_COMPONENTS_MAP = /* @__PURE__ */ new Map();
function defineComponent({ setup, components }) {
  return {
    setup,
    components
  };
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
function mount(node, props, name) {
  assert(REGISTERED_COMPONENTS_MAP.has(name), `${name} was never registered`);
  const component2 = REGISTERED_COMPONENTS_MAP.get(name);
  return component2(node, props);
}
function unmount(nodes) {
  return nodes.filter((el) => DOM_COMPONENT_INSTANCE_PROPERTY.has(el)).forEach((el) => DOM_COMPONENT_INSTANCE_PROPERTY.get(el).unmount());
}
function component(componentWrapper) {
  return (el, props = {}) => createComponent(componentWrapper)(el, props);
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
        context.clear();
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
export { assert, component, defineComponent, getContext$, isFunc, mount, q, register, unmount, unregister, useEvent, withSvelte };
