import type { DOMNode, FC, Cleanup } from './types';
declare type LifecycleHandler = () => void;
declare class ComponentContext {
    onUnmount: LifecycleHandler[];
    constructor(create: Cleanup);
    unmount: () => void;
    addChild(child: ComponentContext): void;
}
export declare function createComponent(componentWrapper: FC): (el: DOMNode, props: Record<string, any>) => ComponentContext;
export type { ComponentContext };
//# sourceMappingURL=component.d.ts.map