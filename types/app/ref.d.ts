declare class Ref<T> {
  #private;
  constructor(value: T);
  set value(newVal: T);
  get value(): T;
}
declare const ref: <T = unknown>(val: T) => Ref<T>;
declare class ReadonlyRef<T> {
  #private;
  constructor(value: Ref<T>);
  get value(): T;
}
declare const readonly: <T = unknown>(ref: Ref<T>) => ReadonlyRef<T>;
export { ref, readonly };
export type { Ref, ReadonlyRef };
//# sourceMappingURL=ref.d.ts.map
