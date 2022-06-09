import { defineComponent, useEvent } from '../lib/main';
import type { ReadonlyRef } from '../lib/main';

type Props = {
  isOpen: ReadonlyRef<boolean>;
  onOpen: () => void;
  onClose: () => void;
};

export default defineComponent<Props>({
  setup(el, props) {
    const { isOpen, onOpen, onClose } = props;

    useEvent(el as HTMLElement, 'click', e => {
      e.preventDefault();
      isOpen.value ? onClose() : onOpen();
    });
  },
});
