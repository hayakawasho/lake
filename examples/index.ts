import { createApp, withSvelte } from '../lib/main';
import Parent from './Parent';
import Counter from './Counter.svelte';

document.addEventListener('DOMContentLoaded', () => {
  const { component } = createApp();

  const createCounter = component(withSvelte(Counter));
  createCounter(document.getElementById('counter')!, {});

  const createParent = component(Parent);
  createParent(document.getElementById('parent')!, {});
});
