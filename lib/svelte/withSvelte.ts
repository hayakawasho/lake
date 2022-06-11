import type { SvelteComponent } from 'svelte';
import type { RefElement } from '../app/types';
import { defineComponent, onUnmounted } from '../main';

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

      onUnmounted(() => {
        app.$destroy();
      });
    },
  });
}
