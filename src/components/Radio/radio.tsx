import React, { FC } from 'react'
import classNames from 'classnames'
import { Radio as AntdRadio, RadioProps } from 'antd'
export interface BaseRadioProps extends RadioProps{
  /** 自动获取焦点 */
  autoFocus?: boolean;
  /** 指定当前是否选中 */
  checked?: boolean;
  /** 初始是否选中 */
  defaultChecked?: boolean;
  /** 禁用 Radio */
  disabled?: boolean;
  /** 根据 value 进行比较，判断是否选中 */
  value?: any;
}

export type FRCRadioProps = BaseRadioProps

export const Radio: FC<FRCRadioProps> = (props) => {
  const { className, ...restProps } = props

  const classes = classNames('yui-radio', className, {})

  const options = {
    className: classes,
    ...restProps,
  }

  // main
  return <AntdRadio {...options} />
}

// normal
Radio.defaultProps = {
  autoFocus: false,
  defaultChecked: false,
  disabled: false
}

export default Radio
