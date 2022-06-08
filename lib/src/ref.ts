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

export const ref = <T = any>(val: T) => new Ref(val);

export type { Ref };
