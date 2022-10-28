import { observer } from "@formily/reactive-react"
import React from "react"
import { IListHeaderProps } from "../../view/ListHeader"
import { DroppableWidget } from "@designable/react"
import clx from "classnames"

export const ListHeaderDesigner = observer((props: IListHeaderProps) => {
  const {className, ...other} = props

  return (
    <DroppableWidget {...other} className = {clx("appx-grid-list-header", className)}>
      {props.children}
    </DroppableWidget>
  )
})