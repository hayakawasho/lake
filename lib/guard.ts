export function guard(condition: unknown): asserts condition {
  if (condition) {
    return
  }
}
