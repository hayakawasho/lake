export declare type LifecycleHandler = () => void;
export declare const enum LifecycleHooks {
  MOUNTED = 'onMounted',
  UNMOUNTED = 'onUnmounted',
}
export declare const onMounted: (hook: LifecycleHandler) => void;
export declare const onUnmounted: (hook: LifecycleHandler) => void;
//# sourceMappingURL=lifecycle.d.ts.map
