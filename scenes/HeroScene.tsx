"use client"

import { SceneContainer } from "@/components/scene/SceneContainer"
import { FogLayer } from "@/components/visuals/FogLayer"

interface HeroSceneProps {
  active: boolean
  progress: number
}

export function HeroScene({ active, progress }: HeroSceneProps) {
  return (
    <SceneContainer active={active} className="bg-gradient-to-b from-blue-950 via-slate-900 to-slate-800 text-white">
      <FogLayer depth={progress} />
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-blue-200">Gebeta SACCOS</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">A Financial Journey Built on Trust</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-200 md:text-lg">Scroll forward to move through savings, lending, and community impact in a single immersive narrative.</p>
      </div>
    </SceneContainer>
  )
}
