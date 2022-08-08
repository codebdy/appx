import React from 'react'
import { TabsProps } from 'antd/lib/tabs'
import {
  observer,
} from '@formily/react'

export interface ISettingsTab {
  activeKey: string
  setActiveKey(key: string): void
}

export interface ISettingsTabProps extends TabsProps {
  formTab?: ISettingsTab
}

export interface ISettingsTabPaneProps {
  key: string | number,
  tab?: React.ReactNode;
}

const IconInput = observer((props: {}) => {
  //const tabs = useTabs()


  return (
    <div>
    </div>
  )
}) 

export default IconInput