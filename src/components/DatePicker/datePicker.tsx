import React, { useRef, useEffect, forwardRef } from 'react'
import classNames from 'classnames'
import { DatePicker as AntdDatePicker, DatePickerProps } from 'antd'
import { IoCalendarOutline } from 'react-icons/io5'
import ReactDOM from 'react-dom'
import {
  BackwardOutlined,
  ForwardOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from '@ant-design/icons'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { BasePickerProps,PickerRef } from './interface'

interface FRCDatePickerCustomProps {
  /** 默认面板日期 */
  defaultPickerValue?: moment.Moment
  /** 默认日期，如果开始时间或结束时间为 null 或者 undefined，日期范围将是一个开区间 */
  defaultValue?: moment.Moment
  /** 禁用 */
  disabled?: boolean
  /** 不可选择的时间 */
  disabledTime?: (current: moment.Moment) => object
  /** 设置日期格式，为数组时支持多格式匹配，展示以第一个为准。配置参考 moment.js，支持自定义格式 */
  format?: string | ((value: moment.Moment) => string) | (string | ((value: moment.Moment) => string))[]
  /** 在面板中添加额外的页脚 */
  renderExtraFooter?: (mode: any) => React.ReactNode
  /** 当设定了 showTime 的时候，面板是否显示“此刻”按钮 */
  showNow?: boolean
  /** 增加时间选择功能 */
  showTime?: Object | boolean
  /** 是否展示“今天”按钮 */
  showToday?: boolean
  /** 日期 */
  value?: moment.Moment
  /** 时间发生变化的回调	 */
  onChange?: (value: moment.Moment | null, dateString: string) => void
  /** 点击确定按钮的回调 */
  onOk?: (value: moment.Moment | null) => void
  /** 日期面板变化时的回调 */
  onPanelChange?: (value: moment.Moment, mode: string) => void
  /** 设置激活状态 */
  work?: boolean
}

export type FRCDatePickerProps = BasePickerProps & FRCDatePickerCustomProps & DatePickerProps;

const addPrefixNode = (nodes: any, prefixIcon: React.ReactNode) => {
  const addNode = document.createElement('div')
  addNode.setAttribute('class', 'yui-date-picker-prefix')

  // dom container insert
  const currentDom = nodes.current
  const parentNode = currentDom.querySelector('.ant-picker-input')

  // -------------------------------------------------------------------

  if (parentNode) {
    parentNode.insertBefore(addNode, currentDom.querySelector('input'))
    // icon insert
    ReactDOM.render(
      prefixIcon as any,
      currentDom.querySelector('.yui-date-picker-prefix'),
    )
  }
}

const insertFrcBtn = () => {
  const currentDoms = document.querySelectorAll('.ant-picker-ok button')
  currentDoms && currentDoms.forEach(dom => {
    const btnClass = dom?.getAttribute('class') || ''
    if (btnClass.indexOf('yui-btn') === -1) {
      dom?.setAttribute('class', btnClass + ' yui-btn yui-btn-primary')
    }
  })
}

export const DatePicker = forwardRef<PickerRef, FRCDatePickerProps>((
  props,
  ref
) => {
  const nodes = useRef(null)

  const {
    className,
    prefixIcon,
    dropdownClassName,
    showTime,
    suffixIcon,
    onOpenChange,
    work,
    ...restProps
  } = props

  // add prefix node
  useEffect(() => {
    prefixIcon && addPrefixNode(nodes, prefixIcon)
  }, [prefixIcon])

  const classes = classNames('yui-date-picker', className, {
    [`yui-date-picker-work`]: work,
    [`yui-date-picker-suffix-icon`]: suffixIcon
  })

  const classesDropdown = classNames(
    'yui-date-picker-dropdown',
    dropdownClassName,
    {},
  )

  const options = {
    className: classes,
    prefixIcon,
    dropdownClassName: classesDropdown,
    showTime,
    suffixIcon,
    onOpenChange: (open: boolean) => {
      onOpenChange && onOpenChange(open)
      open && showTime && setTimeout(() => {
        insertFrcBtn()
      }, 0);
    },
    ...restProps,
  }

  // main
  return (
    <div ref={nodes} className="yui-date-picker-container">
      <AntdDatePicker ref={ref as any} {...options} />
    </div>
  )
})

// normal
DatePicker.defaultProps = {
  prefixIcon: <IoCalendarOutline />,
  suffixIcon: false,
  showToday: false,
  superPrevIcon: <BackwardOutlined />,
  superNextIcon: <ForwardOutlined />,
  prevIcon: <CaretLeftOutlined />,
  nextIcon: <CaretRightOutlined />,
  locale: locale,
  //default
  allowClear: true,
  autoFocus: false,
  disabled: false,
  inputReadOnly: false,
  picker: 'date',
  popupStyle: {},
  style: {},
}

export default DatePicker
