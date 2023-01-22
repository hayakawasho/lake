import type { ComponentContext } from './internal/component';
import type { IComponent } from './types';
export declare function createChildComponent(): {
  addChild(
    selector: string,
    child: IComponent,
    props: Readonly<Record<string, unknown>>
  ): ComponentContext[];
  removeChild(child: ComponentContext): void;
};
//# sourceMappingURL=child.d.ts.map
