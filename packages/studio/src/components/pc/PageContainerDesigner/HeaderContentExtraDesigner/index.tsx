import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import { Col } from "antd"
import React from "react"
import PageHeaderContentExtra, { IPageHeaderContentExtraProps } from "../../PageContainer/PageHeaderContentExtra"
import './locales'
import './schema'

export const HeaderContentExtraDesigner = observer((props: IPageHeaderContentExtraProps) => {
  const { gridSpan } = props;
  return (
    props.children
      ?
      <PageHeaderContentExtra {...props}>
        {props.children}
      </PageHeaderContentExtra>
      :
      <Col span={gridSpan} >
        <DroppableWidget>
          {props.children}
        </DroppableWidget>
      </Col>
  )
})
