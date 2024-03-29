class Ref<T> {
  #rawValue: T;

  constructor(value: T) {
    this.#rawValue = value;
  }

  get value() {
    return this.#rawValue;
  }

  set value(newVal: T) {
    this.#rawValue = newVal;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ref = <T = any>(val: T) => new Ref(val);

class ReadonlyRef<T> {
  #ref: Ref<T>;

  constructor(value: Ref<T>) {
    this.#ref = value;
  }

  get value() {
    return this.#ref.value;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const readonly = <T = any>(ref: Ref<T>) => new ReadonlyRef(ref);

export { ref, readonly };
export type { Ref, ReadonlyRef };
