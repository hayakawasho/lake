export { q } from './util/selector';

export type { RefElement } from './core/types';
export type { Ref, ReadonlyRef } from './core/ref';

export { ref, readonly } from './core/ref';
export { defineComponent, createApp } from './core/core';
export { onMounted, onUnmounted } from './core/lifecycle';
export { useEvent } from './composition/useEvent';
export { useDOMRef } from './composition/useDOMRef';
export { useIntersectionWatch } from './composition/useIntersectionWatch';

export type { Context$ } from './svelte/withSvelte';
export { withSvelte } from './svelte/withSvelte';
