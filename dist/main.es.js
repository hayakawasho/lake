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
var _rawValue, _ref;
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || `unexpected condition`);
  }
}
const q = (query, scope) => Array.from((scope != null ? scope : document).querySelectorAll(query));
const noop = () => {
};
class Ref {
  constructor(value) {
    __privateAdd(this, _rawValue, void 0);
    __privateSet(this, _rawValue, value);
  }
  set value(newVal) {
    __privateSet(this, _rawValue, newVal);
  }
  get value() {
    return __privateGet(this, _rawValue);
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
let Owner = null;
const setOwner = (context) => Owner = context;
const unsetOwner = () => Owner = null;
const getOwner = (name) => {
  assert(Owner, `"${name}" called outside setup() will never be run.`);
  return Owner;
};
function onMounted(fn) {
  getOwner("onMounted").onMounted.push(fn);
}
function onUnmounted(fn) {
  getOwner("onUnmounted").onUnmounted.push(fn);
}
class ComponentContext {
  constructor(create, element, props) {
    __publicField(this, "onMounted", []);
    __publicField(this, "onUnmounted", []);
    __publicField(this, "parent", null);
    __publicField(this, "uid");
    __publicField(this, "provides");
    this.element = element;
    setOwner(this);
    const created = create(element, props);
    unsetOwner();
    this.provides = created || {};
    this.uid = element.id;
  }
  mount() {
    this.onMounted.forEach((fn) => fn());
  }
  unmount() {
    this.onUnmounted.forEach((fn) => fn());
  }
  addChild(child) {
    this.onMounted.push(...child.onMounted);
    this.onUnmounted.push(...child.onUnmounted);
    child.parent = this;
  }
}
function createComponent(wrap) {
  return (root, props) => {
    const newProps = __spreadValues(__spreadValues({}, wrap.props), props);
    const context = new ComponentContext(wrap.setup, root, newProps);
    if (wrap.components) {
      Object.entries(wrap.components).forEach(([selector, sub]) => {
        q(selector, root).forEach((el) => {
          const child = createSubComponent(el, sub, context);
          context.addChild(child);
        });
      });
    }
    return context;
  };
}
function createSubComponent(el, child, parent) {
  const props = __spreadValues(__spreadValues({}, child.props), parent.provides);
  return createComponent(child)(el, props);
}
const REGISTERED_COMPONENTS = /* @__PURE__ */ new Map();
const DOM_COMPONENT_INSTANCE = /* @__PURE__ */ new WeakMap();
const bindDOMNodeToComponent = (el, component, name) => {
  assert(!DOM_COMPONENT_INSTANCE.has(el), `The DOM of ${name} was already bind.`);
  DOM_COMPONENT_INSTANCE.set(el, component);
};
const defineComponent = (options) => options;
function register(name, wrap) {
  assert(!REGISTERED_COMPONENTS.has(name), `${name} was already registered.`);
  REGISTERED_COMPONENTS.set(name, createComponent(wrap));
  return REGISTERED_COMPONENTS;
}
function unregister(name) {
  assert(REGISTERED_COMPONENTS.has(name), `${name} does not registered.`);
  REGISTERED_COMPONENTS.delete(name);
  return REGISTERED_COMPONENTS;
}
function mount(el, props, name) {
  assert(REGISTERED_COMPONENTS.has(name), `${name} was never registered.`);
  const component = REGISTERED_COMPONENTS.get(name)(el, props);
  bindDOMNodeToComponent(el, component, name);
  component.mount();
}
function unmount(selector, scope) {
  q(selector, scope).filter((el) => DOM_COMPONENT_INSTANCE.has(el)).forEach((el) => DOM_COMPONENT_INSTANCE.get(el).unmount());
}
const useEvent = (target, eventType, listener) => {
  target.addEventListener(eventType, listener);
  onUnmounted(() => {
    target.removeEventListener(eventType, listener);
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
        throw new Error(`[data-ref="${query}"] does not exist`);
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
function withSvelte(App) {
  return defineComponent({
    setup(el, props) {
      const context = /* @__PURE__ */ new Map();
      context.set("$", {
        rootRef: el,
        useDOMRef: (...ref2) => ({
          refs: domRefs(new Set(ref2), el)
        })
      });
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
export { assert, defineComponent, mount, noop, onMounted, onUnmounted, q, readonly, ref, register, unmount, unregister, useEvent, withSvelte };
