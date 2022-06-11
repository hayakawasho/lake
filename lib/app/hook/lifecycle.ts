import { getOwner, LifecycleHooks } from '../internal/component';
import type { LifecycleHandler } from '../internal/component';

const createHook = (lifecycleType: LifecycleHooks) => {
  return (hook: LifecycleHandler) => {
    const context = getOwner(lifecycleType);
    context[lifecycleType].push(hook);
  };
};

export const onMounted = createHook(LifecycleHooks.MOUNTED);

export const onUnmounted = createHook(LifecycleHooks.UNMOUNTED);
