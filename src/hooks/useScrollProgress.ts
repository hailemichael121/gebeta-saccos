'use client'

import { useEffect, useState } from 'react'

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionChange = () => setReducedMotion(media.matches)
    onMotionChange()

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const next = maxScroll <= 0 ? 0 : window.scrollY / maxScroll
      setProgress(Math.max(0, Math.min(1, next)))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    media.addEventListener('change', onMotionChange)

    return () => {
      window.removeEventListener('scroll', onScroll)
      media.removeEventListener('change', onMotionChange)
    }
  }, [])

  return { progress, reducedMotion }
}
