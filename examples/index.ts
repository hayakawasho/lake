import { create, withSvelte } from '../lib/main';
import Parent from './Parent';
import Counter from './Counter.svelte';

document.addEventListener('DOMContentLoaded', () => {
  const { component, unmount } = create();

  const refCounter = document.getElementById('counter');

  if (refCounter) {
    const createCounter = component(withSvelte(Counter, 'counter'));
    createCounter(refCounter, { test: 'hoge' });
  }

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
