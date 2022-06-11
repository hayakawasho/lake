import { getOwner, LifecycleHooks } from '../internal/component';
import type { LifecycleHandler } from '../internal/component';

function createLifecycleHook(lifecycleType: LifecycleHooks) {
  return (hookHandler: LifecycleHandler) => {
    const context = getOwner(lifecycleType);
    context[lifecycleType].push(hookHandler);
  };
}

export const onMounted = createLifecycleHook(LifecycleHooks.MOUNTED);

export const onUnmounted = createLifecycleHook(LifecycleHooks.MOUNTED);
