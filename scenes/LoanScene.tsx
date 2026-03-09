"use client"

import { SceneContainer } from "@/components/scene/SceneContainer"
import { FeatureIllustration } from "@/components/visuals/FeatureIllustration"

interface LoanSceneProps {
  active: boolean
  progress: number
}

export function LoanScene({ active, progress }: LoanSceneProps) {
  return (
    <SceneContainer active={active} className="bg-gradient-to-b from-indigo-900 to-indigo-700 text-white">
      <div className="grid w-full max-w-6xl gap-10 px-4 md:grid-cols-3">
        <article className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
          <h3 className="text-xl font-semibold">Flexible Loans</h3>
          <p className="mt-3 text-indigo-100">Structured financing for personal, business, and agricultural goals.</p>
          <div className="mt-6"><FeatureIllustration type="loans" progress={progress} /></div>
        </article>
        <article className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
          <h3 className="text-xl font-semibold">Digital Banking</h3>
          <p className="mt-3 text-indigo-100">Member-first mobile experiences for payments, transfers, and onboarding.</p>
          <div className="mt-6"><FeatureIllustration type="mobile" progress={progress} /></div>
        </article>
        <article className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
          <h3 className="text-xl font-semibold">Shared Prosperity</h3>
          <p className="mt-3 text-indigo-100">Community impact and dividend growth connected to responsible lending.</p>
        </article>
      </div>
    </SceneContainer>
  )
}
