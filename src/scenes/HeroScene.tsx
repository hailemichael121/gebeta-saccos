"use client"

import { SceneContainer } from "@/src/components/scene/SceneContainer"

type SceneProps = { index: number; active: boolean; depthZ: number }

export function HeroScene({ index, active, depthZ }: SceneProps) {
  return (
    <SceneContainer
      index={index}
      active={active}
      depthZ={depthZ}
      title="Clouds & Fog"
      subtitle="You are entering the SACCO financial ecosystem. Scroll depth translates to narrative depth."
    >
      <p className="text-lg text-slate-100">Forward motion begins in atmospheric fog, preparing the vault entry sequence.</p>
    </SceneContainer>
  )
}
