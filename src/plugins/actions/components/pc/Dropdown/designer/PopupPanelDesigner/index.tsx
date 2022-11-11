import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import clx from "classnames"
import { IPopupPanelProps, PopupPanel } from "../../view/PopupPanel"

export const PopupPanelDesigner = observer((props: IPopupPanelProps) => {
  const { className, children, ...other } = props
  return (
    <PopupPanel {...other} className={clx(className)}>
      {children}
    </PopupPanel>
  )
})
