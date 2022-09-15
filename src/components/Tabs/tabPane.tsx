// 本组件仅供展示storybook，不提供使用
import React from 'react';
import classNames from 'classnames';
import {Tabs} from 'antd';

const {TabPane: AntTabPane} = Tabs;

interface BaseTabPaneProps {
  /** 禁用某一项 */
  disabled?: boolean;
  /** 被隐藏时是否渲染 DOM 结构 */
  forceRender?: boolean;
  /** 对应 activeKey */
  key: string;
  /** 选项卡头显示文字 */
  tab: React.ReactNode;
}

export type FRCTabPaneProps = React.PropsWithChildren<BaseTabPaneProps> ;

export const TabPane: React.FC<FRCTabPaneProps> = ({children}) => {

  const cls = classNames('yui-tab-pane');
  
  return <AntTabPane className={cls}>{children}</AntTabPane>
}

TabPane.defaultProps = {
  disabled: false,
  forceRender: false
}

export default TabPane;
