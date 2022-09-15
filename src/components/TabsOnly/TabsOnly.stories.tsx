import React, { ReactElement, ReactHTMLElement, useState } from "react";
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

import TabsOnly, {FRCTabsOnlyProps, TabItem} from "./index";
import Radio from "../Radio";
import { RadioChangeEvent } from "antd";
import InputNumber from "../InputNumber/inputNumber";
import Tooltip from "../Tooltip";
import Icon from "../Icon";

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { TabsOnly } from 'yui-ui';

// 按需引入 icon
import { QuestionCircleOutlined } from "@ant-design/icons";
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
  title: "数据显示/TabsOnly 按钮切换",
  component: TabsOnly,
  parameters: {
    docs: {
      // docs 页面 => 总体布局
      page: () => (
        <>
          <Title />
          <Description>选项卡切换组件，(仅按钮)。</Description>
          <ImportComponent />
          <Stories title="组件总览" includePrimary={true} />

          <Heading>API</Heading>
          <Subheading>属性</Subheading>

          <Subheading>TabsOnly</Subheading>
          <ArgsTable of={TabsOnly} />
          <Source
            dark
            language="ts"
            code="interface TabItem {
              key: React.Key;
              label: string;
            };"
          />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof TabsOnly>;

// ----------------------------------------------------------------

export const Default = (args: FRCTabsOnlyProps) => (
  <>
    <TabsOnly
      {...args}
      defaultValue="1"
      items={[
        {
          key: "1",
          label: "Filter001",
        },
        { key: "2", label: "Filter002" },
      ]}
    />
  </>
);

Default.storyName = "默认 TabsOnly";
// ----------------------------------------------------------------

export const _SoltComponent = () => {
  const labelNode: ReactElement =
  <>
    {"Filter002"}
    <Tooltip title='Filter002'>
      {<Icon style={{
                fontSize: 12,
                marginLeft: 5,
                color: '#6B6F71'
              }}
              type="info-circle-o"/>
      }
    </Tooltip>
  </>

  const items: TabItem[] = [
    { key: "1", label: "Filter001" },
    { key: "2", label:  labelNode  },
  ];
  return (
    <>
      <TabsOnly defaultValue="1" items={items} />
    </>
  );
};

_SoltComponent.storyName = "自定义标题 TabsOnly";
_SoltComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _BaseComponent = () => {
  const items: TabItem[] = [
    { key: "1", label: "Filter001" },
    { key: "2", label: "Filter002" },
    { key: "3", label: "Filter003" },
    { key: "4", label: "Filter004" },
  ];
  return (
    <>
      <TabsOnly items={items} defaultValue="1" />
      <br />
      <br />
      <TabsOnly type="piend" defaultValue="1" items={items} />
      <br />
      <br />
      <TabsOnly type="solid" defaultValue="1" items={items} />
    </>
  );
};

_BaseComponent.storyName = "基本使用 TabsOnly";
_BaseComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};
// ----------------------------------------------------------------
export const _DisableComponent = () => {
  const items: TabItem[] = [
    { key: "1", label: "Filter001" },
    { key: "2", label: "Filter002" },
    { key: "3", label: "Filter003" },
    { key: "4", label: "Filter004" },
  ];
  return (
    <>
      <TabsOnly disabled defaultValue="1" items={items} />
      <br />
      <br />
      <TabsOnly disabled defaultValue="1" type="piend" items={items} />
      <br />
      <br />
      <TabsOnly disabled type="solid" defaultValue="1" items={items} />
    </>
  );
};

_DisableComponent.storyName = "禁用 TabsOnly";
_DisableComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ControlComponent = () => {
  const [curTab, setCurTab] = React.useState<React.Key>("1");

  const items: TabItem[] = [
    { key: "1", label: "Filter001" },
    { key: "2", label: "Filter002" },
    { key: "3", label: "Filter003" },
    { key: "4", label: "Filter004" },
  ];

  const handleChange = (val:React.Key) => {
    setCurTab(val);
  }

  return (
    <>
      <TabsOnly items={items} value={curTab} onChange={handleChange} />
      <br />
      <br />
      <TabsOnly type="piend" items={items} value={curTab} onChange={handleChange} />
      <br />
      <br />
      <TabsOnly type="solid" items={items} value={curTab} onChange={handleChange} />
    </>
  );
};

_ControlComponent.storyName = "受控 TabsOnly";
_ControlComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ChangeSizeComponent = () => {
  const items: TabItem[] = [
    { key: "1", label: "Filter001" },
    { key: "2", label: "Filter002" },
    { key: "3", label: "Filter003" },
    { key: "4", label: "Filter004" },
  ];
  
  return (
    <>
      <TabsOnly size="small" defaultValue="1" items={items} />
      <br />
      <br />
      <TabsOnly size="middle" defaultValue="1" items={items} />
      <br />
      <br />
      <TabsOnly size="large" defaultValue="1" items={items} />
    </>
  );
};

_ChangeSizeComponent.storyName = "不同尺寸 TabsOnly";
_ChangeSizeComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};
// ----------------------------------------------------------------

export const _SetWidth = () => {
  const [width, setWidth] = useState<number>(80);
  const onChange = (value: any) => {
    console.log("value", value);
    setWidth(value);
  };
  return (
    <>
      <InputNumber
        style={{ margin: "0 24px 24px 0" }}
        defaultValue={80}
        onChange={onChange}
      />
      <TabsOnly
        width={width}
        defaultValue="1"
        items={[
          {
            key: "1",
            label:
              "This is a repeated title! This is a repeated titleThis is a repeated titleThis is a repeated title",
          },
          { key: "2", label: "Filter002" },
        ]}
      />
    </>
  );
};

_SetWidth.storyName = "设置item宽度";
_SetWidth.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _NotAutoWidth = () => {
  const [notAutoWidth, setNotAutoWidth] = useState<boolean>(false);
  const onChange = (e: RadioChangeEvent) => {
    console.log("value", e.target.value);
    setNotAutoWidth(e.target.value);
  };
  return (
    <>
      <Radio.Group
        style={{ margin: "0 0 24px 0" }}
        onChange={onChange}
        value={notAutoWidth}
      >
        <Radio value={false}>false</Radio>
        <Radio value={true}>true</Radio>
      </Radio.Group>
      <br />
      <TabsOnly
        notAutoWidth={notAutoWidth}
        defaultValue="1"
        items={[
          {
            key: "1",
            label:
              "This is a repeated title! This is a repeated titleThis is a repeated titleThis is a repeated title",
          },
          { key: "2", label: "Filter002" },
        ]}
      />
    </>
  );
};

_NotAutoWidth.storyName = "是否不自动填充宽度";
_NotAutoWidth.parameters = {
  controls: { hideNoControlsWarning: true },
};
