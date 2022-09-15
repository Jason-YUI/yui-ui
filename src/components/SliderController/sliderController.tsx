 import React, { FC,useState } from 'react'
import classNames from 'classnames'
import {Slider as AntdSlider } from 'antd'
import {SliderMarks, SliderRangeProps, SliderSingleProps} from 'antd/es/slider'
import { TooltipPlacement } from 'antd/es/tooltip';

export type SliderSizeType = 'small' | 'middle' | 'large';

interface BaseSliderProps {
  /** 设置滑动的大小 */
  size?: SliderSizeType;
  /** 设置初始取值。当 range 为 false 时，使用 number，否则用 [number, number] */
  defaultValue?: number | [number, number];
  /** 值为 true 时，滑块为禁用状态 */
  disabled?: boolean;
  /** 是否只能拖拽到刻度上 */
  dots?: boolean;
  /** Tooltip 渲染父节点，默认渲染到 body 上 */
  getTooltipPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列  */
  included?: boolean;
  /** 刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式  */
  marks?: SliderMarks;
  /** 最大值 */
  max?: number;
  /** 最小值 */
  min?: number;
  /** 步长，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时 Slider 的可选值仅有 marks 标出来的部分 */
  step?: null | number;
  /** SliderController 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值，若为 null，则隐藏 Tooltip */
  tipFormatter?: null | ((value?: number) => React.ReactNode);
  /** 设置 Tooltip 展示位置。参考 Tooltip */
  tooltipPlacement?: TooltipPlacement;
  /** 值为 true 时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时 */
  tooltipVisible?: boolean;
  /** 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number] */
  value?: number | [number, number];
  /** 与 onmouseup 触发时机一致，把当前值作为参数传入 */
  onAfterChange?: (value: number | [number, number]) => void;
  /** 当 SliderController 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入 */
  onChange?: (value: number | [number, number]) => void;
}

export type FRCSliderControllerProps = BaseSliderProps & (SliderSingleProps | SliderRangeProps);

export const SliderController: FC<FRCSliderControllerProps> = (props) => {
  const [active, setActive] = useState<boolean>(false);
  const {
    className,
    size,
    onChange,
    onAfterChange,
    ...restProps
  } = props
  const classes = classNames('yui-slider', className, {
    [`yui-slider-${size}`]: size,
    'yui-slider-active': active
  })

  const options = {
    className: classes,
    onChange:(value: number | [number, number]) => {
      setActive(true)
      onChange && onChange(value)
    },
    onAfterChange:(value: number | [number, number]) => {
      setActive(false)
      onAfterChange && onAfterChange(value)
    },
    ...restProps,
  }

  // main
  return (
    <AntdSlider {...options} />
  )
}

// normal
SliderController.defaultProps = {
  size: 'middle'
}

export default SliderController
