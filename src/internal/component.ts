import { noop } from '../util/function'
import { q } from '../util/selector'
import type { DOMNode, FC, Cleanup } from './types'

type LifecycleHandler = () => void

class ComponentContext {
  onUnmount: LifecycleHandler[] = []

  constructor(create: Cleanup) {
    const cleanup = create || noop
    this.onUnmount.push(cleanup)
  }

  unmount = () => {
    this.onUnmount.forEach(fn => fn())
  }

  addChild(child: ComponentContext) {
    this.onUnmount.push(child.unmount)
  }
}

export function createComponent(componentWrapper: FC) {
  return (el: DOMNode, props: Record<string, any>) => {
    const mergedProps = Object.assign(componentWrapper.props, props)
    const mounted = componentWrapper.setup(el, mergedProps)
    const context = new ComponentContext(mounted)

    if (componentWrapper.components) {
      Object.entries(componentWrapper.components).forEach(([selector, child]) => {
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
