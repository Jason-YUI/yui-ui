import React, { FC, useRef } from 'react';
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

export type obj = { [propname: string]: any }
export interface IItemProps {
  dataList?: obj[],
  /** 元素的拖拽类型，允许放置的类型。同react-dnd中的type,accept */
  type: string,
  /** 被拖拽元素的数据 */
  item: obj
  /** 被拖拽元素的key,如果未指定itemKey属性，则该值为对应元素下标（index） */
  itemkey: any
  /** 被拖拽元素的下标 */
  index: number
  /** 拖拽元素的样式 */
  listItemStyle?: React.CSSProperties
  /** 参数item对应dataList的每一个元素以及对应的index下标，返回一个reactdom，控制拖拽元素内部的渲染 */
  render: (item: obj, index: number) => React.ReactNode,
  /** 参数item对应dataList的每一个元素以及对应的index下标 返回一个boolen */
  canDrag?: (dragItem: obj, monitor: DragSourceMonitor<obj, void | obj>) => boolean,
  /** 当被拖拽元素hover在可放置的组件上时调用 */
  hover?: (dragItem: obj, dropItem: obj) => any
  /** 拖拽完毕后调用 参数item对应dataList的每一个元素, 第二个参数为拖拽连接器monitor */
  // dragEnd?: (item: obj, monitor: DragSourceMonitor<obj, void | obj>) => {}
  /** 判断是否可以放下，第一个参数为可拖拽元素信息，第二个参数为拖拽连接器monitor*/
  // canDrop?: (dragItem?: obj, dropItem?: obj) => any,
  /** 放下操作，第一个参数为可拖拽元素信息，第二个参数为拖拽连接器monitor，返回值为undefined或任意对象，该返回值可以在endDrag中的monitor.getDropResult()中接收 */
  drop?: (dragItem: obj, dropItem: obj, dataList: obj[]) => any,
}

const DndItem: FC<IItemProps> = (props) => {
  const ref = useRef(null)
  const { dataList, type, item, itemkey, index, listItemStyle, canDrag, render, hover, drop } = props
  const dragParams = {
    type,
    item: {
      sourceItem: item,
      _index: index,
      _key: itemkey
    },
    canDrag: (monitor: DragSourceMonitor<obj, void | obj>) => {
      let flag = true
      if (canDrag) {
        flag = canDrag(item, monitor)
      }
      return Boolean(flag)
    },
    // dragEnd,
    collect: (monitor: DragSourceMonitor) => {
      return ({
        isDragging: monitor.isDragging(),
      })
    },
  }
  const dropParams = {
    accept: type,
    // canDrop: (dragItem: obj, monitor: DropTargetMonitor<obj, void | obj>) => {
    //   let flag = true
    //   const sourceItem = dragItem.sourceItem
    //   if (canDrop) {
    //     flag = canDrop(sourceItem, item)
    //   }
    //   return Boolean(flag)
    // },
    drop: (dragItem: obj, monitor: DropTargetMonitor<obj, void | obj>) => {
      const sourceItem = dragItem.sourceItem
      drop && drop(sourceItem, item, dataList!)
    },
    hover: (dragItem: obj, monitor?: DropTargetMonitor<obj, void | obj>) => {
      if (item._key !== dragItem._key) {
        const sourceItem = dragItem.sourceItem
        const sourceIndex = dragItem._index
        hover && hover(sourceItem, item)
      }
    },
    collect: (monitor: DropTargetMonitor) => ({ isOver: monitor.isOver() })
  }
  const [{ isDragging }, connectDrag] = useDrag(() => (dragParams), [dataList, type, index, itemkey, item])
  const [{ isOver }, connectDrop] = useDrop(() => (dropParams), [dataList, type, index, itemkey, item]);

  connectDrag(connectDrop(ref));
  return (
    <div className='yui-dnd-item' ref={ref} style={{ ...listItemStyle, opacity: isDragging ? 0 : 1 }}>
      {render(item, index)}
    </div>
  )
}

export default DndItem
