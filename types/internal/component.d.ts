import type { DOMNode, FC, Cleanup } from './types';
declare class ComponentContext {
    #private;
    parent: ComponentContext | null;
    constructor(cleanup: Cleanup);
    unmount(): void;
    addChild(child: ComponentContext): void;
}
export declare function createComponent(componentWrapper: FC): (el: DOMNode, props: Record<string, any>) => ComponentContext;
export type { ComponentContext };
//# sourceMappingURL=component.d.ts.map