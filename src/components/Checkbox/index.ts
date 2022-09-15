import { ForwardRefExoticComponent, RefAttributes } from 'react'
import FRCCheckbox, { FRCCheckboxProps } from './checkbox'
import FRCCheckboxGroup from './checkboxGroup'

export type { FRCCheckboxProps }
export type { FRCCheckboxGroupProps } from './checkboxGroup'

export type FRCCheckboxComponent = ForwardRefExoticComponent<FRCCheckboxProps & RefAttributes<HTMLInputElement>> & {
  Group: typeof FRCCheckboxGroup
}

const TransCheckbox = FRCCheckbox as FRCCheckboxComponent

TransCheckbox.Group = FRCCheckboxGroup

export default TransCheckbox