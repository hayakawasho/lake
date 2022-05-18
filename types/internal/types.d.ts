export declare type DOMNode = HTMLElement | SVGElement;
export declare type ComponentProps<Prop> = Record<string, Prop>;
export declare type Cleanup = void | (() => unknown);
export declare type FC = {
    setup(el: DOMNode, props: ComponentProps<any>): Cleanup;
    components?: SubComponents;
};
export declare type SubComponents = ComponentProps<FC>;
export declare type Context$ = {
    rootRef: DOMNode;
    useDOMRef: <T>(...refKey: string[]) => {
        refs: T;
    };
};
//# sourceMappingURL=types.d.ts.map