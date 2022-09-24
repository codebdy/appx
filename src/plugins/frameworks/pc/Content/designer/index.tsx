import React from "react"
import { DnFC } from '@designable/react'
import { observer } from "@formily/reactive-react"
import { ICompoentProps } from "../view"

const ComponentDesigner: DnFC<ICompoentProps> = observer((
  props
) => {
  return (
    <div {...props}>
      哈哈
    </div>
  )
})

export default ComponentDesigner