import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import { ComponentMeta } from "@storybook/react";

import {
  Title,
  Description,
  ArgsTable,
  Stories,
  Heading,
  Subheading,
  Source
} from "@storybook/addon-docs";

import TreeSelect, {FRCTreeSelectProps} from "./index";
import {TreeData,TreeNodeValue} from './treeSelect';

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { TreeSelect } from 'yui-ui';
~~~
`;

  return (
    <>
      <ReactMarkdown
        children={markdown}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={tomorrow}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </>
  );
};

// ----------------------------------------------------------------

export default {
  title: "数据录入/TreeSelect 树选择",
  component: TreeSelect,
  parameters: {
    docs: {
      // docs 页面 => 总体布局
      page: () => (
        <>
          <Title />
          <Description>树型选择控件。</Description>
          <ImportComponent />
          <Stories title="组件总览" includePrimary={true} />

          <Heading>API</Heading>
          <Subheading>属性</Subheading>
          <Subheading>TreeSelect</Subheading>
          <ArgsTable of={TreeSelect} />

          <Subheading>treeData的类型 TreeData[]</Subheading>
          <Source
            dark
            language="ts"
            code="
              interface TreeData {
                        title: React.ReactNode,
                        value: string,
                        key: string
                        children?: TreeData[]
                      }
            "
          />

          <Subheading>TreeNode</Subheading>
          <Description>建议使用 treeData 来代替 TreeNode，免去手工构造麻烦</Description>
          <ArgsTable of={TreeSelect.TreeNode} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof TreeSelect>;

// ----------------------------------------------------------------

export const Default = (args: FRCTreeSelectProps) => {
  const {onChange,...others} = args;
  
  const treeData = [
    {
      title: "Node1",
      value: "0-0",
      key: "0-0"
    },
    {
      title: "Node2",
      value: "0-1",
      key: "0-1",
    },
    {
      title: "Node3",
      value: "0-2",
      key: "0-2"
    }
  ];
  return (
    <TreeSelect
      {...others}
      treeData={treeData}
    />
  )
};

Default.storyName = "默认 TreeSelect";

// ----------------------------------------------------------------

export const _BaseComponent = () => {
  const treeData = [
    {
      title: "Node1",
      value: "0-0",
      key: "0-0"
    },
    {
      title: "Node2",
      value: "0-1",
      key: "0-1",
      children: [
        {
          title: 'child21',
          value: "1-1",
          key: "1-1",
          children: [
            {
              title: "child211",
              value: "1-1-1",
              key: "1-1-1",
            }
          ]
        },
        {
          title: "child22",
          value: "1-2",
          key: "1-2",
        },
      ]
    },
    {
      title: "Node3",
      value: "0-2",
      key: "0-2"
    }
  ];
  return (
    <>
      <TreeSelect
        style={{width:200}}
        treeData={treeData}
        defaultValue={['1-1-1','0-2']}
      />
      <br />
      <br />
      disabled
      <br />
      <TreeSelect
        style={{width:200}}
        treeData={treeData}
        defaultValue={['1-1-1','0-2']}
        disabled
      />
    </>
  );
};

_BaseComponent.storyName = "基本使用 TreeSelect";
_BaseComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ShowCheckedComponent = () => {
  const defaultValue:string[] = [];
  const treeData:TreeData[] = Array.from({length: 15}).map((_, i) => {
    const item:TreeData = {
      title: `Node${i + 1}`,
      value: `0-${i}`,
      key: `0-${i}`,
    }
    if(i % 2 === 0) {
      item.children = [{
        title: `child${i + 1}-1`,
        value: `${item.value}-0`,
        key: `${item.key}-0`,
      }]
      defaultValue.push(`${item.value}-0`);
    }
    return item;
  });

  const [value, setValue] = useState<string[]>([]);

  return (
    <>
      当数据量较多时，设置showSelected为true方便查看已勾选项目
      <br />
      <br />
      <TreeSelect
        style={{width:200}}
        treeData={treeData}
        defaultValue={defaultValue}
        showSelected
      />
      <br />
      <br />
      当没有已选项时隐藏
      <br />
      <TreeSelect
        style={{width:200}}
        treeData={treeData}
        value={value}
        onChange={(val) => setValue(val)}
        showSelected={!!value.length}
      />
      <br />
      <br />
      disabled
      <br />
      <TreeSelect
        style={{width:200}}
        treeData={treeData}
        defaultValue={defaultValue}
        showSelected
        disabled
      />
    </>
  );
};

_ShowCheckedComponent.storyName = "展示已选项 TreeSelect";
_ShowCheckedComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ShowExtraButtonComponent = () => {

  const defaultValue:string[] = [];
  
  const treeData:TreeData[] = Array.from({length: 20}).map((_, i) => {
    const item:TreeData = {
      title: `Node${i + 1}`,
      value: `0-${i}`,
      key: `0-${i}`,
    }
    if(i % 2 === 0) {
      item.children = [{
        title: `child${i + 1}-1`,
        value: `${item.value}-0`,
        key: `${item.key}-0`,
      }]
      defaultValue.push(`${item.value}-0`);
    }
    return item;
  });

  const [value, setValue] = useState<string[]>(defaultValue);

  const handleChange = (val:TreeNodeValue,label:any[],extra:any) => {
    console.log(val,label,extra);
    setValue(val as string[]);
  }


  return (
    <>
      配置showExtraButton展示全选/反选按钮
      <br />
      <br />
      只有全选按钮
      <br />
      <TreeSelect
        style={{width:250}}
        treeData={treeData}
        defaultValue={defaultValue}
        showSelected
        showExtraButton={[TreeSelect.ALL_BUTTON]}
        treeDefaultExpandAll
      />
      <br />
      <br />
      只有反选按钮
      <br />
      <TreeSelect
        style={{width:250}}
        treeData={treeData}
        defaultValue={defaultValue}
        showSelected
        showExtraButton={[TreeSelect.INVERT_BUTTON]}
      />
      <br />
      <br />
      反选按钮和全选按钮一起展示
      <br />
      <TreeSelect
        style={{width:250}}
        treeData={treeData}
        showSelected
        showExtraButton={[TreeSelect.ALL_BUTTON,TreeSelect.INVERT_BUTTON]}
        value={value}
        onChange={handleChange}
      />
    </>
  );
};

_ShowExtraButtonComponent.storyName = "展示 全选/反选 按钮 TreeSelect";
_ShowExtraButtonComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _SeparatorComponent = () => {
  const treeData = [
    {
      title: "Node1",
      value: "0-0",
      key: "0-0"
    },
    {
      title: "Node2",
      value: "0-1",
      key: "0-1",
      children: [
        {
          title: 'child21',
          value: "1-1",
          key: "1-1",
          children: [
            {
              title: "child211",
              value: "1-1-1",
              key: "1-1-1",
            }
          ]
        },
        {
          title: "child22",
          value: "1-2",
          key: "1-2",
        },
      ]
    },
    {
      title: "Node3",
      value: "0-2",
      key: "0-2"
    }
  ];
  return (
    <>
      默认分隔符为"、"
      <br />
      <TreeSelect
        style={{width:200}}
        treeData={treeData}
        defaultValue={['1-1-1','0-2']}
      />
      <br />
      <br />
      配置分隔符为"，"
      <br />
      <TreeSelect
        style={{width:200}}
        treeData={treeData}
        defaultValue={['1-1-1','0-2']}
        separator='，'
      />
    </>
  );
};

_SeparatorComponent.storyName = "自定义分隔符 TreeSelect";
_SeparatorComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _JSXComponent = () => {
  const {TreeNode} = TreeSelect;
  return (
    <>
      建议使用 treeData 来代替 TreeNode，免去手工构造麻烦
      <br />
      <TreeSelect
        style={{width:200}}
        defaultValue={['sssvalue','leaf1value']}
      >
        <TreeNode value="parentvalue 1" title="parent 1">
          <TreeNode value="parentvalue 1-0" title="parent 1-0">
            <TreeNode value="leaf1value" title="my leaf" />
            <TreeNode value="leaf2value" title="your leaf" />
          </TreeNode>
          <TreeNode value="parentvalue 1-1" title="parent 1-1">
            <TreeNode value="sssvalue" title={<b style={{ color: '#F9C152' }}>sss</b>} />
          </TreeNode>
        </TreeNode>
        <TreeNode value="parentvalue 2" title="parent 2" />
      </TreeSelect>
    </>
  );
};

_JSXComponent.storyName = "JSX风格 TreeSelect";
_JSXComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
