export type RefElement = HTMLElement | SVGElement;
export type RefObject<T = Record<string, unknown>> = T;
export type ComponentProps<Props> = Readonly<Props>;
export interface IComponent<
  Props = Record<string, unknown>,
  SetupResult = void | Record<string, unknown>
> {
  tag?: string;
  props?: ComponentProps<Props>;
  setup(el: RefElement, props: ComponentProps<Props>): SetupResult;
}
export type { ComponentContext } from './internal/component';
//# sourceMappingURL=types.d.ts.map
