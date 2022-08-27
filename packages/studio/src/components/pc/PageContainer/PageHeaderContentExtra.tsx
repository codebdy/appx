import { observer } from "@formily/reactive-react"
import { Col } from "antd"
import React from "react"
import clx from "classnames";

export interface IPageHeaderContentExtraProps {
  gridSpan?: number,
  children?: React.ReactNode,
  className?: string,
}

const PageHeaderContentExtra = observer((props: IPageHeaderContentExtraProps) => {
  const { gridSpan, className, ...other } = props;
  return (
    <Col {...other} className={clx(className, "header-content-extra")} span={gridSpan}>
      {props.children}
    </Col>
  )
})

export default PageHeaderContentExtra