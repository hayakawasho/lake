import type { SvelteComponent } from 'svelte';
import type { RefElement } from '../core/types';
import { defineComponent, useUnmount } from '../main';

export type Context$ = {
  rootRef: RefElement;
};

export function withSvelte(App: typeof SvelteComponent) {
  return defineComponent({
    setup(el, props) {
      const context = new Map<'$', Context$>([
        [
          '$',
          {
            rootRef: el,
          },
        ],
      ]);

      const app = new App({
        target: el,
        props,
        context,
      });

      useUnmount(() => {
        app.$destroy();
      });
    },
  });
}
