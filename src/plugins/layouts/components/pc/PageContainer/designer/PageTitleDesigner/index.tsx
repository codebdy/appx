import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import PageTitle, { IPageTitleProps } from "../../view/PageTitle"

export const PageTitleDesigner = observer((props: IPageTitleProps) => {
  return (
    props.children
      ?
      <PageTitle {...props} />
      :
      <DroppableWidget>
        {props.children}
      </DroppableWidget>

  )
})
