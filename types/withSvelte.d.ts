import type { SvelteComponent } from 'svelte';
import type { Context$ } from './types';
declare function withSvelte(SvelteApp: typeof SvelteComponent): import("./types").IComponent;
declare function getContext$(): Context$;
export { withSvelte, getContext$ };
//# sourceMappingURL=withSvelte.d.ts.map