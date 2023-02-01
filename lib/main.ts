export { q } from './util/selector';

export type { RefElement, IComponent, ComponentContext } from './core/types';
export type { Ref, ReadonlyRef } from './core/ref';

export { ref, readonly } from './core/ref';
export { createApp, defineComponent } from './core/core';
export { useMount, useUnmount } from './core/lifecycle';
export { useEvent } from './composition/useEvent';
export { useDOMRef } from './composition/useDOMRef';
export { useIntersectionWatch } from './composition/useIntersectionWatch';
export { useSlot } from './composition/useSlot';

export type { Context$ } from './svelte/withSvelte';
export { withSvelte } from './svelte/withSvelte';
