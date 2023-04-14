import type { ComponentType } from 'svelte';
import type { RefElement, ComponentProps } from '../core/types';
export type Context$<T = Record<string, unknown>> = {
  rootRef: RefElement;
} & ComponentProps<T>;
export declare function withSvelte(
  App: ComponentType
): import('../main').IComponent<unknown, void>;
//# sourceMappingURL=withSvelte.d.ts.map
