import {FC} from 'react';
import TreeSelect, {FRCTreeSelectProps,ALL_BUTTON,INVERT_BUTTON} from './treeSelect';
import TreeNode from './treeNode';
import {TreeSelect as AntTreeSelect} from 'antd';

const {SHOW_ALL,SHOW_CHILD,SHOW_PARENT} = AntTreeSelect;

export type FRCTreeSelectComponent = FC<FRCTreeSelectProps> & {
  TreeNode: typeof TreeNode;
  SHOW_ALL: typeof SHOW_ALL;
  SHOW_CHILD: typeof SHOW_CHILD;
  SHOW_PARENT: typeof SHOW_PARENT;
  ALL_BUTTON: typeof ALL_BUTTON;
  INVERT_BUTTON: typeof INVERT_BUTTON;
}

const TransTreeSelect = TreeSelect as FRCTreeSelectComponent;
TransTreeSelect.TreeNode = TreeNode;
TransTreeSelect.SHOW_ALL = SHOW_ALL;
TransTreeSelect.SHOW_CHILD = SHOW_CHILD;
TransTreeSelect.SHOW_PARENT = SHOW_PARENT;
TransTreeSelect.ALL_BUTTON = ALL_BUTTON;
TransTreeSelect.INVERT_BUTTON = INVERT_BUTTON;

export default TransTreeSelect;

export type {FRCTreeSelectProps} from './treeSelect';
