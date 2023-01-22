import { defineComponent, withSvelte } from '../lib/main';
// @ts-ignore
import Counter from './Counter.svelte';
import Parent from './Parent';

export default defineComponent({
  components: {
    '.js-counter': withSvelte(Counter),
    '.js-parent': Parent,
  },

  props: {},

  setup() {
    // noop
  },
});
