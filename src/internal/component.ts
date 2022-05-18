import type { DOMNode, FC, SubComponents, Props } from './types'

function noop() {}

class ComponentContext {
  parent: ComponentContext | null = null
  children: any

  constructor(private _cleanup: unknown, props: { children: any }) {
    this.children = props.children
  }

  unmount() {
    const cleanup = (this._cleanup as Function) || noop
    cleanup()
  }
}

export const DOM_COMPONENT_INSTANCE_PROPERTY = new WeakMap<
  DOMNode,
  ComponentContext
>()

function connectDOM2Component(node: DOMNode, component: ComponentContext) {
  DOM_COMPONENT_INSTANCE_PROPERTY.set(node, component)
}

export function createComponent(componentWrapper: FC) {
  const { components } = componentWrapper
  const children = createSubComponents(components ?? {})

  return (el: DOMNode, props: Props<any>) => {
    const cleanup = componentWrapper.setup(el, props)
    connectDOM2Component(el, new ComponentContext(cleanup, { children }))
  }
}

type ComponentType = ReturnType<typeof createComponent>

function createSubComponents(components: SubComponents) {
  return Object.entries(components).reduce<Props<ComponentType>>(
    (acc, [key, value]) => {
      acc[key] = createComponent(value)
      return acc
    },
    {}
  )
}

export type { ComponentContext, ComponentType }
