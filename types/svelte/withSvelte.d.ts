import type { SvelteComponent } from 'svelte';
import type { DOMNode } from '../src/internal/types';
export declare type Context$ = {
  rootRef: DOMNode;
  useDOMRef: <T>(...refKey: string[]) => {
    refs: T;
  };
};
export declare function withSvelte(
  App: typeof SvelteComponent
): import('../src/internal/types').IComponent<unknown>;
//# sourceMappingURL=withSvelte.d.ts.map
