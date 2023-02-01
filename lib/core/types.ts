export type RefElement = HTMLElement | SVGElement;

export type RefObject = Readonly<Record<string, unknown>>;

export type ComponentProps<Props> = Readonly<Props>;

export interface IComponent<Props = Record<string, unknown>> {
  props?: ComponentProps<Props>;
  setup(el: RefElement, props: ComponentProps<Props>): void | RefObject;
}

export type { ComponentContext } from './internal/component';
