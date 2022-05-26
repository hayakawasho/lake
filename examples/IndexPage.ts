import { defineComponent, withSvelte } from '../src/main'
// @ts-ignore
import Counter from './Counter.svelte'

export default defineComponent({
  components: {
    '.js-counter': withSvelte(Counter),
  },

  setup() {
    /** noop */
  },
})
