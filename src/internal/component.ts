import type { DOMNode, FC, Cleanup } from './types'
import { q } from '../util/selector'

function noop() {}

class ComponentContext {
  parent: ComponentContext | null = null
  #children: ComponentContext[] = []

  #cleanup: () => void

  constructor(cleanup: Cleanup) {
    this.#cleanup = cleanup || noop
  }

  unmount() {
    this.#children.forEach(child => child.unmount())
    this.#cleanup()
  }

  addChild(child: ComponentContext) {
    this.#children.push(child)
    child.parent = this
  }
}

export function createComponent(componentWrapper: FC) {
  const { setup: setupComponent, components } = componentWrapper

  return (el: DOMNode, props: Record<string, any>) => {
    const context = new ComponentContext(setupComponent(el, props))

    if (components) {
      const children = createSubComponents(components)
      children.forEach(child => context.addChild(child))
    }

    return context
  }
}

function createSubComponents(components: Record<string, FC>) {
  return Object.entries(components).reduce<ComponentContext[]>((acc, [selector, value]) => {
    q(selector).forEach(el => acc.push(createComponent(value)(el, {})))
    return acc
  }, [])
}

export type { ComponentContext }
