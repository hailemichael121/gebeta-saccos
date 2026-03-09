import { clamp01 } from '@/src/utils/easing'

export type ScrollSubscriber = (progress: number) => void

export class ScrollController {
  private subscribers = new Set<ScrollSubscriber>()
  private rafId: number | null = null

  subscribe(listener: ScrollSubscriber): () => void {
    this.subscribers.add(listener)
    listener(this.getProgress())

    return () => {
      this.subscribers.delete(listener)
    }
  }

  start() {
    if (this.rafId !== null) return

    const tick = () => {
      const progress = this.getProgress()
      this.subscribers.forEach((subscriber) => subscriber(progress))
      this.rafId = window.requestAnimationFrame(tick)
    }

    this.rafId = window.requestAnimationFrame(tick)
  }

  stop() {
    if (this.rafId === null) return
    window.cancelAnimationFrame(this.rafId)
    this.rafId = null
  }

  private getProgress() {
    const root = document.documentElement
    const scrollHeight = root.scrollHeight - window.innerHeight
    if (scrollHeight <= 0) return 0

    return clamp01(window.scrollY / scrollHeight)
  }
}
