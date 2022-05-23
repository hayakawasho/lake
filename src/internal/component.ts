import type { DOMNode, FC, Cleanup } from './types'
import { q } from '../util/selector'
import { noop } from './utils'

type LifecycleHandler = () => void

class ComponentContext {
  onUnmount: LifecycleHandler[] = []

  constructor(cleanup: Cleanup) {
    const unsubscribe = cleanup || noop
    this.onUnmount.push(unsubscribe)
  }

  unmount = () => {
    this.onUnmount.forEach(fn => fn())
  }

  addChild = (child: ComponentContext) => {
    this.onUnmount.push(child.unmount)
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
