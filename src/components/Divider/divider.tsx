import React, { FC } from 'react'
import classNames from 'classnames'
import { Divider as AntdDivider, DividerProps } from 'antd'

interface BaseDividerProps {
  /** 设置按钮类型 */
  children?: React.ReactNode
  /** 分割线样式类 */
  className?: string
  /** 是否虚线 */
  dashed?: boolean
  /** 分割线标题的位置 */
  orientation?: 'left' | 'right' | 'center'
  /** 标题和最近 left/right 边框之间的距离，去除了分割线，同时 orientation 必须为 left 或 right */
  orientationMargin?: string | number
  /** 文字是否显示为普通正文样式 */
  plain?: boolean
  /** 分割线样式对象 */
  style?: React.CSSProperties
  /** 水平还是垂直类型 */
  type?: 'horizontal' | 'vertical'
}

export type FRCDividerProps = BaseDividerProps & DividerProps

export const Divider: FC<FRCDividerProps> = (props) => {
  const {
    className,
    ...restProps
  } = props

  const classes = classNames('yui-divider', className, {
  })

  const options = {
    className: classes,
    ...restProps,
  }

  // main
  return (
    <AntdDivider {...options} />
  )
}

// normal
Divider.defaultProps = {
  dashed: false,
  orientation: 'center',
  plain: false,
  type: 'horizontal',
}

export default Divider
