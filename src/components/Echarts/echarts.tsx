/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useRef } from 'react'
import classNames from 'classnames'
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

export const Bar: FC<any> = (props) => {
  const {
    className,
    ref,
    ...restProps
  } = props

  const defaultRef = useRef<HTMLDivElement>(null)

  const option: EChartsOption = {
    color: ['#4A2A8A', '#F28036'],
    grid: {
      show: true,
      borderColor: '#1E2423',
      // containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['万科', '保利', '绿地', '碧桂园', '中南', '融创', '世贸', '恒大', '中海', '华润', '龙湖', '新城', '阳光城'],
      splitLine: {
        show: true,
        lineStyle: {
          color: '#1E2423'
        }
      },
      nameLocation: 'start',
      boundaryGap: true
    },
    yAxis: [{
      type: 'value',
      name: '发行量（亿）',
      min: 0,
      max: 500,
      axisLabel: {
        formatter: (value: number) => {
          if (value === 500) {
            return ''
          } else {
            return `${value}`
          }
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#1E2423'
        }
      },
    },
    {
      type: 'value',
      name: '发行利差（bp）',
      min: 0,
      max: 50,
      axisLabel: {
        formatter: (value: number) => {
          if (value === 50) {
            return ''
          } else {
            return `${value}`
          }
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#1E2423'
        }
      },
    }
    ],
    series: [
      {
        data: [200, 200, 270, 220, 320, 230, 290, 230, 290, 230, 270, 230, 170],
        type: 'bar',
        barWidth: 8,
      },
      {
        yAxisIndex: 1,
        data: [35, 30, 42, 28, 33, 35, 22, 41, 36, 29, 18, 27, 39],
        type: 'scatter',
        symbolSize: 4
      }
    ]
  }

  useEffect(() => {
    defaultRef && defaultRef.current && echarts.init(defaultRef.current) && echarts.init(defaultRef.current).setOption(option)
  }, [defaultRef, option])

  const classes = classNames('yui-echarts', className, {
  })

  const options = {
    className: classes,
    ref: ref ? ref : defaultRef,
    style: { width: '100%', height: 300 },
    ...restProps,
  }

  // main
  return (
    <div {...options} />
  )
}

// normal
Bar.defaultProps = {
}

export default Bar
