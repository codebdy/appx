import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import { Col } from "antd"
import React from "react"
import PageHeaderContent, { IPageHeaderContentProps } from "../../PageContainer/PageHeaderContent"
import './locales'
import './schema'

const HeaderContent = observer((props: IPageHeaderContentProps) => {
  const {gridSpan, ...other} = props;
  return (
    props.children
      ?
      <PageHeaderContent {...props}>
        {props.children}
        haha
      </PageHeaderContent>
      :
      <Col span ={gridSpan} >
        <DroppableWidget {...other}>
          {props.children}
          hhh
        </DroppableWidget>
      </Col>

  )
})

export default HeaderContent