import React, { useRef, useEffect, forwardRef } from 'react'
import classNames from 'classnames'
import { DatePicker } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker/index'
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

const { RangePicker } = DatePicker

interface FRCRangePickerCustomProps {
  /** 允许起始项部分为空 */
  allowEmpty?: [boolean, boolean]
  /** 自定义日期单元格的内容 */
  dateRender?: (currentDate: moment.Moment, today: moment.Moment, info: { range: 'start' | 'end' }) => React.ReactNode
  /** 默认面板日期 */
  defaultPickerValue?: moment.Moment[]
  /** 默认日期 */
  defaultValue?: moment.Moment[]
  /** 禁用起始项 */
  disabled?: boolean | [boolean, boolean]
  /** 不可选择的时间 */
  disabledTime?: (date: moment.Moment, partial: 'start' | 'end') => void
  /** 展示的日期格式 */
  format?: string
  /** 预设时间范围快捷选择 */
  ranges?: { [range: string]: moment.Moment[] } | { [range: string]: () => moment.Moment[] }
  /** 在面板中添加额外的页脚 */
  renderExtraFooter?: () => React.ReactNode
  /** 设置分隔符 */
  separator?: React.ReactNode
  /** 增加时间选择功能 */
  showTime?: Object | boolean
  /** 日期 */
  value?: moment.Moment[]
  /** 待选日期发生变化的回调 */
  onCalendarChange?: (dates: [moment.Moment, moment.Moment], dateStrings: [string, string], info: { range: 'start' | 'end' }) => void
  /** 日期范围发生变化的回调	 */
  onChange?: (dates: [moment.Moment, moment.Moment] | null, dateStrings: [string, string] | null) => void
  /** 设置激活状态 */
  work?: boolean
}


export type FRCRangePickerProps = BasePickerProps & FRCRangePickerCustomProps & RangePickerProps

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

export const FRCRangePicker = forwardRef<PickerRef, FRCRangePickerProps>((props, ref) => {
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
    [`yui-date-picker-suffix-icon`]: suffixIcon,
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
      open &&
        showTime &&
        setTimeout(() => {
          insertFrcBtn()
        }, 0)
    },
    ...restProps,
  }

  // main
  return (
    <div ref={nodes} className="yui-date-picker-container">
      <RangePicker ref={ref as any} {...options} />
    </div>
  )
})

// normal
FRCRangePicker.defaultProps = {
  prefixIcon: <IoCalendarOutline />,
  suffixIcon: false,
  // showToday: false,
  superPrevIcon: <BackwardOutlined />,
  superNextIcon: <ForwardOutlined />,
  prevIcon: <CaretLeftOutlined />,
  nextIcon: <CaretRightOutlined />,
  locale: locale,
  separator: <span style={{ fontSize: 14 }}>～</span>,
  //default
  allowClear: true,
  autoFocus: false,
  inputReadOnly: false,
  picker: 'date',
  popupStyle: {},
  style: {},
  disabled: false,
}

export default FRCRangePicker
