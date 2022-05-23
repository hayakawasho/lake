export declare type DOMNode = HTMLElement | SVGElement;
export declare type Cleanup = () => (() => void) | void;
export interface FC {
    setup(props: {
        el: DOMNode;
    } & Record<string, any>): Cleanup;
    components?: {
        [selector: string]: FC;
    };
    props?: Record<string, any>;
}
export interface Context$ {
    rootRef: DOMNode;
    useDOMRef: <T>(...refKey: string[]) => {
        refs: T;
    };
}
//# sourceMappingURL=types.d.ts.map