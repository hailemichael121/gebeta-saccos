"use client"

type FogLayerProps = {
  offset: number
  speed: number
  progress: number
  opacity?: number
}

export function FogLayer({ offset, speed, progress, opacity = 0.28 }: FogLayerProps) {
  const translateY = (progress * speed * 140 + offset) % 120

  return (
    <div
      className="absolute inset-x-[-20%] h-[45vh] rounded-full bg-gradient-to-r from-blue-100/40 via-white/50 to-emerald-100/35 blur-3xl"
      style={{
        top: `${-20 + translateY}%`,
        opacity,
      }}
      aria-hidden
    />
  )
}
