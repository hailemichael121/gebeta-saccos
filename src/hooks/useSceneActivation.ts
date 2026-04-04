'use client'

import { RefObject, useEffect, useState } from 'react'

export const useSceneActivation = (sceneRefs: RefObject<HTMLElement>[]) => {
  const [activeScene, setActiveScene] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sceneRefs.findIndex((ref) => ref.current === entry.target)
            if (index >= 0) setActiveScene(index)
          }
        })
      },
      { threshold: 0.55 },
    )

    sceneRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [sceneRefs])

  return activeScene
}
