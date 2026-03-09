"use client"

import { SceneContainer } from "@/src/components/scene/SceneContainer"
import { MoneyFlow } from "@/src/components/visuals/MoneyFlow"

type SceneProps = { index: number; active: boolean; depthZ: number; progress: number }

export function SavingsScene({ index, active, depthZ, progress }: SceneProps) {
  return (
    <SceneContainer
      index={index}
      active={active}
      depthZ={depthZ}
      title="Money Flow"
      subtitle="Savings growth is represented as animated capital particles moving upward through the ecosystem."
    >
      <MoneyFlow progress={progress} />
    </SceneContainer>
  )
}
