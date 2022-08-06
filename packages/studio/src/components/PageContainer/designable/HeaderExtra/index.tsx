import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import PageHeaderExtra from "../../../executable/Page/PageHeaderExtra"
import React from "react"
import './locales'
import './schema'
import { IPageHeaderExtraProps } from '../../../executable/Page/PageHeaderExtra';

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