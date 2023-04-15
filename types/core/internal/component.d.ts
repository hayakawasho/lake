import { LifecycleHooks } from '../lifecycle';
import type { RefElement, IComponent } from '../types';
export declare const getCurrentComponent: (hookName: string) => ComponentContext<any>;
declare class ComponentContext<T = any> {
    #private;
    element: RefElement;
    private [LifecycleHooks.MOUNTED];
    private [LifecycleHooks.UNMOUNTED];
    parent: ComponentContext<T> | null;
    readonly uid: string;
    current: T;
    constructor(element: RefElement, tagName: string);
    mount: () => void;
    unmount: () => void;
    addChild: (child: ComponentContext) => void;
    removeChild: (child: ComponentContext) => void;
}
export declare const createComponent: (wrap: IComponent) => (root: RefElement, props: Record<string, any>) => ComponentContext<any>;
export type { ComponentContext };
//# sourceMappingURL=component.d.ts.map