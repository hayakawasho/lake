import { noop } from '../util/function';
import { q } from '../util/selector';
import type { DOMNode, IComponent, Cleanup } from './types';

type LifecycleHandler = () => void;

class ComponentContext {
  private onUnmount: LifecycleHandler[] = [];
  parent: ComponentContext | null = null;
  id: string;

  constructor(create: Cleanup, public element: DOMNode) {
    const cleanup = create || noop;
    this.onUnmount.push(cleanup);

    this.id = element.id;
  }

  unmount = () => {
    this.onUnmount.forEach(fn => fn());
  };

  addChild(child: ComponentContext) {
    this.onUnmount.push(child.unmount);
    child.parent = this;
  }
}

export function createComponent(wrap: IComponent) {
  return (root: DOMNode, props: Record<string, any>) => {
    const newProps = { ...wrap.props, ...props };
    const created = wrap.setup(root, newProps);
    const context = new ComponentContext(created, root);

    if (wrap.components) {
      Object.entries(wrap.components).forEach(([selector, subComponent]) => {
        q(selector, root).forEach(i => {
          const child = createSubComponent(i, subComponent, context);
          context.addChild(child);
        });
      });
    }

    return context;
  };
}

function createSubComponent(el: DOMNode, child: IComponent, parent: ComponentContext) {
  const props = { ...child.props, parent };
  return createComponent(child)(el, props);
}

export type { ComponentContext };
