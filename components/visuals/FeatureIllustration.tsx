"use client"

interface FeatureIllustrationProps {
  type: "savings" | "loans" | "mobile"
  progress: number
}

export function FeatureIllustration({ type, progress }: FeatureIllustrationProps) {
  if (type === "savings") {
    return <div className="h-24 w-24 rounded-full border-4 border-emerald-300/80 bg-emerald-500/20" style={{ transform: `scale(${0.8 + progress * 0.3})` }} />
  }

  if (type === "loans") {
    return (
      <div className="flex gap-2">
        <div className="h-3 w-10 rounded bg-blue-300" style={{ width: `${40 + progress * 30}px` }} />
        <div className="h-3 w-10 rounded bg-indigo-300" style={{ width: `${40 + progress * 40}px` }} />
      </div>
    )
  }

  return <div className="h-24 w-14 rounded-2xl border-4 border-cyan-300/80 bg-cyan-400/20" style={{ transform: `translateY(${progress * -8}px)` }} />
}
