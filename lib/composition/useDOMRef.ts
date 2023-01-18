import { getOwner } from '../core/internal/component';
import { domRefs } from '../core/internal/domRefs';

export function useDOMRef<T>(...refKey: string[]): {
  refs: T;
} {
  const context = getOwner('domRef');
  return {
    refs: domRefs(new Set(refKey), context.element),
  };
}
