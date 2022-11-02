import React from "react"
import { DnFC } from '@designable/react'
import { observer } from "@formily/reactive-react"
import Component, { IComponentProps } from "../view"
import { DroppableWidget } from "@designable/react"

const ComponentDesigner: DnFC<IComponentProps> = observer((
  props
) => {
  const { children } = props
  return (
    children
      ?
      <Component {...props} fixed={false} />
      :
      <Component {...props} fixed={false}>
        <DroppableWidget style={{ flex: 1 }} />
      </Component>
  )
})

export default ComponentDesigner