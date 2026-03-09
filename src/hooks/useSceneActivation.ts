"use client"

import { RefObject, useEffect, useState } from "react"

export const useSceneActivation = (ref: RefObject<HTMLElement>, threshold = 0.35) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting)
      },
      { threshold },
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, threshold])

  return isActive
}
