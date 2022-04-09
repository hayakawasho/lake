import type { SvelteComponent } from 'svelte'
import { getContext } from 'svelte'
import { domRefs } from './domRefs'
import type { IComponent, RefValue, ReturnDOMRef, Context$ } from './types'

type SvelteAppType = typeof SvelteComponent

class WithSvelte implements IComponent {
  #svelteApp!: SvelteComponent
  #svelteContext = new Map()

  constructor(private SvelteApp: SvelteAppType) {}

  setup = (element: HTMLElement, props = {}) => {
    const rootRef = element

    const newProps = {
      ...props,
    }

    this.#svelteContext.set('$', {
      rootRef,
      useDOMRef: <T>(ref: RefValue): ReturnDOMRef<T> => ({
        refs: domRefs(ref, rootRef)
      }),
    })

    this.#svelteApp = new this.SvelteApp({
      target: rootRef,
      props: newProps,
      context: this.#svelteContext
    })
  }

  destroy = () => {
    this.#svelteApp.$destroy()
    this.#svelteContext.clear()
  }
}

function getContext$() {
  return getContext<Context$>('$')
}

function withSvelte(Svelte: SvelteAppType): IComponent {
  return new WithSvelte(Svelte)
}

export { withSvelte, getContext$ }
