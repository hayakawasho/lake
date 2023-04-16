export type RefElement = HTMLElement | SVGElement;
export type ComponentProps<Props> = Readonly<Props>;
export interface IComponent<SetupResult = void | Record<string, unknown>, Props = Record<string, unknown>> {
    tagName: string;
    setup(el: RefElement, props: ComponentProps<Props>): SetupResult;
}
export type { ComponentContext } from './internal/component';
//# sourceMappingURL=types.d.ts.map