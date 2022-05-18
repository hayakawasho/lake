import type { DOMNode, FC, ComponentProps } from './internal/types';
export declare function defineComponent({ setup, components }: FC): {
    setup: (el: DOMNode, props: ComponentProps<any>) => import("./internal/types").Cleanup;
    components: import("./internal/types").SubComponents | undefined;
};
export declare function register(name: string, componentWrapper: FC): Map<string, (el: DOMNode, props: ComponentProps<any>) => void>;
export declare function unregister(name: string): Map<string, (el: DOMNode, props: ComponentProps<any>) => void>;
export declare function mount(node: DOMNode, props: ComponentProps<any>, name: string): void;
export declare function unmount(nodes: DOMNode[]): void;
export declare function component(componentWrapper: FC): (el: DOMNode, props?: {}) => void;
//# sourceMappingURL=core.d.ts.map