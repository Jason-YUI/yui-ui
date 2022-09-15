import React, { useState, useRef, forwardRef } from 'react'
import classNames from 'classnames'
import AntdInput, { InputProps, InputRef } from 'antd/es/input'
import { FiSearch } from 'react-icons/fi'
import { composeRef } from '../../utils'
import Icon from '../Icon';

type InputType = 'default' | 'icon-only'
interface BaseInputProps {
  /** 交互类型 */
  performance?: InputType
  /** 带标签的 input，设置后置标签 */
  addonAfter?: React.ReactNode
  /** 带标签的 input，设置前置标签 */
  addonBefore?: React.ReactNode
  /** 可以点击清除图标删除内容 */
  allowClear?: boolean | { clearIcon: React.ReactNode }
  /** 是否有边框 */
  bordered?: boolean
  /** 输入框默认内容 */
  defaultValue?: string
  /** 是否禁用状态，默认为 false */
  disabled?: boolean
  /** 输入框的 id */
  id?: string
  /** 最大长度 */
  maxLength?: number
  /** 是否展示字数 */
  showCount?: boolean | { formatter: (props: { count: number, maxLength?: number }) => React.ReactNode }
  /** 带有前缀图标的 input */
  prefix?: React.ReactNode
  /** 带有后缀图标的 input */
  suffix?: React.ReactNode
  /** 输入框内容 */
  value?: string
  /** 输入框内容变化时的回调 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  /** 按下回车的回调 */
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  /** 取消焦点 */
  blur?: () => void
  /** 获取焦点 */
  focus?: (option?: { preventScroll?: boolean, cursor?: 'start' | 'end' | 'all' }) => void
}

export type FRCInputProps = BaseInputProps & InputProps

export type { InputRef };

export const Input = forwardRef<InputRef, FRCInputProps>((props, ref) => {
  const [keyDownEnter, setKeyDownEnter] = useState(false)
  const inputRef = useRef<InputRef | null>(null)

  const {
    className,
    bordered,
    prefix,
    suffix,
    performance,
    value,
    showCount,
    onChange,
    onKeyDown,
    allowClear,
    ...restProps
  } = props

  const classes = classNames('yui-input', className, {
    [`yui-input-no-border`]: !bordered,
    [`yui-input-enter`]: keyDownEnter,
    [`yui-input-prefix`]: prefix,
    [`yui-input-${performance}`]: performance
  })

  const prefixNode = () => {
    if (performance !== 'icon-only') {
      return prefix;
    }
    const handleIconClick = () => {
      inputRef.current?.focus();
    }
    return (
      <span onClick={handleIconClick} style={{ height: 12 }}>
        {prefix || <FiSearch />}
      </span>
    )
  }


  const calAllowClear = (arrow: boolean | { clearIcon: React.ReactNode } | undefined) => {
    if (typeof arrow === 'boolean') {
      return arrow ? {
        clearIcon:
          <div className="yui-input-clear-icon-box">
            <Icon className="yui-clear-icon" type="close-square" />
          </div >
      } : false
    }

    return arrow
  }

  let options = {
    className: classes,
    ...restProps,
    allowClear: calAllowClear(allowClear),
    bordered,
    prefix: prefixNode(),
    suffix: showCount ? suffix || <span></span> : suffix,
    showCount,
    value,
    onKeyDown: (e: any) => {
      onKeyDown && onKeyDown(e)
      if (e.code === 'Enter') {
        setKeyDownEnter(true)
      }
    },
    onChange: (e: any) => {
      onChange && onChange(e)
      if (!e.target.value && e.target.value !== 0) {
        setKeyDownEnter(false)
      }
    }
  }

  // main
  return <AntdInput ref={composeRef(ref, inputRef)} {...options} />
})


// normal
Input.defaultProps = {
  bordered: true,
  placeholder: '请输入...',
  performance: 'default',
  disabled: false,
  showCount: false,
  allowClear: false,
}

export default Input
