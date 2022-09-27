import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import PageHeaderActions, { IHeaderActionsProps } from "../../view/PageHeaderActions"

export const HeaderActionsDesigner = observer((props: IHeaderActionsProps) => {
  return (
    props.children
      ?
      <PageHeaderActions {...props}>
        {props.children}
      </PageHeaderActions>
      :
      <DroppableWidget>
        {props.children}
      </DroppableWidget>
  )
})
