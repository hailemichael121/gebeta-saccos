"use client"

import { cn } from "@/lib/utils"
import type { PropsWithChildren } from "react"

interface SceneContainerProps extends PropsWithChildren {
  active: boolean
  className?: string
}

export function SceneContainer({ active, className, children }: SceneContainerProps) {
  return (
    <div
      className={cn(
        "sticky top-0 flex h-screen items-center justify-center overflow-hidden transition-opacity duration-500",
        active ? "opacity-100" : "opacity-20",
        className,
      )}
    >
      {children}
    </div>
  )
}
