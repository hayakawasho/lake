class Ref<T> {
  #rawValue: T;

  constructor(value: T) {
    this.#rawValue = value;
  }

  set value(newVal: T) {
    this.#rawValue = newVal;
  }

  get value() {
    return this.#rawValue;
  }
}

const ref = <T = unknown>(val: T) => new Ref(val);

class ReadonlyRef<T> {
  #ref: Ref<T>;

  constructor(value: Ref<T>) {
    this.#ref = value;
  }

  get value() {
    return this.#ref.value;
  }
}

const readonly = <T = unknown>(ref: Ref<T>) => new ReadonlyRef(ref);

export { ref, readonly };
export type { Ref, ReadonlyRef };
