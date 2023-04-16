import { defineComponent, useUnmount } from '../lib/main';
import type { ReadonlyRef } from '../lib/main';

type Props = {
  isOpen: ReadonlyRef<boolean>;
  onOpen: () => void;
  onClose: () => void;
};

export default defineComponent({
  tagName: 'child',
  setup(el, props: Props) {
    const { isOpen, onOpen, onClose } = props;
    const onToggle = () => (isOpen.value ? onClose() : onOpen());

    el.addEventListener('click', onToggle);

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
