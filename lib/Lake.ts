import { assert } from './assert'
import type { IComponent } from './types'
import { q } from './selector'

class Lake {
  definitions = new Map<{}, { fn: IComponent }>()

  static create() {
    return new Lake()
  }

  define = (name: string, fn: IComponent) => {
    if (this.definitions.has(name)) {
      return
    }

    this.definitions.set(name, { fn })
  }

  resolve = (name: string) => {
    const context = this.definitions.get(name)
    assert(context, `${name} does not exist`)
    return context.fn
  }

  onSetup = () => {
    q(`[data-component]`).forEach(el => {
      const { component } = el.dataset
      assert(component, `${component} does not exist`)
      const context = this.resolve(component)
      context.setup(el, el.dataset.props)
    })
  }

  onCleanup = () => {
    q(`[data-component]`).forEach(el => {
      const { component } = el.dataset
      assert(component, `${component} does not exist`)
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
  onCleanup,
} = Lake.create()

export { lake, defineComponent, resolveComponent, onSetup, onCleanup }
