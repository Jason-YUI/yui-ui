import React,{useMemo,useState,useCallback,useEffect} from 'react';
import classNames from 'classnames'
import {TreeSelect as AntTreeSelect,TreeSelectProps} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import useTreeData from 'rc-tree-select/lib/hooks/useTreeData';
import useDataEntities from 'rc-tree-select/lib/hooks/useDataEntities';
import useCheckedKeys from 'rc-tree-select/lib/hooks/useCheckedKeys';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import {formatStrategyValues} from 'rc-tree-select/lib/utils/strategyUtil';
import {fillFieldNames, toArray,isNil} from 'rc-tree-select/lib/utils/valueUtil';
import {RawValueType, LabeledValueType, DraftValueType, DefaultOptionType} from 'rc-tree-select/lib/TreeSelect';
import Icon from '../Icon';
import Button from '../Button';
import {useLeafs} from './hooks';

const {SHOW_ALL,SHOW_PARENT,SHOW_CHILD} = AntTreeSelect;

export const ALL_BUTTON = 'ALL_BUTTON';
export const INVERT_BUTTON = 'INVERT_BUTTON';

export type PlacementType = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';

export interface TreeNodeNormal {
  value: string | number | string[] | number[];
  title?: React.ReactNode;
  key: string;
  isLeaf?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  selectable?: boolean;
  children?: TreeNodeNormal[];
}

export interface TreeNodeSimpleMode {
  [key: string]: string | boolean | React.ReactNode;
}

export type TreeData = TreeNodeNormal | TreeNodeSimpleMode;

export type  TreeNodeValue = string | number | string[] | number[];

interface BaseTreeSelectProps {
  /** 显示清除按钮 */
  allowClear?: boolean
  /** 选择器类名 */
  className?:string;
  /** 指定默认选中的条目 */
  defaultValue?: string | string[];
  /** 是否禁用 */
  disabled?: boolean
  /** 下拉菜单的 className 属性 */
  dropdownClassName?: string;
  /** 下拉菜单和选择器同宽。默认将设置 min-width，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动 */
  dropdownMatchSelectWidth?: boolean | number;
  /** 	自定义下拉框内容 */
  dropdownRender?: (originNode: React.ReactNode, props:any) => React.ReactNode;
  /** 下拉菜单的样式 */
  dropdownStyle?: React.CSSProperties;
  /** 自定义节点 label、value、children 的字段 */
  fieldNames?: {value?: string; label?: string; children?: string;}
  /** 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位 */
  getPopupContainer?:(triggerNode: HTMLElement) => HTMLElement;
  /** 设置弹窗滚动高度 */
  listHeight?: number;
  /** 最多显示多少个 tag，响应式模式会对性能产生损耗 */
  maxTagCount?: number | 'responsive';
  /** 隐藏 tag 时显示的内容 */
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: any[]) => React.ReactNode);
  /** 支持多选（当设置 treeCheckable 时自动变为 true） */
  multiple?: boolean;
  /** 当下拉列表为空时显示的内容 */
  notFoundContent?: React.ReactNode;
  /** 选择框默认文字 */
  placeholder?: string;
  /** 选择框弹出的位置 */
  placement?:PlacementType;
  /** 是否显示下拉小箭头 */
  showArrow?: boolean;
  /** 配置是否可搜索 */
  showSearch?: boolean;
  /** 搜索框的值，可以通过 onSearch 获取用户输入 */
  searchValue?: string;
  /** 选择器的样式 */
  style?: React.CSSProperties;
  /** 自定义的选择框后缀图标, 多选模式下必须同时设置 showArrow 为 true */
  suffixIcon?: React.ReactNode;
  /** 自定义树节点的展开/折叠图标 */
  switcherIcon?: React.ReactNode | ((props:any) => React.ReactNode);
  /** 配置 treeCheckable 时，定义选中项回填的方式。TreeSelect.SHOW_ALL: 显示所有选中节点(包括父节点)。TreeSelect.SHOW_PARENT: 只显示父节点(当父节点下所有子节点都选中时)。 默认只显示子节点 */
  showCheckedStrategy?: typeof SHOW_ALL| typeof SHOW_PARENT| typeof SHOW_CHILD
  /** 配置下拉选项是否展示复选框 */
  treeCheckable?: boolean;
  /** treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（value 在整个树范围内唯一 */
  treeData?: TreeData[];
  /** checkable 状态下节点选择完全受控（父子节点选中状态不再关联），会使得 labelInValue 强制为 true */
  treeCheckStrictly?: boolean;
  /** 使用简单格式的 treeData，具体设置参考可设置的类型 (此时 treeData 应变为这样的数据结构: [{id:1, pId:0, value:'1', title:"test1",...},...]， pId 是父节点的 id) */
  treeDataSimpleMode?: boolean | object;
  /** 默认展开所有树节点 */
  treeDefaultExpandAll?: boolean;
  /** 默认展开的树节点 */
  treeDefaultExpandedKeys?: string[];
  // 4.21.0
  // /** 点击节点 title 时的展开逻辑，可选：false | click | doubleClick */
  // treeExpandAction?: boolean | 'click' | 'doubleClick';
  /** 设置展开的树节点 */
  treeExpandedKeys?: string[];
  /** 是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式 */
  treeIcon?: boolean;
  /** 是否展示线条样式 */
  treeLine?: boolean | { showLeafIcon: boolean; };
  /** （受控）已经加载的节点，需要配合 loadData 使用 */
  treeLoadedKeys?: React.Key[];
  /** 输入项过滤对应的 treeNode 属性 */
  treeNodeFilterProp?: string;
  /** 作为显示的 prop 设置 */
  treeNodeLabelProp?: string;
  /** 指定当前选中的条目 */
  value?: TreeNodeValue;
  /** 设置 false 时关闭虚拟滚动 */
  virtual?: boolean;
  /** 选中树节点时调用此函数 */
  onChange?: (value: TreeNodeValue, label: any, extra: any) => void;
  /** 展开下拉菜单的回调 */
  onDropdownVisibleChange?: (open: boolean) => void;
  /** 文本框值变化时回调 */
  onSearch?: (value: string) => void;
  /** 被选中时调用 */
  onSelect?: (value: TreeNodeValue, node: any, extra: any) => void;
  /** 展示节点时调用 */
  onTreeExpand?: (expandedKeys: string[]) => void;
  /** wrapper style */
  wrapperStyle?:React.CSSProperties;
  /** wrapper className */
  wrapperClassName?:string;
  /** 回填到选择框样式，当值为'ellipsis'时showCheckedStrategy自动设置为TreeSelect.SHOW_CHILD且不可更改；default即为antd回填样式 */
  fillMode?:'default' | 'ellipsis'
  /** 是否展示已勾选项 仅当fillMode为'ellipsis'时可以设置true */
  showSelected?: boolean;
  /** 展示 全选、反选 按钮 */
  showExtraButton?: string[];
  /** 回显文本分隔符 仅当fillMode='ellipsis'时生效 */
  separator?: string;
};

export type FRCTreeSelectProps = BaseTreeSelectProps & Omit<TreeSelectProps, 'treeData'>;


function isRawValue(value: RawValueType | LabeledValueType): value is RawValueType {
  return !value || typeof value !== 'object';
}

export const TreeSelect: React.FC<FRCTreeSelectProps> = ({
  // >>> className & style
  wrapperStyle,
  wrapperClassName,
  className,
  dropdownClassName,
  // >>> data
  children,
  fieldNames,
  treeDataSimpleMode,
  treeData,
  defaultValue,
  value,
  showCheckedStrategy,
  // >>> options
  disabled,
  dropdownRender,
  switcherIcon,
  showArrow,
  multiple,
  treeCheckable,
  treeCheckStrictly,
  treeNodeLabelProp,
  onChange,
  // >>> custom options
  fillMode,
  showSelected,
  showExtraButton,
  separator,

  ...resetProps
}) => {
  const [tValue, setTValue] = useState<any>(defaultValue);

  // ------------------------------ handle props ------------------------------
  const treeConduction = !!(treeCheckable && !treeCheckStrictly);
  const mergedCheckable = treeCheckable || treeCheckStrictly;
  const mergedMultiple = mergedCheckable || multiple;
  const mergedShowCheckedStrategy = fillMode === 'ellipsis'? SHOW_CHILD : showCheckedStrategy;
  const mergedShowSelected = fillMode === 'ellipsis' ? showSelected : false;

  const mergedFieldNames = useMemo(
    () => fillFieldNames(fieldNames),
    /* eslint-disable react-hooks/exhaustive-deps */
    [JSON.stringify(fieldNames)]
  );

  // handle treeData & children to {key,title,value,children}
  const mergedTreeData = useTreeData(treeData as any ,children, treeDataSimpleMode || false);

  const allLeafs = useLeafs(mergedTreeData);

  // ------------------------------ handle fill content --------------------------------

  const [fillContent, setFillContent] = useState<any[]>([]);

  // keyEntities {key: object},valueEntities Map{key => object}
  const {keyEntities, valueEntities} = useDataEntities(mergedTreeData, mergedFieldNames);

  const getLabel = useCallback(
    (item: DefaultOptionType) => {
      if(item) {
        if(treeNodeLabelProp) {
          return item[treeNodeLabelProp];
        }

        const {_title: titleList} = mergedFieldNames;

        for(let i = 0; i< titleList.length; i += 1) {
          const title = item[titleList[i]];
          if(title !== undefined) {
            return title;
          }
        }
      }
    },
    [mergedFieldNames, treeNodeLabelProp]
  );
  
  // convert raw value to {value:xxx}
  const toLabeledValues = useCallback(
    (dValues: DraftValueType) => {
      const vals = toArray(dValues);
      return vals.map(v => {
        if(isRawValue(v)) {
          return {value: v};
        }
        return v;
      });
    },
    []
  );

  // convert to {label:xxx,value:raw,halfChecked:boolean,disabled:boolean}
  const convert2LabelValues = useCallback(
    (dValues: DraftValueType) => {
      const vals = toLabeledValues(dValues);
      return vals.map(v => {
        let {label: rawLabel} = v;
        const {value: rawValue, halfChecked: rawHalfChecked} = v;
        let rawDisabled: boolean | undefined ;
        const entity = valueEntities.get(rawValue!);

        if(entity) {
          rawLabel = rawLabel ?? getLabel(entity.node);
          rawDisabled = entity.node.disabled
        }

        return {
          label: rawLabel,
          value: rawValue,
          halfChecked: rawHalfChecked,
          disabled: rawDisabled
        };
      });
    },
    [valueEntities, getLabel, toLabeledValues]
  )

  // get value: string[]
  const [internalValue] = useMergedState(undefined, {value:tValue});
  
  const rawMixedLabeledValues = useMemo(() => toLabeledValues(internalValue), [internalValue,toLabeledValues]);

  // split value into full check and half check
  const [rawLabeldValues, rawHalfLabeledValues] = useMemo(() => {
    const fullCheckValues: LabeledValueType[] = [];
    const halfCheckValues: LabeledValueType[] = [];
    rawMixedLabeledValues.forEach(item => {
      if(item.halfChecked) {
        halfCheckValues.push(item);
      }else {
        fullCheckValues.push(item);
      }
    });
    return [fullCheckValues, halfCheckValues];
  },[rawMixedLabeledValues])

  // const rawValues = useMemo(() => rawLabeldValues.map(r => r.value),[rawLabeldValues]);

  const [rawCheckedValues] = useCheckedKeys(
    rawLabeldValues,
    rawHalfLabeledValues,
    treeConduction,
    keyEntities
  );

  const displayValues = useMemo(() => {
    const displayKeys = formatStrategyValues(
      rawCheckedValues,
      mergedShowCheckedStrategy!,
      keyEntities,
      mergedFieldNames
    );
    // @ts-ignore
    const values = displayKeys.map(k => keyEntities[k]?.node?.[mergedFieldNames.value] ?? k);

    const labeledValues = values.map(val => {
      const targetItem = rawLabeldValues.find(item => item.value === val);
      return {
        value:val,
        label:targetItem?.label
      };
    });

    const rawDisplayValues = convert2LabelValues(labeledValues);

    const firstVal = rawDisplayValues[0];

    if(!mergedMultiple && firstVal && isNil(firstVal.value) && isNil(firstVal.label)) {
      return [];
    }
    return rawDisplayValues.map(item => ({
      ...item,
      label: item.label ?? item.value
    }))

  },[
    mergedFieldNames,
    mergedMultiple,
    rawCheckedValues,
    rawLabeldValues,
    mergedShowCheckedStrategy,
    keyEntities
  ]);

  // -------------------------------- handle classes --------------------------------
  
  const wrapperCls = classNames('yui-tree-select-wrapper',wrapperClassName, {
    'yui-tree-select-wrapper-ellipsis': fillMode === 'ellipsis',
    'yui-tree-select-wrapper-arrow': showArrow
  })

  const treeSelectcls = classNames('yui-select yui-tree-select',className, {});
  
  const hiddenSwitcher = useMemo(() => mergedTreeData.every(c => !c[mergedFieldNames.children]?.length), [mergedTreeData,mergedFieldNames]);
  const dropdownCls = classNames('yui-select yui-tree-select-dropdown',dropdownClassName,{
    'yui-tree-select-hidden-switcher': hiddenSwitcher
  });

  const triggerChange = useCallback((value: TreeNodeValue, label: any, extra: any) => {
    if(typeof onChange === 'function'){
      onChange(value, label, extra);
    }else {
      setTValue(value);
    }
  },[])

  // ------------------------------- useEffect --------------------------

  useEffect(() => {
    setFillContent(displayValues.map((d,i,arr) => {
      let s = separator;
      if(i === arr.length - 1) {
        s = '';
      }
      return (
        <>
          {d.label}
          <span>{s}</span>
        </>
      )
    }));
  },[displayValues,separator]);

  useEffect(() => {
    if(value) {
      setTValue(value);
    }
  },[value]);

  // ------------------------------ render -------------------------------

  const renderChecked = () => {
    if(!mergedShowSelected){
      return null;
    }
    const checkedList = displayValues.map(d => ({
      title: d.label,
      value: d.value,
      key: d.value
    }));
    const checkedValue:any = displayValues.map(d => d.value);
    const isDisabled = disabled || !checkedValue.length;
    const selectedClas = classNames('yui-tree-selected-content',{
      'yui-tree-selected-disabled':isDisabled
    });
    const clearClas = classNames('yui-tree-select-clear',{
      'yui-tree-select-clear-disabled':isDisabled
    })
    return (
      <div className="yui-tree-selected-wrapper">
        <AntTreeSelect
          className='yui-select yui-tree-select yui-tree-selected'
          dropdownClassName='yui-select yui-tree-select-dropdown yui-tree-select-hidden-switcher'
          notFoundContent={null}
          showArrow={false}
          treeData={checkedList}
          value={checkedValue}
          dropdownMatchSelectWidth={200}
          treeCheckable
          showSearch={false}
          onChange={triggerChange}
          disabled={isDisabled}
        >
        </AntTreeSelect>
        <div className={selectedClas}>
          <span>{checkedList.length}</span>
        </div>
        <span className={clearClas} onClick={() => {
          !isDisabled && triggerChange([],[],{});
        }}>
          <Icon className="yui-clear-icon" type="close-square" />
        </span>
      </div>
    )
  }

  const handleClickAll = useCallback(
    () => {
    const vals = allLeafs.map(l => l.value) as TreeNodeValue;
    const labels = allLeafs.map(l => l.title);
    triggerChange(vals, labels ,{});
    },
    [triggerChange,allLeafs]
  );

  const handleClickInvert = useCallback(
    () => {
      const selectedVals = displayValues.map(d => d.value);
      const unSelectedVals = allLeafs.filter(l => !selectedVals.includes(l.value));
      const vals = unSelectedVals.map(l => l.value) as TreeNodeValue;
      const labels = unSelectedVals.map(l => l.title);
      triggerChange(vals, labels, {});
    },
    [triggerChange,displayValues,allLeafs]
  );

  const renderExtraButton = useCallback(
    (on: React.ReactNode, props:any) => {
      let dpNode = on;
      let buttonNode:React.ReactNode[] = [];
      if(showExtraButton?.includes(ALL_BUTTON)) {
        buttonNode = [
          ...buttonNode,
          <Button
            key='yui-tree-select-all-button'
            type='primary'
            onClick={handleClickAll}
          >全选</Button>
        ];
      }
      if(showExtraButton?.includes(INVERT_BUTTON)) {
        buttonNode = [
          ...buttonNode,
          <Button
            key='yui-tree-select-invert-button'
            type='primary'
            onClick={handleClickInvert}
          >反选</Button>
        ];
      }
      dpNode = (
        <>
          {dpNode}
          {!!buttonNode.length && (
            <div
              className='yui-tree-select-extra-button-wrapper'
              style={{justifyContent: buttonNode.length === 2 ? 'space-between':'center'}}
            >
              {buttonNode}
            </div>
          )
          }
        </>
      )
      if(typeof dropdownRender === 'function') {
        return dropdownRender(dpNode, props);
      }
      return dpNode;
    },
    [dropdownRender,showExtraButton,handleClickAll,handleClickInvert]
  );

  const options = {
    className: treeSelectcls,
    dropdownClassName: dropdownCls,
    fieldNames,
    value:tValue,
    treeDataSimpleMode,
    treeData,
    showCheckedStrategy:mergedShowCheckedStrategy,
    switcherIcon: switcherIcon || <DownOutlined />,
    showArrow,
    treeCheckable,
    treeCheckStrictly,
    treeNodeLabelProp,
    multiple,
    onChange: triggerChange,
    disabled,
    dropdownRender: renderExtraButton,
    ...resetProps
  } as TreeSelectProps;

  const fillClas = classNames('yui-tree-select-fill-wrapper',{
    'yui-tree-select-fill-disabled':disabled
  })

  return (
    <>
      <div className={wrapperCls} style={wrapperStyle}>
        <AntTreeSelect {...options}>
          {children}
        </AntTreeSelect>
        {fillMode === 'ellipsis' && (
          <div className={fillClas}>
            <div className="yui-tree-select-fill-content">
              {
                fillContent.map(
                  (c,i) => (
                    <span
                      key={`yui-tree-select-item-${i}`}
                      className="yui-tree-select-fill-item"
                    >
                      {c}
                    </span>
                  )
                )
              }
            </div>
          </div>
        )}
      </div>
      {renderChecked()}
    </>
  )
};

TreeSelect.defaultProps = {
  disabled: false,
  treeCheckable: true,
  showArrow: true,
  showSearch: false,
  showCheckedStrategy: SHOW_CHILD,
  placement: 'bottomLeft',
  fieldNames:{
    label: 'title',
    value: 'value',
    children: 'children'
  },
  fillMode: 'ellipsis',
  treeDataSimpleMode: false,
  showSelected: false,
  separator:'、'
};

export default TreeSelect;
