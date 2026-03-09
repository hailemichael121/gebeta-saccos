"use client"

type SceneTransitionProps = {
  progress: number
}

export function SceneTransition({ progress }: SceneTransitionProps) {
  const opacity = Math.max(0, Math.sin(progress * Math.PI) * 0.16)

  return <div className="pointer-events-none fixed inset-0 z-20 bg-white" style={{ opacity }} aria-hidden />
}
