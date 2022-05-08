import type { SvelteComponent } from 'svelte';
import type { Context$ } from './internal/types';
export declare function withSvelte(SvelteApp: typeof SvelteComponent): {
    setup(el: import("./internal/types").DOMNode, props: {}): unknown;
    components?: {
        [key: string]: import("./internal/types").FC;
    } | undefined;
};
export declare function getContext$(): Context$;
//# sourceMappingURL=withSvelte.d.ts.map