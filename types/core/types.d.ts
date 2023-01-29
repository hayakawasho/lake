export declare type RefElement = HTMLElement | SVGElement;
export declare type RefObject = Readonly<Record<string, unknown>>;
export declare type ComponentProps<Props> = Readonly<Props>;
export interface IComponent<Props = Record<string, unknown>> {
  props?: ComponentProps<Props>;
  setup(el: RefElement, props: ComponentProps<Props>): void | RefObject;
}
//# sourceMappingURL=types.d.ts.map
