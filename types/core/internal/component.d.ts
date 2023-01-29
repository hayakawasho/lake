import { LifecycleHooks } from '../lifecycle';
import type { RefElement, IComponent, RefObject } from '../types';
export declare const getCurrentComponent: (
  hookName: string
) => ComponentContext;
declare class ComponentContext {
  #private;
  element: RefElement;
  private [LifecycleHooks.MOUNTED];
  private [LifecycleHooks.UNMOUNTED];
  parent: ComponentContext | null;
  readonly uid: string | number;
  current: RefObject;
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
