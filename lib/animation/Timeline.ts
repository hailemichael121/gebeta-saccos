import { clamp01 } from "@/lib/utils/easing"

export type SceneId = "hero" | "trust" | "savings" | "loan" | "impact" | "cta"

export const SCENES: SceneId[] = ["hero", "trust", "savings", "loan", "impact", "cta"]

export type SceneWindow = {
  id: SceneId
  start: number
  end: number
}

export const buildSceneWindows = (): SceneWindow[] => {
  const size = 1 / SCENES.length
  return SCENES.map((id, index) => ({
    id,
    start: index * size,
    end: (index + 1) * size,
  }))
}

export const getSceneProgress = (progress: number, start: number, end: number) => {
  if (progress <= start) return 0
  if (progress >= end) return 1
  return clamp01((progress - start) / (end - start))
}
