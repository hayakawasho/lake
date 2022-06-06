import { defineComponent, onMounted } from '../src/main';

export default defineComponent<any>({
  setup(el, props) {
    const { onOpen, onClose, isOpen } = props.parent.provides;

    const onToggle = () => (isOpen ? onOpen() : onClose());

    onMounted(() => {
      el.addEventListener('click', onToggle);

      return () => {
        el.removeEventListener('click', onToggle);
      };
    });
  },
});
