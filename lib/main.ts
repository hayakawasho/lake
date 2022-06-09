export { assert } from './src/util/assert';
export { q } from './src/util/selector';
export { noop } from './src/util/function';

export type { Ref, ReadonlyRef } from './src/ref';
export { ref, readonly } from './src/ref';
export {
  defineComponent,
  register,
  unregister,
  mount,
  unmount,
} from './src/core';
export { onMounted, onUnmounted } from './src/lifecycle';

export * from './svelte';
