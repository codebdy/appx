import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import PageTabPanel, { IPageTabPanelProps } from "../../PageContainer/PageTabPanel"
import './locales'
import './schema'

const TabPanel = observer((props: IPageTabPanelProps) => {
  return (
    props.children
    ?
    <PageTabPanel {...props}>
      {props.children}
    </PageTabPanel>
    :
    <DroppableWidget {...props}>
      {props.children}
    </DroppableWidget>
  )
})

export default TabPanel