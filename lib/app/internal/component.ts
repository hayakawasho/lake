import { LifecycleHooks } from '../lifecycle';
import type { LifecycleHandler } from '../lifecycle';
import type { RefElement, IComponent } from '../types';
import { assert } from '../util/assert';
import { allRun } from '../util/function';
import { q } from '../util/selector';

let Owner: ComponentContext | null = null;

const setOwner = (context: ComponentContext) => (Owner = context);
const unsetOwner = () => (Owner = null);

export const getOwner = (hookName: string) => {
  assert(Owner, `"${hookName}" called outside setup() will never be run.`);
  return Owner;
};

let uid = 0;

class ComponentContext {
  [LifecycleHooks.MOUNTED]: LifecycleHandler[] = [];
  [LifecycleHooks.UNMOUNTED]: LifecycleHandler[] = [];

  readonly uid: string | number;
  parent: ComponentContext | null = null;
  children: ComponentContext[] = [];

  constructor(public element: RefElement) {
    this.uid = element.id || uid++;
  }

  mount = () => {
    allRun([
      ...this[LifecycleHooks.MOUNTED],
      ...this.children.flatMap(child => child.mount),
    ]);
  };

  unmount = () => {
    allRun([
      ...this[LifecycleHooks.UNMOUNTED],
      ...this.children.flatMap(child => child.unmount),
    ]);
  };

  addChild(child: ComponentContext) {
    this.children.push(child);
    child.parent = this;
  }

  removeChild(child: ComponentContext) {
    const index = this.children.indexOf(child);

    if (index === -1) {
      return;
    }

    this.children.splice(index, 1);
    child.parent = null;
  }
}

export function createComponent(wrap: IComponent) {
  return (root: RefElement, props: Record<string, any>) => {
    const context = new ComponentContext(root);

    setOwner(context);

    const created = wrap.setup(root, {
      ...wrap.props,
      ...props,
    });

    const provides = created || {};

    if (wrap.components) {
      Object.entries(wrap.components).forEach(([selector, sub]) => {
        q(selector, root).forEach(el => {
          const child = createSubComponent(el, sub, provides);
          context.addChild(child);
        });
      });
    }

    unsetOwner();

    return context;
  };
}

function createSubComponent(
  el: RefElement,
  child: IComponent,
  parentProvides: Readonly<Record<string, unknown>>
) {
  const props = {
    ...child.props,
    ...parentProvides,
  };

  return createComponent(child)(el, props);
}

export type { ComponentContext };
