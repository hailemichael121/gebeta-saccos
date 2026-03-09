"use client"

import { CSSProperties, useMemo } from "react"

type FogLayerProps = {
  progress: number
  index: number
}

export function FogLayer({ progress, index }: FogLayerProps) {
  const style = useMemo<CSSProperties>(() => {
    const baseOffset = (progress * 120 + index * 30) % 140
    return {
      transform: `translate3d(${index * 8 - 20}vw, ${15 + index * 10}vh, ${80 - baseOffset}px)`,
      opacity: 0.18 - index * 0.03,
    }
  }, [index, progress])

  return <div className="absolute left-0 top-0 h-64 w-[140%] rounded-full bg-white/40 blur-3xl" style={style} />
}
