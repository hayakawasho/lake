import { defineComponent, onMounted, onUnmounted } from '../lib/main';
import type { ReadonlyRef } from '../lib/main';

type Props = {
  isOpen: ReadonlyRef<boolean>;
  onOpen: () => void;
  onClose: () => void;
};

export default defineComponent<Props>({
  setup(el, props) {
    const { isOpen, onOpen, onClose } = props;
    const onToggle = () => (isOpen.value ? onClose() : onOpen());

    onMounted(() => {
      el.addEventListener('click', onToggle);
    });

    onUnmounted(() => {
      el.removeEventListener('click', onToggle);
    });
  },
});
