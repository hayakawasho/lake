export const q = <T extends HTMLElement>(
  query: string,
  context = document.body
) => {
  const nodes: T[] = Array.from(context.querySelectorAll(query))
  return nodes
}
