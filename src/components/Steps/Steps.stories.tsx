import React from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { ComponentMeta } from '@storybook/react';

import {
    Title,
    Description,
    ArgsTable,
    Stories,
    Heading,
    Subheading
} from '@storybook/addon-docs';

import {UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined} from '@ant-design/icons'

import Steps from './index';
import {FRCStepsProps} from './steps'

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { Steps } from 'yui-ui';

const {Step} = Steps;

// 按需引入 icon
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from "@ant-design/icons";
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
    title: '导航/Steps 步骤条',
    component: Steps,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <Description>通过鼠标或键盘，输入范围内的数值。</Description>
                    <ImportComponent />
                    <Stories title="组件总览" includePrimary={true} />

                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>

                    <Subheading>Steps</Subheading>
                    <ArgsTable of={Steps} />

                    <Subheading>Steps.Step</Subheading>
                    <Description>步骤条内的每一个步骤。</Description>
                    <ArgsTable of={Steps.Step} />
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Steps>;

// ----------------------------------------------------------------

export const Default = (args: FRCStepsProps) => {
  // storybook的onChange与Steps的onChange冲突
  const {onChange,...restProps} = args
  return (
  <Steps {...restProps}>
    <Steps.Step title="Finished" description="This is a description." />
    <Steps.Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
    <Steps.Step title="Waiting" description="This is a description." />
  </Steps>)
};

Default.storyName = '默认 Steps';

// ----------------------------------------------------------------

export const _BaseComponent = () => {
  return (<>
      默认大小
      <br />
      <Steps current={1}>
        <Steps.Step title="Finished" description="This is a description." />
        <Steps.Step title="In Progress" description="This is a description." />
        <Steps.Step title="Waiting" description="This is a description." />
      </Steps>
      中型步骤条
      <br />
      <Steps size='middle' current={1}>
        <Steps.Step title="Finished" description="This is a description." />
        <Steps.Step title="In Progress" description="This is a description." />
        <Steps.Step title="Waiting" description="This is a description." />
      </Steps>
      大型步骤条
      <br />
      <Steps size='large' current={1}>
        <Steps.Step title="Finished" description="This is a description." />
        <Steps.Step title="In Progress" description="This is a description." />
        <Steps.Step title="Waiting" description="This is a description." />
      </Steps>
  </>)
};

_BaseComponent.storyName = '不同大小 Steps';
_BaseComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ClickComponent = () => {
  const [current, setCurrent] = React.useState<number>(0);
  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };
  return (<>
      设置 onChange 后，Steps 变为可点击状态。
      <br />
      <Steps onChange={onChange} current={current}>
        <Steps.Step title="Step1" description="This is a description." />
        <Steps.Step title="Step2" description="This is a description." />
        <Steps.Step title="Step3" description="This is a description." />
      </Steps>
      <Steps onChange={onChange} size='middle' current={current}>
        <Steps.Step title="Step1" description="This is a description." />
        <Steps.Step title="Step2" description="This isa description." />
        <Steps.Step title="Step3" description="This is a description." />
      </Steps>
      <Steps onChange={onChange} size='large' current={current}>
        <Steps.Step title="Step1" description="This is a description." />
        <Steps.Step title="Step2" description="This is a description." />
        <Steps.Step title="Step3" description="This is a description." />
      </Steps>
  </>)
};

_ClickComponent.storyName = '可点击 Steps';
_ClickComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _CustomerIconComponent = () => {
 
  return (<>
      <Steps progressDot={false} current={1}>
        <Steps.Step status="finish" title="Login" icon={<UserOutlined />} />
        <Steps.Step status="finish" title="Verification" icon={<SolutionOutlined />} />
        <Steps.Step status="process" title="Pay" icon={<LoadingOutlined />} />
        <Steps.Step status="wait" title="Done" icon={<SmileOutlined />} />
      </Steps>
  </>)
};

_CustomerIconComponent.storyName = '自定义图标';
_CustomerIconComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _VerticalComponent = () => {
  return (
    <div style={{display: 'flex', flexWrap:'nowrap', justifyContent:'space-around'}}>
      <div>
        <Steps direction="vertical" current={1}>
          <Steps.Step title="Finished" description="This is a description." />
          <Steps.Step title="In Progress" description="This is a description." />
          <Steps.Step title="Waiting" description="This is a description." />
        </Steps>
      </div>
      <div>
        <Steps direction="vertical" size='middle' current={1}>
          <Steps.Step title="Finished" description="This is a description." />
          <Steps.Step title="In Progress" description="This is a description." />
          <Steps.Step title="Waiting" description="This is a description." />
        </Steps>
      </div>
      <div>
        <Steps direction="vertical" size='large' current={1}>
          <Steps.Step title="Finished" description="This is a description." />
          <Steps.Step title="In Progress" description="This is a description." />
          <Steps.Step title="Waiting" description="This is a description." />
        </Steps>
      </div>
  </div>)
};

_VerticalComponent.storyName = '竖直方向 Steps';
_VerticalComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
