import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import './locales'
import './schema'
import clx from "classnames"
import { IQueryFormProps } from "../../ProTable/QueryForm"
import { Card } from "antd"

const QueryForm = observer((props: IQueryFormProps) => {
  const { className, style, ...other } = props
  return (
    <Card {...other} style={{ ...style || {}, marginTop: "16px" }} className={clx(className)}>
      <DroppableWidget >
        {props.children}
      </DroppableWidget>
    </Card>
  )
})

export default QueryForm