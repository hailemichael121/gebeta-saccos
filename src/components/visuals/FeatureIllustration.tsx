'use client'

import type React from 'react'

interface FeatureIllustrationProps {
  type: 'savings' | 'loans' | 'banking' | 'investments'
  progress: number
}

export function FeatureIllustration({ type, progress }: FeatureIllustrationProps) {
  const style: React.CSSProperties = {
    transform: 'translateY(0px) scale(1) rotate(0deg)',
    opacity: 0.8,
  }

  if (type === 'savings') style.transform = `translateY(${20 - progress * 20}px)`
  if (type === 'loans') style.transform = `rotate(${progress * 30}deg)`
  if (type === 'banking') style.transform = `scale(${0.9 + progress * 0.2})`
  if (type === 'investments') style.opacity = 0.5 + progress * 0.5

  return <div className="h-20 w-20 rounded-full border border-white/30 bg-white/10 backdrop-blur" style={style} />
}
