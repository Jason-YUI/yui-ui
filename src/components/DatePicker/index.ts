import { ForwardRefExoticComponent, RefAttributes } from 'react'
import FRCDatePicker, { FRCDatePickerProps } from './datePicker'
import FRCRangePicker from './rangePicker'
import { PickerRef } from './interface'

export type { FRCDatePickerProps, PickerRef }
export type { FRCRangePickerProps } from './rangePicker'

export type FRCDatePickerComponent = ForwardRefExoticComponent<FRCDatePickerProps & RefAttributes<PickerRef>>& {
    RangePicker: typeof FRCRangePicker
}

const TransDatePicker = FRCDatePicker as FRCDatePickerComponent
TransDatePicker.RangePicker = FRCRangePicker

export default TransDatePicker
