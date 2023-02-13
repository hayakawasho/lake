import { $$ } from '../../util/selector';
import type { RefElement } from '../types';

export function domRefs(ref: Set<string>, scope: RefElement) {
  const findRef = (q: string) => {
    const nodes = $$(`[data-ref="${q}"]`, scope);
    return reducer(nodes, q);
  };

  const reducer = (nodes: RefElement[], q: string) => {
    switch (nodes.length) {
      case 0:
        console.error(`[data-ref="${q}"] does not exist.`);
        return null;
      case 1:
        return nodes[0];
      default:
        return nodes;
    }
  };

  const childRef = [...ref].reduce<any>((acc, cur) => {
    acc[cur] = findRef(cur);
    return acc;
  }, {});

  return childRef;
}
