import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

import Button from "../Button";
import Icon from "../Icon";
import { ComponentMeta } from '@storybook/react';
import './_story.scss'


import {
    Title,
    Description,
    ArgsTable,
    Stories,
    Heading,
    Subheading
} from '@storybook/addon-docs';

import Tooltip from './index';
import { FRCTooltipProps } from './tooltip'

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { Tooltip } from 'yui-ui';
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
    title: '数据显示/Tooltip 文字提示',
    component: Tooltip,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <Description>提示框，在鼠标进入时显示，在鼠标离开时隐藏 </Description>
                    <ImportComponent />
                    <Stories title="组件总览" includePrimary={true} />

                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>

                    <Subheading>Tooltip</Subheading>
                    <ArgsTable of={Tooltip} />
                </>
            ),
        },
    },
} as ComponentMeta<typeof Tooltip>;

// ----------------------------------------------------------------

export const Default = (args: FRCTooltipProps) => <Tooltip {...args}>Tooltip</Tooltip>;

Default.storyName = '默认 tooltip';


// ----------------------------------------------------------------

export const _BaseComponent = () => {

    return (
        <div className='tlt-wrapper'>
            <div className='center'>
                <Tooltip title="提示文本"
                    placement='bottom'>
                    <Button>基本用法</Button>
                </Tooltip>
            </div>
        </div>
    )
};

_BaseComponent.storyName = '基本用法 tooltip';
_BaseComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _DirectionComponent = () => {
    return (
        <div className='tlt-wrapper'>

            <div className='center'>
                <div className='top_panel'>
                    <Tooltip title='这里是提示文本' hasArrow={true} placement='topLeft'>
                        <span className='tooltip-base'>上左</span>
                    </Tooltip>
                    <Tooltip title='这里是提示文本' hasArrow={true} placement='top'>
                        <span className='tooltip-base'>上中</span>
                    </Tooltip>
                    <Tooltip title='这里是提示文本' hasArrow={true} placement='topRight'>
                        <span className='tooltip-base'>上右</span>
                    </Tooltip>
                </div>
                <div className='left_panel'>
                    <Tooltip title={<span>这里是提示文本<br />这里是提示文本</span>} hasArrow={true} placement='leftTop'>
                        <span className='tooltip-base'>左上</span>
                    </Tooltip>
                    <Tooltip title={<span>这里是提示文本<br />这里是提示文本</span>} hasArrow={true} placement='left'>
                        <span className='tooltip-base'>左中</span>
                    </Tooltip>
                    <Tooltip title={<span>这里是提示文本<br />这里是提示文本</span>} hasArrow={true} placement='leftBottom'>
                        <span className='tooltip-base'>左下</span>
                    </Tooltip>
                </div>
                <div className='right_panel'>
                    <Tooltip title={<span>这里是提示文本<br />这里是提示文本</span>} hasArrow={true} placement='rightTop'>
                        <span className='tooltip-base'>右上</span>
                    </Tooltip>
                    <Tooltip title={<span>这里是提示文本<br />这里是提示文本</span>} hasArrow={true} placement='right'>
                        <span className='tooltip-base'>右中</span>
                    </Tooltip>
                    <Tooltip title={<span>这里是提示文本<br />这里是提示文本</span>} hasArrow={true} placement='rightBottom'>
                        <span className='tooltip-base'>右下</span>
                    </Tooltip>
                </div>
                <div className='bottom_panel'>

                    <Tooltip title='这里是提示文本' hasArrow={true} placement='bottomLeft'>
                        <span className='tooltip-base'>下左</span>
                    </Tooltip>
                    <Tooltip title='这里是提示文本' hasArrow={true} placement='bottom'>
                        <span className='tooltip-base'>下中</span>
                    </Tooltip>
                    <Tooltip title='这里是提示文本' hasArrow={true} placement='bottomRight'>
                        <span className='tooltip-base'>下右</span>
                    </Tooltip>
                </div>
            </div >
        </div>
    )
};

_DirectionComponent.storyName = '弹出方向 tooltip';
_DirectionComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _WithoutArrowComponent = () => {

    return (
        <div className='tlt-wrapper'>
            <div className='center'>
                <Tooltip
                    hasArrow={false}
                    title={<div><div><span>提示文本</span><Button>按钮</Button><Icon type="frown" /></div> <div><span style={{ background: '#263735' }}>估值收益率(%)</span><span style={{ color: '#F9C152' }}>2.3700</span></div></div>}
                    destroyTooltipOnHide={true}
                    onVisibleChange={(visible) => { console.log(visible) }}
                    placement="top"
                >
                    <div className='tooltip-base no-arrow'>
                        <span>无箭头</span>
                    </div>
                </Tooltip>
                <Tooltip placement="topLeft" title="提示文本">
                    <div className='tooltip-base' style={{ width: 'fit-content' }}>
                        <span>Align edge / 边缘对齐</span>
                    </div>
                </Tooltip>
                <Tooltip
                    placement="topLeft"
                    title="提示文本"
                    arrowPointAtCenter
                >
                    <div className='tooltip-base' style={{ width: 'fit-content' }}>
                        <span>Arrow points to center / 箭头指向中心</span>
                    </div>
                </Tooltip>
                <Tooltip
                    mouseEnterDelay={1}
                    hasArrow={false}
                    title={<span>提示文本</span>}
                    placement="top"
                >
                    <div className='tooltip-base no-arrow'>
                        <span>延迟1s显示</span>
                    </div>
                </Tooltip>
                <Tooltip
                    mouseLeaveDelay={1}
                    hasArrow={false}
                    title={<span>提示文本</span>}
                    placement="top"
                >
                    <div className='tooltip-base no-arrow'>
                        <span>延迟1s消失</span>
                    </div>
                </Tooltip>
            </div>
        </div>
    )
};

_WithoutArrowComponent.storyName = '箭头和延时 tooltip';
_WithoutArrowComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};


// ----------------------------------------------------------------

export const _ManualComponent = () => {
    const [isTooltip1Visible, setIsTooltip1Visible] = useState(false);
    const [isTooltip2Visible, setIsTooltip2Visible] = useState(false);
    const duration = 2000;//消息框持续时间,ms

    const showTooltip1 = () => {
        setIsTooltip1Visible(true);
    };

    const closeToolTip1 = () => {
        setIsTooltip1Visible(false);
    };

    const showTooltip2 = () => {
        setIsTooltip2Visible(true);
        setTimeout(
            () => {
                setIsTooltip2Visible(false)
            },
            duration
        );
    };
    return (
        <div className='tlt-wrapper'>
            <div className='center'>
                <Tooltip
                    title={<div><span>提示文本、提示文本 点击确定关闭提示</span><Button type="gray" style={{ margin: '0 0 0 10px', display: 'inline-block' }} onClick={closeToolTip1}>确定</Button></div>}
                    hasArrow={true}
                    placement='left'
                    visible={isTooltip1Visible}
                >
                    <Button type="primary" onClick={showTooltip1}>
                        手动关闭
                    </Button>
                </Tooltip>

                <Button type="primary" style={{ margin: '0 0 0 20px' }} onClick={showTooltip2}>
                    定时关闭
                </Button>
                <Tooltip
                    title='系统提示文本提示文本、提示文本2s后消失'
                    hasArrow={false}
                    placement='bottom'
                    visible={isTooltip2Visible}
                >
                    <span>目标元素</span>
                </Tooltip>
            </div>
        </div>
    )
};

_ManualComponent.storyName = '手动显隐 tooltip';
_ManualComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};
