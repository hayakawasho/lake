import type { ComponentContext } from '../internal/component';
import { assert } from '../util/assert';

let Owner: ComponentContext | null = null;

export const setOwner = (context: ComponentContext) => (Owner = context);
export const unsetOwner = () => (Owner = null);

const getOwner = (hookname: string) => {
  assert(Owner, `the ${hookname} lifecycle hook can only be used during execution of setup()`);
  return Owner;
};

export const onMounted = (fn: () => void) => getOwner('onMounted').onMounted.push(fn);
export const onUnmounted = (fn: () => void) => getOwner('onUnmounted').onUnmounted.push(fn);
