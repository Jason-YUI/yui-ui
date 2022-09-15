import React from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { FiSearch } from 'react-icons/fi'

import { ComponentMeta } from '@storybook/react';

import {
    Title,
    Description,
    ArgsTable,
    Stories,
    Heading,
    Subheading
} from '@storybook/addon-docs';

import InputNumber, {FRCInputNumberProps} from './index';

import Select from '../Select';
import Button from '../Button';

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { InputNumber } from 'yui-ui';
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
    title: '数据录入/InputNumber 数字输入框',
    component: InputNumber,
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

                    <Subheading>InputNumber</Subheading>
                    <ArgsTable of={InputNumber} exclude={["blur", 'focus']} />

                    <Subheading>方法</Subheading>
                    <ArgsTable of={InputNumber} include={["blur", 'focus']} />
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof InputNumber>;

// ----------------------------------------------------------------

export const Default = (args: FRCInputNumberProps) => <InputNumber {...args} />;

Default.storyName = '默认 inputNumber';

// ----------------------------------------------------------------

export const _BaseComponent = () => {
    return (<>
        <InputNumber />
        <InputNumber bordered={false} />
        <br />
        <InputNumber disabled />
        <InputNumber bordered={false} disabled />
    </>)
};

_BaseComponent.storyName = '基本用法 inputNumber';
_BaseComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _BeforeOrAfterComponent = () => {
    return (<>
        <InputNumber prefix={<FiSearch />} />
        <InputNumber addonBefore={<FiSearch />} />
        <InputNumber addonBefore={<FiSearch />} prefix={'$'} />
        <InputNumber addonBefore={<FiSearch />} addonAfter={<FiSearch />} />
        <InputNumber
            addonBefore={
                <Select
                    defaultValue="add"
                    style={{
                        width: 40,
                        backgroundColor: 'transparent',
                        marginLeft: -5,
                        marginRight: 0,
                        borderLeft: '1px solid transparent',
                        borderTop: '1px solid transparent',
                        borderBottom: '1px solid transparent'
                    }}>
                    <Select.Option value="add">+</Select.Option>
                    <Select.Option value="minus">-</Select.Option>
                </Select>
            }
            addonAfter={
                <Select
                    defaultValue="add"
                    style={{
                        width: 40,
                        backgroundColor: 'transparent',
                        marginLeft: 0,
                        marginRight: -5,
                        borderRight: '1px solid transparent',
                        borderTop: '1px solid transparent',
                        borderBottom: '1px solid transparent'
                    }}
                >
                    <Select.Option value="add">+</Select.Option>
                    <Select.Option value="minus">-</Select.Option>
                </Select>
            }
        />
        <br />
        <InputNumber prefix={<FiSearch />} disabled />
        <InputNumber addonBefore={<FiSearch />} disabled />
        <InputNumber addonBefore={<FiSearch />} prefix={'$'} disabled />
        <InputNumber addonBefore={<FiSearch />} addonAfter={<FiSearch />} disabled />
        <InputNumber
            addonBefore={
                <Select
                    defaultValue="add"
                    style={{
                        width: 40,
                        backgroundColor: 'transparent',
                        marginLeft: -5,
                        marginRight: 0,
                        borderLeft: '1px solid transparent',
                        borderTop: '1px solid transparent',
                        borderBottom: '1px solid transparent'
                    }}
                    disabled
                >
                    <Select.Option value="add">+</Select.Option>
                    <Select.Option value="minus">-</Select.Option>
                </Select>
            }

            addonAfter={
                <Select
                    defaultValue="add"
                    style={{
                        width: 40,
                        backgroundColor: 'transparent',
                        marginLeft: 0,
                        marginRight: -5,
                        borderRight: '1px solid transparent',
                        borderTop: '1px solid transparent',
                        borderBottom: '1px solid transparent'
                    }}
                    disabled
                >
                    <Select.Option value="add">+</Select.Option>
                    <Select.Option value="minus">-</Select.Option>
                </Select>
            }
            disabled
        />
    </>)
};

_BeforeOrAfterComponent.storyName = '前置/后置标签';
_BeforeOrAfterComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _StringModeComponent = () => {
    return (<>
        通过 stringMode 开启高精度小数支持，onChange 事件将返回 string 类型。对于旧版浏览器，你需要 BigInt polyfill。
        <br />
        <InputNumber
            style={{ width: 200 }}
            defaultValue="1"
            min="0"
            max="10"
            step="0.00000000000001"
            stringMode
        />
    </>)
};

_StringModeComponent.storyName = '高精度小数 stringMode';
_StringModeComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _FormatterComponent = () => {
    return (<>
        通过 formatter 格式化数字，以展示具有具体含义的数据，往往需要配合 parser 一起使用。
        <br />
        <InputNumber
            defaultValue={1000}
            formatter={(value: number | string | undefined) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value: string | undefined) => value ? value.replace(/\$\s?|(,*)/g, '') : ''}
        />

        <InputNumber
            defaultValue={100}
            min={0}
            max={100}
            formatter={(value: number | string | undefined) => `${value}%`}
            parser={(value: string | undefined) => value ? value.replace('%', '') : ''}
        />
    </>)
};

_FormatterComponent.storyName = '格式化展示 formatter';
_FormatterComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _KeyboardComponent = () => {
    return (<>
        使用 keyboard 属性可以控制键盘行为。
        <br />
        <InputNumber min={1} max={10} keyboard={true} defaultValue={3} />
    </>)
};

_KeyboardComponent.storyName = '键盘行为 keyboard';
_KeyboardComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _OverloadComponent = () => {
    return (<>
        <InputNumber min={1} max={10} defaultValue={99} />
    </>)
};

_OverloadComponent.storyName = '超出边界';
_OverloadComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ZRefComponent = () => {
    const ref = React.useRef<HTMLInputElement>(null);
    const handleClick = () => {
        ref.current?.focus();
    }
    return (
    <>
        <InputNumber ref={ref} min={1} max={10}  />
        <Button onClick={handleClick}>Input Number focus</Button>
    </>)
};

_ZRefComponent.storyName = 'InputNumber methods';
_ZRefComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
