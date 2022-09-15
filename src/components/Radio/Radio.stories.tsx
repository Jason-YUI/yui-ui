import React, { useState } from 'react';
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

import Radio from './index';
import {FRCRadioProps} from './radio'

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { Radio } from 'yui-ui';
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

const RadioGroup = Radio.Group

export default {
    title: '数据录入/Radio 单选框',
    component: Radio,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <Description>单选框。</Description>
                    <ImportComponent />
                    <Stories title="组件总览" includePrimary={true} />

                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>

                    <Subheading>Radio/Radio.Button</Subheading>
                    <ArgsTable of={Radio} />

                    <Subheading>RadioGroup</Subheading>
                    <Description>单选框组合，用于包裹一组 Radio。</Description>
                    <ArgsTable of={RadioGroup} />
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Radio>;

// ----------------------------------------------------------------

export const Default = (args: FRCRadioProps) => <Radio {...args}>Radio</Radio>;

Default.storyName = '默认 radio';

// ----------------------------------------------------------------

export const _DisabledComponent = () => {
    return (
        <>
            <Radio disabled>Radio</Radio>
            <Radio checked disabled>Radio</Radio>
        </>
    )
};

_DisabledComponent.storyName = '禁用 disbled';
_DisabledComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _GroupComponent = () => {
    const [value, setValue] = React.useState(1);

    const onChange = (e: any) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <>
            <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>A</Radio>
                <Radio value={2}>B</Radio>
                <Radio value={3}>C</Radio>
                <Radio value={4}>D</Radio>
            </Radio.Group>
        </>
    )
};

_GroupComponent.storyName = '单选组合 group';
_GroupComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _SolidGroupComponent = () => {
    const [solidGroupValue, setSolidGroupValue] = useState(1)

    const onSolidGroupChange = (e: any) => {
        setSolidGroupValue(e.target.value)
    }

    const [solidGroupValueDisabled, setSolidGroupValueDisabled] = useState(1)

    const onSolidGroupChangeDisabled = (e: any) => {
        setSolidGroupValueDisabled(e.target.value)
    }

    // ----------------------------------------------------------------

    return (
        <>
            <Radio.Group value={solidGroupValue} onChange={onSolidGroupChange} buttonStyle="solid">
                <Radio.Button value={1}>
                    Radio Btn1
                </Radio.Button>
                <Radio.Button value={2}>
                    Radio Btn2
                </Radio.Button>
                <Radio.Button value={3}>
                    Radio Btn3
                </Radio.Button>
                <Radio.Button value={4}>
                    Radio Btn4
                </Radio.Button>
            </Radio.Group>
            <br />
            <br />
            <Radio.Group value={solidGroupValueDisabled} onChange={onSolidGroupChangeDisabled} buttonStyle="solid" disabled>
                <Radio.Button value={1}>
                    Radio Btn1
                </Radio.Button>
                <Radio.Button value={2}>
                    Radio Btn2
                </Radio.Button>
                <Radio.Button value={3}>
                    Radio Btn3
                </Radio.Button>
                <Radio.Button value={4}>
                    Radio Btn4
                </Radio.Button>
            </Radio.Group>
        </>
    )
};

_SolidGroupComponent.storyName = '填底的按钮样式';
_SolidGroupComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _TOptionsComponent = () => {
    const [value1, setValue1] = useState('Apple');
    const [value2, setValue2] = useState('Apple');
    const [value3, setValue3] = useState('Apple');
    const [value4, setValue4] = useState('Apple');

    const onChange1 = ({ target: { value } }:any) => {
      console.log('radio1 checked', value);
      setValue1(value);
    };

    const onChange2 = ({ target: { value } }:any) => {
      console.log('radio2 checked', value);
      setValue2(value);
    };

    const onChange3 = ({ target: { value } }:any) => {
      console.log('radio3 checked', value);
      setValue3(value);
    };

    const onChange4 = ({ target: { value } }:any) => {
      console.log('radio4 checked', value);
      setValue4(value);
    };
    const plainOptions = ['Apple', 'Pear', 'Orange'];
    const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
    ];
    const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: true },
    ];

    return (
        <>
            通过配置 options 参数来渲染单选框。也可通过 optionType 参数来设置 Radio 类型。
            <br/>
            <Radio.Group options={plainOptions} onChange={onChange1} value={value1} />
            <br />
            <Radio.Group options={optionsWithDisabled} onChange={onChange2} value={value2} />
            <br />
            <br />
            <Radio.Group
                options={options}
                onChange={onChange3}
                value={value3}
                buttonStyle="solid"
                optionType="button"
            />
            <br />
            <br />
            <Radio.Group
                options={optionsWithDisabled}
                onChange={onChange4}
                value={value4}
                optionType="button"
                buttonStyle="solid"
            />
        </>
    )
};

_TOptionsComponent.storyName = '组合 group - 配置方式';
_TOptionsComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
