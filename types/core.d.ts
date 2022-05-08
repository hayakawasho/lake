import type { DOMNode, FC } from './internal/types';
export declare function defineComponent(options: FC): FC;
export declare function register(name: string, componentWrapper: FC): Map<string, any>;
export declare function unregister(name: string): Map<string, any>;
export declare function mount(node: DOMNode, props: {} | undefined, componentName: string): any;
export declare function unmount(nodes: DOMNode[]): DOMNode[];
//# sourceMappingURL=core.d.ts.map