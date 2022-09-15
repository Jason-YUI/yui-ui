import React, { FC, useRef, useState, useEffect } from 'react'
import classNames from 'classnames'

export type ModeType = 'vertical' | 'horizontal'

export interface FRCDragCollapseProps {
    /** 折叠抽屉的外层类名 */
    className?: string;
    /** 排列方式 */
    mode?: ModeType;
    /** 主层内容 */
    mainContent?: React.ReactNode;
    /** 侧层内容 */
    extraContent?: React.ReactNode;
    /** 主层初始高度 */
    mainContentInit?: number;
    /** 拖拽抽屉时的回调 */
    onDragChange?: (e: number) => void;

}

export const DragCollapse: FC<FRCDragCollapseProps> = (props) => {
    const { className, mainContent, extraContent, mode, mainContentInit, onDragChange } = props
    const [topSize, setTopSize] = useState(mainContentInit)
    const hrBox = useRef<HTMLDivElement>(null)
    const getTopStyle = (mode: ModeType) => {
        let style: React.CSSProperties = {}
        if (mode === 'horizontal') {
            style.width = '0'
            style.width = topSize + 'px'
        } else {
            style.height = topSize + 'px'
        }
        return style
    }

    const changeHeightStart = (el: any) => {
        if(hrBox.current) {
            if (mode === 'horizontal') {
                let diff = el.clientX - hrBox.current.offsetLeft
                document.onmousemove = function (e) {
                    let newTopSize = e.clientX - diff
                    if (hrBox.current!.parentElement!.offsetWidth > newTopSize && newTopSize > 0) {
                        setTopSize(newTopSize)
                    }
                    document.onmouseup = function () {
                        document.onmousemove = null
                    }
                }
            } else {
                let diff = el.clientY - hrBox.current.offsetTop
                document.onmousemove = function (e) {
                    let newTopSize = e.clientY - diff
                    if (hrBox.current!.parentElement!.offsetHeight > newTopSize && newTopSize > 0) {
                        setTopSize(newTopSize)
                    }
                    document.onmouseup = function () {
                        document.onmousemove = null
                    }
                }
            }
        }
    }

    useEffect(() => {
        if(onDragChange && topSize){
            onDragChange(topSize)
        }
    },[topSize])

    const cls = classNames('yui-dcollapse-drawer', className, {
        'yui-dcollapse-drawer-horizontal': mode === 'horizontal'
    })

    return (
        <div className={cls}>
            <div className='content-container'>
                <div className='yui-dcollapse-drawer-top' style={getTopStyle(mode!)}>
                    {mainContent}
                </div>
                <div
                    className='yui-dcollapse-drawer-hr'
                    ref={hrBox}
                    onMouseDown={changeHeightStart}
                >
                    <div className='yui-dcollapse-drawer-hr-arr' />
                </div>
                <div className='yui-dcollapse-drawer-bottom'>
                    {extraContent}
                </div>
            </div>
        </div>
    )
}

// normal
DragCollapse.defaultProps = {
    mode: 'vertical',
    mainContentInit: 200,
    mainContent: (
        <div
            style={{
                textAlign: 'center',
                height: '100%',
                width: '100%'
            }}>
            我是主层级
        </div>
    ),
    extraContent: (
        <div
            style={{
                textAlign: 'center',
                height: '100%',
                width: '100%'
            }}>
            我是次层级
        </div>
    )
}

export default DragCollapse
