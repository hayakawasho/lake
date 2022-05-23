import type { DOMNode, FC } from './internal/types';
import type { ComponentContext } from './internal/component';
export declare const defineComponent: (options: FC) => FC;
export declare function register(name: string, componentWrapper: FC): Map<string, (el: DOMNode, props: Record<string, any>) => ComponentContext>;
export declare function unregister(name: string): Map<string, (el: DOMNode, props: Record<string, any>) => ComponentContext>;
export declare function mount(el: DOMNode, props: Record<string, any>, name: string): void;
export declare function unmount(selector: string, scope?: HTMLElement): void;
//# sourceMappingURL=core.d.ts.map