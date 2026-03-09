type SceneTransitionProps = {
  active: boolean
}

export function SceneTransition({ active }: SceneTransitionProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-slate-900/30 to-slate-950/90 transition-opacity duration-500"
      style={{ opacity: active ? 0.75 : 0.45 }}
    />
  )
}
