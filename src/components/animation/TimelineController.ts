import gsap from 'gsap'

interface AnimationState {
  fogIntensity: number
  vaultDoorRotation: number
  moneyFlowIntensity: number
  featureEnergy: number
}

export class TimelineController {
  private state: AnimationState = {
    fogIntensity: 0.2,
    vaultDoorRotation: 0,
    moneyFlowIntensity: 0,
    featureEnergy: 0,
  }

  private timelines: gsap.core.Timeline[]

  constructor() {
    this.timelines = [
      gsap.timeline({ paused: true }).to(this.state, { fogIntensity: 0.85, duration: 1, ease: 'none' }),
      gsap.timeline({ paused: true }).to(this.state, { vaultDoorRotation: Math.PI / 2.5, duration: 1, ease: 'none' }),
      gsap.timeline({ paused: true }).to(this.state, { moneyFlowIntensity: 1, duration: 1, ease: 'none' }),
      gsap.timeline({ paused: true }).to(this.state, { featureEnergy: 1, duration: 1, ease: 'none' }),
      gsap.timeline({ paused: true }).to(this.state, { featureEnergy: 0.7, duration: 1, ease: 'none' }),
      gsap.timeline({ paused: true }).to(this.state, { fogIntensity: 0.3, duration: 1, ease: 'none' }),
    ]
  }

  sync(globalProgress: number) {
    const sceneCount = this.timelines.length
    const sceneSize = 1 / sceneCount

    this.timelines.forEach((timeline, index) => {
      const start = index * sceneSize
      const end = start + sceneSize
      const localProgress = globalProgress <= start ? 0 : globalProgress >= end ? 1 : (globalProgress - start) / sceneSize
      timeline.progress(localProgress)
    })

    return this.state
  }
}
