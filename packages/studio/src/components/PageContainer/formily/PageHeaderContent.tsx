import { observer } from "@formily/reactive-react"
import { Col } from "antd"
import React from "react"

export interface IPageHeaderContentProps {
  gridSpan?: number,
  children?: React.ReactNode
}

const PageHeaderContent = observer((props: IPageHeaderContentProps) => {
  const {gridSpan, ...other} = props;
  return (
    <Col {...other} span = {gridSpan}>
      {props.children}
    </Col>
  )
})

export default PageHeaderContent