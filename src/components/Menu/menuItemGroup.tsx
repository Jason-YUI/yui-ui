import React, { FC, ReactNode } from "react";
import classNames from "classnames";
import { Menu } from "antd";
import { MenuItemGroupProps } from "antd/lib/menu";
import { ItemType } from './menu'

const { ItemGroup } = Menu;

interface BaseMenuItemGroupProps {
  /** 分组的菜单项 */
  children?: ItemType[];
  /** 分组标题 */
  label?: ReactNode;
}

export type FrcMenuItemGroupProps = BaseMenuItemGroupProps & MenuItemGroupProps;

export const FRCMenuItemGroup: FC<FrcMenuItemGroupProps> = (props) => {
  const { className, children, ...restProps } = props;

  const classes = classNames("yui-menu-item-group", className, {});

  const options = {
    className: classes,
    ...restProps,
  };

  // main
  return <ItemGroup {...options}>{children}</ItemGroup>;
};

// default
FRCMenuItemGroup.defaultProps = {};

export default FRCMenuItemGroup;
