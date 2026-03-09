"use client"

interface MoneyFlowProps {
  intensity: number
}

export function MoneyFlow({ intensity }: MoneyFlowProps) {
  const count = Math.max(8, Math.round(24 * intensity))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, index) => {
        const left = (index * 37) % 100
        const delay = (index % 8) * 0.4
        const duration = 3 + (index % 5)
        return (
          <span
            key={index}
            className="absolute text-lg text-emerald-300/80 animate-money-rise"
            style={{ left: `${left}%`, bottom: "-10%", animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
          >
            ብር
          </span>
        )
      })}
    </div>
  )
}
