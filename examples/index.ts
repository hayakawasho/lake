import { create } from '../lib/main';
import Parent from './Parent';

document.addEventListener('DOMContentLoaded', () => {
  const { component, unmount } = create();

  const refParent = document.getElementById('parent');
  const refTest = document.querySelector<HTMLElement>('.js-test');

  if (refParent) {
    const createParent = component(Parent);
    createParent(refParent);

    setTimeout(() => {
      unmount([refParent]);
    }, 1000);
  }

  const createParent = component(Parent);
  createParent(refTest!);
});
