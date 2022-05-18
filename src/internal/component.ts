import type { DOMNode, FC, SubComponents, ComponentProps, Cleanup } from './types'

function noop() {}

class ComponentContext {
  parent: ComponentContext | null = null
  children: any

  constructor(private _cleanup: Cleanup, props: { children: any }) {
    this.children = props.children
  }

  unmount() {
    const cleanup = this._cleanup || noop
    cleanup()
  }
}

export const DOM_COMPONENT_INSTANCE_PROPERTY = new WeakMap<DOMNode, ComponentContext>()

function connectDOM2Component(node: DOMNode, component: ComponentContext) {
  DOM_COMPONENT_INSTANCE_PROPERTY.set(node, component)
}

export function createComponent(componentWrapper: FC) {
  const { components } = componentWrapper
  const children = createSubComponents(components ?? {})

  return (el: DOMNode, props: ComponentProps<any>) => {
    const cleanup = componentWrapper.setup(el, props)
    connectDOM2Component(el, new ComponentContext(cleanup, { children }))
  }
}

type ComponentType = ReturnType<typeof createComponent>

function createSubComponents(components: SubComponents) {
  return Object.entries(components).reduce<ComponentProps<ComponentType>>((acc, [key, value]) => {
    acc[key] = createComponent(value)
    return acc
  }, {})
}

export type { ComponentContext, ComponentType }
