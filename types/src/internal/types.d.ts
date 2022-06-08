export declare type DOMNode = HTMLElement | SVGElement;
declare type ComponentProps<Props> = Readonly<Props>;
export interface IComponent<Props = Record<string, any>> {
  components?: {
    [selector: string]: IComponent;
  };
  props?: ComponentProps<Props>;
  setup(
    el: DOMNode,
    props: ComponentProps<Props>
  ): void | Record<string, any> | (() => Record<string, any>);
}
export {};
//# sourceMappingURL=types.d.ts.map
