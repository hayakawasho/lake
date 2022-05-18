import type { DOMNode, FC, ComponentProps, Cleanup } from './types';
declare class ComponentContext {
    private _cleanup;
    parent: ComponentContext | null;
    children: any;
    constructor(_cleanup: Cleanup, props: {
        children: any;
    });
    unmount(): void;
}
export declare const DOM_COMPONENT_INSTANCE_PROPERTY: WeakMap<DOMNode, ComponentContext>;
export declare function createComponent(componentWrapper: FC): (el: DOMNode, props: ComponentProps<any>) => void;
declare type ComponentType = ReturnType<typeof createComponent>;
export type { ComponentContext, ComponentType };
//# sourceMappingURL=component.d.ts.map