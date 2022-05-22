import type { DOMNode, FC, Cleanup } from './types';
declare class ComponentContext {
    #private;
    parent: ComponentContext | null;
    children: ComponentContext[];
    constructor(cleanup: Cleanup);
    unmount(): void;
    addChild(child: ComponentContext): void;
}
export declare function createComponent({ setup, components }: FC): (el: DOMNode, props: Record<string, any>) => ComponentContext;
export type { ComponentContext };
//# sourceMappingURL=component.d.ts.map