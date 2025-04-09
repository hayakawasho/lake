import { getCurrentComponent } from "./internal/component";

export type LifecycleHandler = () => void | (() => void);

export enum LifecycleHooks {
  MOUNTED = "Mounted",
  UNMOUNTED = "Unmounted",
}

function createHook(lifecycleType: LifecycleHooks) {
  return (hook: LifecycleHandler) => {
    const context = getCurrentComponent(lifecycleType);
    context[lifecycleType].push(hook);
  };
}

export const useMount = createHook(LifecycleHooks.MOUNTED);
export const useUnmount = createHook(LifecycleHooks.UNMOUNTED);
