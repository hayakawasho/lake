import type { ComponentContext } from './internal/component';
import { createComponent } from './internal/component';
import type { RefElement, IComponent } from './types';
import { assert } from './util/assert';
import { q } from './util/selector';

const REGISTERED_COMPONENTS = new Map<
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
    console.warn(`The DOM of ${name} was already bind.`);
  }

  DOM_COMPONENT_INSTANCE.set(el, component);
};

//----------------------------------------------------------------

export const defineComponent = <Props>(options: IComponent<Props>) => options;

export function register(name: string, wrap: IComponent) {
  assert(!REGISTERED_COMPONENTS.has(name), `${name} was already registered.`);
  REGISTERED_COMPONENTS.set(name, createComponent(wrap));

  return REGISTERED_COMPONENTS;
}

export function unregister(name: string) {
  assert(REGISTERED_COMPONENTS.has(name), `${name} does not registered.`);
  REGISTERED_COMPONENTS.delete(name);

  return REGISTERED_COMPONENTS;
}

export function mount(
  el: RefElement,
  props: Record<string, any>,
  name: string
) {
  assert(REGISTERED_COMPONENTS.has(name), `${name} was never registered.`);
  const component = REGISTERED_COMPONENTS.get(name)!(el, props);

  bindDOMNodeToComponent(el, component, name);
  component.mount();
}

export function unmount(selector: string, scope?: RefElement) {
  q(selector, scope)
    .filter(el => DOM_COMPONENT_INSTANCE.has(el))
    .forEach(el => DOM_COMPONENT_INSTANCE.get(el)!.unmount());
}
