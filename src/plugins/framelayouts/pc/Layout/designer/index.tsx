import React from "react"
import { DnFC } from '@designable/react'
import { observer } from "@formily/reactive-react"
import Component, { IComponentProps } from "../view"
import { DroppableWidget } from "@designable/react"
import "./style.less"

const ComponentDesigner: DnFC<IComponentProps> = observer((
  props
) => {
  const { children } = props
  return (
    children
      ?
      <Component className="design" {...props} />
      :
      <Component {...props}>
        <DroppableWidget style={{ flex: 1, display: "flex", flexFlow: "column" }} />
      </Component>
  )
})

export default ComponentDesigner