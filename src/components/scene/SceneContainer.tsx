'use client'

import { ForwardedRef, forwardRef, ReactNode } from 'react'

interface SceneContainerProps {
  id: string
  title: string
  subtitle: string
  children?: ReactNode
}

export const SceneContainer = forwardRef(function SceneContainer(
  { id, title, subtitle, children }: SceneContainerProps,
  ref: ForwardedRef<HTMLElement>,
) {
  return (
    <section id={id} ref={ref} className="relative flex h-screen items-center justify-center px-6">
      <div className="w-full max-w-5xl rounded-2xl border border-white/15 bg-slate-900/35 p-8 text-white backdrop-blur-md">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-200">{subtitle}</p>
        <h2 className="mt-3 text-4xl font-semibold md:text-6xl">{title}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  )
})
