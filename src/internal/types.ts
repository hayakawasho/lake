export type DOMNode = HTMLElement | SVGElement;

export type Cleanup = void | (() => void);

type ComponentProps<Props> = Readonly<Props>;

export interface IComponent<Props = Record<string, any>> {
  components?: {
    [selector: string]: IComponent;
  };
  props?: ComponentProps<Props>;
  setup(el: DOMNode, props: ComponentProps<Props>): Record<string, any> | void;
}
