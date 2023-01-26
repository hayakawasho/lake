import type { ComponentContext } from '../core/internal/component';
import type { IComponent, RefElement } from '../core/types';
export declare const useSlot: () => {
  addChild(
    targetOrTargets: RefElement | RefElement[],
    child: IComponent,
    props?: Readonly<Record<string, unknown>>
  ): ComponentContext[];
  removeChild(child: ComponentContext): void;
};
//# sourceMappingURL=useSlot.d.ts.map
