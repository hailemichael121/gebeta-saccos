import { useMemo } from 'react'

type FeatureType = 'savings' | 'loans' | 'mobile' | 'investments'

type FeatureIllustrationProps = {
  type: FeatureType
  progress: number
}

export function FeatureIllustration({ type, progress }: FeatureIllustrationProps) {
  const transform = useMemo(() => {
    switch (type) {
      case 'savings':
        return `scale(${1 + progress * 0.15}) translateY(${-progress * 18}px)`
      case 'loans':
        return `translateX(${progress * 20}px) scale(${1 + progress * 0.1})`
      case 'mobile':
        return `translateY(${Math.sin(progress * Math.PI * 2) * 8}px)`
      case 'investments':
        return `scaleY(${0.75 + progress * 0.35})`
      default:
        return 'none'
    }
  }, [type, progress])

  return (
    <div className="h-24 w-24 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm" style={{ transform }} />
  )
}
