'use client'

import { useEffect, useState } from 'react'
import { clamp01 } from '@/src/utils/easing'

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement
      const scrollable = root.scrollHeight - window.innerHeight
      if (scrollable <= 0) {
        setProgress(0)
        return
      }

      setProgress(clamp01(window.scrollY / scrollable))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}
