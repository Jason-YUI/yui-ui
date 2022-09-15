import React, { useState, forwardRef } from 'react'
import classNames from 'classnames'
import AntdInputNumber, { InputNumberProps } from 'antd/es/input-number'
export interface BaseInputNumberProps extends InputNumberProps {
  /** 带标签的 input，设置后置标签 */
  addonAfter?: React.ReactNode
  /** 带标签的 input，设置前置标签 */
  addonBefore?: React.ReactNode
  /** 自动获取焦点 */
  autoFocus?: boolean
  /** 是否有边框 */
  bordered?: boolean
  /** 是否显示增减按钮 */
  controls?: boolean
  /** 小数点 */
  decimalSeparator?: string
  /** 初始值 */
  defaultValue?: number | string
  /** 禁用 */
  disabled?: boolean
  /** 指定输入框展示值的格式 */
  formatter?: (value?: number | string, info?: { userTyping: boolean, input: string }) => string
  /** 是否启用键盘快捷行为 */
  keyboard?: boolean
  /** 最大值 */
  max?: number | string
  /** 最小值 */
  min?: number | string
  /** 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 */
  parser?: (string: string | undefined) => string | number
  /** 数值精度，配置 formatter 时会以 formatter 为准 */
  precision?: number
  /** 只读 */
  readOnly?: boolean
  /** 带有前缀图标的 input */
  prefix?: React.ReactNode
  /** 每次改变步数，可以为小数 */
  step?: number | string
  /** 字符值模式，开启后支持高精度小数。同时 onChange 将返回 string 类型 */
  stringMode?: boolean
  /** 当前值 */
  value?: number
  /** 变化回调 */
  onChange?: (value: number | string | null) => void
  /** 按下回车的回调 */
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  /** 点击上下箭头的回调 */
  onStep?: (value: number | string, info: { offset: number | string, type: 'up' | 'down' } | null) => void
  /** 移除焦点 */
  blur?: () => void
  /** 获取焦点 */
  focus?: () => void
}

export type FRCInputNumberProps = BaseInputNumberProps

export const InputNumber = forwardRef<HTMLInputElement, FRCInputNumberProps>((props, ref) => {
  const [keyDownEnter, setKeyDownEnter] = useState(false)
  const [isFocs, setIsFocs] = useState(false)

  const { className, bordered, disabled, onChange, onKeyDown, onFocus, onBlur, ...restProps } = props

  const classes = classNames('yui-input-number', className, {
    [`yui-input-number-no-border`]: !bordered,
    [`yui-input-number-enter`]: keyDownEnter,
    [`yui-input-number-disabled`]: disabled,
    [`yui-input-number-focus`]: isFocs,
  })

  let options = {
    className: classes,
    bordered,
    disabled,
    ...restProps,
    onFocus: (e: any) => {
      onFocus && onFocus(e)
      setIsFocs(true)
    },
    onBlur: (e: any) => {
      onBlur && onBlur(e)
      setIsFocs(false)
    },
    onKeyDown: (e: any) => {
      onKeyDown && onKeyDown(e)
      if (e.code === 'Enter') {
        setKeyDownEnter(true)
      }
    },
    onChange: (e: any) => {
      onChange && onChange(e)
      if (!e && e !== 0) {
        setKeyDownEnter(false)
      }
    },
  }

  // main
  return <AntdInputNumber ref={ref} {...options} />
})

// normal
InputNumber.defaultProps = {
  autoFocus: false,
  bordered: true,
  controls: true,
  disabled: false,
  keyboard: true,
  readOnly: false,
  stringMode: false,
  step: 1,
  placeholder: '请输入',
}

export default InputNumber
