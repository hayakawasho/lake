import type { DOMNode, FC, Cleanup } from './types'
import { q } from '../util/selector'
import { noop } from '../util/function'

type LifecycleHandler = () => void

class ComponentContext {
  onUnmount: LifecycleHandler[] = []

  constructor(cleanupOrVoid: Cleanup) {
    const cleanup = cleanupOrVoid || noop
    this.onUnmount.push(cleanup)
  }

  unmount = () => {
    this.onUnmount.forEach(fn => fn())
  }

  addChild(child: ComponentContext) {
    this.onUnmount.push(child.unmount)
  }
}

export function createComponent({ setup, components }: FC) {
  return (el: DOMNode, props: Record<string, any>) => {
    const mounted = setup(el, props)
    const context = new ComponentContext(mounted)

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
