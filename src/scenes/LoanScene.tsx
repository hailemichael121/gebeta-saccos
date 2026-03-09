'use client'

import { ForwardedRef, forwardRef } from 'react'
import { FeatureIllustration } from '@/src/components/visuals/FeatureIllustration'
import { SceneContainer } from '@/src/components/scene/SceneContainer'

export const LoanScene = forwardRef(function LoanScene(
  { id, progress }: { id: string; progress: number },
  ref: ForwardedRef<HTMLElement>,
) {
  return (
    <SceneContainer ref={ref} id={id} title="Services" subtitle="Loans, Accounts, Investments">
      <div className="grid gap-4 md:grid-cols-3">
        <FeatureIllustration type="loans" progress={progress} />
        <FeatureIllustration type="banking" progress={progress} />
        <FeatureIllustration type="investments" progress={progress} />
      </div>
    </SceneContainer>
  )
})
