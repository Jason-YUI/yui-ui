import React from 'react';
import classNames from 'classnames';
import {Tabs as AntTabs, TabsProps} from 'antd';

export type TabsType = 'outline' | 'card' | 'block';
export type SizeType = 'small' | 'middle' | 'large';
export type PositionType = 'top' | 'right' | 'bottom' | 'left';

interface BaseTabsProps {
  /** 当前激活 tab 面板的 key */
  activeKey?: string;
  /** tabs 类名 */
  className?: string;
  /** 标签居中展示 */
  centered?: boolean;
  /** 标签是否撑满父容器 */
  fullTabBar?: boolean;
  /** 初始化选中面板的 key，如果没有设置 activeKey */
  defaultActiveKey?: string;
  /** destroyInactiveTabPane */
  destroyInactiveTabPane?: boolean;
  /** 自定义折叠 icon */
  moreIcon?: React.ReactNode;
  /** 不同大小 */
  size?: SizeType
  /** tabs wrapper 样式 */
  style?: React.CSSProperties;
  /** tab bar 上额外的元素 */
  tabBarExtraContent?: React.ReactNode | {left?: React.ReactNode, right?: React.ReactNode}
  /** tab bar 之间的间隙 */
  tabBarGutter?: number;
  /** tab bar 的样式对象 */
  tabBarStyle?: React.CSSProperties;
  /** 页签位置 */
  tabPosition?: PositionType;
  /** 页签的基本样式 */
  type?: TabsType;
  /** 替换 TabBar，用于二次封装标签头 */
  renderTabBar?:(props:any, DefaultTabBar: React.ComponentClass) => React.ReactElement
  /** 切换面板的回调 */
  onChange?: (acitveKey: string) => void;
  /** tab 被点击的回调 */
  onTabClick?: (key: string, event: MouseEvent) => void;
  /** tab 滚动时触发 */
  onTabScroll?: (params:{direction: 'left' | 'right' | 'top' | 'bottom'}) => void;
}

export type FRCTabsProps = React.PropsWithChildren<BaseTabsProps> & Omit<TabsProps, 'type' | 'onEdit' | 'addIcon'  |'hideAdd' | 'size'>;

export const Tabs: React.FC<FRCTabsProps> = ({
  className,
  type,
  fullTabBar,
  size,
  ...otherProps
 }) => {

  const cls = classNames('yui-tabs',className,{
    [`yui-tabs-${type}`]: type,
    [`yui-tabs-${size}`]: size,
    'yui-tabs-full': fullTabBar
  })

  const options = {
    className: cls,
    ...otherProps
  }
  
  return <AntTabs {...options} />
}

Tabs.defaultProps = {
  type: 'outline',
  destroyInactiveTabPane: false,
  centered: false,
  fullTabBar: false,
  size: 'small',
  tabPosition: 'top'
}

export default Tabs;
