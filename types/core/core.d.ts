import type { RefElement, IComponent, ComponentContext } from './types';
export declare const create: () => {
  component(
    wrap: IComponent
  ): (el: RefElement, props?: Record<string, any>) => ComponentContext;
  unmount(targets: RefElement[]): void;
};
export declare const defineComponent: <Props>(
  opts: IComponent<Props>
) => IComponent<Props>;
//# sourceMappingURL=core.d.ts.map
