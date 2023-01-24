import { createApp } from '../lib/main';
import Index from './IndexPage';

document.addEventListener('DOMContentLoaded', () => {
  const { component } = createApp();

  const root = document.getElementById('root')!;

  const mount = component(Index);
  mount(root, {});
});
