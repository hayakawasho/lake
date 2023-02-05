import {
  getCurrentComponent,
  createComponent,
} from '../core/internal/component';
import type { IComponent, RefElement, ComponentContext } from '../core/types';

export const useSlot = () => {
  const context = getCurrentComponent('slot');

  return {
    addChild(
      child: IComponent,
      targetOrTargets: RefElement | RefElement[],
      props: Readonly<Record<string, unknown>> = {}
    ) {
      const children: ComponentContext[] = [];

      const create = (el: RefElement) => {
        const component = createComponent(child)(el, {
          ...child.props,
          ...props,
        });
        context.addChild(component);
        children.push(component);
      };

      if (Array.isArray(targetOrTargets)) {
        targetOrTargets.forEach(el => create(el));
      } else {
        create(targetOrTargets);
      }

      return children;
    },

    removeChild(child: ComponentContext) {
      context.removeChild(child);
    },
  };
};
