export type DOMNode = HTMLElement | SVGElement

export type FC = {
  setup(el: DOMNode, props: {}): unknown
  components?: {
    [key: string]: FC
  }
}

export type Context$ = {
  useDOMRef: <T>(...refKey: string[]) => {
    refs: T
  }
  rootRef: DOMNode
}
