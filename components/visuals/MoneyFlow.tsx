"use client"

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: (index * 17) % 100,
  delay: (index % 6) * 0.35,
  duration: 2.8 + (index % 4) * 0.7,
}))

type MoneyFlowProps = {
  active: boolean
}

export function MoneyFlow({ active }: MoneyFlowProps) {
  if (!active) {
    return null
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute text-emerald-300/70"
          style={{
            left: `${particle.left}%`,
            bottom: "-2rem",
            animation: `money-rise ${particle.duration}s linear ${particle.delay}s infinite`,
          }}
        >
          ብር
        </span>
      ))}
    </div>
  )
}
