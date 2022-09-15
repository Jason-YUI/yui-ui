import {FC} from 'react'
import FRCRadio from './radio'
import FRCRadioGroup, {FRCRadioGroupProps} from './radioGroup';
import {Radio, RadioProps} from 'antd'
import {RadioButtonProps} from 'antd/es/radio/radioButton';

const {Button} = Radio

export type FrcRadioComponent = FC<RadioProps> & {
  Group: FC<FRCRadioGroupProps>;
  Button: FC<RadioButtonProps>
}

export type { RadioProps, RadioButtonProps, FRCRadioGroupProps}

const TransRadio = FRCRadio as FrcRadioComponent

TransRadio.Group = FRCRadioGroup
TransRadio.Button = Button

export default TransRadio
