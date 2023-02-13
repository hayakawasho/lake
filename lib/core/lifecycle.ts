import { getCurrentComponent } from './internal/component';

export type LifecycleHandler = () => void;

export const enum LifecycleHooks {
  MOUNTED = 'Mounted',
  UNMOUNTED = 'Unmounted',
}

const createHook = (lifecycleType: LifecycleHooks) => {
  return (hook: LifecycleHandler) => {
    const ctx = getCurrentComponent(lifecycleType);
    ctx[lifecycleType].push(hook);
  };
};

export const useMount = createHook(LifecycleHooks.MOUNTED);
export const useUnmount = createHook(LifecycleHooks.UNMOUNTED);
