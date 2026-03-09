'use client'

import { useEffect, useState } from 'react'

export const useSceneActivation = (sceneIds: string[], threshold = 0.55) => {
  const [activeScene, setActiveScene] = useState(sceneIds[0] ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveScene(visible[0].target.id)
        }
      },
      { threshold: [0.3, threshold, 0.9] },
    )

    sceneIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sceneIds, threshold])

  return activeScene
}
