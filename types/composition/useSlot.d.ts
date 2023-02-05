import type { IComponent, RefElement, ComponentContext } from '../core/types';
export declare const useSlot: () => {
  addChild(
    child: IComponent,
    targetOrTargets: RefElement | RefElement[],
    props?: Readonly<Record<string, unknown>>
  ): ComponentContext[];
  removeChild(child: ComponentContext): void;
};
//# sourceMappingURL=useSlot.d.ts.map
