import { assert } from './assert'
import type { IComponent, DOMNode } from './types'

const COMPONENTS_IMPLEMENTATION_MAP = new Map<string, IComponent>()
const DOM_COMPONENT_INSTANCE_PROPERTY = new WeakMap<DOMNode, IComponent>()

function bindDOMNodeToComponentObject(node: DOMNode, component: IComponent) {
  DOM_COMPONENT_INSTANCE_PROPERTY.set(node, component)
}

function defineComponent(options: IComponent) {
  return options
}

function registerComponent(name: string, component: IComponent) {
  assert(!COMPONENTS_IMPLEMENTATION_MAP.has(name), `${name} was already registered`)
  COMPONENTS_IMPLEMENTATION_MAP.set(name, component)
}

function mountComponent(node: DOMNode, props: object, componentName: string) {
  if (COMPONENTS_IMPLEMENTATION_MAP.has(componentName) === false) {
    return
  }

  const component = COMPONENTS_IMPLEMENTATION_MAP.get(componentName) as IComponent
  bindDOMNodeToComponentObject(node, component)

  component.setup(node, props)
}

function unmount(nodes: DOMNode[]) {
  return nodes
    .filter(el => DOM_COMPONENT_INSTANCE_PROPERTY.has(el))
    .forEach(el => (DOM_COMPONENT_INSTANCE_PROPERTY.get(el) as IComponent).cleanup())
}

export { defineComponent, registerComponent, mountComponent, unmount }
