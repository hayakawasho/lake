import { q } from '../util/selector';
import { getOwner, createComponent } from './internal/component';
import type { ComponentContext } from './internal/component';
import type { IComponent } from './types';

export function createChildComponent() {
  const context = getOwner('createChildComponent');

  return {
    addChild(
      selector: string,
      child: IComponent,
      props: Readonly<Record<string, unknown>>
    ) {
      return q(selector, context.element).map(el => {
        const component = createComponent(child)(el, {
          ...child.props,
          ...props,
        });
        context.addChild(component);
        return component;
      });
    },
    removeChild(child: ComponentContext) {
      context.removeChild(child);
    },
  };
}
