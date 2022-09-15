import {FC} from 'react'
import FRCSteps, {FRCStepsProps} from './steps'
import FRCStep, {FRCStepProps} from './step'

export type { FRCStepsProps, FRCStepProps }
export type { Status, StepsSize, TextLayout } from './steps'

export type FrcStepsComponent = FC<FRCStepsProps> & {
  Step: FC<FRCStepProps>
}

const TransSteps = FRCSteps as FrcStepsComponent

TransSteps.Step = FRCStep

export default TransSteps