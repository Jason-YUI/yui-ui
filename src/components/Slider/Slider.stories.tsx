import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { ComponentMeta } from '@storybook/react'

import {
  Title,
  Description,
  ArgsTable,
  Stories,
  Heading,
  Subheading,
} from '@storybook/addon-docs'

import Slider, { FRCSliderProps } from './index'
import InputNumber from '../InputNumber'
import Switch from '../Switch'

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { Slider } from 'yui-ui';
~~~

`

  return (
    <>
      <ReactMarkdown
        children={markdown}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={tomorrow}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      />
    </>
  )
}

// ----------------------------------------------------------------

export default {
  title: '数据录入/Slider 滑动输入条',
  component: Slider,
  parameters: {
    docs: {
      // docs 页面 => 总体布局
      page: () => (
        <>
          <Title />
          <Description>滑动型输入器，展示当前值和可选范围。</Description>
          <ImportComponent />
          <Stories title="组件总览" includePrimary={true} />

          <Heading>API</Heading>
          <Subheading>属性</Subheading>

          <Subheading>Slider</Subheading>
          <ArgsTable of={Slider} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Slider>

// -------------------------------------------------------------------

export const Default = (args: FRCSliderProps) => <Slider {...args} />

Default.storyName = '默认 Slider'
Default.parameters = {
  controls: { hideNoControlsWarning: true }
}

// -----------------------------------------------------------------

export const SizeSliderComponent = () => {
  return (
    <>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} size="large" style={{ margin: '70px 0' }} />
      <Slider defaultValue={30} size="small" />
      <Slider range defaultValue={[20, 50]} />
    </>
  )
}
SizeSliderComponent.storyName = '大小 Slider'
SizeSliderComponent.parameters = {
  controls: { hideNoControlsWarning: true }
}

// -------------------------------------------------------------------

export const MarksSliderComp = () => {
  const marks = {
    0: '0',
    26: '26',
    37: '37',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100</strong>,
    },
  }
  const style = { color: '#FFEBC8' }
  return (
    <>
      <h4 style={style}>included=true</h4>
      <Slider marks={marks} defaultValue={37} />
      <Slider range marks={marks} defaultValue={[26, 37]} />

      <h4 style={style}>included=false</h4>
      <Slider marks={marks} included={false} defaultValue={37} />

      <h4 style={style}>marks & step</h4>
      <Slider marks={marks} step={10} defaultValue={37} />

      <h4 style={style}>step=null</h4>
      <Slider marks={marks} step={null} defaultValue={37} />
    </>
  )
}

MarksSliderComp.storyName = '带标签的滑块 Slider'
MarksSliderComp.parameters = {
  controls: { hideNoControlsWarning: true }
}

// -------------------------------------------------------------------

export const MarksTypeSliderComponent = () => {
  const marks = {
    0: '0',
    25: '25',
    50: '50',
    75: '75',
    100: '100',
  }
  return (
    <>
      <Slider range marks={marks} type='small' defaultValue={[25, 50]} />
      <Slider range marks={marks} type='small' defaultValue={[25, 40]} />
      <Slider range marks={marks} type='small' defaultValue={[25, 50]} />
      <Slider range marks={marks} type='small' defaultValue={[25, 80]} />
    </>
  )
}

MarksTypeSliderComponent.storyName = '大小滑块 Slider'
MarksTypeSliderComponent.parameters = {
  controls: { hideNoControlsWarning: true }
}

// -----------------------------------------------------------------

export const StepSliderComponent = () => {
  const marks = {
    0: '0',
    100: '100'
  }
  
  const InputStep = (disabled?: boolean) => {
    const [startVal, setStartVal] = useState(1);
    const [endValue, setEndValue] = useState(100);
    const handleChange = (value: any, key?: string) => {
      switch(key) {
        case 'start':
          setStartVal(value);
          break;
        case 'end':
          setEndValue(value);
          break;
        default:
          const [start, end] = value;
          setStartVal(start);
          setEndValue(end);
      }
    }
    const style= {
      width: 320,
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
    };
    return (
      <div style={style}>
        <div>
         <InputNumber
            disabled={disabled}
            min={0}
            max={100}
            style={{width: 148}}
            value={startVal}
            onChange={(v) => handleChange(v, 'start')}
          />
          <span style={{margin: '0 4px', color: '#8F9598'}}>-</span>
          <InputNumber
            disabled={disabled}
            min={0}
            max={100}
            style={{width: 148}}
            value={endValue}
            onChange={(v) => handleChange(v, 'end')}
          />
        </div>
        <Slider
          style={{width: 288}}
          marks={marks}
          range
          disabled={disabled}
          onChange={(v) => handleChange(v)}
          value={[startVal, endValue]}
        />
      </div>
    )
  }
  const DisabledStep = () => {
    return InputStep(true)
  }
  return (
    <>
      {InputStep()}
      <br />
      <DisabledStep />
    </>
  )
}

StepSliderComponent.storyName = '联动交互 Slider'
StepSliderComponent.parameters = {
  controls: {hideNoControlsWarning: true}
}

// -----------------------------------------------------------------

export const TipSliderComp = () => {
  const formatter = (val: number | undefined) => {
    return `${val}%`
  }
  return (
    <>
      <Slider tipFormatter={formatter} />
      <Slider tipFormatter={null} />
    </>
  )
}

TipSliderComp.storyName = '自定义提示 Slider'
TipSliderComp.parameters = {
  controls: {hideNoControlsWarning: true}
}

// -----------------------------------------------------------------

export const VerticalSliderComp = () => {
  const style = {
    display: 'inline-block',
    height: 300,
    marginLeft: 70
  }

  const marks = {
    0: '0',
    26: '26',
    37: '37',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100</strong>,
    },
  }
  return (
    <>
      <div style={style}>
        <Slider vertical defaultValue={30} />
      </div>
      <div style={style}>
        <Slider vertical range step={10} defaultValue={[20, 50]} />
      </div>
      <div style={style}>
        <Slider vertical range marks={marks} defaultValue={[26, 37]} />
      </div>
    </>
  )
}

VerticalSliderComp.storyName = '垂直方向的 Slider'
VerticalSliderComp.parameters = {
  controls: { hideNoControlsWarning: true }
}

// -----------------------------------------------------------------

export const ReverseSliderComp = () => {
  const [reverse, setReverse] = React.useState<boolean>(true)
  const handleReverseChange = (value: boolean) => {
    setReverse(value)
  }
  return (
    <>
      <Slider defaultValue={30} reverse={reverse} />
      <Slider range defaultValue={[20, 50]} reverse={reverse} />
      Reversed:{' '}
      <Switch size='small' checked={reverse} onChange={handleReverseChange} />
    </>
  )
}

ReverseSliderComp.storyName = '反向 Slider'
ReverseSliderComp.parameters = {
  controls: {hideNoControlsWarning: true}
}

// -----------------------------------------------------------------
