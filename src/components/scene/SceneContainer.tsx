import { ReactNode } from 'react'

type SceneContainerProps = {
  id: string
  title: string
  subtitle: string
  children?: ReactNode
}

export function SceneContainer({ id, title, subtitle, children }: SceneContainerProps) {
  return (
    <section id={id} className="relative flex min-h-screen items-center px-6 py-20 md:px-16">
      <div className="relative z-20 max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-blue-200">Cinematic Journey</p>
        <h2 className="text-4xl font-semibold text-white md:text-6xl">{title}</h2>
        <p className="mt-4 text-lg text-slate-200">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}
