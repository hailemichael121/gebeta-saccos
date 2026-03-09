"use client"

import { SceneContainer } from "@/components/scene/SceneContainer"
import { FeatureIllustration } from "@/components/visuals/FeatureIllustration"

export function SavingsScene({ active }: { active: boolean }) {
  return (
    <SceneContainer
      active={active}
      title="Savings Growth in Motion"
      subtitle="Structured savings plans, disciplined member contributions, and compounding returns build long-term resilience."
    >
      <FeatureIllustration type="savings" />
    </SceneContainer>
  )
}
