import React from "react"
import { DnFC, useTreeNode } from '@designable/react'
import { observer } from "@formily/reactive-react"
import { IComponentProps } from "../view"
import Spring from "../view"
import "./style.less"

const ComponentDesigner: DnFC<IComponentProps> = observer((
  props
) => {
  const node = useTreeNode();
  return (
    <Spring className="appx-spring-designer" {...props}>
      {node.getMessage("title")}
    </Spring>
  )
})

export default ComponentDesigner