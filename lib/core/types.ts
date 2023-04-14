export type RefElement = HTMLElement | SVGElement;

export type ComponentProps<Props> = Readonly<Props>;

export interface IComponent<SetupResult = void | Record<string, unknown>> {
  tag: string;
  setup(
    el: RefElement,
    props: ComponentProps<Record<string, unknown>>
  ): SetupResult;
}

export type { ComponentContext } from './internal/component';
