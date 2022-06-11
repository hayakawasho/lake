import type { RefElement, IComponent } from '../types';
import { assert } from '../util/assert';
import { q } from '../util/selector';

let Owner: ComponentContext | null = null;

const setOwner = (context: ComponentContext) => (Owner = context);

const unsetOwner = () => (Owner = null);

export const getOwner = (hookName: string) => {
  assert(Owner, `"${hookName}" called outside setup() will never be run.`);
  return Owner;
};

export const enum LifecycleHooks {
  MOUNTED = 'onMounted',
  UNMOUNTED = 'onUnmounted',
}

export type LifecycleHandler = () => void;

class ComponentContext {
  [LifecycleHooks.MOUNTED]: LifecycleHandler[] = [];
  [LifecycleHooks.UNMOUNTED]: LifecycleHandler[] = [];

  parent: ComponentContext | null = null;
  readonly uid: string;
  readonly provides: Readonly<Record<string, unknown>>;

  constructor(
    create: IComponent['setup'],
    public element: RefElement,
    props: Record<string, any>
  ) {
    setOwner(this);
    const created = create(element, props);
    unsetOwner();

    this.provides = created || {};
    this.uid = element.id;
  }

  mount() {
    this.onMounted.forEach(fn => fn());
  }

  unmount() {
    this.onUnmounted.forEach(fn => fn());
  }

  addChild(child: ComponentContext) {
    this.onMounted.push(...child.onMounted);
    this.onUnmounted.push(...child.onUnmounted);

    child.parent = this;
  }
}

export function createComponent(wrap: IComponent) {
  return (root: RefElement, props: Record<string, any>) => {
    const newProps = {
      ...wrap.props,
      ...props,
    };
    const context = new ComponentContext(wrap.setup, root, newProps);

    if (wrap.components) {
      Object.entries(wrap.components).forEach(([selector, sub]) => {
        q(selector, root).forEach(el => {
          const child = createSubComponent(el, sub, context);
          context.addChild(child);
        });
      });
    }

    return context;
  };
}

function createSubComponent(
  el: RefElement,
  child: IComponent,
  parent: ComponentContext
) {
  const props = {
    ...child.props,
    ...parent.provides,
  };
  return createComponent(child)(el, props);
}

export type { ComponentContext };
