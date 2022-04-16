import { assert } from './assert'
import type { IComponent } from './types'

const COMPONENTS_IMPLEMENTATION_MAP = new Map<string, IComponent>()

const DOM_COMPONENT_INSTANCE_PROPERTY = new WeakMap<HTMLElement, IComponent>()

function bindDOMNodeToComponentObject(
  node: HTMLElement,
  Component: IComponent
) {
  DOM_COMPONENT_INSTANCE_PROPERTY.set(node, Component)
}

function defineComponent({ setup, cleanup }: IComponent) {
  return {
    setup,
    cleanup,
  }
}

function mountComponent<T extends HTMLElement>(
  el: T,
  props: object,
  componentName: string
) {
  if (!COMPONENTS_IMPLEMENTATION_MAP.has(componentName)) {
    return
  }

  const context = COMPONENTS_IMPLEMENTATION_MAP.get(componentName) as IComponent

  bindDOMNodeToComponentObject(el, context)

  context.setup(el, props)

  return context
}

function unmount(targets: HTMLElement[]) {
  return targets.map(el => {
    if (!DOM_COMPONENT_INSTANCE_PROPERTY.has(el)) {
      return
    }

    DOM_COMPONENT_INSTANCE_PROPERTY.get(el)!.cleanup()

    return el
  })
}

function register(name: string, Component: IComponent) {
  assert(
    !COMPONENTS_IMPLEMENTATION_MAP.has(name),
    `${name} was already registered`
  )
  COMPONENTS_IMPLEMENTATION_MAP.set(name, Component)
}

export { defineComponent, mountComponent, unmount, register }
