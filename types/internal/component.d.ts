import type { DOMNode, IComponent, Cleanup } from './types';
declare class ComponentContext {
  element: DOMNode | Document;
  private onUnmount;
  parent: ComponentContext | null;
  constructor(create: Cleanup, element: DOMNode | Document);
  unmount: () => void;
  addChild(child: ComponentContext): void;
}
export declare function createComponent(
  wrap: IComponent
): (root: DOMNode, props: Record<string, any>) => ComponentContext;
export type { ComponentContext };
//# sourceMappingURL=component.d.ts.map
