export interface IComponent {
    setup(element: HTMLElement, props?: object): void;
    cleanup(): void;
    components?: {
        [key: string]: IComponent;
    };
}
export declare type RefValue = Set<string>;
declare type ReturnDOMRef<T> = {
    refs: T;
};
export declare type Context$ = {
    useDOMRef: <T>(...refKey: string[]) => ReturnDOMRef<T>;
    rootRef: HTMLElement;
};
export {};
//# sourceMappingURL=types.d.ts.map