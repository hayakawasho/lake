import {
  defineComponent,
  ref,
  readonly,
  useSlot,
  useDOMRef,
} from '../lib/main';
import Child from './Child';

export default defineComponent({
  setup(_el) {
    const { refs } = useDOMRef<{ child: HTMLButtonElement }>('child');
    const { addChild } = useSlot();

    const isOpen = ref(false);

    addChild(Child, refs.child, {
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
