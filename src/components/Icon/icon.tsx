import React, { FC } from 'react';
import classNames from 'classnames';

export interface IconProps {
    /** 图标类型 */
    type: string
    /** 为图标添加 class 类名 */
    className?: string
    /** 图标样式 */
    style?: React.CSSProperties
    /** 点击图标触发的事件 */
    onClick?: any
}

export const Icon: FC<IconProps> = (props) => {
    const { type, className, ...restProps } = props;

    const classes = classNames('yui-icon yui-icon', `icon-${type}`, className);

    const options = {
        className: classes,
        type,
        ...restProps,
    }

    return <i {...options} />;
}

Icon.defaultProps = {};

export default Icon;
