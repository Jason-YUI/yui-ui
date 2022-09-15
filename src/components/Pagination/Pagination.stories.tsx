import React from 'react';
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

import Pagination from './index';
import {FRCPaginationProps} from './pagination'

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { Pagination } from 'yui-ui';

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
    title: '导航/Pagination 分页',
    component: Pagination,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <Description>通过鼠标或键盘，输入范围内的数值。</Description>
                    <ImportComponent />
                    <Stories title="组件总览" includePrimary={true} />

                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>

                    <Subheading>Pagination</Subheading>
                    <ArgsTable of={Pagination} />
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Pagination>;

// ----------------------------------------------------------------

export const Default = (args: FRCPaginationProps) => {
    return (<Pagination {...args} total={50} />)
};

Default.storyName = '默认 pagination';

// ----------------------------------------------------------------

export const _BaseComponent = () => {
    return (<>
        <Pagination defaultCurrent={6} total={500} />
        disabled
        <br />
        <Pagination disabled defaultCurrent={6} total={500} />
    </>)
};

_BaseComponent.storyName = '更多分页 pagination';
_BaseComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
export const _DisabledComponent = () => {
    return (<>
        <Pagination total={50} disabled />
    </>)
};

_DisabledComponent.storyName = '禁用 pagination';
_DisabledComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _QuickJumpComponent = () => {
    return (<>
        <Pagination showQuickJumper defaultCurrent={2} showSizeChanger={false} total={500} />
        disabled
        <br />
        <Pagination showQuickJumper disabled defaultCurrent={2} showSizeChanger={false} total={500} />
    </>)
};

_QuickJumpComponent.storyName = '跳转 pagination';
_QuickJumpComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};


// ----------------------------------------------------------------

export const _ShowTotalComponent = () => {
    return (<>
        <Pagination defaultCurrent={6} total={500} showTotal={(total) => `Total ${total} items`} />
    </>)
};

_ShowTotalComponent.storyName = '总数 pagination';
_ShowTotalComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _SimpleComponent = () => {
    return (<>
        <Pagination defaultCurrent={2} simple total={500} />
        disabled
        <br />
        <Pagination defaultCurrent={2} disabled simple total={500} />
    </>)
};

_SimpleComponent.storyName = '简洁 pagination';
_SimpleComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ZCustomItemComponent = () => {
    /**
     *  ---- css ----
     * .custom-pagination.yui-pagination {
     *  .ant-pagination-prev, .ant-pagination-next {
     *      background-color: transparent !important;
     *     }
     * }
     *
     *
    */
   
    const itemRender: FRCPaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev') {
          return <a>上一页</a>;
        }
        if (type === 'next') {
          return <a>下一页</a>;
        }
        return originalElement;
      };
    return (<>
        修改上一步和下一步为文字链接。
        <br />
        <Pagination className='custom-pagination' total={500} itemRender={itemRender} />
    </>)
};

_ZCustomItemComponent.storyName = '上一步和下一步';
_ZCustomItemComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};
