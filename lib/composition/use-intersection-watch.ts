import { useUnmount } from '../core/lifecycle';

export const useIntersectionWatch = (
  targetOrTargets: Element | Element[],
  callback: IntersectionObserverCallback,
  opts: IntersectionObserverInit = {
    rootMargin: '0px',
    threshold: 0.1,
  },
) => {
  const io = new IntersectionObserver(callback, opts);

  if (Array.isArray(targetOrTargets)) {
    targetOrTargets.forEach(el => io.observe(el));
  } else {
    io.observe(targetOrTargets);
  }

  useUnmount(() => {
    io.disconnect();
  });

  const unwatch = (el: Element) => {
    io.unobserve(el);
  };

  return {
    unwatch,
  };
};
