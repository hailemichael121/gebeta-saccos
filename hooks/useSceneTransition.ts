"use client"

import { useMemo } from "react"
import { segmentProgress } from "@/components/animation/Timeline"

export function useSceneTransition(progress: number, sceneCount: number) {
  return useMemo(() => {
    const sceneLength = 1 / sceneCount
    return Array.from({ length: sceneCount }, (_, index) => {
      const start = index * sceneLength
      const end = start + sceneLength
      return segmentProgress(progress, { start, end })
    })
  }, [progress, sceneCount])
}
