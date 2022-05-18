export type DOMNode = HTMLElement | SVGElement

export type ComponentProps<Prop> = Record<string, Prop>

export type Cleanup = void | (() => unknown)

export type FC = {
  setup(el: DOMNode, props: ComponentProps<any>): Cleanup
  components?: SubComponents
}

export type SubComponents = ComponentProps<FC>

export type Context$ = {
  rootRef: DOMNode
  useDOMRef: <T>(...refKey: string[]) => {
    refs: T
  }
}
