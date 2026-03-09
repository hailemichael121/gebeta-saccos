import { clamp01 } from "@/lib/utils/easing"

type ScrollListener = (progress: number) => void

class ScrollController {
  private progress = 0
  private listeners = new Set<ScrollListener>()
  private initialized = false

  private handleScroll = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight
    this.progress = height <= 0 ? 0 : clamp01(window.scrollY / height)
    this.listeners.forEach((listener) => listener(this.progress))
  }

  init() {
    if (this.initialized || typeof window === "undefined") {
      return
    }

    this.initialized = true
    window.addEventListener("scroll", this.handleScroll, { passive: true })
    window.addEventListener("resize", this.handleScroll)
    this.handleScroll()
  }

  destroy() {
    if (!this.initialized || typeof window === "undefined") {
      return
    }

    window.removeEventListener("scroll", this.handleScroll)
    window.removeEventListener("resize", this.handleScroll)
    this.initialized = false
    this.listeners.clear()
  }

  subscribe(listener: ScrollListener): () => void {
    this.listeners.add(listener)
    listener(this.progress)

    return () => {
      this.listeners.delete(listener)
    }
  }

  getProgress() {
    return this.progress
  }
}

export const scrollController = new ScrollController()
