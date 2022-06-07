import type { ComponentContext } from '../internal/component';
import { createComponent } from '../internal/component';
import type { DOMNode, IComponent } from '../internal/types';
import { assert } from '../util/assert';
import { q } from '../util/selector';

const REGISTERED_COMPONENTS_MAP = new Map<
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
  assert(
    !REGISTERED_COMPONENTS_MAP.has(name),
    `${name} was already registered.`
  );
  REGISTERED_COMPONENTS_MAP.set(name, createComponent(wrap));

  return REGISTERED_COMPONENTS_MAP;
}

export function unregister(name: string) {
  assert(REGISTERED_COMPONENTS_MAP.has(name), `${name} does not registered.`);
  REGISTERED_COMPONENTS_MAP.delete(name);

  return REGISTERED_COMPONENTS_MAP;
}

export function mount(el: DOMNode, props: Record<string, any>, name: string) {
  assert(REGISTERED_COMPONENTS_MAP.has(name), `${name} was never registered.`);
  const component = REGISTERED_COMPONENTS_MAP.get(name)!(el, props);

  bindDOMNodeToComponent(el, component, name);
  component.mount();
}

export function unmount(selector: string, scope?: DOMNode) {
  q(selector, scope)
    .filter(el => DOM_COMPONENT_INSTANCE.has(el))
    .forEach(el => DOM_COMPONENT_INSTANCE.get(el)!.unmount());
}
