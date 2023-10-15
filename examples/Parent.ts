import {
  defineComponent,
  ref,
  readonly,
  useSlot,
  useDomRef,
  useMount,
  useUnmount,
} from '../lib/main';
import Child from './Child';

export default defineComponent({
  name: 'parent',
  setup(_el) {
    const { refs } = useDomRef<{
      child: HTMLButtonElement;
    }>('child');

    const { addChild } = useSlot();

    const isOpen = ref(false);

    const [child] = addChild(refs.child, Child, {
      isOpen: readonly(isOpen),
      onOpen: () => {
        isOpen.value = true;
      },
      onClose: () => {
        isOpen.value = false;
      },
    });

    child.current.test();

    useMount(() => {
      console.log('parent:mount');
    });

    useUnmount(() => {
      console.log('parent:unmount');
    });
  },
});
