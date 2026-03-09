"use client"

import { ReactNode } from "react"

type SceneContainerProps = {
  title: string
  subtitle: string
  children?: ReactNode
  active: boolean
}

export function SceneContainer({ title, subtitle, children, active }: SceneContainerProps) {
  return (
    <article
      className={`mx-auto w-full max-w-5xl rounded-3xl border border-white/20 bg-slate-900/45 p-8 text-white backdrop-blur-xl transition-all duration-500 md:p-12 ${
        active ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Gebeta SACCOS Journey</p>
      <h2 className="mt-3 text-3xl font-semibold md:text-5xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-slate-100/85">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </article>
  )
}
