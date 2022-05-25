import type { SvelteComponent } from 'svelte'
import type { DOMNode } from '../internal/types'
interface Context$ {
  rootRef: DOMNode
  useDOMRef: <T>(...refKey: string[]) => {
    refs: T
  }
}
export declare function withSvelte(
  App: typeof SvelteComponent
): import('../internal/types').IComponent<unknown>
export declare function getContext$(): Context$
export {}
//# sourceMappingURL=withSvelte.d.ts.map
