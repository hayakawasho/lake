import { defineComponent, onMounted, onUnmounted } from '../app/src/main';
import type { Ref } from '../app/src/main';

export default defineComponent<{
  isOpen: Ref<boolean>;
  onOpen: () => void;
  onClose: () => void;
}>({
  setup(el, props) {
    const { onOpen, onClose, isOpen } = props;
    const onToggle = () => (isOpen.value ? onClose() : onOpen());

    onMounted(() => {
      el.addEventListener('click', onToggle);
    });

    onUnmounted(() => {
      el.removeEventListener('click', onToggle);
    });
  },
});
