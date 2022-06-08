import type { DOMNode, IComponent } from './types';
declare type LifecycleHandler = () => void;
declare class ComponentContext {
  element: DOMNode;
  readonly onMounted: LifecycleHandler[];
  readonly onUnmounted: LifecycleHandler[];
  parent: ComponentContext | null;
  readonly uid: string;
  readonly provides: Record<string, any>;
  constructor(
    create: IComponent['setup'],
    element: DOMNode,
    props: Record<string, any>
  );
  mount(): void;
  unmount(): void;
  addChild(child: ComponentContext): void;
}
export declare function createComponent(
  wrap: IComponent
): (root: DOMNode, props: Record<string, any>) => ComponentContext;
export type { ComponentContext };
//# sourceMappingURL=component.d.ts.map
