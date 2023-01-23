import { LifecycleHooks } from '../lifecycle';
import type { LifecycleHandler } from '../lifecycle';
import type { RefElement, IComponent } from '../types';
export declare const getCurrentComponent: (
  hookName: string
) => ComponentContext;
declare class ComponentContext {
  element: RefElement;
  [LifecycleHooks.MOUNTED]: LifecycleHandler[];
  [LifecycleHooks.UNMOUNTED]: LifecycleHandler[];
  readonly uid: string | number;
  parent: ComponentContext | null;
  children: ComponentContext[];
  constructor(element: RefElement);
  mount: () => void;
  unmount: () => void;
  addChild: (child: ComponentContext) => void;
  removeChild: (child: ComponentContext) => void;
}
export declare function createComponent(
  wrap: IComponent
): (root: RefElement, props: Record<string, any>) => ComponentContext;
export type { ComponentContext };
//# sourceMappingURL=component.d.ts.map
