import React, { FC,useState,useMemo,useCallback } from 'react'
import {Dropdown as AntDropdown, DropdownProps, Menu, MenuProps} from 'antd'
import {DownOutlined,UpOutlined} from '@ant-design/icons';
import classNames from 'classnames';

interface BaseDropdownProps {
  /** 下拉框箭头是否显示 */
  arrow?: boolean;
  /** 下拉menu配置，详细配置请参考Menu文档 */
  menuOptions?: MenuProps;
  /** 下拉根元素的类名称 */
  overlayClassName?: string;
  /** 下拉元素样式 */
  triggerStyle?: React.CSSProperties;
  /** 菜单是否禁用 */
  disabled?: boolean;
  /** 设置下拉触发为图标 */
  icon?: React.ReactNode;
  /** 设置下拉触发为working状态 */
  working?: boolean;
  /** 关闭后是否销毁 Dropdown */
  destroyPopupOnHide?: boolean;
  /** 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 */
  getPopupContainer?:(triggerNode: HTMLElement) => HTMLElement;
  /** 菜单弹出位置 */
  placement?:'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight';
  /** 触发下拉的行为, 移动端不支持 hover */
  trigger?: Array<'click' | 'hover' | 'contextMenu'>;
  /** 菜单是否显示 */
  visible?: boolean;
  /** 菜单显示状态改变时调用，参数为 visible。点击菜单按钮导致的消失不会触发 */
  onVisibleChange?: (visible: boolean) => void
}

export type ItemType = Required<MenuProps>['items'][number]


export type FRCDropdownProps = BaseDropdownProps & Omit<DropdownProps, 'overlay'>;


export const Dropdown: FC<FRCDropdownProps> = (props: FRCDropdownProps) => {
  const {
    className,
    disabled,
    menuOptions,
    overlayClassName,
    triggerStyle,
    arrow,
    icon,
    working,
    onVisibleChange,
    ...restProps
  } = props;

  const [dropdownVisible,setDropDownVisible] = useState<boolean>(false);

  const classes = classNames('yui-dropdown-trigger', className, {
    'yui-dropdown-focus': dropdownVisible,
    'yui-dropdown-disabled': disabled,
    'yui-dropdown-icon': icon,
    'yui-dropdown-working': working,
    'yui-dropdown-arrow': arrow
  });

  const overlayClasses = classNames('yui-dropdown', overlayClassName)

  const options = {
    className: classes,
    overlayClassName: overlayClasses,
    disabled,
    ...restProps
  }

  const menu = useMemo(() => {
    const handleList: (arr?: ItemType[]) =>  any[] = (arr?: ItemType[]) => {
      return (arr || []).map((m: any) => {
        if(m) {
          if(!m.type && m.children?.length) {
            return {
              ...m,
              popupClassName:`yui-dropdown-menu-sub ${m.popupClassName ? m.popupClassName:''}`,
              children:handleList(m.children || [])
            }
          }
          return m;
        }
        return m;
      })
    }
    
    let opts = {};

    if(menuOptions) {
      const {items, onClick, ...restMenuOpts} = menuOptions;
      const handleItemClick = (item: any) => {
        setDropDownVisible(false);
        onClick && onClick(item);
      }
      opts = {
        items: handleList(items),
        onClick: handleItemClick,
        ...restMenuOpts
      }
    }
    
    return (
        <Menu
          className='yui-dropdown-menu'
          {...opts}
        />
      );
  },[menuOptions]);

  const handleVisibleChange = useCallback((visible: boolean) => {
    setDropDownVisible(visible)
    if (onVisibleChange) {
      onVisibleChange(visible)
    }
  },[onVisibleChange])

  return (
    <AntDropdown overlay={menu} trigger={['click']} {...options} onVisibleChange={handleVisibleChange}>
      <div style={triggerStyle}>
        {icon ? icon :
          <>
            {props.children}
            {arrow &&
              <span className='yui-dropdown-trigger-arrow'>
                {dropdownVisible? <UpOutlined />  : <DownOutlined />}
              </span>
            }
          </>
        }
      </div>
    </AntDropdown>
  )
}

Dropdown.defaultProps = {
  arrow: true,
  placement: 'bottomLeft',
  trigger: ['click'],
  destroyPopupOnHide: false,
}

export default Dropdown
