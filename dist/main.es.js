function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
const q = (query, scope) => {
  return Array.from((scope != null ? scope : document).querySelectorAll(query));
};
const COMPONENTS_IMPLEMENTATION_MAP = /* @__PURE__ */ new Map();
const DOM_COMPONENT_INSTANCE_PROPERTY = /* @__PURE__ */ new WeakMap();
function bindDOMNodeToComponentObject(node, component) {
  DOM_COMPONENT_INSTANCE_PROPERTY.set(node, component);
}
function defineComponent(options) {
  return options;
}
function registerComponent(name, component) {
  assert(!COMPONENTS_IMPLEMENTATION_MAP.has(name), `${name} was already registered`);
  COMPONENTS_IMPLEMENTATION_MAP.set(name, component);
}
function mountComponent(node, props, componentName) {
  if (COMPONENTS_IMPLEMENTATION_MAP.has(componentName) === false) {
    return;
  }
  const component = COMPONENTS_IMPLEMENTATION_MAP.get(componentName);
  bindDOMNodeToComponentObject(node, component);
  component.setup(node, props);
}
function unmount(nodes) {
  return nodes.filter((el) => DOM_COMPONENT_INSTANCE_PROPERTY.has(el)).forEach((el) => DOM_COMPONENT_INSTANCE_PROPERTY.get(el).cleanup());
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
  const reducer = (nodes, query) => {
    switch (nodes.length) {
      case 0:
        throw new Error(`data-ref="${query}" does not exist`);
      case 1:
        return nodes[0];
      default:
        return nodes;
    }
  };
  const $$ = (query) => {
    const nodes = q(`[data-ref="${query}"]`, scope);
    return reducer(nodes, query);
  };
  const childRef = [...ref].reduce((acc, cur) => {
    acc[cur] = $$(cur);
    return acc;
  }, {});
  return childRef;
}
function withSvelte(SvelteApp) {
  const app$ = /* @__PURE__ */ new WeakMap();
  const symbol = {};
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
      app$.set(symbol, app);
    },
    cleanup() {
      var _a;
      (_a = app$.get(symbol)) == null ? void 0 : _a.$destroy();
    }
  });
}
function getContext$() {
  return getContext("$");
}
function useEvent(target, eventType, handler, options) {
  target.addEventListener(eventType, handler, options);
  onDestroy(() => {
    target.removeEventListener(eventType, handler, options);
  });
}
export { assert, defineComponent, getContext$, mountComponent, q, registerComponent, unmount, useEvent, withSvelte };
