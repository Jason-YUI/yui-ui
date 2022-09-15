import {FC} from 'react';
import Tabs, {FRCTabsProps} from './tabs';
import {FRCTabPaneProps} from './tabPane';
import {Tabs as AntTabs} from 'antd';

export type { FRCTabsProps, FRCTabPaneProps }
export type { TabsType, SizeType, PositionType } from './tabs'

const {TabPane : AntTabPane } = AntTabs;

export type FRCTabsComponent = FC<FRCTabsProps> & {
  TabPane: FC<FRCTabPaneProps>;
}

const TransTabs = Tabs as FRCTabsComponent;
TransTabs.TabPane = AntTabPane;

export default TransTabs;