"use client"

interface FogLayerProps {
  depth: number
}

export function FogLayer({ depth }: FogLayerProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.2 + depth * 0.4,
        transform: `translateY(${depth * -60}px) scale(${1 + depth * 0.08})`,
      }}
    >
      <div className="absolute top-16 left-10 h-44 w-44 rounded-full bg-white/35 blur-3xl" />
      <div className="absolute top-1/2 right-8 h-56 w-56 rounded-full bg-blue-100/25 blur-3xl" />
      <div className="absolute bottom-8 left-1/3 h-48 w-48 rounded-full bg-indigo-100/25 blur-3xl" />
    </div>
  )
}
