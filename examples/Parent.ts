import {
  defineComponent,
  ref,
  readonly,
  createChildComponent,
} from '../lib/main';
import Child from './Child';

export default defineComponent({
  setup() {
    const { addChild } = createChildComponent();

    const isOpen = ref(false);

    addChild('.js-child', Child, {
      isOpen: readonly(isOpen),
      onOpen() {
        isOpen.value = true;
      },
      onClose() {
        isOpen.value = false;
      },
    });
  },
});
