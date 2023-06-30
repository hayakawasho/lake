import type { IComponent, RefElement, ComponentContext } from '../core/types';
export declare const useSlot: () => {
    addChild<Child extends IComponent<void | Record<string, unknown>, Record<string, unknown>>>(targetOrTargets: RefElement | RefElement[], child: Child, props?: Parameters<Child["setup"]>[1]): ComponentContext<ReturnType<Child["setup"]>>[];
    removeChild(children: ComponentContext[]): void;
};
//# sourceMappingURL=use-slot.d.ts.map