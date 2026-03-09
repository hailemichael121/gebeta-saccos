"use client"

const particles = new Array(24).fill(null)

type MoneyFlowProps = {
  progress: number
}

export function MoneyFlow({ progress }: MoneyFlowProps) {
  return (
    <div className="relative h-56 w-full overflow-hidden">
      {particles.map((_, i) => {
        const x = 10 + ((i * 17) % 85)
        const drift = Math.sin(progress * Math.PI * 4 + i) * 18
        const y = 80 - ((progress * 140 + i * 11) % 120)
        const scale = 0.5 + ((i % 6) + 1) / 10

        return (
          <span
            key={i}
            className="absolute rounded-full bg-emerald-300/85 shadow-[0_0_18px_rgba(16,185,129,0.5)]"
            style={{
              width: `${8 + (i % 3) * 4}px`,
              height: `${8 + (i % 3) * 4}px`,
              transform: `translate(${x + drift}px, ${y}%) scale(${scale})`,
            }}
          />
        )
      })}
    </div>
  )
}
