import { defineComponent, withSvelte } from '../src/main'
// @ts-ignore
import Counter from './Counter.svelte'
// @ts-ignore
import Form from './Form.svelte'

export default defineComponent({
  components: {
    '.js-counter': withSvelte(Counter),
    '.js-form': withSvelte(Form),
  },

  setup() {
    /** noop */
  },
})
