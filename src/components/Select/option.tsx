import React, { FC } from 'react'
import Select, { OptionProps } from 'antd/es/select'

const { Option : AntOption } = Select

interface BaseOptionProps {
    /** Option 器类名 */
    className?: string
    /** 是否禁用 */
    disabled?: boolean
    /** 选项上的原生 title 提示 */
    title?: string
    /** 默认根据此属性值进行筛选 */
    value?: string | number
}

export type FRCSelectOptionProps = BaseOptionProps & OptionProps

export const Option: FC<FRCSelectOptionProps> = (props) => {
    return (
        <AntOption {...props} />
    )
}

// normal
Option.defaultProps = {
    disabled: false,
};

// rc-select validate children type error
(Option as any).isSelectOption = true;

export default Option
