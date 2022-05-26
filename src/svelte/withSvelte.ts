import type { SvelteComponent } from 'svelte'
import { getContext } from 'svelte'
import { defineComponent } from '../core'
import { domRefs } from '../internal/domRefs'
import type { DOMNode } from '../internal/types'

interface Context$ {
  rootRef: DOMNode
  useDOMRef: <T>(...refKey: string[]) => { refs: T }
}

export function withSvelte(App: typeof SvelteComponent) {
  return defineComponent({
    setup(el, props) {
      const context = new Map<'$', Context$>()

      context.set('$', {
        rootRef: el,
        useDOMRef: (...ref) => ({ refs: domRefs(new Set(ref), el) }),
      })

      const app = new App({
        target: el,
        props,
        context,
      })

      return () => {
        app.$destroy()
      }
    },
  })
}

export const getContext$ = () => getContext<Context$>('$')
