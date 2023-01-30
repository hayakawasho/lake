import type { SvelteComponent } from 'svelte';
import type { RefElement, ComponentProps } from '../core/types';
import { defineComponent, useUnmount } from '../main';

export type Context$<T = Record<string, unknown>> = {
  rootRef: RefElement;
} & ComponentProps<T>;

export function withSvelte(App: typeof SvelteComponent) {
  return defineComponent({
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
