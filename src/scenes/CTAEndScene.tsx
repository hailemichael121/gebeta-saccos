"use client"

import Link from "next/link"
import { SceneContainer } from "@/src/components/scene/SceneContainer"

type SceneProps = { index: number; active: boolean; depthZ: number }

export function CTAEndScene({ index, active, depthZ }: SceneProps) {
  return (
    <SceneContainer
      index={index}
      active={active}
      depthZ={depthZ}
      title="Join the SACCO"
      subtitle="The journey closes with an actionable invitation to become a member."
    >
      <div>
        <Link className="inline-flex rounded-lg bg-emerald-500 px-5 py-3 font-semibold text-slate-950" href="/auth/register">
          Become a Member
        </Link>
      </div>
    </SceneContainer>
  )
}
