import { getOwner } from './internal/component';

export function onMounted(fn: () => void) {
  getOwner('onMounted').onMounted.push(fn);
}

export function onUnmounted(fn: () => void) {
  getOwner('onUnmounted').onUnmounted.push(fn);
}
