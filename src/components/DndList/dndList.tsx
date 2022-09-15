import React, { FC } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import DndContainer, { IDndListProps } from './dndContainer';

export type FRCDndListProps = IDndListProps

export const DndList: FC<FRCDndListProps> = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DndContainer {...props} />
    </DndProvider>
  )
}

// normal
DndList.defaultProps = {
  dataList: [],
}

export default DndList
