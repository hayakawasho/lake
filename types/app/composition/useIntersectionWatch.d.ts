import type { RefElement } from '../types';
export declare const useIntersectionWatch: (
  targetOrTargets: RefElement | RefElement[],
  cb: IntersectionObserverCallback,
  opts?: IntersectionObserverInit
) => {
  unwatch: (el: Element) => void;
};
//# sourceMappingURL=useIntersectionWatch.d.ts.map
