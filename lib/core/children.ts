import { getCurrentComponent, createComponent } from './internal/component';
import type { ComponentContext } from './internal/component';
import type { IComponent, RefElement } from './types';

export function children() {
  const context = getCurrentComponent('children');

  return {
    addChild(
      targetOrTargets: RefElement | RefElement[],
      child: IComponent,
      props: Readonly<Record<string, unknown>>
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
}
