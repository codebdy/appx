import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import './locales'
import './schema'
import clx from "classnames"
import { IDialogContentProps } from "../../Dialog/DialogContent"

export const FooterToolbarDesigner = observer((props: IDialogContentProps) => {
  const {className, ...other} = props
  return (
    <DroppableWidget {...other} className = {clx("dialog-content", className)}>
      {props.children}
    </DroppableWidget>
  )
})
