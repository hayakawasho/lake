import { assert } from '../../util/assert';
import { allRun } from '../../util/function';
import { LifecycleHooks } from '../lifecycle';
import type { LifecycleHandler } from '../lifecycle';
import type { RefElement, IComponent, RefObject } from '../types';

let owner: ComponentContext;

const setCurrentComponent = (ctx: ComponentContext) => (owner = ctx);

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
    allRun([
      ...this[LifecycleHooks.MOUNTED],
      ...this.#children.flatMap(child => child.mount),
    ]);
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
  };

  removeChild = (child: ComponentContext) => {
    const index = this.#children.findIndex(ctx => ctx === child);

    if (index === -1) {
      return;
    }

    this.#children.splice(index, 1);
    child.parent = null;
  };
}

export const createComponent = (wrap: IComponent) => {
  const parent = owner;

  return (root: RefElement, props: Record<string, any>) => {
    const ctx = setCurrentComponent(new ComponentContext(root));
    const provides = wrap.setup(root, {
      ...wrap.props,
      ...props,
    });
    ctx.current = provides || {};

    setCurrentComponent(parent);

    return ctx;
  };
};

export type { ComponentContext };
