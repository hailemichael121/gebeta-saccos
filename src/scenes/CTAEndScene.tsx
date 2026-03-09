'use client'

import { ForwardedRef, forwardRef } from 'react'
import { SceneContainer } from '@/src/components/scene/SceneContainer'

export const CTAEndScene = forwardRef(function CTAEndScene(
  { id, onNavigate }: { id: string; onNavigate: (id: string) => void },
  ref: ForwardedRef<HTMLElement>,
) {
  return (
    <SceneContainer ref={ref} id={id} title="Join the SACCO" subtitle="Final CTA">
      <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium" onClick={() => onNavigate('hero-scene')}>
        Restart Journey
      </button>
    </SceneContainer>
  )
})
