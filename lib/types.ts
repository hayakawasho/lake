export type Config = {
  context: string | Symbol,
  dataComponent: string,
  dataRef: string,
  dataProps: string
}

export interface IComponent {
  setup(
    el: HTMLElement,
    props: {
      [key: string]: any
    }
  ): void
  destroy(): void
}

export interface IScene extends IComponent {
  enter(scope?: HTMLElement): Promise<unknown>
  leave(): Promise<unknown> | void
}

export type RefValue = Set<string>

export type ReturnDOMRef<T> = {
  refs: T
}

export type Context$ = {
  useDOMRef: <T>(ref: RefValue) => ReturnDOMRef<T>
  rootRef: HTMLElement
}
