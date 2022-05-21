export declare type DOMNode = HTMLElement | SVGElement;
export declare type Cleanup = void | (() => unknown);
export interface FC {
    setup(el: DOMNode, props: Record<string, any>): Cleanup;
    components?: {
        [selector: string]: FC;
    };
}
export interface Context$ {
    rootRef: DOMNode;
    useDOMRef: <T>(...refKey: string[]) => {
        refs: T;
    };
}
//# sourceMappingURL=types.d.ts.map