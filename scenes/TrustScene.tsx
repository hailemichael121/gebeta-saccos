"use client"

import { SceneContainer } from "@/components/scene/SceneContainer"
import { VaultDoor } from "@/components/visuals/VaultDoor"

export function TrustScene({ active, progress }: { active: boolean; progress: number }) {
  return (
    <SceneContainer
      active={active}
      title="Trust, Security, and Cooperative Ownership"
      subtitle="As members move deeper, the vault opens to represent transparent governance and protected savings."
    >
      <VaultDoor progress={progress} />
    </SceneContainer>
  )
}
