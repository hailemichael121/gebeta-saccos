"use client"

interface SceneTransitionProps {
  progress: number
}

export function SceneTransition({ progress }: SceneTransitionProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 bg-black"
      style={{ opacity: Math.max(0, Math.min((progress - 0.48) * 3, 0.3)) }}
      aria-hidden
    />
  )
}
