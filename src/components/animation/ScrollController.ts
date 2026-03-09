import { clamp01 } from "@/src/utils/easing"

export type ScrollListener = (progress: number) => void

export class ScrollController {
  private listeners = new Set<ScrollListener>()

  start() {
    window.addEventListener("scroll", this.handleScroll, { passive: true })
    window.addEventListener("resize", this.handleScroll)
    this.handleScroll()
  }

  stop() {
    window.removeEventListener("scroll", this.handleScroll)
    window.removeEventListener("resize", this.handleScroll)
  }

  subscribe(listener: ScrollListener) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private handleScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress = maxScroll > 0 ? clamp01(window.scrollY / maxScroll) : 0

    this.listeners.forEach((listener) => listener(progress))
  }
}
