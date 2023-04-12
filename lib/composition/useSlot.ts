import {
  getCurrentComponent,
  createComponent,
} from '../core/internal/component';
import type { IComponent, RefElement, ComponentContext } from '../core/types';

export const useSlot = () => {
  const context = getCurrentComponent('Slot');

  return {
    addChild(
      targetOrTargets: RefElement | RefElement[],
      child: IComponent,
      props: Readonly<Record<string, unknown>> = {}
    ): ComponentContext[] {
      const create = (el: RefElement) => {
        const component = createComponent(child)(el, {
          ...child.props,
          ...props,
        });

        context.addChild(component);
        component.mount();

        return component;
      };

      return Array.isArray(targetOrTargets)
        ? targetOrTargets.map(el => create(el))
        : [create(targetOrTargets)];
    },

    removeChild(children: ComponentContext[]) {
      children.forEach(child => context.removeChild(child));
    },
  };
};
