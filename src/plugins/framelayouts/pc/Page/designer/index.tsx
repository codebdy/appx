import React from "react"
import { DnFC } from '@designable/react'
import { observer } from "@formily/reactive-react"
import Component, { IComponentProps } from "../view"
import "./style.less"

const ComponentDesigner: DnFC<IComponentProps> = observer((
  props
) => {
  return (
    <div className="appx-page-designer" {...props}>
      Page render
    </div>
  )
})

export default ComponentDesigner