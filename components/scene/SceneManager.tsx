"use client"

import { useMemo } from "react"
import { useScrollProgress } from "@/hooks/useScrollProgress"
import { useSceneTransition } from "@/hooks/useSceneTransition"
import { lerp } from "@/utils/lerp"
import { goToScene } from "@/utils/navigation"
import { SceneTransition } from "@/components/scene/SceneTransition"
import { HeroScene } from "@/scenes/HeroScene"
import { TrustScene } from "@/scenes/TrustScene"
import { SavingsScene } from "@/scenes/SavingsScene"
import { LoanScene } from "@/scenes/LoanScene"
import { CTAEndScene } from "@/scenes/CTAEndScene"

const sceneLabels = ["Intro", "Trust", "Savings", "Services", "Join"]

export function SceneManager() {
  const { progress } = useScrollProgress()
  const transitions = useSceneTransition(progress, sceneLabels.length)
  const depth = useMemo(() => lerp(0, 1, progress), [progress])

  return (
    <div className="relative bg-black text-white">
      <div className="fixed right-4 top-24 z-30 hidden rounded-xl border border-white/20 bg-black/45 p-2 backdrop-blur md:block">
        <ul className="space-y-1">
          {sceneLabels.map((label, index) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => goToScene(index)}
                className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-white/10"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <SceneTransition progress={depth} />

      <section style={{ height: "100vh" }}><HeroScene active={transitions[0] > 0.05} progress={transitions[0]} /></section>
      <section style={{ height: "100vh" }}><TrustScene active={transitions[1] > 0.05} progress={transitions[1]} /></section>
      <section style={{ height: "100vh" }}><SavingsScene active={transitions[2] > 0.05} progress={transitions[2]} /></section>
      <section style={{ height: "100vh" }}><LoanScene active={transitions[3] > 0.05} progress={transitions[3]} /></section>
      <section style={{ height: "100vh" }}><CTAEndScene active={transitions[4] > 0.05} /></section>
    </div>
  )
}
