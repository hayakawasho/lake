export declare type RefElement = HTMLElement | SVGElement;
declare type ComponentProps<Props> = Readonly<Props>;
export interface IComponent<Props = Record<string, unknown>> {
  components?: {
    [selector: string]: IComponent;
  };
  props?: ComponentProps<Props>;
  setup(
    el: RefElement,
    props: ComponentProps<Props>
  ): void | Record<string, unknown>;
}
export {};
//# sourceMappingURL=types.d.ts.map
