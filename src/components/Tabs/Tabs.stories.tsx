import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';

import { ComponentMeta } from "@storybook/react";

import {
  Title,
  Description,
  ArgsTable,
  Stories,
  Heading,
  Subheading,
} from "@storybook/addon-docs";

import Tabs, {FRCTabsProps,PositionType,SizeType} from "./index";
import ATabPane from "./tabPane";
import Radio from '../Radio';
import type { RadioChangeEvent } from 'antd';
const {TabPane} = Tabs;

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { Tabs } from 'yui-ui';
// 按需引入图标
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
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
  title: "数据显示/Tabs 标签页",
  component: Tabs,
  parameters: {
    docs: {
      // docs 页面 => 总体布局
      page: () => (
        <>
          <Title />
          <Description>选项卡切换组件。</Description>
          <ImportComponent />
          <Stories title="组件总览" includePrimary={true} />

          <Heading>API</Heading>
          <Subheading>属性</Subheading>

          <Subheading>Tabs</Subheading>
          <ArgsTable of={Tabs} />
          <Subheading>Tabs.TabPane</Subheading>
          <ArgsTable of={ATabPane} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Tabs>;

// ----------------------------------------------------------------

export const Default = (args: FRCTabsProps) => {
  const onChange = (key: string) => {
    console.log(key);
  }
  return (
    <Tabs {...args} defaultActiveKey="1" onChange={onChange}>
      <TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
}

Default.storyName = "默认 Tabs";

// ----------------------------------------------------------------

export const _BaseComponent = () => {
  
  return (
    <>
      <Tabs defaultActiveKey="1" type="outline">
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      <br />
      <Tabs defaultActiveKey="1" type="card" >
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      <br />
      <Tabs defaultActiveKey="1" type="block">
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </>
  );
};

_BaseComponent.storyName = "不同风格 Tabs";
_BaseComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _CenterComponent = () => {
  
  return (
    <>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      <br />
      <Tabs defaultActiveKey="1" type="card" centered>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      <br />
      <Tabs defaultActiveKey="1" type="block" centered>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </>
  );
};

_CenterComponent.storyName = "居中展示 Tabs";
_CenterComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
export const _DisableComponent = () => {
  
  return (
    <>
      <Tabs defaultActiveKey="1" type="outline">
        <TabPane tab="Tab 1" key="1" disabled>
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2" >
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3" disabled>
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Tab 4" key="4" >
          Content of Tab Pane 4
        </TabPane>
      </Tabs>
      <br />
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Tab 1" key="1" disabled>
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2" >
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3" disabled>
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Tab 4" key="4" >
          Content of Tab Pane 4
        </TabPane>
      </Tabs>
      <br />
      <Tabs defaultActiveKey="1" type="block">
        <TabPane tab="Tab 1" key="1" disabled>
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2" >
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3" disabled>
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Tab 4" key="4" >
          Content of Tab Pane 4
        </TabPane>
      </Tabs>
    </>
  );
};

_DisableComponent.storyName = "禁用某一项 Tabs";
_DisableComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
export const _ExtraComponent = () => {

  const extraStyle = {
    border: "1px solid gray",
    padding: "0 8px"
  }
  
  return (
    <>
      <Tabs defaultActiveKey="1" tabBarExtraContent={<div style={extraStyle}>default right extra</div>}>
        <TabPane tab="Tab 1" key="1" >
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2" >
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Tab 4" key="4" >
          Content of Tab Pane 4
        </TabPane>
      </Tabs>
      <br />
      <Tabs
        defaultActiveKey="1"
        type="card"
        tabBarExtraContent={{
          left: <div style={{...extraStyle, marginRight:24}}>left extra</div>
        }}
      >
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2" >
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Tab 4" key="4" >
          Content of Tab Pane 4
        </TabPane>
      </Tabs>
      <br />
      <Tabs
        defaultActiveKey="1"
        type="block"
        tabBarExtraContent={{
          left: <div style={{...extraStyle, marginRight:24}}>left extra</div>,
          right: <div style={extraStyle}>right extra</div>
        }}
      >
        <TabPane tab="Tab 1" key="1" >
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2" >
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3" >
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Tab 4" key="4" >
          Content of Tab Pane 4
        </TabPane>
      </Tabs>
    </>
  );
};

_ExtraComponent.storyName = "附加内容 Tabs";
_ExtraComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _FullComponent = () => {
  
  return (
    <>
      tab bar撑满父容器
      <Tabs defaultActiveKey="1" fullTabBar>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      <br />
      <Tabs defaultActiveKey="1" type="card" fullTabBar>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      <br />
      <Tabs defaultActiveKey="1" type="block" fullTabBar>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </>
  );
};

_FullComponent.storyName = "Full Tabs";
_FullComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _PositionComponent = () => {
  const [tabPosition, setTabPosition] = useState<PositionType>('left');
  const changeTabPosition = (e: RadioChangeEvent) => {
    setTabPosition(e.target.value);
  }
  return (
    <>
      <Radio.Group value={tabPosition} onChange={changeTabPosition}>
        <Radio value="top">top</Radio>
        <Radio value="bottom">bottom</Radio>
        <Radio value="left">left</Radio>
        <Radio value="right">right</Radio>
      </Radio.Group>
      <br />
      <br />
      <Tabs defaultActiveKey="1" tabPosition={tabPosition}>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      <br />
      <Tabs defaultActiveKey="1" type="card" tabPosition={tabPosition}>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      <br />
      <Tabs defaultActiveKey="1" type="block" tabPosition={tabPosition}>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </>
  );
};

_PositionComponent.storyName = "不同位置 Tabs";
_PositionComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};
// ----------------------------------------------------------------

// export const _ScrollComponent = () => {
//   type ScrollDirection = 'left' | 'right' | 'top' | 'bottom';
//   const [tabPosition, setTabPosition] = useState<PositionType>('top');
//   const changeTabPosition = (e: RadioChangeEvent) => {
//     setTabPosition(e.target.value);
//   }
//   const handleTabScroll = ({direction}:{direction:ScrollDirection}) => {
//     console.log('scroll direction',direction);
//   }
//   return (
//     <>
//       可以左右、上下滑动，容纳更多标签。
//       <br />
//       <Radio.Group value={tabPosition} onChange={changeTabPosition}>
//         <Radio value="top">Horizontal</Radio>
//         <Radio value="left">Vertical</Radio>
//       </Radio.Group>
//       <br />
//       <br />
//       <Tabs defaultActiveKey="1" tabPosition={tabPosition} onTabScroll={handleTabScroll} style={{ height: 220 }}>
//         {[...Array.from({ length: 30 }, (_, i) => i)].map(i => (
//           <TabPane tab={`Tab-${i}`} key={`${i}`} disabled={i === 28}>
//             Content of tab {i}
//           </TabPane>
//         ))}
//       </Tabs>
//       <br />
//       <Tabs defaultActiveKey="1" tabPosition={tabPosition} type="card" style={{ height: 220 }}>
//         {[...Array.from({ length: 30 }, (_, i) => i)].map(i => (
//           <TabPane tab={`Tab-${i}`} key={`${i}`} disabled={i === 28}>
//             Content of tab {i}
//           </TabPane>
//         ))}
//       </Tabs>
//       <br />
//       <Tabs defaultActiveKey="1" tabPosition={tabPosition} type="block" style={{ height: 220 }}>
//         {[...Array.from({ length: 30 }, (_, i) => i)].map(i => (
//           <TabPane tab={`Tab-${i}`} key={`${i}`} disabled={i === 28}>
//             Content of tab {i}
//           </TabPane>
//         ))}
//       </Tabs>
//       <br />
//     </>
//   );
// };

// _ScrollComponent.storyName = "滑动 Tabs";
// _ScrollComponent.parameters = {
//   controls: { hideNoControlsWarning: true },
// };

// ----------------------------------------------------------------

export const _SizeComponent = () => {
  const [size, setSize] = useState<SizeType>('small');
  const changeSize = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  }
  return (
    <>
     <Radio.Group value={size} onChange={changeSize}>
        <Radio value="small">small</Radio>
        <Radio value="middle">middle</Radio>
        <Radio value="large">large</Radio>
      </Radio.Group>
      <br />
      <br />
      <Tabs defaultActiveKey="1" size={size}>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      <br />
      <Tabs defaultActiveKey="1" type="card" size={size}>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      <br />
      <Tabs defaultActiveKey="1" type="block" size={size}>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </>
  );
};

_SizeComponent.storyName = "不同大小 Tabs";
_SizeComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ZIconComponent = () => {

  const contentStyle = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121A19'
  }
  return (
    <>
      <Tabs defaultActiveKey="1" style={{height: 200}}>
        <TabPane
          tab={
              <span>
                <AppleOutlined />
                Tab 1
              </span>
            }
          key="1"
        >
          <div style={contentStyle}>
            <span>Content of Tab Pane 1</span>
          </div>
        </TabPane>
        <TabPane
          tab={
              <span>
                <AndroidOutlined />
                Tab 2
              </span>
            }
          key="2"
        >
          <div style={contentStyle}>
            <span>Content of Tab Pane 2</span>
          </div>
        </TabPane>
      </Tabs>
      <br />
    </>
  );
};

_ZIconComponent.storyName = "图标 Tabs";
_ZIconComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
