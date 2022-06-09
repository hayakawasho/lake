import type { SvelteComponent } from 'svelte';
import type { RefElement } from '../app/types';
import { defineComponent, onUnmounted } from '../main';

export type Context$ = {
  rootRef: RefElement;
  useDOMRef: <T>(...refKey: string[]) => { refs: T };
};

export function withSvelte(App: typeof SvelteComponent) {
  return defineComponent({
    setup(el, props, { mixin }) {
      const context = new Map<'$', Context$>();
      const { useDOMRef } = mixin;

      context.set('$', {
        rootRef: el,
        useDOMRef,
      });

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
