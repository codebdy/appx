import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import PageContent, { IPageContentProps } from "../../../executable/Page/PageContent"
import React, { Fragment } from "react"
import './locales'
import './schema'

const Content = observer((props: IPageContentProps) => {
  return (
    props.children
      ?
      <PageContent {...props}>
        {props.children}
      </PageContent>
      :
      <DroppableWidget {...props} style={{
        ...props['style'],
        //height: "100%",
      }}>
        {props.children}
      </DroppableWidget>
  )
})

export default Content