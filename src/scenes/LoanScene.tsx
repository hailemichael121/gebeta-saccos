import { FeatureIllustration } from '@/src/components/visuals/FeatureIllustration'
import { SceneContainer } from '@/src/components/scene/SceneContainer'

type LoanSceneProps = {
  progress: number
}

export function LoanScene({ progress }: LoanSceneProps) {
  return (
    <SceneContainer id="loan-scene" title="Services" subtitle="Loans, savings, mobile banking, and investments in motion.">
      <div className="grid grid-cols-2 gap-4">
        <FeatureIllustration type="savings" progress={progress} />
        <FeatureIllustration type="loans" progress={progress} />
        <FeatureIllustration type="mobile" progress={progress} />
        <FeatureIllustration type="investments" progress={progress} />
      </div>
    </SceneContainer>
  )
}
