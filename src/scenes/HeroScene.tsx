'use client'

import { ForwardedRef, forwardRef } from 'react'
import { SceneContainer } from '@/src/components/scene/SceneContainer'

export const HeroScene = forwardRef(function HeroScene(
  { id }: { id: string },
  ref: ForwardedRef<HTMLElement>,
) {
  return (
    <SceneContainer ref={ref} id={id} title="Enter the Financial World" subtitle="Clouds and Fog">
      <p className="max-w-2xl text-blue-100/90">Scroll to descend through the SACCO narrative environment.</p>
    </SceneContainer>
  )
})
