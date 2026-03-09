export const scrollToScene = (sceneIndex: number): void => {
  const node = document.querySelector<HTMLElement>(`[data-scene-index=\"${sceneIndex}\"]`)
  if (!node) return

  node.scrollIntoView({ behavior: "smooth", block: "start" })
}
