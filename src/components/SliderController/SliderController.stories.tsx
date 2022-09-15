import React,{useState} from 'react'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {tomorrow} from 'react-syntax-highlighter/dist/esm/styles/prism'

import {ComponentMeta} from '@storybook/react'

import {
  Title,
  Description,
  ArgsTable,
  Stories,
  Heading,
  Subheading,
} from '@storybook/addon-docs'

import {Row, Col} from 'antd'
import SliderController, {FRCSliderControllerProps} from './index'
import InputNumber from '../InputNumber'
import Switch from '../Switch'

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
当前为 v1 版本Slider，改名为 SliderController
~~~js
import { SliderController } from 'yui-ui';
~~~

`

  return (
    <>
      <ReactMarkdown
        children={markdown}
        components={{
          code({node, inline, className, children, ...props}) {
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
  title: '数据录入/SliderController 滑动控制器',
  component: SliderController,
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

          <Subheading>SliderController</Subheading>
          <ArgsTable of={SliderController} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof SliderController>

// ----------------------------------------------------------------

export const Default = (args: FRCSliderControllerProps) => <SliderController {...args} />

Default.storyName = '默认 SliderController'

// -----------------------------------------------------------------

export const SizeComponent = () => {
  return (
    <>
      <SliderController defaultValue={30} />
      <SliderController defaultValue={30} size="large" />
      <SliderController defaultValue={30} size="small" />
      <SliderController range defaultValue={[20, 50]} />
    </>
  )
}
SizeComponent.storyName = '大小 SliderController'
SizeComponent.parameters = {
  controls: {hideNoControlsWarning: true}
}

// -----------------------------------------------------------------

export const StepComponent = () => {
  
  const IntegerStep = () => {
    const [integerValue, setIntegerValue] = useState(1)
    const handleIntegerChange = (value: any) => {
      setIntegerValue(value)
    }
    return (
      <Row>
        <Col span={12}>
          <SliderController
            min={1}
            max={20}
            onChange={handleIntegerChange}
            value={typeof integerValue === 'number' ? integerValue : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={20}
            style={{margin: '0 16px'}}
            value={integerValue}
            onChange={handleIntegerChange}
          />
        </Col>
      </Row>
    )
  }
  const DecimalStep = () => {
    const [decimalValue, setDecimalValue] = React.useState(0)
    const handleDecimalChange = (value: any) => {
      if (isNaN(value)) {
        return
      }
      setDecimalValue(value)
    }
    return (
      <Row>
        <Col span={12}>
          <SliderController
            min={0}
            max={1}
            onChange={handleDecimalChange}
            value={typeof decimalValue === 'number' ? decimalValue : 0}
            step={0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={1}
            style={{margin: '0 16px'}}
            step={0.01}
            value={decimalValue}
            onChange={handleDecimalChange}
          />
        </Col>
      </Row>
    )
  }
  return (
    <>
      <IntegerStep />
      <DecimalStep />
    </>
  )
}

StepComponent.storyName = '带输入框的滑块 SliderController'
StepComponent.parameters = {
  controls: {hideNoControlsWarning: true}
}

// -----------------------------------------------------------------

export const TipSliderComponent = () => {
  const formatter = (val: number | undefined) => {
    return `${val}%`
  }
  return (
    <>
      <SliderController tipFormatter={formatter} />
      <SliderController tipFormatter={null} />
    </>
  )
}

TipSliderComponent.storyName = '自定义提示 SliderController'
TipSliderComponent.parameters = {
  controls: {hideNoControlsWarning: true}
}

// -----------------------------------------------------------------

export const EventSliderComponent = () => {
  const onChange = (value: number | [number, number]) => {
    console.log('onChange: ', value)
  }
  const onAfterChange = (value: number | [number, number]) => {
    console.log('onAfterChange: ', value)
  }
  return (
    <>
      <SliderController
        defaultValue={30}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
      <SliderController
        range
        step={10}
        defaultValue={[20, 50]}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
      <br />
      disabled
      <br />
      <SliderController defaultValue={30} disabled />
    </>
  )
}

EventSliderComponent.storyName = '事件 SliderController'
EventSliderComponent.parameters = {
  controls: {hideNoControlsWarning: true}
}

// -----------------------------------------------------------------

export const VerticalSliderComponent = () => {
  const style = {
    display: 'inline-block',
    height: 300,
    marginLeft: 70,
  }

  const marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100°C</strong>,
    },
  }
  return (
    <>
      <div style={style}>
        <SliderController vertical defaultValue={30} size='small' />
      </div>
      <div style={style}>
        <SliderController vertical range step={10} defaultValue={[20, 50]} />
      </div>
      <div style={style}>
        <SliderController vertical size='large' range marks={marks} defaultValue={[26, 37]} />
      </div>
    </>
  )
}

VerticalSliderComponent.storyName = '垂直方向的 SliderController'
VerticalSliderComponent.parameters = {
  controls: {hideNoControlsWarning: true}
}

// -----------------------------------------------------------------

export const MarksSliderComponent = () => {
  const marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100°C</strong>,
    },
  }
  return (
    <>
      <h4>included=true</h4>
      <SliderController marks={marks} defaultValue={37} />
      <SliderController range marks={marks} defaultValue={[26, 37]} />

      <h4>included=false</h4>
      <SliderController marks={marks} included={false} defaultValue={37} />

      <h4>marks & step</h4>
      <SliderController marks={marks} step={10} defaultValue={37} />

      <h4>step=null</h4>
      <SliderController marks={marks} step={null} defaultValue={37} />
    </>
  )
}

MarksSliderComponent.storyName = '带标签的滑块 SliderController'
MarksSliderComponent.parameters = {
  controls: {hideNoControlsWarning: true}
}

// -----------------------------------------------------------------

export const ReverseSliderComponent = () => {
  const [reverse, setReverse] = React.useState<boolean>(true)
  const handleReverseChange = (value: boolean) => {
    setReverse(value)
  }
  return (
    <>
      <SliderController defaultValue={30} reverse={reverse} />
      <SliderController range defaultValue={[20, 50]} reverse={reverse} />
      Reversed:{' '}
      <Switch size="small" checked={reverse} onChange={handleReverseChange} />
    </>
  )
}

ReverseSliderComponent.storyName = '反向 SliderController'
ReverseSliderComponent.parameters = {
  controls: {hideNoControlsWarning: true}
}

// -----------------------------------------------------------------

export const TipVisibleComponent = () => (
  <SliderController defaultValue={30} tooltipVisible />
)

TipVisibleComponent.storyName = '控制 ToolTip 的显示'
TipVisibleComponent.parameters = {
  controls: {hideNoControlsWarning: true}
}

// -----------------------------------------------------------------

export const DragTrackComponent = () => (
  <SliderController range={{draggableTrack: true}} defaultValue={[20, 50]} />
)

DragTrackComponent.storyName = '范围可拖拽'
DragTrackComponent.parameters = {
  controls: {hideNoControlsWarning: true}
}
