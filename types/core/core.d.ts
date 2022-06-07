import type { ComponentContext } from '../internal/component';
import type { DOMNode, IComponent } from '../internal/types';
export declare const defineComponent: <Props>(
  options: IComponent<Props>
) => IComponent<Props>;
export declare function register(
  name: string,
  wrap: IComponent
): Map<string, (root: DOMNode, props: Record<string, any>) => ComponentContext>;
export declare function unregister(
  name: string
): Map<string, (root: DOMNode, props: Record<string, any>) => ComponentContext>;
export declare function mount(
  el: DOMNode,
  props: Record<string, any>,
  name: string
): void;
export declare function unmount(selector: string, scope?: DOMNode): void;
//# sourceMappingURL=core.d.ts.map
