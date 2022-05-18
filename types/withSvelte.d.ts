import type { SvelteComponent } from 'svelte';
import type { Context$ } from './internal/types';
export declare function withSvelte(SvelteApp: typeof SvelteComponent): {
    setup: (el: import("./internal/types").DOMNode, props: Record<string, any>) => unknown;
    components: import("./internal/types").SubComponents | undefined;
};
export declare function getContext$(): Context$;
//# sourceMappingURL=withSvelte.d.ts.map