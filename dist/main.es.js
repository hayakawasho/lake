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
var _rawValue;
function assert(condition, msg) {
  if (!condition) {
    throw new Error(msg || `unexpected condition`);
  }
}
const q = (query, scope) => Array.from((scope != null ? scope : document).querySelectorAll(query));
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
let Owner$1 = null;
const setOwner = (context) => Owner$1 = context;
const unsetOwner = () => Owner$1 = null;
const getOwner = (name) => {
  assert(Owner$1, `"${name}" called outside setup() will never be run.`);
  return Owner$1;
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
    this.provides = create(element, props) || {};
    unsetOwner();
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
function createComponent$1(wrap) {
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
  return createComponent$1(child)(el, props);
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
  REGISTERED_COMPONENTS.set(name, createComponent$1(wrap));
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
const getContext$ = () => getContext("$");
const useEvent = (target, eventType, listener) => {
  target.addEventListener(eventType, listener);
  onDestroy(() => {
    target.removeEventListener(eventType, listener);
  });
};
const sharedConfig = {};
let runEffects = runQueue;
const NOTPENDING = {};
const STALE = 1;
const PENDING = 2;
const UNOWNED = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var Owner = null;
let Transition = null;
let Listener = null;
let Pending = null;
let Updates = null;
let Effects = null;
let ExecCount = 0;
function createRoot(fn, detachedOwner) {
  const listener = Listener, owner = Owner, root = fn.length === 0 && true ? UNOWNED : {
    owned: null,
    cleanups: null,
    context: null,
    owner: detachedOwner || owner
  };
  Owner = root;
  Listener = null;
  try {
    return runUpdates(() => fn(() => cleanNode(root)), true);
  } finally {
    Listener = listener;
    Owner = owner;
  }
}
function createRenderEffect(fn, value, options) {
  const c = createComputation(fn, value, false, STALE);
  updateComputation(c);
}
function batch(fn) {
  if (Pending)
    return fn();
  let result;
  const q2 = Pending = [];
  try {
    result = fn();
  } finally {
    Pending = null;
  }
  runUpdates(() => {
    for (let i = 0; i < q2.length; i += 1) {
      const data = q2[i];
      if (data.pending !== NOTPENDING) {
        const pending = data.pending;
        data.pending = NOTPENDING;
        writeSignal(data, pending);
      }
    }
  }, false);
  return result;
}
function untrack(fn) {
  let result, listener = Listener;
  Listener = null;
  result = fn();
  Listener = listener;
  return result;
}
function writeSignal(node, value, isComp) {
  if (Pending) {
    if (node.pending === NOTPENDING)
      Pending.push(node);
    node.pending = value;
    return value;
  }
  if (node.comparator) {
    if (node.comparator(node.value, value))
      return value;
  }
  let TransitionRunning = false;
  node.value = value;
  if (node.observers && node.observers.length) {
    runUpdates(() => {
      for (let i = 0; i < node.observers.length; i += 1) {
        const o = node.observers[i];
        if (TransitionRunning && Transition.disposed.has(o))
          ;
        if (TransitionRunning && !o.tState || !TransitionRunning && !o.state) {
          if (o.pure)
            Updates.push(o);
          else
            Effects.push(o);
          if (o.observers)
            markDownstream(o);
        }
        if (TransitionRunning)
          ;
        else
          o.state = STALE;
      }
      if (Updates.length > 1e6) {
        Updates = [];
        if (false)
          ;
        throw new Error();
      }
    }, false);
  }
  return value;
}
function updateComputation(node) {
  if (!node.fn)
    return;
  cleanNode(node);
  const owner = Owner, listener = Listener, time = ExecCount;
  Listener = Owner = node;
  runComputation(node, node.value, time);
  Listener = listener;
  Owner = owner;
}
function runComputation(node, value, time) {
  let nextValue;
  try {
    nextValue = node.fn(value);
  } catch (err) {
    handleError(err);
  }
  if (!node.updatedAt || node.updatedAt <= time) {
    if (node.observers && node.observers.length) {
      writeSignal(node, nextValue);
    } else
      node.value = nextValue;
    node.updatedAt = time;
  }
}
function createComputation(fn, init, pure, state = STALE, options) {
  const c = {
    fn,
    state,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: init,
    owner: Owner,
    context: null,
    pure
  };
  if (Owner === null)
    ;
  else if (Owner !== UNOWNED) {
    {
      if (!Owner.owned)
        Owner.owned = [c];
      else
        Owner.owned.push(c);
    }
  }
  return c;
}
function runTop(node) {
  const runningTransition = Transition;
  if (node.state === 0 || runningTransition)
    return;
  if (node.state === PENDING || runningTransition)
    return lookUpstream(node);
  if (node.suspense && untrack(node.suspense.inFallback))
    return node.suspense.effects.push(node);
  const ancestors = [node];
  while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
    if (node.state || runningTransition)
      ancestors.push(node);
  }
  for (let i = ancestors.length - 1; i >= 0; i--) {
    node = ancestors[i];
    if (node.state === STALE || runningTransition) {
      updateComputation(node);
    } else if (node.state === PENDING || runningTransition) {
      const updates = Updates;
      Updates = null;
      lookUpstream(node, ancestors[0]);
      Updates = updates;
    }
  }
}
function runUpdates(fn, init) {
  if (Updates)
    return fn();
  let wait = false;
  if (!init)
    Updates = [];
  if (Effects)
    wait = true;
  else
    Effects = [];
  ExecCount++;
  try {
    const res = fn();
    completeUpdates(wait);
    return res;
  } catch (err) {
    handleError(err);
  } finally {
    Updates = null;
    if (!wait)
      Effects = null;
  }
}
function completeUpdates(wait) {
  if (Updates) {
    runQueue(Updates);
    Updates = null;
  }
  if (wait)
    return;
  if (Effects.length)
    batch(() => {
      runEffects(Effects);
      Effects = null;
    });
  else {
    Effects = null;
  }
}
function runQueue(queue) {
  for (let i = 0; i < queue.length; i++)
    runTop(queue[i]);
}
function lookUpstream(node, ignore) {
  const runningTransition = Transition;
  node.state = 0;
  for (let i = 0; i < node.sources.length; i += 1) {
    const source = node.sources[i];
    if (source.sources) {
      if (source.state === STALE || runningTransition) {
        if (source !== ignore)
          runTop(source);
      } else if (source.state === PENDING || runningTransition)
        lookUpstream(source, ignore);
    }
  }
}
function markDownstream(node) {
  const runningTransition = Transition;
  for (let i = 0; i < node.observers.length; i += 1) {
    const o = node.observers[i];
    if (!o.state || runningTransition) {
      o.state = PENDING;
      if (o.pure)
        Updates.push(o);
      else
        Effects.push(o);
      o.observers && markDownstream(o);
    }
  }
}
function cleanNode(node) {
  let i;
  if (node.sources) {
    while (node.sources.length) {
      const source = node.sources.pop(), index = node.sourceSlots.pop(), obs = source.observers;
      if (obs && obs.length) {
        const n = obs.pop(), s = source.observerSlots.pop();
        if (index < obs.length) {
          n.sourceSlots[s] = index;
          obs[index] = n;
          source.observerSlots[index] = s;
        }
      }
    }
  }
  if (node.owned) {
    for (i = 0; i < node.owned.length; i++)
      cleanNode(node.owned[i]);
    node.owned = null;
  }
  if (node.cleanups) {
    for (i = 0; i < node.cleanups.length; i++)
      node.cleanups[i]();
    node.cleanups = null;
  }
  node.state = 0;
  node.context = null;
}
function handleError(err) {
  throw err;
}
function createComponent(Comp, props) {
  return untrack(() => Comp(props || {}));
}
function reconcileArrays(parentNode, a, b) {
  let bLength = b.length, aEnd = a.length, bEnd = bLength, aStart = 0, bStart = 0, after = a[aEnd - 1].nextSibling, map = null;
  while (aStart < aEnd || bStart < bEnd) {
    if (a[aStart] === b[bStart]) {
      aStart++;
      bStart++;
      continue;
    }
    while (a[aEnd - 1] === b[bEnd - 1]) {
      aEnd--;
      bEnd--;
    }
    if (aEnd === aStart) {
      const node = bEnd < bLength ? bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart] : after;
      while (bStart < bEnd)
        parentNode.insertBefore(b[bStart++], node);
    } else if (bEnd === bStart) {
      while (aStart < aEnd) {
        if (!map || !map.has(a[aStart]))
          a[aStart].remove();
        aStart++;
      }
    } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
      const node = a[--aEnd].nextSibling;
      parentNode.insertBefore(b[bStart++], a[aStart++].nextSibling);
      parentNode.insertBefore(b[--bEnd], node);
      a[aEnd] = b[bEnd];
    } else {
      if (!map) {
        map = /* @__PURE__ */ new Map();
        let i = bStart;
        while (i < bEnd)
          map.set(b[i], i++);
      }
      const index = map.get(a[aStart]);
      if (index != null) {
        if (bStart < index && index < bEnd) {
          let i = aStart, sequence = 1, t;
          while (++i < aEnd && i < bEnd) {
            if ((t = map.get(a[i])) == null || t !== index + sequence)
              break;
            sequence++;
          }
          if (sequence > index - bStart) {
            const node = a[aStart];
            while (bStart < index)
              parentNode.insertBefore(b[bStart++], node);
          } else
            parentNode.replaceChild(b[bStart++], a[aStart++]);
        } else
          aStart++;
      } else
        a[aStart++].remove();
    }
  }
}
function render(code, element, init) {
  let disposer;
  createRoot((dispose) => {
    disposer = dispose;
    element === document ? code() : insert(element, code(), element.firstChild ? null : void 0, init);
  });
  return () => {
    disposer();
    element.textContent = "";
  };
}
function insert(parent, accessor, marker, initial) {
  if (marker !== void 0 && !initial)
    initial = [];
  if (typeof accessor !== "function")
    return insertExpression(parent, accessor, initial, marker);
  createRenderEffect((current) => insertExpression(parent, accessor(), current, marker), initial);
}
function insertExpression(parent, value, current, marker, unwrapArray) {
  if (sharedConfig.context && !current)
    current = [...parent.childNodes];
  while (typeof current === "function")
    current = current();
  if (value === current)
    return current;
  const t = typeof value, multi = marker !== void 0;
  parent = multi && current[0] && current[0].parentNode || parent;
  if (t === "string" || t === "number") {
    if (sharedConfig.context)
      return current;
    if (t === "number")
      value = value.toString();
    if (multi) {
      let node = current[0];
      if (node && node.nodeType === 3) {
        node.data = value;
      } else
        node = document.createTextNode(value);
      current = cleanChildren(parent, current, marker, node);
    } else {
      if (current !== "" && typeof current === "string") {
        current = parent.firstChild.data = value;
      } else
        current = parent.textContent = value;
    }
  } else if (value == null || t === "boolean") {
    if (sharedConfig.context)
      return current;
    current = cleanChildren(parent, current, marker);
  } else if (t === "function") {
    createRenderEffect(() => {
      let v = value();
      while (typeof v === "function")
        v = v();
      current = insertExpression(parent, v, current, marker);
    });
    return () => current;
  } else if (Array.isArray(value)) {
    const array = [];
    if (normalizeIncomingArray(array, value, unwrapArray)) {
      createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
      return () => current;
    }
    if (sharedConfig.context) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].parentNode)
          return current = array;
      }
    }
    if (array.length === 0) {
      current = cleanChildren(parent, current, marker);
      if (multi)
        return current;
    } else if (Array.isArray(current)) {
      if (current.length === 0) {
        appendNodes(parent, array, marker);
      } else
        reconcileArrays(parent, current, array);
    } else {
      current && cleanChildren(parent);
      appendNodes(parent, array);
    }
    current = array;
  } else if (value instanceof Node) {
    if (sharedConfig.context && value.parentNode)
      return current = multi ? [value] : value;
    if (Array.isArray(current)) {
      if (multi)
        return current = cleanChildren(parent, current, marker, value);
      cleanChildren(parent, current, null, value);
    } else if (current == null || current === "" || !parent.firstChild) {
      parent.appendChild(value);
    } else
      parent.replaceChild(value, parent.firstChild);
    current = value;
  } else
    ;
  return current;
}
function normalizeIncomingArray(normalized, array, unwrap) {
  let dynamic = false;
  for (let i = 0, len = array.length; i < len; i++) {
    let item = array[i], t;
    if (item instanceof Node) {
      normalized.push(item);
    } else if (item == null || item === true || item === false)
      ;
    else if (Array.isArray(item)) {
      dynamic = normalizeIncomingArray(normalized, item) || dynamic;
    } else if ((t = typeof item) === "string") {
      normalized.push(document.createTextNode(item));
    } else if (t === "function") {
      if (unwrap) {
        while (typeof item === "function")
          item = item();
        dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item]) || dynamic;
      } else {
        normalized.push(item);
        dynamic = true;
      }
    } else
      normalized.push(document.createTextNode(item.toString()));
  }
  return dynamic;
}
function appendNodes(parent, array, marker) {
  for (let i = 0, len = array.length; i < len; i++)
    parent.insertBefore(array[i], marker);
}
function cleanChildren(parent, current, marker, replacement) {
  if (marker === void 0)
    return parent.textContent = "";
  const node = replacement || document.createTextNode("");
  if (current.length) {
    let inserted = false;
    for (let i = current.length - 1; i >= 0; i--) {
      const el = current[i];
      if (node !== el) {
        const isParent = el.parentNode === parent;
        if (!inserted && !i)
          isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);
        else
          isParent && el.remove();
      } else
        inserted = true;
    }
  } else
    parent.insertBefore(node, marker);
  return [node];
}
function withSolid(App) {
  return defineComponent({
    setup(el, props) {
      const dispose = render(() => createComponent(App, props), el);
      onUnmounted(() => {
        dispose();
      });
    }
  });
}
export { assert, defineComponent, getContext$, mount, onMounted, onUnmounted, q, ref, register, unmount, unregister, useEvent, withSolid, withSvelte };
