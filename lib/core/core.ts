import { createComponent } from "./internal/component";
import type { RefElement, IComponent, ComponentContext } from "./types";

const DOM_COMPONENT_INSTANCE = new WeakMap<RefElement, ComponentContext>();

function bindDOMNodeToComponent(
  el: RefElement,
  component: ComponentContext,
  name: string,
) {
  if (DOM_COMPONENT_INSTANCE.has(el)) {
    const report = {
      payload: {
        el,
        component,
        name,
      },
      reason: "",
    };
    throw new Error(JSON.stringify(report));
  }

  try {
    DOM_COMPONENT_INSTANCE.set(el, component);
  } catch (error) {
    const report = {
      payload: {
        el,
        component,
        name,
      },
      reason: "",
    };
    throw new Error(JSON.stringify(report));
  }
}

export function create() {
  return {
    component(wrap: IComponent) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (el: RefElement, props: Record<string, any> = {}) => {
        const component = createComponent(wrap)(el, props);
        bindDOMNodeToComponent(el, component, wrap.name);

        component.onMount();

        return component;
      };
    },

    unmount(targets: RefElement[]) {
      targets
        .filter((el) => DOM_COMPONENT_INSTANCE.has(el))
        .forEach((el) => {
          (DOM_COMPONENT_INSTANCE.get(el) as ComponentContext).onUnmount();
        });
    },
  };
}

export const defineComponent = <
  SetupResult extends Record<string, unknown> | void,
  Props extends Record<string, unknown>,
>(
  opts: IComponent<SetupResult, Props>,
) => opts;
