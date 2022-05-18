export type DOMNode = HTMLElement | SVGElement

export type FC = {
  setup(el: DOMNode, props: Record<string, any>): unknown
  components?: SubComponents
}

export type SubComponents = Record<string, FC>

export type Context$ = {
  useDOMRef: <T>(...refKey: string[]) => {
    refs: T
  }
  rootRef: DOMNode
}

export type Props<T> = Record<string, T>
