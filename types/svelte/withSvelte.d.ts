import type { SvelteComponent } from 'svelte';
import type { RefElement, ComponentProps } from '../core/types';
export type Context$<T = Record<string, unknown>> = {
  rootRef: RefElement;
} & ComponentProps<T>;
export declare function withSvelte(
  App: typeof SvelteComponent
): import('../main').IComponent<unknown>;
//# sourceMappingURL=withSvelte.d.ts.map
