import React,{useState, useMemo, useEffect, useCallback} from 'react';
import classNames from 'classnames';

export interface OptionType {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface FRCFilterProps {
  /** 全选按钮文本 */
  allText?: string;
  /** filter 类名 */
  className?: string;
  /** 默认选中的值 */
  defaultValue?: Array<string | number>;
  /** 配置筛选项 */
  options?: OptionType[];
  /** 选择筛选项的回调 value为选中的值,仅当触发全选按钮时有allValue参数*/
  onChange?: (value: Array<string | number>, allValue?:Array<string | number>) => void;
  /** filter 样式 */
  style?: React.CSSProperties;
  /** 已选中的值 */
  value?: Array<string | number>;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 是否展示全选按钮,全选按钮的value为"ALL"  */
  showAll?: boolean;
};

const ALL = 'ALL';

const calcValue = (showAll: boolean, multi:boolean, value: Array<string | number>, opts: Array<string | number>) => {
  if(!multi && value.length > 1) {
    return [value[0]];
  }
  
  if (showAll) {
    const validateAll = value.length === opts.length && value.every(v => opts.includes(v));
    if (value.includes(ALL) ||  validateAll) {
      return [ALL];
    }
  }
  return value.filter(v => opts.includes(v));
}

export const Filter: React.FC<FRCFilterProps> = (props) => {
  const {
    className,
    style,
    options = [],
    showAll,
    multiple,
    onChange,
    defaultValue,
    value,
    allText
  } = props;

  const [checked, setChecked] = useState<any[]>(calcValue(showAll!, multiple!, defaultValue || [], options.map(o => o.value)));

  const cls = classNames('yui-filter', className, {

  });

  const memoOpts = useMemo(() => {
    return showAll? [{label: allText,value: ALL},...options] : options;
  },[showAll,options, allText])

  const triggerChange = useCallback(
    (val: Array<string | number>, allVal?:Array<string | number>) => {
      if( typeof onChange === 'function') {
        onChange(val, allVal);
      }else {
        setChecked(val);
      }
    },
    [onChange]
  );

  const handleClick = useCallback((op:OptionType) => {
    // item disabled
    if(op.disabled) {
      return ;
    }
    // ALL
    if(op.value === ALL) {
      if(!checked.includes(ALL)) {
        triggerChange([ALL], options.map(o => o.value))
      }
      return ;
    }
    // radio mode
    if (!multiple) {
      if (!checked.includes(op.value)) {
        triggerChange([op.value]);
      }
      return ;
    }
    // multiple mode
    let _check = [...checked].filter(c => c !== ALL);
    if(checked.includes(op.value)) {
      _check = checked.filter(c => c !== op.value);
    }else {
      _check = [..._check, op.value];
    }
    if(showAll && (_check.length === options.length || !_check.length) ) {
      triggerChange([ALL], options.map(o => o.value));
    }else {
      triggerChange(_check);
    }

  }, [triggerChange, multiple, checked, options, showAll]);
  
  useEffect(() => {
    if('value' in props) {
      const _value = calcValue(showAll!, multiple!, value || [], options.map(o => o.value));
      setChecked(_value);
    }
  },[value, props, options, showAll, multiple])
  
  return (
    <div className={cls} style={style}>
      {!!memoOpts?.length && memoOpts.map( op => (
        <div
          key={`filter-${op.value}`}
          className={`
            yui-filter-item
            ${checked.includes(op.value)? 'yui-filter-item-active':''}
            ${op.disabled ? 'yui-filter-item-disabled': ''}
          `}
          onClick={() => handleClick(op)}
        >{op.label}</div>
      ))}
    </div>
  )
}

Filter.defaultProps = {
  multiple: false,
  showAll: true,
  allText: '全选'
}

export default Filter;
