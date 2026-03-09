'use client'

import { ForwardedRef, forwardRef } from 'react'
import { SceneContainer } from '@/src/components/scene/SceneContainer'

export const CommunityScene = forwardRef(function CommunityScene(
  { id, progress }: { id: string; progress: number },
  ref: ForwardedRef<HTMLElement>,
) {
  return (
    <SceneContainer ref={ref} id={id} title="Community Impact" subtitle="Members Benefiting">
      <p className="max-w-2xl">Progressive reveal intensity: {(progress * 100).toFixed(0)}%</p>
    </SceneContainer>
  )
})
