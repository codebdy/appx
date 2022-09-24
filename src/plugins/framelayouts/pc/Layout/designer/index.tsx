import React from "react"
import { DnFC } from '@designable/react'
import { observer } from "@formily/reactive-react"
import { IComponentProps } from "../view"
import { DroppableWidget } from "@designable/react"

const ComponentDesigner: DnFC<IComponentProps> = observer((
  props
) => {
  return (
    <DroppableWidget {...props}/>
  )
})

export default ComponentDesigner