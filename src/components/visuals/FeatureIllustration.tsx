"use client"

type FeatureType = "savings" | "loans" | "banking" | "investments"

type FeatureIllustrationProps = {
  type: FeatureType
  progress: number
}

export function FeatureIllustration({ type, progress }: FeatureIllustrationProps) {
  if (type === "savings") {
    return <div className="h-24 w-24 rounded-xl bg-amber-400" style={{ transform: `scaleY(${0.6 + progress * 0.4})` }} />
  }

  if (type === "loans") {
    return <div className="h-24 w-24 border-b-4 border-r-4 border-sky-300" style={{ transform: `translateX(${progress * 16}px) rotate(-45deg)` }} />
  }

  if (type === "banking") {
    return <div className="h-28 w-16 rounded-2xl border-4 border-violet-300" style={{ transform: `translateY(${-progress * 12}px)` }} />
  }

  return <div className="h-24 w-24 rounded-lg bg-emerald-400" style={{ clipPath: `polygon(0 ${85 - progress * 35}%, 100% 10%, 100% 100%, 0 100%)` }} />
}
