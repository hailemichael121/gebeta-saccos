export function goToScene(index: number): void {
  if (typeof window === "undefined") return
  window.scrollTo({ top: window.innerHeight * index, behavior: "smooth" })
}
