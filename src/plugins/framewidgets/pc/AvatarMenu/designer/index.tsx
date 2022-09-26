import React from "react"
import { DnFC } from '@designable/react'
import { observer } from "@formily/reactive-react"
import AvatarMenu, { IComponentProps } from "../view"

const ComponentDesigner: DnFC<IComponentProps> = observer((
  props
) => {
  return (
    <AvatarMenu trigger={[]} {...props}/>
  )
})

export default ComponentDesigner