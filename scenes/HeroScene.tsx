"use client"

import { SceneContainer } from "@/components/scene/SceneContainer"

export function HeroScene({ active }: { active: boolean }) {
  return (
    <SceneContainer
      active={active}
      title="Enter Ethiopia's Cooperative Financial World"
      subtitle="Scroll to move forward through the SACCO experience: trust, savings growth, lending power, and community impact."
    />
  )
}
