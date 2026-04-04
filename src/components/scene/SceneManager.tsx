'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ScrollController } from '@/src/components/animation/ScrollController'
import { TimelineController } from '@/src/components/animation/TimelineController'
import { FogLayer } from '@/src/components/visuals/FogLayer'
import { MoneyFlow } from '@/src/components/visuals/MoneyFlow'
import { VaultDoor } from '@/src/components/visuals/VaultDoor'
import { useSceneActivation } from '@/src/hooks/useSceneActivation'
import { useScrollProgress } from '@/src/hooks/useScrollProgress'
import { lerp } from '@/src/utils/lerp'
import { scrollToScene } from '@/src/utils/navigation'
import { CTAEndScene } from '@/src/scenes/CTAEndScene'
import { CommunityScene } from '@/src/scenes/CommunityScene'
import { HeroScene } from '@/src/scenes/HeroScene'
import { LoanScene } from '@/src/scenes/LoanScene'
import { SavingsScene } from '@/src/scenes/SavingsScene'
import { TrustScene } from '@/src/scenes/TrustScene'
import { SceneTransition } from './SceneTransition'

const sceneIds = ['hero-scene', 'trust-scene', 'savings-scene', 'loan-scene', 'community-scene', 'cta-scene']

function CameraRig({ targetZ, reducedMotion }: { targetZ: number; reducedMotion: boolean }) {
  const { camera } = useThree()

  useFrame(() => {
    const destination = reducedMotion ? 8 : targetZ
    camera.position.z = lerp(camera.position.z, destination, 0.08)
  })

  return null
}

export function SceneManager() {
  const { progress, reducedMotion } = useScrollProgress()
  const heroRef = useRef<HTMLElement>(null)
  const trustRef = useRef<HTMLElement>(null)
  const savingsRef = useRef<HTMLElement>(null)
  const loanRef = useRef<HTMLElement>(null)
  const communityRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)
  const sceneRefs = [heroRef, trustRef, savingsRef, loanRef, communityRef, ctaRef]
  const activeScene = useSceneActivation(sceneRefs)

  const scrollController = useMemo(() => new ScrollController(), [])
  const timelineController = useMemo(() => new TimelineController(), [])

  const [targetZ, setTargetZ] = useState(8)
  const [animationState, setAnimationState] = useState(timelineController.sync(0))

  useEffect(() => {
    const unsubscribe = scrollController.subscribe((value) => {
      setTargetZ(8 - value * 45)
      setAnimationState({ ...timelineController.sync(value) })
    })

    return unsubscribe
  }, [scrollController, timelineController])

  useEffect(() => {
    scrollController.setProgress(progress)
  }, [progress, scrollController])

  return (
    <div className="bg-slate-950 text-white">
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
          <color attach="background" args={['#020617']} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 6, 3]} intensity={1.2} />
          <FogLayer intensity={animationState.fogIntensity} />
          <VaultDoor rotation={animationState.vaultDoorRotation} />
          <MoneyFlow intensity={animationState.moneyFlowIntensity} />
          <CameraRig targetZ={targetZ} reducedMotion={reducedMotion} />
        </Canvas>
      </div>

      <header className="fixed top-0 z-30 flex w-full items-center justify-center bg-slate-950/60 py-4 backdrop-blur">
        <nav className="flex gap-3 text-sm">
          {sceneIds.map((id, index) => (
            <button
              key={id}
              onClick={() => scrollToScene(id)}
              className={`rounded-full px-3 py-1 transition ${activeScene === index ? 'bg-blue-600' : 'bg-white/10'}`}
            >
              {id.replace('-scene', '')}
            </button>
          ))}
        </nav>
      </header>

      <main className="relative z-10">
        <HeroScene ref={sceneRefs[0]} id={sceneIds[0]} />
        <TrustScene ref={sceneRefs[1]} id={sceneIds[1]} vaultProgress={animationState.vaultDoorRotation} />
        <SavingsScene ref={sceneRefs[2]} id={sceneIds[2]} progress={animationState.moneyFlowIntensity} />
        <LoanScene ref={sceneRefs[3]} id={sceneIds[3]} progress={animationState.featureEnergy} />
        <CommunityScene ref={sceneRefs[4]} id={sceneIds[4]} progress={animationState.featureEnergy} />
        <CTAEndScene ref={sceneRefs[5]} id={sceneIds[5]} onNavigate={scrollToScene} />
      </main>

      <SceneTransition activeScene={activeScene} />
    </div>
  )
}
