import React from "react"
import { DnFC } from '@designable/react'
import { observer } from "@formily/reactive-react"
import { IViewProps } from "../view"

export const FrameHeaderContentFooterDesigner: DnFC<IViewProps> = observer((
  props
) => {
  return (
    <div {...props}>
      哈哈
    </div>
  )
})