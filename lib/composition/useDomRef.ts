import { getCurrentComponent } from '../core/internal/component';
import { domRefs } from '../core/internal/domRefs';

export function useDomRef<T>(...refKey: string[]): {
  refs: T;
} {
  const ctx = getCurrentComponent('DomRef');
  return {
    refs: domRefs(new Set(refKey), ctx.element),
  };
}
