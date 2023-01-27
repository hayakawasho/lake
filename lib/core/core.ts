import { warn } from '../util/function';
import type { ComponentContext } from './internal/component';
import { createComponent } from './internal/component';
import type { RefElement, IComponent } from './types';

const DOM_COMPONENT_INSTANCE = new WeakMap<RefElement, ComponentContext>();

const bindDOMNodeToComponent = (
  el: RefElement,
  component: ComponentContext,
  name?: string
) => {
  if (DOM_COMPONENT_INSTANCE.has(el)) {
    warn(`The DOM of ${name} was already bind.`);
  }
  DOM_COMPONENT_INSTANCE.set(el, component);
};

export const defineComponent = <Props>(options: IComponent<Props>) => options;

export function createApp() {
  return {
    component(wrap: IComponent) {
      return (el: RefElement, props: Record<string, any> = {}) => {
        const component = createComponent(wrap)(el, props);
        bindDOMNodeToComponent(el, component);
        component.mount();
      };
    },

    unmount(elements: RefElement[]) {
      elements
        .filter(el => DOM_COMPONENT_INSTANCE.get(el))
        .map(el => DOM_COMPONENT_INSTANCE.get(el)!.unmount());
    },
  };
}
