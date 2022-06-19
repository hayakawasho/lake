import type { RefElement } from '../types';
import { onUnmounted } from './lifecycle';

export const useIntersectionWatch = (
  targetOrTargets: RefElement | RefElement[],
  cb: IntersectionObserverCallback,
  opts: IntersectionObserverInit = {
    rootMargin: '0px',
    threshold: 0.1,
  }
) => {
  const io = new IntersectionObserver(cb, opts);

  if (Array.isArray(targetOrTargets)) {
    targetOrTargets.forEach(el => io.observe(el));
  } else {
    io.observe(targetOrTargets);
  }

  onUnmounted(() => {
    io.disconnect();
  });

  const unwatch = (el: Element) => {
    io.unobserve(el);
  };

  return {
    unwatch,
  };
};
