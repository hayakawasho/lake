import type { SvelteComponent } from 'svelte';
import type { Context$ } from './types';
declare function withSvelte(SvelteApp: typeof SvelteComponent): {
    setup: (element: HTMLElement, props?: object | undefined) => void;
    cleanup: () => void;
};
declare function getContext$(): Context$;
export { withSvelte, getContext$ };
//# sourceMappingURL=withSvelte.d.ts.map