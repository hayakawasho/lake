import type { RefElement, IComponent, ComponentContext } from './types';
export declare const create: () => {
  component(
    wrap: IComponent
  ): (el: RefElement, props?: Record<string, any>) => ComponentContext<any>;
  unmount(targets: RefElement[]): void;
};
export declare const defineComponent: <Props, SetupResult>(
  opts: IComponent<Props, SetupResult>
) => IComponent<Props, SetupResult>;
//# sourceMappingURL=core.d.ts.map
