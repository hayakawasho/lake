import { assert } from '../../util/assert';
import { allRun } from '../../util/function';
import { LifecycleHooks } from '../lifecycle';
import type { LifecycleHandler } from '../lifecycle';
import type { RefElement, IComponent, RefObject } from '../types';

let owner: ComponentContext;

const setCurrentComponent = (context: ComponentContext) => (owner = context);

export const getCurrentComponent = (hookName: string) => {
  assert(owner, `"${hookName}" called outside setup() will never be run.`);
  return owner;
};

let uid = 0;

class ComponentContext {
  private [LifecycleHooks.MOUNTED]: LifecycleHandler[] = [];
  private [LifecycleHooks.UNMOUNTED]: LifecycleHandler[] = [];

  parent: ComponentContext | null = null;
  #children: ComponentContext[] = [];

  readonly uid: string | number;
  current: RefObject = {};

  constructor(public element: RefElement) {
    this.uid = uid++;
  }

  mount = () => {
    allRun(this[LifecycleHooks.MOUNTED]);
  };

  unmount = () => {
    allRun([
      ...this[LifecycleHooks.UNMOUNTED],
      ...this.#children.flatMap(child => child.unmount),
    ]);
  };

  addChild = (child: ComponentContext) => {
    this.#children.push(child);
    child.parent = this;

    child.mount();
  };

  removeChild = (child: ComponentContext) => {
    const index = this.#children.indexOf(child);

    if (index === -1) {
      return;
    }

    this.#children.splice(index, 1);
    child.parent = null;

    child.unmount();
  };
}

export const createComponent = (wrap: IComponent) => {
  const parent = owner;

  return (root: RefElement, props: Record<string, any>) => {
    const component = new ComponentContext(root);
    const context = setCurrentComponent(component);

    const provides = wrap.setup(root, {
      ...wrap.props,
      ...props,
    });

    context.current = provides || {};

    setCurrentComponent(parent);

    return context;
  };
};

export type { ComponentContext };
