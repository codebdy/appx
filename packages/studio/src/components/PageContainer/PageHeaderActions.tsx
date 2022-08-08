import { Space } from "@formily/antd"
import { observer } from "@formily/reactive-react"
import React from "react"

export interface IHeaderActionsProps {
  children?: React.ReactNode
}

const PageHeaderActions = observer((props: IHeaderActionsProps) => {
  return (
    <Space className="rx-page-header-actions">
      {props.children}
    </Space>
  )
})

export default PageHeaderActions