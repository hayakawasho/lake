import type { DOMNode, FC, Cleanup } from './types'
import { q } from '../util/selector'

function noop() {}

class ComponentContext {
  parent: ComponentContext | null = null
  children: ComponentContext[] = []

  #cleanup: () => void

  constructor(cleanup: Cleanup) {
    this.#cleanup = cleanup || noop
  }

  unmount() {
    this.#cleanup()
    this.children.forEach(c => c.unmount())
  }

  addChild(child: ComponentContext) {
    this.children.push(child)
    child.parent = this
  }
}

export function createComponent({ setup, components }: FC) {
  return (el: DOMNode, props: Record<string, any>) => {
    const context = new ComponentContext(setup(el, props))

    if (components) {
      Object.entries(components).forEach(([selector, child]) => {
        q(selector).forEach(i => {
          const childComponentProps = child.props || {}
          const c = createComponent(child)(i, childComponentProps)

          context.addChild(c)
        })
      })
    }

    return context
  }
}

export type { ComponentContext }
