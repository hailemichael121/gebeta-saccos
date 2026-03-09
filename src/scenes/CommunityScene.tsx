"use client"

import { SceneContainer } from "@/src/components/scene/SceneContainer"

type SceneProps = { index: number; active: boolean; depthZ: number }

export function CommunityScene({ index, active, depthZ }: SceneProps) {
  return (
    <SceneContainer
      index={index}
      active={active}
      depthZ={depthZ}
      title="Community Impact"
      subtitle="Member outcomes and social growth anchor the cooperative narrative."
    >
      <p className="text-lg text-slate-100">Capital circulation translates into real outcomes: jobs created, homes financed, and education funded.</p>
    </SceneContainer>
  )
}
