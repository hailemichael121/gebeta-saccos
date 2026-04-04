export const scrollToScene = (sceneId: string) => {
  const element = document.getElementById(sceneId)
  if (!element) return

  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
