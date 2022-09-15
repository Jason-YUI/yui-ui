import { RefAttributes, ForwardRefExoticComponent } from 'react'
import FRCSelect, { FRCSelectProps, SelectRef } from './select'
import FRCSelectOption from './option'
import OptGroup from './optGroup'

import Select from 'antd/es/select'

export type { FRCSelectProps, SelectRef }
export type { FRCSelectOptionProps } from './option'
export type { FRCSelectOptGroupProps } from './optGroup'

const { OptGroup: AntdOptGroup } = Select

// build error: private name 'AntdOptGroup'
export { AntdOptGroup }

export type FrcSelectComponent = ForwardRefExoticComponent<FRCSelectProps & RefAttributes<SelectRef>> & {
  Option: typeof FRCSelectOption
  OptGroup: typeof AntdOptGroup
  OptGroupApi: typeof OptGroup
}

const TransSelect = FRCSelect as FrcSelectComponent

TransSelect.Option = FRCSelectOption
TransSelect.OptGroup = AntdOptGroup
TransSelect.OptGroupApi = OptGroup

export default TransSelect
