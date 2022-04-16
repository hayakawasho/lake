export const q = <T extends HTMLElement>(
  query: string,
  context: HTMLElement | Document = document
) => {
  const nodes: T[] = Array.from(context.querySelectorAll(query))
  return nodes
}
