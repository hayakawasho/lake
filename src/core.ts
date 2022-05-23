import { createComponent } from './internal/component'
import type { ComponentContext } from './internal/component'
import type { DOMNode, FC } from './internal/types'
import { assert } from './util/assert'
import { q } from './util/selector'

type ComponentType = ReturnType<typeof createComponent>

const REGISTERED_COMPONENTS_MAP = new Map<string, ComponentType>()

const DOM_COMPONENT_INSTANCE_PROPERTY = new WeakMap<DOMNode, ComponentContext>()

const bindDOMNodeToComponent = (
  el: DOMNode,
  component: ComponentContext,
  componentName: string
) => {
  assert(
    DOM_COMPONENT_INSTANCE_PROPERTY.has(el) === false,
    `The DOM of ${componentName} was already binding`
  )
  DOM_COMPONENT_INSTANCE_PROPERTY.set(el, component)
}

export const defineComponent = <Props>(options: FC<Props>) => options

export function register(name: string, componentWrapper: FC) {
  assert(REGISTERED_COMPONENTS_MAP.has(name) === false, `${name} was already registered`)
  REGISTERED_COMPONENTS_MAP.set(name, createComponent(componentWrapper))

  return REGISTERED_COMPONENTS_MAP
}

export function unregister(name: string) {
  assert(REGISTERED_COMPONENTS_MAP.has(name), `${name} does not registered`)
  REGISTERED_COMPONENTS_MAP.delete(name)

  return REGISTERED_COMPONENTS_MAP
}

export function mount(el: DOMNode, props: Record<string, any>, name: string) {
  assert(REGISTERED_COMPONENTS_MAP.has(name), `${name} was never registered`)
  const component = REGISTERED_COMPONENTS_MAP.get(name) as ComponentType

  bindDOMNodeToComponent(el, component(el, props), name)
}

export function unmount(selector: string, scope?: DOMNode) {
  q(selector, scope)
    .filter(el => DOM_COMPONENT_INSTANCE_PROPERTY.has(el))
    .forEach(el => (DOM_COMPONENT_INSTANCE_PROPERTY.get(el) as ComponentContext).unmount())
}
