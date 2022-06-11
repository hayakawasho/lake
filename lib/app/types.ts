export type RefElement = HTMLElement | SVGElement;

export type ComponentProps<Props> = Readonly<Props>;

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
