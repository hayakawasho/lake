import type { RefElement, IComponent } from '../types';
declare type LifecycleHandler = () => void;
declare class ComponentContext {
  element: RefElement;
  readonly onMounted: LifecycleHandler[];
  readonly onUnmounted: LifecycleHandler[];
  parent: ComponentContext | null;
  readonly uid: string;
  readonly provides: Record<string, any>;
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
