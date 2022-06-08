declare class Ref<T> {
  #private;
  constructor(value: T);
  set value(newVal: T);
  get value(): T;
}
export declare const ref: <T = any>(val: T) => Ref<T>;
export type { Ref };
//# sourceMappingURL=ref.d.ts.map
