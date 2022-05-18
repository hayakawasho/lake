export declare type DOMNode = HTMLElement | SVGElement;
export declare type FC = {
    setup(el: DOMNode, props: Record<string, any>): unknown;
    components?: SubComponents;
};
export declare type SubComponents = Record<string, FC>;
export declare type Context$ = {
    useDOMRef: <T>(...refKey: string[]) => {
        refs: T;
    };
    rootRef: DOMNode;
};
export declare type ComponentProps<Prop> = Record<string, Prop>;
//# sourceMappingURL=types.d.ts.map