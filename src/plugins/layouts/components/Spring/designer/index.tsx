import React from "react"
import { DnFC } from '@designable/react'
import { observer } from "@formily/reactive-react"
import { IComponentProps } from "../view"
import Spring from "../view";

const ComponentDesigner: DnFC<IComponentProps> = observer((
  props
) => {
  return (
    <Spring {...props}/>
  )
})

export default ComponentDesigner