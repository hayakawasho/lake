import { isFunction } from '../main'
import type { DOMNode, FC } from './types'

export const DOM_COMPONENT_INSTANCE_PROPERTY = new WeakMap<DOMNode, any>()

function bindDOMNode2Component(node: DOMNode, component: unknown) {
  DOM_COMPONENT_INSTANCE_PROPERTY.set(node, component)
}

function createSubComponents(components: { [key: string]: FC } = {}) {
  return Object.entries(components).reduce<any>((acc, [key, value]) => {
    acc[key] = createComponent(value)
    return acc
  }, {})
}

class Component {
  constructor(private _cleanup: unknown) {}

  unmount() {
    return isFunction(this._cleanup) && this._cleanup()
  }
}

export function createComponent(componentWrapper: FC) {
  const { components } = componentWrapper
  components && createSubComponents(components)

  return ({ el, ...props }: { el: DOMNode }) => {
    const cleanup = componentWrapper.setup(el, props)
    bindDOMNode2Component(el, new Component(cleanup))
  }
}
