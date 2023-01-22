import { defineComponent, withSvelte, createChildComponent } from '../lib/main';
// @ts-ignore
import Counter from './Counter.svelte';
import Parent from './Parent';

export default defineComponent({
  props: {},

  setup() {
    const { addChild } = createChildComponent();

    addChild('.js-counter', withSvelte(Counter), {});
    addChild('.js-parent', Parent, {});
  },
});
