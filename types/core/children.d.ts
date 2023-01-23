import type { ComponentContext } from './internal/component';
import type { IComponent, RefElement } from './types';
export declare function children(): {
  addChild(
    targetOrTargets: RefElement | RefElement[],
    child: IComponent,
    props: Readonly<Record<string, unknown>>
  ): ComponentContext[];
  removeChild(child: ComponentContext): void;
};
//# sourceMappingURL=children.d.ts.map
