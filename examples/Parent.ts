import {
  defineComponent,
  ref,
  readonly,
  children,
  useDOMRef,
} from '../lib/main';
import Child from './Child';

export default defineComponent({
  setup(_el) {
    const { refs } = useDOMRef<{ child: HTMLButtonElement }>('child');

    const { addChild } = children();

    const isOpen = ref(false);

    addChild(refs.child, Child, {
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
