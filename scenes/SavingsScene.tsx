"use client"

import { SceneContainer } from "@/components/scene/SceneContainer"
import { MoneyFlow } from "@/components/visuals/MoneyFlow"
import { FeatureIllustration } from "@/components/visuals/FeatureIllustration"

interface SavingsSceneProps {
  active: boolean
  progress: number
}

export function SavingsScene({ active, progress }: SavingsSceneProps) {
  return (
    <SceneContainer active={active} className="bg-gradient-to-b from-emerald-900/95 to-emerald-700/90 text-white">
      <MoneyFlow intensity={progress} />
      <div className="relative z-10 grid w-full max-w-6xl gap-8 px-4 md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-100">Savings Growth</p>
          <h2 className="mt-3 text-4xl font-semibold">Deposits become momentum.</h2>
          <p className="mt-4 text-emerald-50">Members move from stability to growth with structured savings products and compounding returns.</p>
        </div>
        <div className="flex items-center justify-center"><FeatureIllustration type="savings" progress={progress} /></div>
      </div>
    </SceneContainer>
  )
}
