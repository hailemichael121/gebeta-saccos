export const scrollToScene = (sceneId: string): void => {
  const target = document.getElementById(sceneId)
  if (!target) return

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
