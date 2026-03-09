'use client'

import { ForwardedRef, forwardRef } from 'react'
import { FeatureIllustration } from '@/src/components/visuals/FeatureIllustration'
import { SceneContainer } from '@/src/components/scene/SceneContainer'

export const SavingsScene = forwardRef(function SavingsScene(
  { id, progress }: { id: string; progress: number },
  ref: ForwardedRef<HTMLElement>,
) {
  return (
    <SceneContainer ref={ref} id={id} title="Money Flow" subtitle="Savings Growth">
      <div className="flex items-center gap-4">
        <FeatureIllustration type="savings" progress={progress} />
        <p>Instanced particles stream upward to represent compounding savings.</p>
      </div>
    </SceneContainer>
  )
})
