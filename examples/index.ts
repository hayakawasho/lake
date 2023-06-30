import { create, withSvelte } from '../lib/main';
import Parent from './Parent';
import Counter from './Counter.svelte';

document.addEventListener('DOMContentLoaded', () => {
  const { component } = create();

  const refCounter = document.getElementById('counter');

  if (refCounter) {
    const createCounter = component(withSvelte(Counter, 'counter'));
    createCounter(refCounter, { test: 'hoge' });
  }

  const refParent = document.getElementById('parent');

  if (refParent) {
    const createParent = component(Parent);
    createParent(refParent);
  }
});
