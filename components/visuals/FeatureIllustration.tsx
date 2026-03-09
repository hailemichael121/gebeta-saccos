"use client"

type FeatureType = "savings" | "loan" | "mobile" | "impact"

const styles: Record<FeatureType, string> = {
  savings: "from-emerald-400/30 to-green-500/20",
  loan: "from-cyan-400/30 to-blue-500/20",
  mobile: "from-violet-400/30 to-purple-500/20",
  impact: "from-amber-300/30 to-orange-500/20",
}

type FeatureIllustrationProps = {
  type: FeatureType
}

export function FeatureIllustration({ type }: FeatureIllustrationProps) {
  return (
    <div className={`h-32 w-32 rounded-3xl border border-white/20 bg-gradient-to-br ${styles[type]} backdrop-blur`} aria-hidden />
  )
}
