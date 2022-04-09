import type { SvelteComponent } from 'svelte'
import { getContext } from 'svelte'
import { domRefs } from './domRefs'
import type { IComponent, RefValue, ReturnDOMRef, Context$ } from './types'

type SvelteAppType = typeof SvelteComponent

class WithSvelte implements IComponent {
  #svelteApp!: SvelteComponent
  #context$ = new Map()

  constructor(private SvelteApp: SvelteAppType) {}

  setup = (element: HTMLElement, props = {}) => {
    const rootRef = element
    const newProps = {
      ...props,
    }

    this.#context$.set('$', {
      rootRef,
      useDOMRef: <T>(ref: RefValue): ReturnDOMRef<T> => ({
        refs: domRefs(ref, rootRef)
      }),
    })

    this.#svelteApp = new this.SvelteApp({
      target: rootRef,
      props: newProps,
      context: this.#context$
    })
  }

  destroy = () => {
    this.#svelteApp.$destroy()
    this.#context$.clear()
  }
}

function getContext$() {
  return getContext<Context$>('$')
}

function withSvelte(Svelte: SvelteAppType): IComponent {
  return new WithSvelte(Svelte)
}

export { withSvelte, getContext$ }
