import { observer } from "@formily/reactive-react"
import { Space } from "antd"
import React from "react"

export interface ITableToolbarActionsProps {
  className?: string,
  children?: React.ReactNode
}

export const TableToolbarActions = observer((props: ITableToolbarActionsProps) => {
  return (
    <div className="table-toolbar-actions">
      <Space>
        {props.children}
      </Space>
    </div>
  )
})

