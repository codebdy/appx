import { observer } from "@formily/reactive-react"
import { Col } from "antd"
import React from "react"

export interface IPageHeaderContentExtraProps {
  gridSpan?: number,
  children?: React.ReactNode
}

const PageHeaderContentExtra = observer((props: IPageHeaderContentExtraProps) => {
  const {gridSpan, ...other} = props;
  return (
    <Col {...other} span = {gridSpan}>
      {props.children}
    </Col>
  )
})

export default PageHeaderContentExtra