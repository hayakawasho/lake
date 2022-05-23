export type DOMNode = HTMLElement | SVGElement

export type Cleanup = void | (() => void)

type ComponentProps<Props> = Readonly<Props>

export interface FC<Props = Record<string, any>> {
  props?: ComponentProps<Props>
  components?: {
    [selector: string]: FC
  }
  setup(el: DOMNode, props: ComponentProps<Props>): Cleanup
}

export interface Context$ {
  rootRef: DOMNode
  useDOMRef: <T>(...refKey: string[]) => {
    refs: T
  }
}
