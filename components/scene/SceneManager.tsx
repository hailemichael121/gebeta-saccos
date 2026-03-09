"use client"

import { useMemo } from "react"
import { SceneTransition } from "@/components/scene/SceneTransition"
import { FogLayer } from "@/components/visuals/FogLayer"
import { MoneyFlow } from "@/components/visuals/MoneyFlow"
import { useSceneTransition } from "@/hooks/useSceneTransition"
import { useScrollProgress } from "@/hooks/useScrollProgress"
import { SCENES, SceneId } from "@/lib/animation/Timeline"
import { CTAEndScene } from "@/scenes/CTAEndScene"
import { HeroScene } from "@/scenes/HeroScene"
import { ImpactScene } from "@/scenes/ImpactScene"
import { LoanScene } from "@/scenes/LoanScene"
import { SavingsScene } from "@/scenes/SavingsScene"
import { TrustScene } from "@/scenes/TrustScene"

const sceneLabels: Record<SceneId, string> = {
  hero: "Hero",
  trust: "Trust",
  savings: "Savings",
  loan: "Loans",
  impact: "Impact",
  cta: "Join",
}

const goToScene = (index: number) => {
  window.scrollTo({
    top: window.innerHeight * index,
    behavior: "smooth",
  })
}

export function SceneManager() {
  const progress = useScrollProgress()
  const state = useSceneTransition(progress)

  const depthTransform = useMemo(() => {
    const z = -progress * 1200
    return `perspective(1500px) translateZ(${z}px)`
  }, [progress])

  return (
    <main className="relative bg-slate-950 text-white">
      <nav className="fixed left-1/2 top-6 z-30 flex -translate-x-1/2 gap-2 rounded-full border border-white/20 bg-slate-900/60 p-2 backdrop-blur">
        {SCENES.map((scene, index) => (
          <button
            key={scene}
            type="button"
            onClick={() => goToScene(index)}
            className={`rounded-full px-4 py-2 text-xs transition ${
              state.sceneId === scene ? "bg-emerald-400 text-slate-950" : "text-white/80 hover:bg-white/10"
            }`}
          >
            {sceneLabels[scene]}
          </button>
        ))}
      </nav>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <FogLayer offset={0} speed={0.9} progress={progress} />
        <FogLayer offset={35} speed={0.6} progress={progress} opacity={0.2} />
        <MoneyFlow active={["trust", "savings", "loan"].includes(state.sceneId)} />
      </div>

      <SceneTransition progress={state.sceneProgress} />

      <div className="relative z-10" style={{ transform: depthTransform, transformStyle: "preserve-3d" }}>
        <section className="flex h-screen items-center px-4">
          <HeroScene active={state.sceneId === "hero"} />
        </section>
        <section className="flex h-screen items-center px-4">
          <TrustScene active={state.sceneId === "trust"} progress={state.sceneProgress} />
        </section>
        <section className="flex h-screen items-center px-4">
          <SavingsScene active={state.sceneId === "savings"} />
        </section>
        <section className="flex h-screen items-center px-4">
          <LoanScene active={state.sceneId === "loan"} />
        </section>
        <section className="flex h-screen items-center px-4">
          <ImpactScene active={state.sceneId === "impact"} />
        </section>
        <section className="flex h-screen items-center px-4">
          <CTAEndScene active={state.sceneId === "cta"} />
        </section>
      </div>
    </main>
  )
}
