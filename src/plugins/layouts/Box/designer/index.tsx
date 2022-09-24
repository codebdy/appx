import React from "react"
import { DnFC } from '@designable/react'
import { observer } from "@formily/reactive-react"
import { IComponentProps } from "../view"

const ComponentDesigner: DnFC<IComponentProps> = observer((
  props
) => {
  return (
    <div {...props}>
    </div>
  )
})

export default ComponentDesigner