import { defineComponent, withSvelte, withSolid } from '../src/main';
// @ts-ignore
import Counter from './Counter.svelte';
// @ts-ignore
import Form from './Form.tsx';
import Parent from './Parent';

export default defineComponent({
  components: {
    '.js-counter': withSvelte(Counter),
    '.js-form': withSolid(Form),
    '.js-parent': Parent,
  },

  props: {},

  setup() {
    // noop
  },
});
