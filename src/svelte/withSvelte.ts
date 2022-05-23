import type { SvelteComponent } from 'svelte'
import { getContext } from 'svelte'
import { defineComponent } from '../core'
import { domRefs } from '../internal/domRefs'
import type { Context$ } from '../internal/types'

export function withSvelte(SvelteApp: typeof SvelteComponent) {
  return defineComponent({
    setup({ el, ...props }) {
      const context = new Map<'$', Context$>()

      context.set('$', {
        rootRef: el,
        useDOMRef: (...ref) => ({
          refs: domRefs(new Set(ref), el),
        }),
      })

      const app = new SvelteApp({
        target: el,
        props,
        context,
      })

      return () => {
        app.$destroy()
        context.clear()
      }
    },
  })
}

export function getContext$() {
  return getContext<Context$>('$')
}
