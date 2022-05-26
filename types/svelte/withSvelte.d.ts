import type { SvelteComponent } from 'svelte'
import type { DOMNode } from '../internal/types'
interface Context$ {
  rootRef: DOMNode
  useDOMRef: <T>(...refKey: string[]) => {
    refs: T
  }
}
declare const withSvelte: (
  App: typeof SvelteComponent
) => import('../internal/types').IComponent<unknown>
declare const getContext$: () => Context$
export { withSvelte, getContext$ }
//# sourceMappingURL=withSvelte.d.ts.map
