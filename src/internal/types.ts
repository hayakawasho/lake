export type DOMNode = HTMLElement | SVGElement

export type Cleanup = () => (() => void) | void

export interface FC {
  setup(
    props: {
      el: DOMNode
    } & Record<string, any>
  ): Cleanup
  components?: {
    [selector: string]: FC
  }
  props?: Record<string, any>
}

export interface Context$ {
  rootRef: DOMNode
  useDOMRef: <T>(...refKey: string[]) => {
    refs: T
  }
}
