export declare type DOMNode = HTMLElement | SVGElement
export declare type Cleanup = void | (() => void)
declare type ComponentProps<Props> = Readonly<Props>
export interface FC<Props = Record<string, any>> {
  props?: ComponentProps<Props>
  setup(el: DOMNode, props: ComponentProps<Props>): Cleanup
  components?: {
    [selector: string]: FC
  }
}
export interface Context$ {
  rootRef: DOMNode
  useDOMRef: <T>(...refKey: string[]) => {
    refs: T
  }
}
export {}
//# sourceMappingURL=types.d.ts.map
