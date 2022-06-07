import type { ComponentContext } from '../internal/component';
import { createComponent } from '../internal/component';
import type { DOMNode, IComponent } from '../internal/types';
import { assert } from '../util/assert';
import { q } from '../util/selector';

const REGISTERED_COMPONENTS = new Map<
  string,
  ReturnType<typeof createComponent>
>();

const DOM_COMPONENT_INSTANCE = new WeakMap<DOMNode, ComponentContext>();

const bindDOMNodeToComponent = (
  el: DOMNode,
  component: ComponentContext,
  name: string
) => {
  assert(
    !DOM_COMPONENT_INSTANCE.has(el),
    `The DOM of ${name} was already bind.`
  );
  DOM_COMPONENT_INSTANCE.set(el, component);
};

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

export function mount(el: DOMNode, props: Record<string, any>, name: string) {
  assert(REGISTERED_COMPONENTS.has(name), `${name} was never registered.`);
  const component = REGISTERED_COMPONENTS.get(name)!(el, props);

  bindDOMNodeToComponent(el, component, name);
  component.mount();
}

export function unmount(selector: string, scope?: DOMNode) {
  q(selector, scope)
    .filter(el => DOM_COMPONENT_INSTANCE.has(el))
    .forEach(el => DOM_COMPONENT_INSTANCE.get(el)!.unmount());
}
