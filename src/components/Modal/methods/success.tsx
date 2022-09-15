import React, { FC } from 'react'
import classNames from 'classnames'
import Modal from 'antd/es/modal'

import { FRCMethodProps } from './confirm'

export const Success: FC<FRCMethodProps> = (props) => {
  const {
    className,
    cancelButtonProps,
    okButtonProps,
    keyboard,
    ...restProps
  } = props
  const classes = classNames('yui-modal', className, {
  })

  const cancelBtnClasses = classNames('yui-btn', cancelButtonProps?.className, {})

  const okBtnClasses = classNames('yui-btn yui-btn-primary', okButtonProps?.className, {})

  const options = {
    className: classes,
    keyboard: keyboard || false,
    cancelButtonProps: {
      ...cancelButtonProps,
      className: cancelBtnClasses,
      style: { width: 60, background: '#4A4D4C', ...cancelButtonProps?.style },
    },
    okButtonProps: {
      ...okButtonProps,
      className: okBtnClasses,
      style: { width: 120, ...okButtonProps?.style },
    },
    ...restProps,
  }

  // main
  return <>{Modal.success(options)}</>
}

// normal
Success.defaultProps = {
  autoFocusButton: 'ok',
  cancelText: '取消',
  centered: false,
  closable: false,
  keyboard: true,
  mask: true,
  maskClosable: false,
  okText: '确定',
  okType: 'primary',
  width: 416,
  zIndex: 1000
}

export default Success
