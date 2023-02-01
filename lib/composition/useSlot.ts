import {
  getCurrentComponent,
  createComponent,
} from '../core/internal/component';
import type { IComponent, RefElement, ComponentContext } from '../core/types';

export const useSlot = () => {
  const context = getCurrentComponent('slot');

  return {
    addChild(
      targetOrTargets: RefElement | RefElement[],
      child: IComponent,
      props: Readonly<Record<string, unknown>> = {}
    ) {
      const results: ComponentContext[] = [];

      const create = (el: RefElement) => {
        const component = createComponent(child)(el, {
          ...child.props,
          ...props,
        });
        context.addChild(component);
        results.push(component);
      };

      if (Array.isArray(targetOrTargets)) {
        targetOrTargets.forEach(el => create(el));
      } else {
        create(targetOrTargets);
      }

      return results;
    },

    removeChild(child: ComponentContext) {
      context.removeChild(child);
    },
  };
};
