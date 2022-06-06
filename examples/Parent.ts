import { defineComponent } from '../src/main';
import Child from './Child';

export default defineComponent({
  components: {
    '.js-child': Child,
  },

  setup() {
    let isOpen = false;

    return {
      isOpen,
      onOpen() {
        isOpen = true;
      },
      onClose() {
        isOpen = false;
      },
    };
  },
});
