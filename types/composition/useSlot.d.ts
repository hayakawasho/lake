import type { IComponent, RefElement, ComponentContext } from '../core/types';
export declare const useSlot: () => {
  addChild<Child extends IComponent<void | Record<string, unknown>>>(
    targetOrTargets: RefElement | RefElement[],
    child: Child,
    props?: Readonly<Record<string, unknown>>
  ): ComponentContext<ReturnType<Child['setup']>>[];
  removeChild(children: ComponentContext[]): void;
};
//# sourceMappingURL=useSlot.d.ts.map
