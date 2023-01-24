import {
  defineComponent,
  withSvelte,
  children,
  onUnmounted,
  useDOMRef,
} from '../lib/main';
// @ts-ignore
import Counter from './Counter.svelte';
import Parent from './Parent';

export default defineComponent({
  props: {},

  setup(_el) {
    const { refs } = useDOMRef<{ counter: HTMLElement; parent: HTMLElement }>(
      'counter',
      'parent'
    );

    const { addChild } = children();

    addChild(refs.counter, withSvelte(Counter), {});
    addChild(refs.parent, Parent, {});

    onUnmounted(() => {
      //
    });
  },
});
