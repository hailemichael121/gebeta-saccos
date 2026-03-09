type Target = Record<string, number>

class SimpleTimeline {
  private target: Target | null = null
  private values: Target = {}

  to(target: Target, options: Target) {
    this.target = target
    this.values = Object.fromEntries(Object.entries(options).filter(([key]) => key !== 'duration'))
    return this
  }

  progress(value: number) {
    if (!this.target) return this
    Object.entries(this.values).forEach(([key, targetValue]) => {
      this.target![key] = targetValue * value
    })
    return this
  }
}

const gsap = {
  timeline: () => new SimpleTimeline(),
}

export default gsap
