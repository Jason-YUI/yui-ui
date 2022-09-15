import React, { FC, useEffect, useState } from 'react'
import { LeftOutlined, RightOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import classNames from "classnames";

export type PlacementType = 'top' | 'right' | 'bottom' | 'left';

export interface FRCSqueezeDrawerProps {
  /** 弹出层宽度 placement设置为 right 和 left 时生效 */
  width?: number | string,
  /** 弹出层高度 placement设置为 top 和 bottom 时生效 */
  height?: number | string,
  /** 折叠抽屉的外层类名 */
  className?: string,
  /** 弹出方向 */
  placement?: PlacementType,
  /** 弹出层内容 */
  extraContent?: React.ReactNode,
  /** 主层内容 */
  mainContent?: React.ReactNode
  /** 开启图标 */
  // openIcon?: ReactElement,
  /** 关闭图标 */
  // closeIcon?: ReactElement
  /** 弹出层内容是否显示 */
  extraContentVisible?: boolean
  /** 点击开关回调 */
  onOpenChange?: (open: boolean) => void
  /** SqueezeDrawer样式 */
  style?: React.CSSProperties
  /** 弹出层样式 */
  extraContentStyle?: React.CSSProperties
  /** 主层级样式 */
  mainContentStyle?: React.CSSProperties
  /** 开关样式 */
  turnStyle?: React.CSSProperties
}

export const SqueezeDrawer: FC<FRCSqueezeDrawerProps> = (props) => {
  const {
    extraContent,
    mainContent,
    extraContentVisible,
    className,
    width,
    height,
    style: styleProps,
    extraContentStyle: extraContentStyleProps,
    mainContentStyle,
    turnStyle: turnStyleProps,
    placement,
    onOpenChange,
  } = props

  const [visible, setVisible] = useState(false)

  useEffect(() => { setVisible(!!extraContentVisible) }, [extraContentVisible])

  const handleClick = (): void => {
    if (onOpenChange) {
      // 受控组件
      onOpenChange(!visible)
    } else {
      // 默认切换
      if (extraContentVisible === undefined) {
        setVisible(!visible)
      }
    }
  }

  const renderOpenIcon = (currentPlacement: PlacementType, currentVisible: boolean) => {
    let openIcon = <LeftOutlined />
    if (currentPlacement === 'top') {
      openIcon = (currentVisible ? <UpOutlined /> : <DownOutlined />)
    }
    if (currentPlacement === 'bottom') {
      openIcon = (currentVisible ? <DownOutlined /> : <UpOutlined />)
    }
    if (currentPlacement === 'right') {
      openIcon = (currentVisible ? <RightOutlined /> : <LeftOutlined />)
    }
    if (currentPlacement === 'left') {
      openIcon = (currentVisible ? <LeftOutlined /> : <RightOutlined />)
    }
    return openIcon
  }

  const getContentContainerStyle = (currentPlacement: PlacementType) => {
    let style: React.CSSProperties = {}
    const styleOfPlacement = {
      top: 'column-reverse',
      right: 'row',
      bottom: 'column',
      left: 'row-reverse'
    }
    style.flexDirection = styleOfPlacement[currentPlacement] as any
    return style
  }

  const getExtraContentStyle = (currentPlacement: PlacementType, currentVisible: boolean) => {
    let style: React.CSSProperties = {}
    if (currentPlacement === 'top' || currentPlacement === 'bottom') {
      style.height = currentVisible ? height : 0
    }
    if (currentPlacement === 'right' || currentPlacement === 'left') {
      style.width = currentVisible ? width : 0
    }
    style = {
      ...style,
      ...extraContentStyleProps
    }
    return style
  }

  const getTurnStyle = (currentPlacement: PlacementType, currentVisible: boolean) => {
    let style: React.CSSProperties = {}

    if (currentPlacement === 'top' || currentPlacement === 'bottom') {
      style[currentPlacement] = currentVisible ? height : 0
    }

    if (currentPlacement === 'left' || currentPlacement === 'right') {
      style[currentPlacement] = currentVisible ? width : 0
    }

    style = {
      ...style,
      ...turnStyleProps
    }
    return style
  }

  const classes = classNames('yui-squeeze-drawer', className, {
    [`yui-squeeze-drawer-${placement}`]: placement,
    'yui-squeeze-drawer-open': visible
  })

  return (
    <div className={classes} style={styleProps}>
      <div className='content-container' style={getContentContainerStyle(placement!)}>
        <div className='yui-squeeze-drawer-main-content' style={mainContentStyle}>
          {mainContent}
        </div>
        <div className='yui-squeeze-drawer-extra-content' style={getExtraContentStyle(placement!, visible)}>
          {visible && extraContent}
        </div>
      </div>
      <div className='open-btn' onClick={handleClick} style={getTurnStyle(placement!, visible)} >
        {renderOpenIcon(placement!, visible)}
      </div>
    </div>
  )
}

// normal
SqueezeDrawer.defaultProps = {
  placement: 'left',
  width: 300,
  height: 200,
  mainContent: (
    <div
      style={{
        textAlign: 'center',
        height: '100%',
        width: '100%'
      }}>
      我是主层级
    </div>
  ),
  extraContent: (
    <div
      style={{
        textAlign: 'center',
      }}>
      我是弹出层级
    </div>
  )
}

export default SqueezeDrawer
