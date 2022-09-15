import React, { FC } from "react";
import classNames from "classnames";
import {Steps, StepProps} from "antd";
import {Status} from './steps';

const { Step : AntStep } = Steps

interface BaseStepProps {
  /** 步骤的详情描述，可选 */
  description?: React.ReactNode;
  /** 禁用点击 */
  disabled?: boolean;
  /** 步骤图标的类型，可选 */
  icon?: React.ReactNode;
  /** 指定状态。当不配置该属性时，会使用 Steps 的 current 来自动指定状态。 */
  status?: Status;
  /** 子标题 */
  subTitle?: React.ReactNode;
  /** 标题 */
  title?: React.ReactNode;
}

export type FRCStepProps = BaseStepProps & StepProps;
export const Step: FC<FRCStepProps> = (props) => {
  const {
    className,
    ...restProps
  } = props;

  const classes = classNames("yui-steps-item", className,);

  const options = {
    className: classes,
    ...restProps,
  };

  return <AntStep {...options} />;
};

Step.defaultProps = {
  disabled: false,
};

export default Step;
