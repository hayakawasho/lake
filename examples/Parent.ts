import { defineComponent, ref, readonly } from '../lib/main';
import Child from './Child';

export default defineComponent({
  components: {
    '.js-child': Child,
  },

  setup() {
    const isOpen = ref(false);

    return {
      isOpen: readonly(isOpen),
      onOpen() {
        isOpen.value = true;
      },
      onClose() {
        isOpen.value = false;
      },
    };
  },
});
