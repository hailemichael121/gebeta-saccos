'use client'

interface SceneTransitionProps {
  activeScene: number
}

export function SceneTransition({ activeScene }: SceneTransitionProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 transition-colors duration-700"
      style={{ background: `radial-gradient(circle, transparent 30%, rgba(2,6,23,${0.25 + activeScene * 0.06}))` }}
    />
  )
}
