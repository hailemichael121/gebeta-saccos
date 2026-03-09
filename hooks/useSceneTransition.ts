"use client"

import { useMemo } from "react"
import { buildSceneWindows, getSceneProgress, SceneId } from "@/lib/animation/Timeline"

export type SceneState = {
  sceneId: SceneId
  globalProgress: number
  sceneProgress: number
}

export const useSceneTransition = (progress: number): SceneState => {
  return useMemo(() => {
    const windows = buildSceneWindows()
    const current = windows.find((scene) => progress >= scene.start && progress <= scene.end) ?? windows[0]

    return {
      sceneId: current.id,
      globalProgress: progress,
      sceneProgress: getSceneProgress(progress, current.start, current.end),
    }
  }, [progress])
}
