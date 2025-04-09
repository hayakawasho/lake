import { getCurrentComponent } from "../core/internal/component";
import type { RefElement } from "../core/types";

export function useRootRef<T extends RefElement = RefElement>() {
  const context = getCurrentComponent("useRootRef");

  return context.element as T;
}
