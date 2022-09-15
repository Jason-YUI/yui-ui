import React from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { ComponentMeta } from '@storybook/react';

import {
    Title,
    Subtitle,
    Description,
    Primary,
    ArgsTable,
    Stories,
    Heading,
    Subheading
} from '@storybook/addon-docs';

import Checkbox, {FRCCheckboxProps} from './index';
import { CheckboxChangeEvent } from './checkbox'

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { Checkbox } from 'yui-ui';
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

const CheckboxGroup = Checkbox.Group

export default {
    title: '数据录入/Checkbox 多选框',
    component: Checkbox,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <Description>多选框。</Description>
                    <ImportComponent />
                    <Subtitle>默认 - 组件展示</Subtitle>
                    <Primary />
                    <Stories title="组件总览" includePrimary={true} />
                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>
                    <Subheading>Checkbox</Subheading>
                    <ArgsTable of={Checkbox} />
                    <Subheading>Checkbox Group</Subheading>
                    <ArgsTable of={CheckboxGroup} />
                </>
            ),
        },
    }
} as ComponentMeta<typeof Checkbox>;

// ----------------------------------------------------------------

export const Default = (args: FRCCheckboxProps) => <Checkbox {...args}>Checkbox</Checkbox>;
Default.storyName = '默认 checkbox';

// ----------------------------------------------------------------

export const _ActiveAndDisabled = () => {
    const onChange = (e: CheckboxChangeEvent) => {
        console.log('e', e)
    }
    return <>
        <Checkbox onChange={onChange}>default</Checkbox>
        <Checkbox onChange={onChange} checked>checked</Checkbox>
        <br />
        <Checkbox disabled>default</Checkbox>
        <Checkbox checked disabled>
            checked
        </Checkbox>
    </>;
}
_ActiveAndDisabled.storyName = '激活 | 禁用';
_ActiveAndDisabled.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _GroupComponent = () => {
    const plainOptions = ["Apple", "Pear", "Orange"];
    const options = [
        { label: "Apple", value: "Apple" },
        { label: "Pear", value: "Pear" },
        { label: "Orange", value: "Orange" },
    ];
    const optionsWithDisabled = [
        { label: "Apple", value: "Apple" },
        { label: "Pear", value: "Pear" },
        { label: "Orange", value: "Orange", disabled: false },
    ];

    return (
        <>
            <Checkbox.Group
                options={plainOptions}
                defaultValue={["Apple"]}
            />
            <br />
            <Checkbox.Group options={options} defaultValue={["Pear"]} />
            <br />
            <Checkbox.Group
                options={optionsWithDisabled}
                disabled
                defaultValue={["Apple"]}
            />
        </>
    )
}

_GroupComponent.storyName = '复选框组 group';
_GroupComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _IndeterminateComponent = () => {
    const plainOptions = ['Apple', 'Pear', 'Orange'];
    const defaultCheckedList = ['Apple', 'Orange'];

    type CheckboxValueType = string | number | boolean

    const [checkedList, setCheckedList] = React.useState<string[]>(defaultCheckedList);
    const [indeterminate, setIndeterminate] = React.useState<boolean>(true);
    const [checkAll, setCheckAll] = React.useState<boolean>(false);
    const onChange = (checkedValue: CheckboxValueType[]) => {
        setCheckedList(checkedValue as string[]);
        setIndeterminate(!!checkedValue.length && checkedValue.length < plainOptions.length);
        setCheckAll(checkedValue.length === plainOptions.length);
    };

    const onCheckAllChange = (e: any) => {
        console.log('e', e);

        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    return (
        <>
            <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
            >
                Check all
            </Checkbox>
            <br />
            <Checkbox.Group
                options={plainOptions}
                value={checkedList}
                onChange={onChange}
            />
        </>
    )
}

_IndeterminateComponent.storyName = '全选 indeterminate';
_IndeterminateComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};
