export type DOMNode = HTMLElement | SVGElement

export interface IComponent {
  setup(el: DOMNode, props?: object): void
  cleanup(): void
  components?: {
    [key: string]: IComponent
  }
}

export type RefValue = Set<string>

type ReturnDOMRef<T> = {
  refs: T
}

export type Context$ = {
  useDOMRef: <T>(...refKey: string[]) => ReturnDOMRef<T>
  rootRef: DOMNode
}
