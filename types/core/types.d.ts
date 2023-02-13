export type RefElement = HTMLElement | SVGElement;
export type RefObject = Readonly<Record<string, unknown>>;
export type ComponentProps<Props> = Readonly<Props>;
export interface IComponent<Props = Record<string, unknown>> {
  tag?: string;
  props?: ComponentProps<Props>;
  setup(el: RefElement, props: ComponentProps<Props>): void | RefObject;
}
export type { ComponentContext } from './internal/component';
//# sourceMappingURL=types.d.ts.map
