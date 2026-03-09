"use client"

import { SceneContainer } from "@/components/scene/SceneContainer"
import { VaultDoor } from "@/components/visuals/VaultDoor"

interface TrustSceneProps {
  active: boolean
  progress: number
}

export function TrustScene({ active, progress }: TrustSceneProps) {
  return (
    <SceneContainer active={active} className="bg-gradient-to-b from-slate-900 to-slate-700 text-white">
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Trust & Security</p>
          <h2 className="mt-3 text-4xl font-semibold">The vault opens as members advance.</h2>
          <p className="mt-4 text-slate-200">Security, governance, and transparency are represented as a vault that progressively unlocks with scroll depth.</p>
        </div>
        <div className="flex justify-center">
          <VaultDoor progress={progress} />
        </div>
      </div>
    </SceneContainer>
  )
}
