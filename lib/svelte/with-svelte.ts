import { defineComponent, useUnmount } from '../main';
import type { RefElement, ComponentProps } from '../core/types';
import type { ComponentType } from 'svelte';

export type Context$<T = Record<string, unknown>> = {
  rootRef: RefElement;
} & ComponentProps<T>;

export function withSvelte(App: ComponentType, name = 'withSvelte') {
  return defineComponent({
    name,
    setup(el, props) {
      const context = new Map<'$', Context$>([
        [
          '$',
          {
            rootRef: el,
            ...props,
          },
        ],
      ]);

      const app = new App({
        target: el,
        context,
      });

      useUnmount(() => {
        app.$destroy();
      });
    },
  });
}
