import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import PageHeaderContentExtra, { IPageHeaderContentExtraProps } from "../../formily/PageHeaderContentExtra"
import './locales'
import './schema'

const HeaderContentExtra = observer((props:IPageHeaderContentExtraProps) => {
  return (
    props.children
    ?
    <PageHeaderContentExtra {...props}>
      {props.children}
    </PageHeaderContentExtra>
    :
    <DroppableWidget {...props}>
      {props.children}
    </DroppableWidget>
  )
})

export default HeaderContentExtra