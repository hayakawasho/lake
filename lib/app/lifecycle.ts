import { getOwner } from './internal/component';

export type LifecycleHandler = () => void;

export const enum LifecycleHooks {
  MOUNTED = 'onMounted',
  UNMOUNTED = 'onUnmounted',
}

const createHook = (lifecycleType: LifecycleHooks) => {
  return (hook: LifecycleHandler) => {
    const context = getOwner(lifecycleType);
    context[lifecycleType].push(hook);
  };
};

export const onMounted = createHook(LifecycleHooks.MOUNTED);

export const onUnmounted = createHook(LifecycleHooks.UNMOUNTED);
