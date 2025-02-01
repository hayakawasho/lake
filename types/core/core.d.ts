import type { RefElement, IComponent, ComponentContext } from './types';
export declare function create(): {
    component(wrap: IComponent): (el: RefElement, props?: Record<string, any>) => ComponentContext<any>;
    unmount(targets: RefElement[]): void;
};
export declare const defineComponent: <SetupResult extends Record<string, unknown> | void, Props extends Record<string, unknown>>(opts: IComponent<SetupResult, Props>) => IComponent<SetupResult, Props>;
//# sourceMappingURL=core.d.ts.map