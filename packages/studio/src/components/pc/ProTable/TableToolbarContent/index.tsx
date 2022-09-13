import { observer } from "@formily/reactive-react"
import { Space } from "antd"
import React from "react"

export interface ITableToolbarContentProps {
  className?: string,
  children?: React.ReactNode
}

export const TableToolbarContent = observer((props: ITableToolbarContentProps) => {
  return (
    <div className="table-toolbar-content">
      <Space>
        {props.children}
      </Space>
    </div>
  )
})

