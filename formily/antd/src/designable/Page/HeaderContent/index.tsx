import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import PageHeaderContent, { IPageHeaderContentProps } from "../../../executable/Page/PageHeaderContent"
import React from "react"
import './locales'
import './schema'

const HeaderContent = observer((props:IPageHeaderContentProps) => {
  return (
    props.children
    ?
    <PageHeaderContent {...props}>
      {props.children}
    </PageHeaderContent>
    :
    <DroppableWidget {...props}>
      {props.children}
    </DroppableWidget>
  )
})

export default HeaderContent