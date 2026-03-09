import { easing } from "@/utils/easing"

export interface TimelineSegment {
  start: number
  end: number
}

export function segmentProgress(progress: number, segment: TimelineSegment): number {
  if (progress <= segment.start) return 0
  if (progress >= segment.end) return 1
  const local = (progress - segment.start) / (segment.end - segment.start)
  return easing.easeOutCubic(local)
}
