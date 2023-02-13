import { createComponent } from './internal/component';
import type { RefElement, IComponent, ComponentContext } from './types';

const DOM_COMPONENT_INSTANCE = new WeakMap<RefElement, ComponentContext>();

const bindDOMNodeToComponent = (
  el: RefElement,
  component: ComponentContext,
  name: string
) => {
  if (DOM_COMPONENT_INSTANCE.has(el)) {
    console.error(`${name} was already bind.`);
    return;
  }

  DOM_COMPONENT_INSTANCE.set(el, component);
};

export const factory = () => {
  return {
    component(wrap: IComponent) {
      return (el: RefElement, props: Record<string, any> = {}) => {
        const component = createComponent(wrap)(el, props);
        bindDOMNodeToComponent(el, component, wrap.tag || '');
        component.mount();

        return component;
      };
    },

    unmount(targets: RefElement[]) {
      targets
        .filter(el => DOM_COMPONENT_INSTANCE.has(el))
        .forEach(el => DOM_COMPONENT_INSTANCE.get(el)!.unmount());
    },
  };
};

export const defineComponent = <Props>(opts: IComponent<Props>) => opts;
