import { defineComponent, useUnmount, useMount } from '../lib/main';
import type { ReadonlyRef } from '../lib/main';

type Props = {
  isOpen: ReadonlyRef<boolean>;
  onOpen: () => void;
  onClose: () => void;
};

export default defineComponent({
  name: 'child',
  setup(el, props: Props) {
    const { isOpen, onOpen, onClose } = props;
    const onToggle = () => (isOpen.value ? onClose() : onOpen());

    el.addEventListener('click', onToggle);

    useMount(() => {
      console.log('child:mount');

      return () => {
        console.log('child:mount:unmount');
      };
    });

    useUnmount(() => {
      console.log('child:unmount');
    });

    useUnmount(() => {
      el.removeEventListener('click', onToggle);
    });

    return {
      test: () => {
        //
      },
    };
  },
});
