import { mount, unmount, register, q as __ } from '../lib/main';
import Index from './IndexPage';

document.addEventListener('DOMContentLoaded', () => {
  register('Index', Index);

  /**
   * how to mount component
   *
   */
  mount(document.body, {}, 'Index');

  /**
   * other example of how to mount component
   *
   */
  // q('[data-component]').forEach(el => {
  //   const componentName = el.dataset.component as string
  //   mount(el, {}, componentName)
  // })
});
