import React, { FC } from 'react'
import classNames from 'classnames'
import { Tooltip as AntdTooltip, TooltipProps as AntdTooltipProps } from 'antd'

export type ToolTipPlacementType = 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
export type ToolTipBorderType = 'thick' | 'thin'

interface BaseTooltipProps {
  /** 设置tooltip内容 */
  title?: React.ReactNode
  /** 设置tooltip显示位置*/
  placement?: ToolTipPlacementType
  /** 设置tooltip是否携带箭头 */
  hasArrow?: boolean
  /** 设置边框样式 */
  borderType?: ToolTipBorderType
  /** 用于手动控制提示是否可见 */
  visible?: boolean
  /** 该值将合并到placement的配置中,设置内容参考dom-align*/
  align?: object
  /** 箭头是否指向目标元素中心 */
  arrowPointAtCenter?: boolean
  /** tooltip位置受限时是否自动调整位置	 */
  autoAdjustOverflow?: boolean
  /** 默认显示状态 */
  defaultVisible?: boolean
  /** tooltip隐藏后是否销毁dom中的tooltip */
  destroyTooltipOnHide?: boolean
  /** tooltip显示迟延（s） */
  mouseEnterDelay?: number
  /** tooltip消失迟延（s） */
  mouseLeaveDelay?: number
  /** 提示框类名 */
  overlayClassName?: string
  /** 提示框外层样式 */
  overlayStyle?: object
  /** 提示框内层样式 */
  overlayInnerStyle?: object
  /** 设置 tooltip 的 z-index */
  zIndex?: number
  /** tooltip可见状态变化的回调 */
  onVisibleChange?: (visible: boolean) => void
}

export type FRCTooltipProps = BaseTooltipProps & Omit<AntdTooltipProps, 'placement' | 'autoAdjustOverflow' | 'destroyTooltipOnHide' | 'onVisibleChange'>

export const Tooltip: FC<FRCTooltipProps> = (props) => {
  const {
    title,
    placement,
    hasArrow,
    borderType,
    overlayClassName,
    children,
    ...restProps
  } = props

  const classes = classNames('yui-tooltip', overlayClassName, {
    [`yui-tooltip-without-arrow`]: !hasArrow,
    [`yui-tooltip-placement-${placement}`]: placement,
    [`yui-tooltip-border-${borderType}`]: borderType,
  })

  const options = {
    title: title,
    overlayClassName: classes,
    placement: placement,
    ...restProps,
  }

  // main
  return (
    <AntdTooltip {...options}>
      {children}
    </AntdTooltip>
  )
}

// normal
Tooltip.defaultProps = {
  placement: 'right',
  hasArrow: true,
  borderType: 'thin',
  arrowPointAtCenter: false,
  autoAdjustOverflow: true,
  defaultVisible: false,
  destroyTooltipOnHide: false,
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  title: '文字提示',
}

export default Tooltip
