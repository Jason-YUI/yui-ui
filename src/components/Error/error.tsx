import React, { FC } from 'react';
import classNames from 'classnames';
import Button from '../Button'

interface BaseErrorProps {
  /** 设置标题文本内容 */
  title?: string;
  /** 设置按钮文本内容 */
  btnText?: string;
  /** 设置弹框类名 */
  className?: string;
  /** 设置按钮点击事件 */
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {};
}

export type FRCErrorProps = BaseErrorProps

function windowReload() {
  window.location.reload();
}

export const Error: FC<FRCErrorProps> = (props) => {

  const { className, title, btnText, onClick, ...restProps } = props;

  const classes = classNames('yui-error', className, {})

  return (
    <div className="yui-error-wrapper">
      <div className={classes} {...restProps}>
        <p className="yui-error-title">{title || '页面崩溃'}</p>
        <Button type="primary" onClick={onClick || windowReload} style={{ minWidth: 120 }}>
          {btnText || '重新载入'}
        </Button>
      </div>
    </div>
  );
}

export default Error
