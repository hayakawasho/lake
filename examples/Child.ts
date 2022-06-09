import { defineComponent, useEvent } from '../lib/main';
import type { ReadonlyRef } from '../lib/main';

export default defineComponent<{
  isOpen: ReadonlyRef<boolean>;
  onOpen: () => void;
  onClose: () => void;
}>({
  setup(el, props) {
    const { onOpen, onClose, isOpen } = props;

    useEvent(el as HTMLElement, 'click', e => {
      e.preventDefault();
      isOpen.value ? onClose() : onOpen();
    });
  },
});
