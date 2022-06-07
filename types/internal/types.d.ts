export declare type DOMNode = HTMLElement | SVGElement;
export declare type Cleanup = void | (() => void);
declare type ComponentProps<Props> = Readonly<Props>;
export interface IComponent<Props = Record<string, any>> {
  components?: {
    [selector: string]: IComponent;
  };
  props?: ComponentProps<Props>;
  setup(el: DOMNode, props: ComponentProps<Props>): Record<string, any> | void;
}
export {};
//# sourceMappingURL=types.d.ts.map
