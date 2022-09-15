import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Button  from '../Button';

import { ComponentMeta } from '@storybook/react';

import {
  Title,
  Description,
  ArgsTable,
  Stories,
  Heading,
  Subheading
} from '@storybook/addon-docs';

import SqueezeDrawer,{FRCSqueezeDrawerProps,PlacementType} from './index';
import './_story.scss'

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { SqueezeDrawer } from 'yui-ui';

export const _ControlComponent = () => {
  const [visible, setVisible] = useState(true)
  const onHandleClick = (open: boolean) => {
    setVisible(open)
  }

  return (
    <div className='suqeeze-drawer-container'>
      <SqueezeDrawer extraContentVisible={visible} onOpenChange={onHandleClick} />
    </div>
  )
};
~~~

~~~css
.suqeeze-drawer-container{
  width: 100%;
  height: 400px;
  background-color: gray;
}
~~~
`

  return <>
    <ReactMarkdown children={markdown} components={{
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
      }
    }} /></>
}

// ----------------------------------------------------------------

export default {
  title: '布局/SqueezeDrawer 挤压抽屉',
  component: SqueezeDrawer,
  parameters: {
    docs: {
      // docs 页面 => 总体布局
      page: () => (
        <>
          <Title />
          <Description>点击开关,控制弹出层展示关闭</Description>
          <ImportComponent />
          <Stories title="组件总览" includePrimary={true} />
          <Heading>API</Heading>
          <Subheading>属性</Subheading>
          <Subheading>SqueezeDrawer 挤压抽屉</Subheading>
          <ArgsTable of={SqueezeDrawer} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof SqueezeDrawer>;

// ----------------------------------------------------------------

export const SqueezeDrawerDefault = (args: FRCSqueezeDrawerProps) => {
  const { onOpenChange, ...rest } = args
  return (
    <div className='suqeeze-drawer-container'>
      <SqueezeDrawer
        {...rest}
      />
    </div>
  )
};

SqueezeDrawerDefault.storyName = '默认 squeezeDrawer';
SqueezeDrawerDefault.parameters = {};



export const _ControlComponent = () => {
  const [visible, setVisible] = useState(true)
  const onHandleClick = (open: boolean) => {
    setVisible(open)
  }

  return (
    <div className='suqeeze-drawer-container'>
      <SqueezeDrawer className='testone' extraContentVisible={visible} onOpenChange={onHandleClick} />
    </div>
  )
};

_ControlComponent.storyName = '受控 squeezeDrawer';
_ControlComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const _PlacementComponent = () => {
  const [visible, setVisible] = useState(true)
  const onHandleClick = (open: boolean) => {
    setVisible(open)
  }
  const [placement, setPlacement] = useState<PlacementType>('left')

  return (
    <div className='squeeze-story'>
      <Button onClick={()=>setPlacement('left')}>左侧弹出</Button>
      <Button onClick={()=>setPlacement('top')}>上方弹出</Button>
      <Button onClick={()=>setPlacement('right')}>右侧弹出</Button>
      <Button onClick={()=>setPlacement('bottom')}>下方弹出</Button>
      <div className='suqeeze-drawer-container'>
        <SqueezeDrawer className='testone' placement={placement} extraContentVisible={visible} onOpenChange={onHandleClick} />
      </div>
    </div>
  )
};

_PlacementComponent.storyName = '方向选择 squeezeDrawer';
_PlacementComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};
