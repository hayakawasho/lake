import { noop } from '../util/function'
import { q } from '../util/selector'
import type { DOMNode, IComponent, Cleanup } from './types'

type LifecycleHandler = () => void

class ComponentContext {
  private onUnmount: LifecycleHandler[] = []

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

export function createComponent(wrap: IComponent) {
  return (el: DOMNode, props: Record<string, any>) => {
    const mergedProps = Object.assign(wrap.props, props)
    const created = wrap.setup(el, mergedProps)
    const ctx = new ComponentContext(created)

    if (wrap.components) {
      Object.entries(wrap.components).forEach(([selector, subComponent]) => {
        q(selector).forEach(i => {
          const subComponentProps = subComponent.props || {}
          const child = createComponent(subComponent)(i, subComponentProps)

          ctx.addChild(child)
        })
      })
    }

    return ctx
  }
}

export type { ComponentContext }
