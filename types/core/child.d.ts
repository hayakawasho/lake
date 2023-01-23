import type { ComponentContext } from './internal/component';
import type { IComponent, RefElement } from './types';
export declare function createChildComponent(): {
  appendChild(
    targetOrTargets: RefElement | RefElement[],
    child: IComponent,
    props: Readonly<Record<string, unknown>>
  ): ComponentContext[];
  removeChild(child: ComponentContext): void;
};
//# sourceMappingURL=child.d.ts.map
