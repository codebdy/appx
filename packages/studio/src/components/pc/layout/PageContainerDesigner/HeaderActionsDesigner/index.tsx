import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import PageHeaderActions, { IHeaderActionsProps } from "../../PageContainer/PageHeaderActions"
import './locales'
import './schema'

export const HeaderActionsDesigner = observer((props: IHeaderActionsProps) => {
  return (
    props.children
      ?
      <PageHeaderActions {...props}>
        {props.children}
      </PageHeaderActions>
      :
      <DroppableWidget {...props}>
        {props.children}
      </DroppableWidget>
  )
})
