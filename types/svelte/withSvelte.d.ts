import type { SvelteComponent } from 'svelte';
import type { RefElement } from '../core/types';
export declare type Context$ = {
  rootRef: RefElement;
};
export declare function withSvelte(
  App: typeof SvelteComponent
): import('../core/types').IComponent<unknown>;
//# sourceMappingURL=withSvelte.d.ts.map
