'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ScrollController } from '@/src/components/animation/ScrollController'
import { TimelineController } from '@/src/components/animation/TimelineController'
import { FogLayer } from '@/src/components/visuals/FogLayer'
import { MoneyFlow } from '@/src/components/visuals/MoneyFlow'
import { VaultDoor } from '@/src/components/visuals/VaultDoor'
import { HeroScene } from '@/src/scenes/HeroScene'
import { TrustScene } from '@/src/scenes/TrustScene'
import { SavingsScene } from '@/src/scenes/SavingsScene'
import { LoanScene } from '@/src/scenes/LoanScene'
import { CommunityScene } from '@/src/scenes/CommunityScene'
import { CTAEndScene } from '@/src/scenes/CTAEndScene'
import { useSceneActivation } from '@/src/hooks/useSceneActivation'
import { scrollToScene } from '@/src/utils/navigation'
import { lerp } from '@/src/utils/lerp'
import { SceneTransition } from '@/src/components/scene/SceneTransition'

const sceneAnchors = ['hero-scene', 'trust-scene', 'savings-scene', 'loan-scene', 'community-scene', 'cta-scene']

function CameraRig({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const { camera } = useThree()

  useFrame(() => {
    const targetZ = reducedMotion ? 9 : 9 - progress * 42
    camera.position.z = lerp(camera.position.z, targetZ, 0.08)
  })

  return null
}

function World({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 6, 6]} intensity={1.3} color="#bfdbfe" />
      {Array.from({ length: 8 }).map((_, index) => (
        <FogLayer index={index} progress={reducedMotion ? 0 : progress} key={index} />
      ))}
      <VaultDoor openness={Math.min(Math.max((progress - 0.2) / 0.22, 0), 1)} />
      <MoneyFlow progress={Math.min(Math.max((progress - 0.3) / 0.22, 0), 1)} />
      <mesh position={[0, -4.2, -30]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#020617" />
      </mesh>
      <CameraRig progress={progress} reducedMotion={reducedMotion} />
    </>
  )
}

export function SceneManager() {
  const [progress, setProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const timelineRef = useRef<TimelineController | null>(null)
  const scene = useSceneActivation(sceneAnchors)

  const scrollController = useMemo(() => new ScrollController(), [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)

    const update = () => setReducedMotion(media.matches)
    media.addEventListener('change', update)

    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    timelineRef.current = new TimelineController()
    const tl = timelineRef.current.getTimeline()
    const cameraProxy = { depth: 0 }

    tl.to(cameraProxy, { depth: 1, duration: 1, ease: 'none' })

    const unsubscribe = scrollController.subscribe((value) => {
      timelineRef.current?.setProgress(value)
      setProgress(cameraProxy.depth)
    })

    scrollController.start()

    return () => {
      unsubscribe()
      scrollController.stop()
      timelineRef.current?.kill()
      timelineRef.current = null
    }
  }, [scrollController])

  return (
    <main className="bg-slate-950 text-white">
      <nav className="fixed left-1/2 top-6 z-30 flex -translate-x-1/2 gap-2 rounded-full border border-white/10 bg-slate-900/70 p-2 backdrop-blur">
        {sceneAnchors.map((sceneId) => (
          <button
            className={`rounded-full px-3 py-1 text-xs transition ${sceneId === scene ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-200'}`}
            key={sceneId}
            onClick={() => scrollToScene(sceneId)}
            type="button"
          >
            {sceneId.replace('-scene', '')}
          </button>
        ))}
      </nav>

      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 9], fov: 48 }} dpr={[1, 1.5]}>
          <World progress={progress} reducedMotion={reducedMotion} />
        </Canvas>
      </div>

      <div className="relative z-20">
        <HeroScene />
        <SceneTransition active={scene === 'trust-scene'} />
        <TrustScene />
        <SavingsScene />
        <LoanScene progress={progress} />
        <CommunityScene />
        <CTAEndScene />
      </div>
    </main>
  )
}
