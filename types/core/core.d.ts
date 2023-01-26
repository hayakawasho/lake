import type { RefElement, IComponent } from './types';
export declare const defineComponent: <Props>(
  options: IComponent<Props>
) => IComponent<Props>;
export declare function createApp(): {
  component(
    wrap: IComponent
  ): (el: RefElement, props?: Record<string, any>) => void;
  unmount(selector: string, scope?: RefElement): void;
};
//# sourceMappingURL=core.d.ts.map
