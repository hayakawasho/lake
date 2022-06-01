import type { DOMNode, IComponent, Cleanup } from './types'
declare class ComponentContext {
  private onUnmount
  constructor(create: Cleanup)
  unmount: () => void
  addChild(child: ComponentContext): void
}
export declare function createComponent(
  wrap: IComponent
): (root: DOMNode, props: Record<string, any>) => ComponentContext
export type { ComponentContext }
//# sourceMappingURL=component.d.ts.map
