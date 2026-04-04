export type ScrollListener = (progress: number) => void

export class ScrollController {
  private progress = 0
  private listeners = new Set<ScrollListener>()

  subscribe(listener: ScrollListener) {
    this.listeners.add(listener)
    listener(this.progress)
    return () => this.listeners.delete(listener)
  }

  setProgress(progress: number) {
    this.progress = Math.min(1, Math.max(0, progress))
    this.listeners.forEach((listener) => listener(this.progress))
  }

  getProgress() {
    return this.progress
  }
}
