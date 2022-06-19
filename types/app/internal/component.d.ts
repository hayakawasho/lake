import { LifecycleHooks } from '../lifecycle';
import type { LifecycleHandler } from '../lifecycle';
import type { RefElement, IComponent } from '../types';
export declare const getOwner: (hookName: string) => ComponentContext;
declare class ComponentContext {
  element: RefElement;
  [LifecycleHooks.MOUNTED]: LifecycleHandler[];
  [LifecycleHooks.UNMOUNTED]: LifecycleHandler[];
  parent: ComponentContext | null;
  readonly uid: string | number;
  readonly provides: Readonly<Record<string, unknown>>;
  constructor(
    create: IComponent['setup'],
    element: RefElement,
    props: Record<string, any>
  );
  mount(): void;
  unmount(): void;
  addChild(child: ComponentContext): void;
}
export declare function createComponent(
  wrap: IComponent
): (root: RefElement, props: Record<string, any>) => ComponentContext;
export type { ComponentContext };
//# sourceMappingURL=component.d.ts.map
