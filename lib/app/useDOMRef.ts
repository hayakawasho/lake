import { getOwner } from './internal/component';
import { domRefs } from './internal/domRefs';

export function useDOMRef<T>(...refKey: string[]): {
  refs: T;
} {
  const context = getOwner('domRef');
  return {
    refs: domRefs(new Set(refKey), context.element),
  };
}
