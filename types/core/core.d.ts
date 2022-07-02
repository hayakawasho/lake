import type { ComponentContext } from './internal/component';
import type { RefElement, IComponent } from './types';
export declare const defineComponent: <Props>(
  options: IComponent<Props>
) => IComponent<Props>;
export declare function register(
  name: string,
  wrap: IComponent
): Map<
  string,
  (root: RefElement, props: Record<string, any>) => ComponentContext
>;
export declare function unregister(
  name: string
): Map<
  string,
  (root: RefElement, props: Record<string, any>) => ComponentContext
>;
export declare function mount(
  el: RefElement,
  props: Record<string, any>,
  name: string
): void;
export declare function unmount(selector: string, scope?: RefElement): void;
//# sourceMappingURL=core.d.ts.map
