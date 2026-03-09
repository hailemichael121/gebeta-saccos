import { clamp01 } from "@/src/utils/easing"

type SceneTimeline = {
  start: number
  end: number
  onUpdate: (sceneProgress: number, globalProgress: number) => void
}

export class TimelineController {
  private timelines: SceneTimeline[] = []

  register(timeline: SceneTimeline) {
    this.timelines.push(timeline)
  }

  update(globalProgress: number) {
    this.timelines.forEach((timeline) => {
      const sceneRange = timeline.end - timeline.start
      const rawProgress = sceneRange === 0 ? 0 : (globalProgress - timeline.start) / sceneRange
      timeline.onUpdate(clamp01(rawProgress), globalProgress)
    })
  }
}
