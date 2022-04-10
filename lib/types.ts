export interface IComponent {
  setup(el: HTMLElement, props: any): void
  destroy(): void
}

export type RefValue = Set<string>

export type ReturnDOMRef<T> = {
  refs: T
}

export type Context$ = {
  useDOMRef: <T>(ref: RefValue) => ReturnDOMRef<T>
  rootRef: HTMLElement
}
