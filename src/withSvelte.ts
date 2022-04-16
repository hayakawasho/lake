import type { SvelteComponent } from 'svelte'
import { getContext } from 'svelte'
import { defineComponent } from './core'
import { domRefs } from './domRefs'
import type { Context$ } from './types'

function withSvelte(SvelteApp: typeof SvelteComponent) {
  const symbol = {} as const
  const app$ = new WeakMap<object, SvelteComponent>()

  return defineComponent({
    setup(el, props) {
      const rootRef = el
      const context = new Map<'$', Context$>()

      context.set('$', {
        useDOMRef: (...ref) => ({
          refs: domRefs(new Set(ref), rootRef),
        }),
        rootRef: rootRef,
      })

      const app = new SvelteApp({
        target: rootRef,
        props,
        context,
      })

      app$.set(symbol, app)
    },

    cleanup() {
      app$.get(symbol)?.$destroy()
    },
  })
}

function getContext$() {
  return getContext<Context$>('$')
}

export { withSvelte, getContext$ }
