"use client"

import { useEffect, useState } from "react"
import { scrollController } from "@/lib/animation/ScrollController"

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    scrollController.init()
    return scrollController.subscribe(setProgress)
  }, [])

  return progress
}
