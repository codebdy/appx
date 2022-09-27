import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import clx from "classnames"
import { Space } from "antd"
import { IDialogFooterProps } from "../../view/DialogFooter"

export const DialogFooterDesigner = observer((props: IDialogFooterProps) => {
  const { className, ...other } = props
  return (
    <DroppableWidget {...other} className={clx("dialog-footer", className)}>
      <Space>
        {props.children}
      </Space>
    </DroppableWidget>
  )
})
