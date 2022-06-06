import { defineComponent, onMounted } from '../src/main';
import type { Ref } from '../src/main';

export default defineComponent<{
  isOpen: Ref<boolean>;
  onOpen: () => void;
  onClose: () => void;
}>({
  setup(el, props) {
    const { onOpen, onClose, isOpen } = props;

    const onToggle = () => {
      isOpen.unwrap() ? onClose() : onOpen();
    };

    onMounted(() => {
      el.addEventListener('click', onToggle);

      return () => {
        el.removeEventListener('click', onToggle);
      };
    });
  },
});