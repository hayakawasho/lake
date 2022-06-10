import type { SvelteComponent } from 'svelte';
import type { RefElement } from '../app/types';
export declare type Context$ = {
  rootRef: RefElement;
};
export declare function withSvelte(
  App: typeof SvelteComponent
): import('../app/types').IComponent<unknown>;
//# sourceMappingURL=withSvelte.d.ts.map
