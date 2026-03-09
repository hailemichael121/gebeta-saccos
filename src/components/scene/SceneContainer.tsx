"use client"

import { PropsWithChildren, useMemo, useRef } from "react"
import { useSceneActivation } from "@/src/hooks/useSceneActivation"

type SceneContainerProps = PropsWithChildren<{
  index: number
  title: string
  subtitle: string
  active: boolean
  depthZ: number
}>

export function SceneContainer({ index, title, subtitle, active, depthZ, children }: SceneContainerProps) {
  const ref = useRef<HTMLElement>(null)
  const intersecting = useSceneActivation(ref)

  const style = useMemo(
    () => ({
      transform: `translate3d(0, 0, ${depthZ}px)`,
      opacity: active ? 1 : 0.45,
    }),
    [active, depthZ],
  )

  return (
    <section
      ref={ref}
      data-scene-index={index}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16 text-white"
      style={style}
    >
      <div
        className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 rounded-3xl border border-white/10 bg-slate-950/45 p-8 backdrop-blur"
        data-active={intersecting}
      >
        <header>
          <p className="text-sm uppercase tracking-[0.22em] text-sky-300">Scene {index + 1}</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-5xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-slate-200">{subtitle}</p>
        </header>
        {children}
      </div>
    </section>
  )
}
