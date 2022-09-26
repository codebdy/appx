import React from "react"
import { DnFC, useTreeNode } from '@designable/react'
import { observer } from "@formily/reactive-react"
import { IComponentProps } from "../view"
import "./style.less"

const ComponentDesigner: DnFC<IComponentProps> = observer((
  props
) => {
  const node = useTreeNode();
  return (
    <div className="appx-page-designer" {...props}>
      {node.getMessage("pageReander")}
    </div>
  )
})

export default ComponentDesigner