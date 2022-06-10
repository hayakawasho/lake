import { getOwner } from './internal/component';
import { domRefs } from './internal/domRefs';

export function useDOMRef<T>(...ref: string[]): {
  refs: T;
} {
  const context = getOwner('useDOMRef');
  return {
    refs: domRefs(new Set(ref), context.element),
  };
}
