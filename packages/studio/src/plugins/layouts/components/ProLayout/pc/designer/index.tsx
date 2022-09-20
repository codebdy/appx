import React from "react"
import { DnFC } from '@designable/react'
import { IProLayoutProps } from "../view"
import { observer } from "@formily/reactive-react"

export const ProLayoutDesigner: DnFC<IProLayoutProps> = observer((
  props
) => {
  return (
    <div {...props}>
      哈哈
    </div>
  )
})