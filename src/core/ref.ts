class Ref<T> {
  private _rawValue: {
    value: T;
  };

  constructor(value: T) {
    this._rawValue = { value };
  }

  wrap(newVal: T) {
    this._rawValue = { value: newVal };
  }

  unwrap() {
    return this._rawValue.value;
  }
}

export const ref = <T = any>(value: T) => new Ref(value);

export type { Ref };
