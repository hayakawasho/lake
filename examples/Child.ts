import { defineComponent, onMounted, onUnmounted } from '../lib/main';
import type { ReadonlyRef } from '../lib/main';

export default defineComponent<{
  isOpen: ReadonlyRef<boolean>;
  onOpen: () => void;
  onClose: () => void;
}>({
  setup(el, props) {
    const { onOpen, onClose, isOpen } = props;
    const onToggle = () => {
      isOpen.value ? onClose() : onOpen();
    };

    onMounted(() => {
      el.addEventListener('click', onToggle);
    });

    onUnmounted(() => {
      el.removeEventListener('click', onToggle);
    });
  },
});
