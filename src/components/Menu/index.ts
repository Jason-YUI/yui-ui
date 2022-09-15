import { FC } from 'react'
import Menu, { FRCMenuProps } from './menu'
import FRCMenuItem, { FrcMenuItemProps } from './menuItem'
import FRCMenuSubMenu, { FrcMenuSubMenuProps } from './menuSubMenu'
import FRCMenuItemGroup, { FrcMenuItemGroupProps } from './menuItemGroup'
import FRCMenuDivider, { FrcMenuDividerProps } from './menuDivider'

export type {
    FRCMenuProps,
    FrcMenuItemProps,
    FrcMenuSubMenuProps,
    FrcMenuItemGroupProps,
    FrcMenuDividerProps
}

export type {ItemType} from './menu'

export type FRCMenuComponent = FC<FRCMenuProps> & {
    Item: FC<FrcMenuItemProps>;
    SubMenu: FC<FrcMenuSubMenuProps>;
    ItemGroup: FC<FrcMenuItemGroupProps>;
    Divider: FC<FrcMenuDividerProps>;
}
const FRCMenu = Menu as FRCMenuComponent
FRCMenu.Item = FRCMenuItem
FRCMenu.SubMenu = FRCMenuSubMenu
FRCMenu.ItemGroup = FRCMenuItemGroup
FRCMenu.Divider = FRCMenuDivider
export default FRCMenu


