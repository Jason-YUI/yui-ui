export interface PickerRef {
  focus: () => void;
  blur: () => void;
}

export interface BasePickerProps {
  /** 是否显示清除按钮 */
  allowClear?: boolean
  /** 自动获取焦点 */
  autoFocus?: boolean
  /** 选择器 className */
  className?: string
  /** 自定义日期单元格的内容 */
  dateRender?: (currentDate: moment.Moment, today: moment.Moment) => React.ReactNode
  // /** 禁用 */
  // disabled?: boolean
  /** 不可选择的日期 */
  disabledDate?: (currentDate: moment.Moment) => boolean
  /** 额外的弹出日历 className */
  dropdownClassName?: string
  /** 定义浮层的容器，默认为 body 上新建 div */
  getPopupContainer?: (trigger: HTMLElement) => HTMLElement
  /** 设置输入框为只读（避免在移动设备上打开虚拟键盘） */
  inputReadOnly?: boolean
  /** 国际化配置 */
  locale?: object
  /** 日期面板的状态 */
  mode?: 'time' | 'date' | 'month' | 'year' | 'decade'
  /** 自定义下一个图标 */
  nextIcon?: React.ReactNode
  /** 控制弹层是否展开	 */
  open?: boolean
  /** 自定义渲染面板 */
  panelRender?: (panelNode: React.ReactNode) => React.ReactNode
  /** 设置选择器类型 */
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year'
  /** 输入框提示文字 */
  placeholder?: string | [string, string]
  /** 额外的弹出日历样式 */
  popupStyle?: React.CSSProperties
  /** 自定义上一个图标 */
  prevIcon?: React.ReactNode
  /** 自定义输入框样式 */
  style?: React.CSSProperties
  /** 自定义的选择框后缀图标	 */
  suffixIcon?: React.ReactNode
  /** 自定义前缀图标 */
  prefixIcon?: React.ReactNode
  /** 自定义 >> 切换图标 */
  superNextIcon?: React.ReactNode
  /** 自定义 << 切换图标 */
  superPrevIcon?: React.ReactNode
  /** 弹出日历和关闭日历的回调	 */
  onOpenChange?: (open: boolean) => void
  /** 日历面板切换的回调 */
  onPanelChange?: (date: moment.Moment, mode: string) => void
  /** 移除焦点	 */
  blur?: () => void
  /** 	获取焦点 */
  focus?: () => void
}