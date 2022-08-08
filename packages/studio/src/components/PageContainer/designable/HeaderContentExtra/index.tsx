import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import HeaderContentExtra, { IPageHeaderContentExtraProps } from "../../formily/PageHeaderContentExtra"
import './locales'
import './schema'

const PageHeaderContentExtra = observer((props:IPageHeaderContentExtraProps) => {
  return (
    props.children
    ?
    <HeaderContentExtra {...props}>
      {props.children}
    </HeaderContentExtra>
    :
    <DroppableWidget {...props}>
      {props.children}
    </DroppableWidget>
  )
})

export default PageHeaderContentExtra