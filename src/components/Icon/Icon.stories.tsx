import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { ComponentMeta } from '@storybook/react';

import {
    Title,
    Description,
    Stories,
    Heading,
    Subheading,
    ArgsTable
} from '@storybook/addon-docs';

import copy from 'copy-to-clipboard';
import { message } from 'antd';
import data from '../../../public/icon-fonts/iconfont.json'

import Icon from './index';
import { IconProps } from './icon';
import './_story.scss'

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { Icon } from 'yui-ui';
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
    title: '通用/Icon 图标',
    component: Icon,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <ImportComponent />
                    <Description>语义化的矢量图形。</Description>
                    <Stories title="组件总览" includePrimary={true} />

                    <Heading>Icons</Heading>
                    <Icons />

                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>
                    <Subheading>Icon</Subheading>
                    <ArgsTable of={Icon} />
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Icon>;

// ----------------------------------------------------------------

export const Default = (args: IconProps) => {
    const { onClick, ...restProps } = args;
    return <Icon {...restProps} type="lock" />;
}

Default.storyName = '基本使用';

// ----------------------------------------------------------------

const Icons = () => {
    const onCopyTypeHandle = (e: any) => {
        const type = e.currentTarget.getAttribute('data-index');

        if (type) {
            copy(type); // 拷贝到剪贴板
            message.success('成功拷贝至剪切板！ Icon 类型：' + type);
        }
    }

    return <div style={{ margin: '0 -22px' }}>
        {data.glyphs.length > 0 && data.glyphs.map((item: any) => {
            return <div
                key={item.icon_id}
                data-index={item.font_class}
                className="icon-container"
                onClick={onCopyTypeHandle}
            >
                <Icon
                    type={item.font_class}
                    style={{
                        fontSize: 42,
                        height: 42,
                        color: '#fff'
                    }}
                />
                <span>{item.font_class}</span>
            </div>
        })}
    </div>
}
