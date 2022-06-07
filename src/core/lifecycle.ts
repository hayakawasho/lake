import type { ComponentContext } from '../internal/component';
import { assert } from '../util/assert';

const enum LifecycleHooks {
  MOUNTED = 'onMounted',
  UNMOUNTED = 'onUnmounted',
}

let Owner: ComponentContext | null = null;

export const setOwner = (context: ComponentContext) => (Owner = context);

export const unsetOwner = () => (Owner = null);

const getOwner = (name: LifecycleHooks) => {
  assert(
    Owner,
    `the ${name} lifecycle called outside "setup()" will never be run.`
  );
  return Owner;
};

export const onMounted = (fn: () => void) =>
  getOwner(LifecycleHooks.MOUNTED).onMounted.push(fn);

export const onUnmounted = (fn: () => void) =>
  getOwner(LifecycleHooks.UNMOUNTED).onUnmounted.push(fn);
