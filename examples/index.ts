import { createApp, withSvelte } from '../lib/main';
import Parent from './Parent';
import Counter from './Counter.svelte';

document.addEventListener('DOMContentLoaded', () => {
  const { component } = createApp();

  const createCounter = component(withSvelte(Counter));
  const refCounter = document.getElementById('counter');

  if (refCounter) {
    createCounter(refCounter);
  }

  const createParent = component(Parent);
  const refParent = document.getElementById('parent');

  if (refParent) {
    createParent(refParent);
  }
});
