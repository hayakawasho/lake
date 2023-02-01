import type { IComponent, RefElement, ComponentContext } from '../core/types';
export declare const useSlot: () => {
  addChild(
    targetOrTargets: RefElement | RefElement[],
    child: IComponent,
    props?: Readonly<Record<string, unknown>>
  ): ComponentContext[];
  removeChild(child: ComponentContext): void;
};
//# sourceMappingURL=useSlot.d.ts.map
