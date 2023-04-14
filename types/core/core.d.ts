import type { RefElement, IComponent, ComponentContext } from './types';
export declare const create: () => {
  component(
    wrap: IComponent
  ): (el: RefElement, props?: Record<string, any>) => ComponentContext<any>;
  unmount(targets: RefElement[]): void;
};
export declare const defineComponent: <
  SetupResult extends void | Record<string, unknown>
>(
  opts: IComponent<SetupResult>
) => IComponent<SetupResult>;
//# sourceMappingURL=core.d.ts.map
