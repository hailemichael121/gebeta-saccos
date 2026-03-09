"use client"

import { SceneContainer } from "@/components/scene/SceneContainer"
import { Button } from "@/components/ui/button"

export function CTAEndScene({ active }: { active: boolean }) {
  return (
    <SceneContainer
      active={active}
      title="Join Gebeta SACCOS"
      subtitle="Become a member and start your journey with secure savings, responsible lending, and cooperative growth."
    >
      <Button size="lg" className="bg-emerald-500 text-white hover:bg-emerald-600">
        Start Membership
      </Button>
    </SceneContainer>
  )
}
