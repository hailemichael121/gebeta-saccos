"use client"

import { SceneContainer } from "@/components/scene/SceneContainer"
import { FeatureIllustration } from "@/components/visuals/FeatureIllustration"

export function ImpactScene({ active }: { active: boolean }) {
  return (
    <SceneContainer
      active={active}
      title="Community Impact at Scale"
      subtitle="Capital stays in the community: education, businesses, agriculture, and family milestones funded by members."
    >
      <FeatureIllustration type="impact" />
    </SceneContainer>
  )
}
