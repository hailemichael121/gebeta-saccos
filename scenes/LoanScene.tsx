"use client"

import { SceneContainer } from "@/components/scene/SceneContainer"
import { FeatureIllustration } from "@/components/visuals/FeatureIllustration"

export function LoanScene({ active }: { active: boolean }) {
  return (
    <SceneContainer
      active={active}
      title="Flexible Lending for Households and SMEs"
      subtitle="Personal, business, and productive loans are staged as a guided financing pipeline with predictable approvals."
    >
      <FeatureIllustration type="loan" />
    </SceneContainer>
  )
}
