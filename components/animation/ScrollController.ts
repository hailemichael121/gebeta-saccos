export type ScrollListener = (progress: number, scrollY: number) => void

class ScrollController {
  private progress = 0
  private listeners = new Set<ScrollListener>()
  private isAttached = false

  private handleScroll = () => {
    const scrollTop = window.scrollY
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1)
    this.progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1)
    this.listeners.forEach((cb) => cb(this.progress, scrollTop))
  }

  start() {
    if (this.isAttached || typeof window === "undefined") return
    window.addEventListener("scroll", this.handleScroll, { passive: true })
    this.isAttached = true
    this.handleScroll()
  }

  stop() {
    if (!this.isAttached || typeof window === "undefined") return
    window.removeEventListener("scroll", this.handleScroll)
    this.isAttached = false
  }

  subscribe(cb: ScrollListener) {
    this.listeners.add(cb)
    cb(this.progress, typeof window === "undefined" ? 0 : window.scrollY)
    return () => this.listeners.delete(cb)
  }

  getProgress() {
    return this.progress
  }
}

export const scrollController = new ScrollController()
