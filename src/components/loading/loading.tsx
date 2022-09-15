import React, { FC } from 'react';
import classNames from 'classnames';

export interface BaseLoadingProps {
  /** 设置尺寸 */
  size?: number,
  /** 设置样式 */
  style?: any,
  /** 给容器添加类名 */
  className?: string
}

export type FRCLoadingProps = BaseLoadingProps

export const Loading: FC<FRCLoadingProps> = (props) => {
  const { size, style, className, ...restProps } = props;
  const css = { ...style };
  if (size && css) {
    css['width'] = size;
    css['height'] = size;
  }
  const cls = classNames('yui-loading', className, {});
  return (
    <>
      <div className={cls} {...restProps}>
        <div className='yui-loading-container' style={css}>
          <svg className='yui-circular' viewBox='25 25 50 50'>
            <circle className='path' cx='50' cy='50' r='20' fill='none' strokeWidth='3' strokeMiterlimit='10' />
          </svg>
        </div>
      </div>
    </>
  )
}

Loading.defaultProps = {
  size: 50,
}

export default Loading
