export declare type DOMNode = HTMLElement | SVGElement;
export declare type FC = {
    setup(el: DOMNode, props: {}): unknown;
    components?: {
        [key: string]: FC;
    };
};
export declare type Context$ = {
    useDOMRef: <T>(...refKey: string[]) => {
        refs: T;
    };
    rootRef: DOMNode;
};
//# sourceMappingURL=types.d.ts.map