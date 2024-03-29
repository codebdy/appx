import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import clx from "classnames"
import { IDialogContentProps } from "../../view/DialogContent"

export const DialogContentDesigner = observer((props: IDialogContentProps) => {
  const {className, ...other} = props
  return (
    <DroppableWidget {...other} className = {clx("dialog-body", className)}>
      {props.children}
    </DroppableWidget>
  )
})
