"use client"

import { useEffect, useState } from "react"
import { scrollController } from "@/components/animation/ScrollController"

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    scrollController.start()
    return scrollController.subscribe((nextProgress, nextScrollY) => {
      setProgress(nextProgress)
      setScrollY(nextScrollY)
    })
  }, [])

  return { progress, scrollY }
}
