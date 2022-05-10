import { isFunc } from '../util/is'
import type { DOMNode, FC, SubComponents } from './types'

class ComponentContext {
  parent: ComponentContext | null = null
  children: any

  constructor(private _cleanup: unknown, props: { children: any }) {
    this.children = props.children
  }

  unmount() {
    if (!isFunc(this._cleanup)) {
      return
    }
    this._cleanup()
  }
}

export const DOM_COMPONENT_INSTANCE_PROPERTY = new WeakMap<
  DOMNode,
  ComponentContext
>()

function connectDOM2Component(node: DOMNode, component: ComponentContext) {
  DOM_COMPONENT_INSTANCE_PROPERTY.set(node, component)

  console.log(DOM_COMPONENT_INSTANCE_PROPERTY)
}

export function createComponent(componentWrapper: FC) {
  const { components } = componentWrapper
  const children = createSubComponents(components ?? {})

  return ({ el, ...props }: { el: DOMNode }) => {
    const cleanup = componentWrapper.setup(el, props)
    connectDOM2Component(el, new ComponentContext(cleanup, { children }))
  }
}

type ComponentType = ReturnType<typeof createComponent>

function createSubComponents(components: SubComponents) {
  return Object.entries(components).reduce<Record<string, ComponentType>>(
    (acc, [key, value]) => {
      acc[key] = createComponent(value)
      return acc
    },
    {}
  )
}

export type { ComponentContext, ComponentType }
