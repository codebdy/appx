import React from "react"
import { DnFC } from '@designable/react'
import { observer } from "@formily/reactive-react"
import Component, { IComponentProps } from "../view"

const ComponentDesigner: DnFC<IComponentProps> = observer((
  props
) => {
  const { title, ...other } = props;
  return (
    <Component title={title || "Logo"} {...other} />
  )
})

export default ComponentDesigner