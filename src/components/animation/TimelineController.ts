import gsap from 'gsap'

export class TimelineController {
  private timeline: gsap.core.Timeline

  constructor() {
    this.timeline = gsap.timeline({ paused: true })
  }

  getTimeline() {
    return this.timeline
  }

  setProgress(progress: number) {
    this.timeline.progress(progress)
  }

  kill() {
    this.timeline.kill()
  }
}
