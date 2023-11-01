import { useMount, useUnmount } from '../core/lifecycle';

export const useIntersectionWatch = <T extends Element>(
  targetOrTargets: T | T[],
  callback: IntersectionObserverCallback,
  opts: IntersectionObserverInit = {
    rootMargin: '0px',
    threshold: 0.1,
  },
) => {
  const io = new IntersectionObserver(callback, opts);

  const watch = (targetOrTargets: T | T[]) => {
    if (Array.isArray(targetOrTargets)) {
      targetOrTargets.forEach(el => io.observe(el));
    } else {
      io.observe(targetOrTargets);
    }
  };

  useMount(() => {
    watch(targetOrTargets);
  });

  useUnmount(() => {
    io.disconnect();
  });

  const unwatch = (el: T) => {
    io.unobserve(el);
  };

  return {
    unwatch,
  };
};
