"use client"

import { SceneContainer } from "@/src/components/scene/SceneContainer"
import { VaultDoor } from "@/src/components/visuals/VaultDoor"

type SceneProps = { index: number; active: boolean; depthZ: number; progress: number }

export function TrustScene({ index, active, depthZ, progress }: SceneProps) {
  return (
    <SceneContainer
      index={index}
      active={active}
      depthZ={depthZ}
      title="SACCO Vault"
      subtitle="Security and trust are visualized through a vault door that opens with scene progression."
    >
      <div className="flex justify-center">
        <VaultDoor progress={progress} />
      </div>
    </SceneContainer>
  )
}
