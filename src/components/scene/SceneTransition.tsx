"use client"

type SceneTransitionProps = {
  progress: number
}

export function SceneTransition({ progress }: SceneTransitionProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 bg-gradient-to-b from-transparent via-sky-200/8 to-transparent"
      style={{ opacity: 0.1 + Math.sin(progress * Math.PI * 12) * 0.08 }}
    />
  )
}
