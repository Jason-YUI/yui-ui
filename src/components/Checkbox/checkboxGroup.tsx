import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { Checkbox } from 'antd'
import { CheckboxGroupProps } from 'antd/es/checkbox/Group'

const { Group } = Checkbox
interface BaseCheckboxGroupProps extends CheckboxGroupProps{
  /** 默认选中的选项 */
  defaultValue?: string[]
  /** 整组失效 */
  disabled?: boolean
  /** CheckboxGroup 下所有 input[type="checkbox"] 的 name 属性 */
  name?: string
  /** 指定可选项 */
  options?: string[] | number[] | Array<{ label: string; value: string | number }>
  /** 指定选中的选项 */
  value?: (string | number | boolean)[]
  /** 变化时回调函数 */
  onChange?: (checkedValue: (string | number | boolean)[]) => void
}

export type FRCCheckboxGroupProps = BaseCheckboxGroupProps

export const FRCCheckboxGroup = forwardRef<HTMLDivElement, FRCCheckboxGroupProps>((props, ref) => {
  const { className, ...restProps } = props

  const classes = classNames('yui-checkbox-group', className, {})

  const options = {
    className: classes,
    ...restProps,
  }

  // main
  return <Group ref={ref} {...options} />
})

// normal
FRCCheckboxGroup.defaultProps = {
  defaultValue: [],
  disabled: false,
  options: [],
}

export default FRCCheckboxGroup
