import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import { Col } from "antd"
import React from "react"
import PageHeaderContentExtra, { IPageHeaderContentExtraProps } from "../../formily/PageHeaderContentExtra"
import './locales'
import './schema'

const HeaderContentExtra = observer((props: IPageHeaderContentExtraProps) => {
  const { gridSpan, ...other } = props;
  return (
    props.children
      ?
      <PageHeaderContentExtra {...props}>
        {props.children}
      </PageHeaderContentExtra>
      :
      <Col span={gridSpan} >
        <DroppableWidget {...other}>
          {props.children}
        </DroppableWidget>
      </Col>
  )
})

export default HeaderContentExtra