import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import PageHeaderExtra, { IPageHeaderExtraProps } from "../../formily/PageHeaderExtra"
import './locales'
import './schema'

const HeaderExtra = observer((props: IPageHeaderExtraProps) => {
  return (
    props.children
      ?
      <PageHeaderExtra {...props}>
        {props.children}
      </PageHeaderExtra>
      :
      <DroppableWidget {...props}>
        {props.children}
      </DroppableWidget>
  )
})

export default HeaderExtra