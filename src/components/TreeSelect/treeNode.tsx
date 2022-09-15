import React from 'react';
import {TreeSelect,TreeNodeProps} from 'antd';

const {TreeNode: AntTreeNode} = TreeSelect;

export interface FRCTreeNodeProps extends TreeNodeProps {
  /** 当树为 Checkbox 时，设置独立节点是否展示Checkbox */
  checkable?: boolean;
  /** 禁掉 Checkbox */
  disableCheckbox?: boolean;	
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否是叶子节点 */
  isLeaf?: boolean;
  /** 此项必须设置（其值在整个树范围内唯一） */	
  key?:	string;
  /** 是否可选 */
  selectable?: boolean;
  /** 树节点显示的内容 */
  title?: React.ReactNode;
  /** 默认根据此属性值进行筛选（其值在整个树范围内唯一） */
  value?:	string;	
}

export const TreeNode: React.FC<FRCTreeNodeProps> = (props) => {
  return <AntTreeNode {...(props as Required<FRCTreeNodeProps>)} />
};

export default TreeNode;