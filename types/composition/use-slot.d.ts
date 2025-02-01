import type { IComponent, RefElement, ComponentContext } from '../core/types';
export declare function useSlot(): {
    addChild<Child extends IComponent>(targetOrTargets: RefElement | RefElement[], child: Child, props?: Parameters<Child["setup"]>[1]): ComponentContext<ReturnType<Child["setup"]>>[];
    removeChild(children: ComponentContext[]): void;
};
//# sourceMappingURL=use-slot.d.ts.map