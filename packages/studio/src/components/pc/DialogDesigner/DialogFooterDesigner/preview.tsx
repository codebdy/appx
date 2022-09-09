import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import './locales'
import './schema'
import clx from "classnames"
import { IDialogFooterProps } from "../../Dialog/DialogFooter"

export const FooterToolbarDesigner = observer((props: IDialogFooterProps) => {
  const {className, ...other} = props
  return (
    <DroppableWidget {...other} className = {clx("dialog-footer", className)}>
      {props.children}
    </DroppableWidget>
  )
})
