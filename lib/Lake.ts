import { assert } from './assert'
import { guard } from './guard'
import type { IComponent } from './types'
import { parseValue } from './html'
import { q } from './selector'

class Lake {
  definitions = new Map<{}, { fn: IComponent, deps: string[]}>()

  static create() {
    return new Lake()
  }

  define = (name: string, fn: IComponent, deps = [] as string[]) => {
    guard(this.definitions.has(name))
    this.definitions.set(name, { fn, deps })
  }

  resolve = (name: string) => {
    const context = this.definitions.get(name)
    assert(context, `${name} does not exist`)
    return context.fn
  }

  onSetup = () => {
    q(`[data-component]`).forEach(el => {
      const { component, props } = el.dataset
      guard(component)
      const context = this.resolve(component)
      context.setup(el, parseValue(props))
    })
  }

  onCleanup = (scope: HTMLElement) => {
    q(`[data-component]`).forEach(el => {
      const { component } = el.dataset
      guard(component)
      const context = this.resolve(component)
      context.destroy()
    })
  }
}

const {
  definitions: lake,
  define: defineComponent,
  resolve: resolveComponent,
  onSetup,
  onCleanup
} = Lake.create()

export { lake, defineComponent, resolveComponent, onSetup, onCleanup }
