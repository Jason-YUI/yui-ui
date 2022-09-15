import React from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {ItemType} from 'antd/es/menu/hooks/useItems'
import {MoreOutlined} from '@ant-design/icons';


import { ComponentMeta } from '@storybook/react';

import {
    Title,
    Description,
    ArgsTable,
    Stories,
    Heading,
    Subheading
} from '@storybook/addon-docs';

import Dropdown from './index';
import {FRCDropdownProps} from './dropdown'


// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { Dropdown } from 'yui-ui';

// 按需引入 icon
import { QuestionCircleOutlined } from "@ant-design/icons";
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
    title: '导航/Dropdown 下拉菜单',
    component: Dropdown,
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

                    <Subheading>Dropdown</Subheading>
                    <ArgsTable of={Dropdown} />
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Dropdown>;

// ----------------------------------------------------------------

export const Default = (args: FRCDropdownProps) => {
    const list: ItemType[] = [
        {
          label:'1st menu item',
          key: '0',
        },
        {
          label: '2nd menu item',
          key: '1',
        },
        {
          label: '3rd menu item',
          key: '3',
        }
      ]
    return (
        <>
            <Dropdown {...args} menuOptions={{items: list}}>
              Dropdown
            </Dropdown>
        </>
    )
};

Default.storyName = '基本使用 Dropdown';

// ----------------------------------------------------------------

export const _DisabledComponent = () => {
    const list: ItemType[] = [
        {
          label:'1st menu item',
          key: '0',
        },
        {
          label: '2nd menu item',
          key: '1',
        },
        {
          label: '3rd menu item',
          key: '3',
        }
      ]
    return (
        <>
            <Dropdown menuOptions={{items: list}} disabled>
              Disable Dropdown
            </Dropdown>
        </>
    )
};

_DisabledComponent.storyName = '禁用 Dropdown';

// ----------------------------------------------------------------

export const _PlaceComponent = () => {
    const list: ItemType[] = [
        {
          label:'1st menu item longer.....',
          key: '0',
        },
        {
          label: '2nd menu item',
          key: '1',
        },
        {
          label: '3rd menu item',
          key: '3',
        }
      ]
    return (
        <>
            支持 6 个弹出位置。
            <br />
            <Dropdown menuOptions={{items: list}} placement="bottomLeft" >
              bottomLeft
            </Dropdown>
            <br />
            <Dropdown menuOptions={{items: list}} placement="bottom" >
              bottom
            </Dropdown>
            <br />
            <Dropdown menuOptions={{items: list}} placement="bottomRight" >
              bottomRight
            </Dropdown>
            <br />
            <Dropdown menuOptions={{items: list}} placement="topLeft" >
              topLeft
            </Dropdown>
            <br />
            <Dropdown menuOptions={{items: list}} placement="top" >
              top
            </Dropdown>
            <br />
            <Dropdown menuOptions={{items: list}} placement="topRight" >
              topRight
            </Dropdown>
        </>
    )
};

_PlaceComponent.storyName = '弹出位置 Dropdown';

// ----------------------------------------------------------------

export const _OtherEleComponent = (args: FRCDropdownProps) => {
  const list: ItemType[] = [
      {
          label:'1st menu item',
          key: '0',
      },
      {
          label: '2nd menu item',
          key: '1',
      },
      {
        type: 'divider',
      },
      // storybook 渲染icon失败
      // {
      //     label: '3rd menu item',
      //     key: '3',
      //     // icon: <StarOutlined />
      // },
      // {
      //     label: '4th menu item',
      //     key: '4',
      //     // icon: <SettingOutlined />
      // },
      // {
      //   type: 'divider',
      // },
      {
        label: '5th menu item',
        key: '5',
        disabled: true,
      }
    ]
    const handleMenuClick = (item:any) => {
      console.log(item);
    }
  return <Dropdown menuOptions={{items: list,onClick:handleMenuClick,selectable:true}} triggerStyle={{width:150}}>Other Element</Dropdown>
};

_OtherEleComponent.storyName = '其他元素 Dropdown';

// ----------------------------------------------------------------

export const _MultipleLevelsComponent = () => {
    const list: ItemType[] = [
        {
            type: 'group',
            label: 'Group title',
            children: [
              {
                key: '1',
                label: '1st menu item'
              },
              {
                key: '2',
                label: '2nd menu item'
              },
            ],
          },
          {
            key: 'sub',
            label: 'sub menu',
            children: [
              {
                key: '3',
                label: '3rd menu item'
              },
              {
                key: '4',
                label: '4th menu item',
                children: [
                  {
                    key: '7',
                    label: '7th menu item'
                  }
                ]
              },
            ],
          },
          {
            label: 'disabled sub menu',
            key: 'disabled',
            disabled: true,
            children: [
              {
                key: '5',
                label: '5d menu item'
              },
              {
                key: '6',
                label: '6th menu item'
              },
            ],
          }
      ]
    return (
      <Dropdown menuOptions={{items: list}} triggerStyle={{width:200}}>
        Group&SubMenu Dropdown
      </Dropdown>
    )
};

_MultipleLevelsComponent.storyName = '多级菜单 Dropdown';

// ----------------------------------------------------------------

export const _IconComponent = () => {
  const list: ItemType[] = [
    {
        label: '1st menu item',
        key: '1',
    },
    {
        label: '2nd menu item',
        key: '2',
    },
    {
      label: '3rd menu item',
      key: '3',
    }
  ]
    return (<>
      <Dropdown menuOptions={{items: list}} icon={<MoreOutlined style={{fontSize:18}} />} />
      disabled
      <br />
      <Dropdown menuOptions={{items: list}} disabled icon={<MoreOutlined style={{fontSize:18}} />} />
    </>)
};

_IconComponent.storyName = '图标 Dropdown';
_IconComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _WorkComponent = () => {
  const list: ItemType[] = [
    {
        label: '1st menu item',
        key: '1',
    },
    {
        label: '2nd menu item',
        key: '2',
    },
    {
      label: '3rd menu item',
      key: '3',
    }
  ]
    return (
    <>
      <Dropdown menuOptions={{items: list}} working >Working Status</Dropdown>
      <Dropdown menuOptions={{items: list}} working icon={<MoreOutlined style={{fontSize:18}} />} />
    </>)
};

_WorkComponent.storyName = 'Work Dropdown';
_WorkComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _SelectableComponent = () => {
  const list: ItemType[] = [
    {
        label: '1st menu item',
        key: '1',
    },
    {
        label: '2nd menu item',
        key: '2',
    },
    {
      label: '3rd menu item',
      key: '3',
    }
  ]
    return (
    <>
      为 MenuOptions 设置 selectable 属性为 true 可以开启选择能力。
      <br />
      <Dropdown menuOptions={{items: list,selectable: true}} >Selectable</Dropdown>
    </>)
};

_SelectableComponent.storyName = '菜单可选选择 Dropdown';
_SelectableComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _TriggerComponent = () => {
  const list: ItemType[] = [
    {
        label: '1st menu item',
        key: '1',
    },
    {
        label: '2nd menu item',
        key: '2',
    },
    {
      label: '3rd menu item',
      key: '3',
    }
  ]
    return (
    <>
      鼠标悬浮
      <br />
      <Dropdown menuOptions={{items: list}} trigger={['hover']} >Hover trigger</Dropdown>
      <br />
      右键菜单
      <br />
      <Dropdown menuOptions={{items: list}} trigger={['contextMenu']} arrow={false}>ContextMenu trigger</Dropdown>
    </>)
};

_TriggerComponent.storyName = '其他触发方式 Dropdown';
_TriggerComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

