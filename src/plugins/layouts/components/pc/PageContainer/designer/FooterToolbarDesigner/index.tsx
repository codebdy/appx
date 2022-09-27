import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import clx from "classnames"
import { IPageFooterToolbarProps } from "../../view/PageFooterToolbar"

export const FooterToolbarDesigner = observer((props: IPageFooterToolbarProps) => {
  const {className, ...other} = props
  return (
    <DroppableWidget {...other} className = {clx("rx-page-footer-toolbar-layout", className)}>
      {props.children}
    </DroppableWidget>
  )
})
