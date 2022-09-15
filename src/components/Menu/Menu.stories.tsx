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
  Source,
} from "@storybook/addon-docs";

import Menu,{FRCMenuProps} from "./index";
import { MenuModeType } from "./menu";
import {
  AppstoreOutlined,
  ContainerOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Button from "../Button";
import Radio from "../Radio";
import { RadioChangeEvent } from "antd";

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { Menu } from 'yui-ui';

// 按需引入 icon
import { ExclamationCircleOutlined } from '@ant-design/icons';
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
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
const ItemGroup = Menu.ItemGroup;
const Divider = Menu.Divider;
export default {
  title: "导航/Menu 导航菜单",
  component: Menu,
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
          <Subheading>Menu</Subheading>
          <ArgsTable of={Menu} />
          <Subheading>ItemType</Subheading>
          <Source
            dark
            language="ts"
            code="type ItemType = MenuItemType | SubMenuType | MenuItemGroupType |
            MenuDividerType;"
          />
          <Subheading>MenuItemType</Subheading>
          <ArgsTable of={Item} />
          <Subheading>SubMenuType</Subheading>
          <ArgsTable of={SubMenu} />
          <Subheading>MenuItemGroupType</Subheading>
          <ArgsTable of={ItemGroup} />
          <Subheading>MenuDividerType</Subheading>
          <ArgsTable of={Divider} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Menu>;

// ----------------------------------------------------------------

export const Default = (args: FRCMenuProps) => {
  const items = [
    { label: "菜单项一", key: "item-1" },
    {
      label: "菜单项二",
      key: "item-2",
      children: [
        { label: "子菜单项一", key: "submenu-item-11" },
        { label: "子菜单项二", key: "submenu-item-22" },
      ],
    },
    {
      label: "子菜单",
      key: "submenu",
      children: [
        { label: "子菜单项一", key: "submenu-item-1" },
        { label: "子菜单项二", key: "submenu-item-2" },
      ],
    },
  ];

  return <Menu items={items} style={{ width: 186 }} {...args} />
};

Default.storyName = "默认 menu";

// ----------------------------------------------------------------

export const _TopMenu = () => {
  const items = [
    { label: "菜单项一", key: "item-1" },
    {
      label: "菜单项二",
      key: "item-2",
      children: [
        { label: "子菜单项一", key: "submenu-item-21" },
        { label: "子菜单项二", key: "submenu-item-22" },
      ],
    },
    {
      label: "菜单项三",
      key: "item-3",
      children: [
        { label: "子菜单项一", key: "submenu-item-31" },
        { label: "子菜单项二", key: "submenu-item-32" },
        { label: "子菜单项三", key: "submenu-item-33", disabled: true},
      ],
    },
    {
      label: "菜单项四",
      disabled:true,
      key: "item-4",
      children: [
        { label: "子菜单项一", key: "submenu-item-41" },
        { label: "子菜单项二", key: "submenu-item-42" },
      ],
    },
  ];
  return <Menu mode="horizontal" items={items} />;
};
_TopMenu.storyName = "顶部导航";
_TopMenu.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _HasGroupMenu = () => {
  return (
    <Menu
      style={{ width: 186 }}
      items={[
        {
          label: "Navigation One",
          key: "mail",
        },
        {
          label: "Navigation Two",
          key: "SubMenu",
          children: [
            {
              type: "group",
              label: "Group 1",
              children: [
                {
                  label: "Option 1",
                  key: "group1-1",
                },
                {
                  label: "Option 2",
                  key: "group1-2",
                },
              ],
            },
            {
              type: "group",
              label: "Group 2",
              children: [
                {
                  label: "Option 3",
                  key: "group2-1",
                },
                {
                  label: "Option 4",
                  key: "group2-2",
                },
              ],
            },
          ],
        },
      ]}
    />
  );
};
_HasGroupMenu.storyName = "带分组的 Menu";
_HasGroupMenu.parameters = {
  controls: { hideNoControlsWarning: true },
};
// ----------------------------------------------------------------

export const _HasDivider = () => {
  return (
    <Menu
      style={{ width: 186 }}
      items={[
        {
          label: "Navigation One",
          key: "mail",
        },
        {
          label: "Navigation Two",
          key: "SubMenu",
          children: [
            {
              label: "item",
              key: "mail2",
            },
            {
              type: "divider",
              key: "divider2",
            },
            {
              label: "item2",
              key: "mail23",
            },
            {
              type: "divider",
              key: "divider1",
            },
            {
              label: "item3",
              key: "mail24",
            },
          ],
        },
      ]}
    />
  );
};
_HasDivider.storyName = "带分割线的 Menu";
_HasDivider.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _HasDisabled = () => {
  return (
    <Menu
      style={{ width: 186 }}
      items={[
        {
          label: "Navigation One",
          disabled: true,
          key: "mail",
        },
        {
          label: "Navigation Two",
          key: "SubMenu",
          children: [
            {
              label: "item",
              key: "mail2",
              disabled: true,
            },

            {
              label: "item2",
              key: "mail23",
            },
            {
              label: "item3",
              key: "mail24",
            },
          ],
        },
      ]}
    />
  );
};
_HasDisabled.storyName = "带禁用的 Menu";
_HasDisabled.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _HasIcon = () => {
  return (
    <Menu
      style={{ width: 186 }}
      items={[
        {
          label: "Navigation One",
          key: "mail",
          icon: <MailOutlined />,
        },
        {
          label: "Navigation Two",
          key: "SubMenu",
          icon: <AppstoreOutlined />,
          children: [
            {
              label: "item",
              key: "mail2",
              icon: <AppstoreOutlined />,
            },

            {
              label: "item2",
              key: "mail23",
              icon: <SettingOutlined />,
            },
            {
              label: "item3",
              key: "mail24",
              icon: <ContainerOutlined />,
            },
          ],
        },
      ]}
    />
  );
};
_HasIcon.storyName = "带图标的 Menu";
_HasIcon.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _IsCollapsed = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(186);
  const toggleCollapsed = () => {
    !collapsed ? setCollapsedWidth(40) : setCollapsedWidth(186);
    setCollapsed(!collapsed);
  };
  return (
    <>
      点击按钮折叠关闭
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ margin: "0 0 16px 16px" }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        items={[
          {
            label: "Navigation One",
            key: "mail",
            icon: <MailOutlined />,
          },
          {
            label: "Navigation Two",
            key: "SubMenu",
            icon: <AppstoreOutlined />,
            children: [
              {
                label: "item",
                key: "mail2",
                icon: <AppstoreOutlined />,
              },
  
              {
                label: "item2",
                key: "mail23",
                icon: <SettingOutlined />,
              },
              {
                label: "item3",
                key: "mail24",
                icon: <ContainerOutlined />,
              },
            ],
          },
        ]}
        inlineCollapsed={collapsed}
        style={{ width: collapsedWidth }}
      />
    </>
  );
};
_IsCollapsed.storyName = "带折叠展开的 Menu";
_IsCollapsed.parameters = {
  controls: { hideNoControlsWarning: true },
};
// ----------------------------------------------------------------
export const _SubmenusIsPop = () => {
  const items = [
    { label: "菜单项一", key: "item-1" },
    {
      label: "菜单项二",
      key: "item-2",
      children: [
        { label: "子菜单项一", key: "submenu-item-11" },
        { label: "子菜单项二", key: "submenu-item-22" },
      ],
    },
    {
      label: "子菜单",
      key: "submenu",
      children: [
        { label: "子菜单项一", key: "submenu-item-1" },
        { label: "子菜单项二", key: "submenu-item-2" },
        { label: "子菜单项二", key: "submenu-item-3",disabled: true},
      ],
    },
  ];
  return <Menu style={{ width: 186 }} items={items} mode="vertical" />;
};

_SubmenusIsPop.storyName = "子菜单是弹出形式";
_SubmenusIsPop.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
// submenu keys of first level
export const _ExpandOnlyOne = () => {

  const [openKeys, setOpenKeys] = React.useState(["item-1"]);

  const onOpenChange = (keys:string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const rootSubmenuKeys = ["item-1", "item-2", "submenu"];
  
  const items = [
    { label: "菜单项一", key: "item-1" },
    {
      label: "菜单项二",
      key: "item-2",
      children: [
        { label: "子菜单项一", key: "submenu-item-11" },
        { label: "子菜单项二", key: "submenu-item-22" },
      ],
    },
    {
      label: "子菜单",
      key: "submenu",
      children: [
        { label: "子菜单项一", key: "submenu-item-1" },
        { label: "子菜单项二", key: "submenu-item-2" },
      ],
    },
  ];
  return <Menu style={{ width: 186 }} items={items} openKeys={openKeys} onOpenChange={onOpenChange} />;
};

_ExpandOnlyOne.storyName = "只展开当前父级菜单";
_ExpandOnlyOne.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
export const _ChangeMenuType = () => {
  const [mode, setMode] = React.useState<MenuModeType>("inline");
  
  const onChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };
  
  const items = [
    { label: "菜单项一", key: "item-1" },
    {
      label: "菜单项二",
      key: "item-2",
      children: [
        { label: "子菜单项一", key: "submenu-item-11" },
        { label: "子菜单项二", key: "submenu-item-22" },
      ],
    },
    {
      label: "子菜单",
      key: "submenu",
      children: [
        { label: "子菜单项一", key: "submenu-item-1" },
        { label: "子菜单项二", key: "submenu-item-2" },
      ],
    },
  ];
  return (
    <>
      <Radio.Group
        style={{ margin: "0 0 16px 0" }}
        onChange={onChange}
        value={mode}
      >
        <Radio value="inline">inline</Radio>
        <Radio value="vertical">vertical</Radio>
        <Radio value="horizontal">horizontal</Radio>
      </Radio.Group>
      <Menu style={{ width: mode === "horizontal"? "100%":186 }} items={items} mode={mode} />
    </>
  );
};

_ChangeMenuType.storyName = "切换菜单类型";
_ChangeMenuType.parameters = {
  controls: { hideNoControlsWarning: true },
};
