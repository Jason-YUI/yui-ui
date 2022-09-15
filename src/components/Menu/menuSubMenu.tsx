import React, { FC, ReactNode } from "react";
import classNames from "classnames";
import { Menu } from "antd";
import { SubMenuProps } from "antd/es/menu/SubMenu";
import { MenuThemeType,ItemType } from "./menu";

const { SubMenu } = Menu;

interface BaseMenuSubMenuProps {
  /** 子菜单的菜单项 */
  children?: ItemType[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 菜单图标 */
  icon?: ReactNode;
  /** 唯一标志 */
  key?: string;
  /** 菜单项标题 */
  label?: ReactNode;
  /** 子菜单样式，mode="inline" 时无效 */
  popupClassName?: string;
  /** 子菜单偏移量，mode="inline" 时无效 */
  popupOffset?: [number, number];
  /** 点击子菜单标题 */
  onTitleClick?: (e: {
    key: string;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
  }) => void;
  /** 设置子菜单的主题，(目前只提供一种)* */
  theme?: MenuThemeType;
}

export type FrcMenuSubMenuProps = BaseMenuSubMenuProps & Omit<SubMenuProps, "children">;

export const FRCMenuSubMenu: FC<FrcMenuSubMenuProps> = (props) => {
  const { className, children, ...restProps } = props;

  const classes = classNames("yui-menu-submenu", className, {});

  const options = {
    className: classes,
    ...restProps,
  };

  // main
  return <SubMenu {...options}>{children}</SubMenu>;
};

// default
FRCMenuSubMenu.defaultProps = {
  disabled: false,
};

export default FRCMenuSubMenu;
