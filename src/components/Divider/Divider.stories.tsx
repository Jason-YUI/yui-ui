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
import Divider from './index';
import { FRCDividerProps } from './divider'
import Button from '../Button'

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { Divider } from 'yui-ui';
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
    title: '布局/Divider 分割线',
    component: Divider,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <Description>区隔内容的分割线。</Description>
                    <ImportComponent />
                    <Stories title="组件总览" includePrimary={true} />

                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>

                    <Subheading>Divider</Subheading>
                    <ArgsTable of={Divider} />
                </>
            ),
        },
    },
} as ComponentMeta<typeof Divider>;

// ----------------------------------------------------------------

export const Default = (args: FRCDividerProps) => <Divider {...args} />;

Default.storyName = '默认 divider';

// ----------------------------------------------------------------

export const _HorizontalComponent = () => {
    return <>
        默认为水平分割线，可在中间加入文字。
        <br />
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed nonne merninisti licere mihi ista
            probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
        <Divider />
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
            probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
        <Divider dashed />
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
            probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
    </>
};

_HorizontalComponent.storyName = '水平分割线 horizontal';
_HorizontalComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _TextAndPositonComponent = () => {
    return <>
        分割线中带有文字，可以用 orientation 指定文字位置。
        <br />
        <Divider>Tittle at the Center</Divider>
        <Divider orientation="left">Tittle at the Left</Divider>
        <Divider orientation="right">Tittle at the  Right</Divider>
        <Divider orientation="left" orientationMargin="0">
            Tittle at the Left
        </Divider>
        <Divider orientation="right" orientationMargin={60}>
            Tittle at the  Right & text margin 60px
        </Divider>
    </>
};

_TextAndPositonComponent.storyName = '带文字的分割线';
_TextAndPositonComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _VerticalComponent = () => {
    return <>
        使用 type="vertical" 设置为行内的垂直分割线。
        <br />
        <div>
            Text
            <Divider type="vertical" />
            <Button type="link">Link</Button>
            <Divider type="vertical" />
            <Button type="link">Link</Button>
        </div>
    </>
};

_VerticalComponent.storyName = '垂直分割线 vertical';
_VerticalComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
