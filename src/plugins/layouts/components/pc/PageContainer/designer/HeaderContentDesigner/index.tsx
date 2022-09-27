import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import { Col } from "antd"
import React from "react"
import PageHeaderContent, { IPageHeaderContentProps } from "../../view/PageHeaderContent"

export const HeaderContentDesigner = observer((props: IPageHeaderContentProps) => {
  const {gridSpan} = props;
  return (
    props.children
      ?
      <PageHeaderContent {...props}>
        {props.children}
      </PageHeaderContent>
      :
      <Col span ={gridSpan} >
        <DroppableWidget>
          {props.children}
        </DroppableWidget>
      </Col>

  )
})
