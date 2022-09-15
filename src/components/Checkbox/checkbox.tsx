import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { Checkbox as AntdCheckbox , CheckboxProps } from 'antd'

interface CheckboxChangeEventTarget {
  indeterminate?: boolean;
  checked: boolean;
}
export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

export interface BaseCheckboxProps extends CheckboxProps{
  /** 自动获取焦点 */
  autoFocus?: boolean
  /** 指定当前是否选中 */
  checked?: boolean
  /** 初始是否选中 */
  defaultChecked?: boolean
  /** 失效状态 */
  disabled?: boolean
  /** 设置 indeterminate 状态，只负责样式控制 */
  indeterminate?: boolean
  /** 变化时回调函数 */
  onChange?: ((e: CheckboxChangeEvent) => void) | undefined
}

export type FRCCheckboxProps = BaseCheckboxProps

export const Checkbox = forwardRef<HTMLInputElement, FRCCheckboxProps>((props, ref) => {
  const { className, ...restProps } = props
  const antCheckboxRef = React.useRef<any>(null)

  const classes = classNames('yui-checkbox', className, {})

  const options = {
    className: classes,
    ...restProps,
  }

  React.useImperativeHandle(ref, () => antCheckboxRef.current.input)

  // main
  return <AntdCheckbox ref={antCheckboxRef} {...options} />
})

// normal
Checkbox.defaultProps = {
  autoFocus: false,
  defaultChecked: false,
  disabled: false,
  indeterminate: false,
}

export default Checkbox
