import { defineComponent, ref } from '../src/main';
import Child from './Child';

export default defineComponent({
  components: {
    '.js-child': Child,
  },

  setup() {
    const isOpen = ref(false);

    return {
      isOpen,
      onOpen() {
        isOpen.wrap(true);
      },
      onClose() {
        isOpen.wrap(false);
      },
    };
  },
});
