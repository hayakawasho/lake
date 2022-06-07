import type { JSX } from 'solid-js';
import { render } from 'solid-js/web';
import { onUnmounted } from '../core/component';
import { defineComponent } from '../core/core';

export function withSolid(App: () => JSX.Element) {
  return defineComponent({
    setup(el, props) {
      const dispose = render(() => <App {...props} />, el);

      onUnmounted(() => {
        dispose();
      });
    },
  });
}
