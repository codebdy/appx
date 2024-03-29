import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import PageTabPanel, { IPageTabPanelProps } from "../../view/PageTabPanel"

export const TabPanelDesigner = observer((props: IPageTabPanelProps) => {
  return (
    props.children
    ?
    <PageTabPanel {...props}>
      {props.children}
    </PageTabPanel>
    :
    <DroppableWidget>
      {props.children}
    </DroppableWidget>
  )
})
