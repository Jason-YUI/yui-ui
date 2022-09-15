import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ComponentMeta } from '@storybook/react';

import {
  Title,
  Description,
  ArgsTable,
  Stories,
  Heading,
  Subheading
} from '@storybook/addon-docs';

import DndList from '.';
import { IDndListProps } from './dndContainer'

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { DndList } from 'yui-ui';
~~~
`

  return <>
    <ReactMarkdown children={markdown} components={{
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, '')}
            style={tomorrow}
            language={match[1]}
            PreTag="div"
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
    }} /></>
}

// ----------------------------------------------------------------

export default {
  title: '数据显示/DndList 拖拽列表',
  component: DndList,
  parameters: {
    docs: {
      // docs 页面 => 总体布局
      page: () => (
        <>
          <Title />
          <Description>选择对应项，拖拽</Description>
          <ImportComponent />
          <Stories title="组件总览" includePrimary={true} />
          <Heading>API</Heading>
          <Subheading>属性</Subheading>
          <Subheading>DndList 拖拽列表</Subheading>
          <ArgsTable of={DndList} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof DndList>;

// ----------------------------------------------------------------

export const DndListDefault = (args: IDndListProps) => {
  const [dataList, setDataList] = useState<any[]>([{ title: '标题一', value: 1}, { title: '标题二', value: 2 }, { title: '标题三', value: 3}])
  return (
    <div className='dndlist-container' style={{ width: '400px' }}>
      <DndList
        {...args}
        dataList={dataList}
        type={'yuo'}
        getItemKey={item => item.value}
        render={(item, index) => (<div style={{ background: '#1E2423', height: 100, textAlign: 'center',paddingTop: '10px' }}>{item.title}</div>)}
        hover={(dragItem, dropItem) => {
          const newDataList = [...dataList]
          const dragItemIndex = newDataList.findIndex(item => dragItem.value === item.value)
          const dropItemIndex = newDataList.findIndex(item => dropItem.value === item.value)
          newDataList.splice(dragItemIndex, 1)
          newDataList.splice(dropItemIndex, 0, dragItem)
          setDataList(newDataList)
        }}
        listItemStyle={{ background: 'blue', marginBottom: '5px' }}
      />
    </div>
  )
};

DndListDefault.storyName = '默认 DndList';
DndListDefault.parameters = {};

export const DndListNotDrag = (args: IDndListProps) => {
  const [dataList, setDataList] = useState<any[]>([{ title: '标题一(不可拖拽)', value: 1}, { title: '标题二', value: 2 }, { title: '标题三', value: 3}])
  return (
    <div className='dndlist-container'  style={{ width: '400px' }}>
      <DndList
        {...args}
        dataList={dataList}
        type={'yuo'}
        getItemKey={item => item.value}
        canDrag={(item) => item.value !== 1}
        render={(item, index) => (<div style={{ background: '#1E2423', height: 100, textAlign: 'center',paddingTop: '10px' }}>{item.title}</div>)}
        hover={(dragItem, dropItem) => {
          const newDataList = [...dataList]
          const dragItemIndex = newDataList.findIndex(item => dragItem.value === item.value)
          const dropItemIndex = newDataList.findIndex(item => dropItem.value === item.value)
          newDataList.splice(dragItemIndex, 1)
          newDataList.splice(dropItemIndex, 0, dragItem)
          setDataList(newDataList)
        }}
        listItemStyle={{ background: 'blue', marginBottom: '5px' }}
      />
    </div>
  )
};

DndListNotDrag.storyName = '不可拖拽 DndList';
DndListNotDrag.parameters = {};
