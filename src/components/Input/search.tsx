import React, { useState, forwardRef } from 'react'
import classNames from 'classnames'
import Input, { SearchProps, InputRef } from 'antd/es/input'
import { FiSearch } from 'react-icons/fi'
import Icon from '../Icon';

const { Search } = Input
export interface BaseInputProps {
  /** 是否有确认按钮，可设为按钮文字。该属性会与 addonAfter 冲突。 */
  enterButton?: boolean | React.ReactNode
  /** 加载中 */
  loading?: boolean
  /** 点击搜索图标、清除图标，或按下回车键时的回调 */
  onSearch?: (value: string) => void
}

export type FRCSearchProps = BaseInputProps & SearchProps

export const FRCSearch = forwardRef<InputRef, FRCSearchProps>((props, ref) => {
  const [keyDownEnter, setKeyDownEnter] = useState(false)

  const {
    className,
    bordered,
    prefix,
    loading,
    value,
    allowClear,
    disabled,
    onChange,
    onKeyDown,
    ...restProps
  } = props

  const classes = classNames('yui-input', className, {
    [`yui-input-no-border`]: !bordered,
    [`yui-input-enter`]: keyDownEnter,
    [`yui-input-prefix`]: prefix,
    [`yui-input-search-loading`]: loading,
    [`yui-input-search-disabled`]: disabled,
  })

  const calAllowClear = (arrow: boolean | { clearIcon?: React.ReactNode } | undefined) => {
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
    prefix,
    loading,
    value,
    disabled,
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
    },
  }

  // main
  return <Search ref={ref} {...options} />
})

// normal
FRCSearch.defaultProps = {
  bordered: true,
  enterButton: <FiSearch />,
  loading: false,
  type: 'default',
  allowClear: false,
}

export default FRCSearch
