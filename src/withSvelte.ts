import type { SvelteComponent } from 'svelte'
import { getContext } from 'svelte'
import { defineComponent } from './core'
import { domRefs } from './domRefs'
import type { Context$ } from './types'

function withSvelte(SvelteApp: typeof SvelteComponent) {
  const app$ = new WeakMap<object, SvelteComponent>()
  const symbol = {} as const

  return defineComponent({
    setup(el, props) {
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
