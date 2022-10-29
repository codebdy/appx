import React from "react"
import { DnFC } from '@designable/react'
import { observer } from "@formily/reactive-react"
import { IComponentProps } from "../view"
import { DroppableWidget } from "@designable/react"
import cls from "classnames"
import "./style.less"

const ComponentDesigner: DnFC<IComponentProps> = observer((
  props
) => {
  const { style, className, ...other } = props;
  return (
    <DroppableWidget className={cls("appx-box-designer", className)} {...other} style={{ width: "100%", ...style }} />
  )
})

export default ComponentDesigner