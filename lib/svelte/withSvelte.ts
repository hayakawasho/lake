import type { SvelteComponent } from 'svelte';
import type { DOMNode } from '../app/internal/types';
import { defineComponent, onUnmounted } from '../main';
import { domRefs } from './domRefs';

export type Context$ = {
  rootRef: DOMNode;
  useDOMRef: <T>(...refKey: string[]) => { refs: T };
};

export function withSvelte(App: typeof SvelteComponent) {
  return defineComponent({
    setup(el, props) {
      const context = new Map<'$', Context$>();

      context.set('$', {
        rootRef: el,
        useDOMRef: (...ref) => ({
          refs: domRefs(new Set(ref), el),
        }),
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
