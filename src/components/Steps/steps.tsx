import React from 'react'
import classNames from 'classnames'
import {Steps as AntSteps, StepsProps} from 'antd'

export type Status = 'error' | 'process' | 'finish' | 'wait';

type ProgressDotRender = (iconDot: any, info: {
  index: number;
  status: Status;
  title: React.ReactNode;
  description: React.ReactNode;
}) => React.ReactNode;

export type StepsSize = 'large' | 'middle' | 'small';

export type TextLayout = 'default' | 'updown';

interface BaseStepsProps {
  /** 步骤条类名 */
  className?:string;
  /** 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态 */
  current?: number;
  /** 指定大小，默认small */
  size?: StepsSize;
  /** 指定步骤条方向。目前支持水平（horizontal）和竖直（vertical）两种方向 */
  direction?: 'horizontal' | 'vertical';
  /** 点状步骤条，可以设置为一个 function */
  progressDot?: 'default' | boolean | ProgressDotRender;
  /** 文本排版,仅在direction为水平（horizontal）时生效 */
  textLayout?: TextLayout;
  /** 指定当前步骤的状态 */
  status?: Status;
  /** 起始序号，从 0 开始记数 */
  initial?: number;
  /** 点击切换步骤时触发 */
  onChange?: (current: number) => void;
}

export type FRCStepsProps = BaseStepsProps & Omit<StepsProps,'progressDot' | 'labelPlacement' | 'size' | 'percent' | 'type' | 'responsive'>

export const Steps: React.FC<FRCStepsProps> = (props) => {
  const {
    className,
    progressDot,
    size,
    textLayout,
    direction,
    initial = 0,
    ...restProps
  } = props
  
  const classes = classNames('yui-steps', className, {
    'yui-progress-dot': progressDot === 'default',
    [`yui-size-${size}`]: size,
    'yui-text-layout-updown': direction === 'horizontal' && textLayout === 'updown'
  })

  const defaultDotNode: ProgressDotRender = (iconDot,{index}) => {
    if(size === 'large') {
      return (
        <span className='yui-custom-large-dot'>{index - initial + 1}</span>
      )
    }
    return (<span className='yui-custom-dot'></span>);
  }

  const options = {
    className: classes,
    progressDot: progressDot === 'default'? defaultDotNode : progressDot,
    direction,
    initial,
    ...restProps,
  }

  return (
    <AntSteps {...options} responsive={false} labelPlacement='vertical' />
  )
}

Steps.defaultProps = {
  current: 0,
  initial: 0,
  progressDot: 'default',
  size: 'small',
  direction: 'horizontal',
  textLayout: 'updown'
}

export default Steps
