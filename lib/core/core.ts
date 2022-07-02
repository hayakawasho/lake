import { assert } from '../util/assert';
import { warn } from '../util/function';
import { q } from '../util/selector';
import type { ComponentContext } from './internal/component';
import { createComponent } from './internal/component';
import type { RefElement, IComponent } from './types';

const COMPONENT_REGISTRY_MAP = new Map<
  string,
  ReturnType<typeof createComponent>
>();

const DOM_COMPONENT_INSTANCE = new WeakMap<RefElement, ComponentContext>();

const bindDOMNodeToComponent = (
  el: RefElement,
  component: ComponentContext,
  name: string
) => {
  if (DOM_COMPONENT_INSTANCE.has(el)) {
    warn(`The DOM of ${name} was already bind.`);
  }

  DOM_COMPONENT_INSTANCE.set(el, component);
};

export const defineComponent = <Props>(options: IComponent<Props>) => options;

export function register(name: string, wrap: IComponent) {
  assert(!COMPONENT_REGISTRY_MAP.has(name), `${name} was already registered.`);
  COMPONENT_REGISTRY_MAP.set(name, createComponent(wrap));

  return COMPONENT_REGISTRY_MAP;
}

export function unregister(name: string) {
  assert(COMPONENT_REGISTRY_MAP.has(name), `${name} does not registered.`);
  COMPONENT_REGISTRY_MAP.delete(name);

  return COMPONENT_REGISTRY_MAP;
}

export function mount(
  el: RefElement,
  props: Record<string, any>,
  name: string
) {
  assert(COMPONENT_REGISTRY_MAP.has(name), `${name} was never registered.`);
  const component = COMPONENT_REGISTRY_MAP.get(name)!(el, props);

  bindDOMNodeToComponent(el, component, name);
  component.mount();
}

export function unmount(selector: string, scope?: RefElement) {
  q(selector, scope)
    .filter(el => DOM_COMPONENT_INSTANCE.has(el))
    .forEach(el => DOM_COMPONENT_INSTANCE.get(el)!.unmount());
}
