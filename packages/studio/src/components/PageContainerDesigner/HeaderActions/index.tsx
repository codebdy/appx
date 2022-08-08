import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import PageHeaderActions, { IHeaderActionsProps } from "../../PageContainer/PageHeaderActions"
import './locales'
import './schema'

const HeaderActions = observer((props: IHeaderActionsProps) => {
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

export default HeaderActions