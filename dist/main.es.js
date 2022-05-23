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
function createComponent(componentWrapper) {
  return (el, props) => {
    const mergedProps = Object.assign(componentWrapper.props, props);
    const mounted = componentWrapper.setup(el, mergedProps);
    const context = new ComponentContext(mounted);
    if (componentWrapper.components) {
      Object.entries(componentWrapper.components).forEach(([selector, subComponent]) => {
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
const DOM_COMPONENT_INSTANCE_PROPERTY = /* @__PURE__ */ new WeakMap();
const bindDOMNodeToComponent = (el, component, componentName) => {
  assert(DOM_COMPONENT_INSTANCE_PROPERTY.has(el) === false, `The DOM of ${componentName} was already binding`);
  DOM_COMPONENT_INSTANCE_PROPERTY.set(el, component);
};
const defineComponent = (options) => options;
function register(name, componentWrapper) {
  assert(REGISTERED_COMPONENTS_MAP.has(name) === false, `${name} was already registered`);
  REGISTERED_COMPONENTS_MAP.set(name, createComponent(componentWrapper));
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
  q(selector, scope).filter((el) => DOM_COMPONENT_INSTANCE_PROPERTY.has(el)).forEach((el) => DOM_COMPONENT_INSTANCE_PROPERTY.get(el).unmount());
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
export { assert, defineComponent, getContext$, mount, q, register, unmount, unregister, useEvent, withSvelte };
