"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ScrollController } from "@/src/components/animation/ScrollController"
import { TimelineController } from "@/src/components/animation/TimelineController"
import { SceneTransition } from "@/src/components/scene/SceneTransition"
import { FogLayer } from "@/src/components/visuals/FogLayer"
import { CTAEndScene } from "@/src/scenes/CTAEndScene"
import { CommunityScene } from "@/src/scenes/CommunityScene"
import { HeroScene } from "@/src/scenes/HeroScene"
import { LoanScene } from "@/src/scenes/LoanScene"
import { SavingsScene } from "@/src/scenes/SavingsScene"
import { TrustScene } from "@/src/scenes/TrustScene"
import { scrollToScene } from "@/src/utils/navigation"
import { useScrollProgress } from "@/src/hooks/useScrollProgress"

const sceneCount = 6
const depthDistance = 1400

export function SceneManager() {
  const progress = useScrollProgress()
  const [sceneProgress, setSceneProgress] = useState(Array(sceneCount).fill(0))
  const [cameraZ, setCameraZ] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  const timelineControllerRef = useRef(new TimelineController())

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const timeline = timelineControllerRef.current
    const segment = 1 / sceneCount

    for (let i = 0; i < sceneCount; i += 1) {
      timeline.register({
        start: i * segment,
        end: (i + 1) * segment,
        onUpdate: (value) => {
          setSceneProgress((prev) => {
            const next = [...prev]
            next[i] = value
            return next
          })
        },
      })
    }
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setCameraZ(0)
      return
    }

    const scrollController = new ScrollController()
    const unsubscribe = scrollController.subscribe((globalProgress) => {
      timelineControllerRef.current.update(globalProgress)
      setCameraZ(-(globalProgress * depthDistance))
    })

    scrollController.start()
    return () => {
      unsubscribe()
      scrollController.stop()
    }
  }, [reducedMotion])

  const activeIndex = useMemo(() => Math.min(sceneCount - 1, Math.floor(progress * sceneCount)), [progress])

  return (
    <main className="bg-slate-950 text-white">
      <nav className="fixed left-0 top-0 z-30 flex w-full items-center justify-between bg-slate-950/70 p-4 backdrop-blur">
        <p className="font-semibold">Gebeta SACCO Journey</p>
        <div className="flex gap-2 text-xs md:text-sm">
          {["Entry", "Vault", "Flow", "Services", "Impact", "Join"].map((item, index) => (
            <button
              key={item}
              className="rounded-full border border-white/30 px-3 py-1 hover:bg-white/15"
              onClick={() => scrollToScene(index)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <FogLayer index={0} progress={progress} />
        <FogLayer index={1} progress={progress} />
        <FogLayer index={2} progress={progress} />
      </div>

      <SceneTransition progress={progress} />

      <div className="[perspective:1200px]" style={{ transform: reducedMotion ? "none" : `translateZ(${cameraZ}px)` }}>
        <HeroScene index={0} active={activeIndex === 0} depthZ={0} />
        <TrustScene index={1} active={activeIndex === 1} depthZ={-220} progress={sceneProgress[1]} />
        <SavingsScene index={2} active={activeIndex === 2} depthZ={-420} progress={sceneProgress[2]} />
        <LoanScene index={3} active={activeIndex === 3} depthZ={-620} progress={sceneProgress[3]} />
        <CommunityScene index={4} active={activeIndex === 4} depthZ={-820} />
        <CTAEndScene index={5} active={activeIndex === 5} depthZ={-1020} />
      </div>
    </main>
  )
}
