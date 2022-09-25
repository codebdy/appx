import React from "react"
import { DnFC } from '@designable/react'
import { observer } from "@formily/reactive-react"
import Component, { IComponentProps } from "../view"
import { DroppableWidget } from "@designable/react"

const ComponentDesigner: DnFC<IComponentProps> = observer((
  props
) => {
  const { children, ...other } = props
  return (
    children
      ?
      <Component {...props} />
      :
      <Component>
        <DroppableWidget {...other} style={{ flex: 1 }} />
      </Component>
  )
})

export default ComponentDesigner