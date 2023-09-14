import {
  getCurrentComponent,
  createComponent,
} from '../core/internal/component';
import type { IComponent, RefElement, ComponentContext } from '../core/types';

export const useSlot = () => {
  const context = getCurrentComponent('Slot');

  return {
    addChild<Child extends IComponent>(
      targetOrTargets: RefElement | RefElement[],
      child: Child,
      props: Parameters<Child['setup']>[1] = {},
    ): ComponentContext<ReturnType<Child['setup']>>[] {
      const create = (el: RefElement) => {
        const component = createComponent(child)(el, props);
        context.addChild(component);

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
