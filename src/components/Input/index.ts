import { ForwardRefExoticComponent, RefAttributes } from 'react'
import FRCInput, { FRCInputProps,InputRef } from './input'
import FRCSearch from './search'
import FRCGroup from './group'
import FRCTextArea from './textArea'
import FRCPassword from './password'

export type { FRCInputProps, InputRef } from './input'
export type { FRCSearchProps } from './search'
export type { FRCGroupProps } from './group'
export type { FRCTextAreaProps, TextAreaRef } from './textArea'
export type { FRCPasswordProps } from './password'

export type FrcInputComponent = ForwardRefExoticComponent<FRCInputProps & RefAttributes<InputRef>> & {
  Search: typeof FRCSearch
  Group: typeof FRCGroup
  TextArea: typeof FRCTextArea
  Password: typeof FRCPassword
}

const TransInput = FRCInput as FrcInputComponent

TransInput.Search = FRCSearch
TransInput.Group = FRCGroup
TransInput.TextArea = FRCTextArea
TransInput.Password = FRCPassword

export default TransInput
