import { FC } from 'react'
import TabsOnly, { FRCTabsOnlyProps } from './tabsOnly'

export type {FRCTabsOnlyProps}
export type {TabItem,TabsOnlyType,TabsOnlySizeType} from './tabsOnly'


export type FRCTabsOnlyCompoent = FC<FRCTabsOnlyProps> & {
}

const FrcTabs = TabsOnly as FRCTabsOnlyCompoent
export default FrcTabs
