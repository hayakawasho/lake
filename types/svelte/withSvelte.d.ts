import type { ComponentType } from 'svelte';
import type { RefElement, ComponentProps } from '../core/types';
export type Context$<T = Record<string, unknown>> = {
  rootRef: RefElement;
} & ComponentProps<T>;
export declare function withSvelte(
  App: ComponentType,
  tagName: string
): import('../main').IComponent<void, Record<string, unknown>>;
//# sourceMappingURL=withSvelte.d.ts.map
