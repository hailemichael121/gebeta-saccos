"use client"

import { SceneContainer } from "@/src/components/scene/SceneContainer"
import { FeatureIllustration } from "@/src/components/visuals/FeatureIllustration"

type SceneProps = { index: number; active: boolean; depthZ: number; progress: number }

export function LoanScene({ index, active, depthZ, progress }: SceneProps) {
  return (
    <SceneContainer
      index={index}
      active={active}
      depthZ={depthZ}
      title="Services"
      subtitle="Products transition from savings to loans, mobile banking, and investments with progress-aware illustrations."
    >
      <div className="grid gap-8 md:grid-cols-4">
        <FeatureIllustration type="savings" progress={progress} />
        <FeatureIllustration type="loans" progress={progress} />
        <FeatureIllustration type="banking" progress={progress} />
        <FeatureIllustration type="investments" progress={progress} />
      </div>
    </SceneContainer>
  )
}
