import { getCurrentComponent } from '../core/internal/component';
import { domRefs } from '../core/internal/dom-refs';

export function useDomRef<T>(...refKey: string[]): {
  refs: T;
} {
  const context = getCurrentComponent('DomRef');
  return {
    refs: domRefs(new Set(refKey), context.element),
  };
}
