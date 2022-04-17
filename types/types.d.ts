export declare type DOMNode = HTMLElement | SVGElement;
export interface IComponent {
    setup(el: DOMNode, props?: object): void;
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
    rootRef: DOMNode;
};
export {};
//# sourceMappingURL=types.d.ts.map