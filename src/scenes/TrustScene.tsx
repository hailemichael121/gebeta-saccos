'use client'

import { ForwardedRef, forwardRef } from 'react'
import { SceneContainer } from '@/src/components/scene/SceneContainer'

export const TrustScene = forwardRef(function TrustScene(
  { id, vaultProgress }: { id: string; vaultProgress: number },
  ref: ForwardedRef<HTMLElement>,
) {
  return (
    <SceneContainer ref={ref} id={id} title="SACCO Vault" subtitle="Security and Trust">
      <p>Vault access opening angle: {(vaultProgress * 57.3).toFixed(0)}°</p>
    </SceneContainer>
  )
})
