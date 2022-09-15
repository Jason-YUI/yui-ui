import React, { forwardRef } from 'react'
import classNames from 'classnames'
import Input, { PasswordProps, InputProps, InputRef } from 'antd/es/input'

const { Password } = Input

interface BasePasswordProps {
  /** 自定义切换按钮	 */
  iconRender?: (visible: boolean) => React.ReactNode
  /** 是否显示切换按钮	 */
  visibilityToggle?: boolean
}

export type FRCPasswordProps = BasePasswordProps & PasswordProps & InputProps

export const FRCPassword = forwardRef<InputRef, FRCPasswordProps>((props,ref) => {

  const {
    className,
    ...restProps
  } = props

  const classes = classNames('yui-input yui-input-password', className, {
  })

  let options = {
    className: classes,
    ...restProps,
  }

  // main
  return <Password ref={ref} {...options} />
})

// normal
FRCPassword.defaultProps = {
  bordered: true,
  placeholder: "input password",
  visibilityToggle: true
}

export default FRCPassword
