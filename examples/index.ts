import { mount, unmount as _, register, q as __ } from '../src/main';
import Index from './IndexPage';

document.addEventListener('DOMContentLoaded', () => {
  register('Index', Index);

  // a simple of how to mount component
  mount(document.body, {}, 'Index');

  // other example of how to mount component
  // q('[data-component]').forEach(el => {
  //   const componentName = el.dataset.component as string
  //   mount(el, {}, componentName)
  // })
});
