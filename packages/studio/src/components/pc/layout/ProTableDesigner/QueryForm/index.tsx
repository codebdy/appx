import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import './locales'
import './schema'
import clx from "classnames"
import { IQueryFormProps } from "../../ProTable/QueryForm"
import { Card } from "antd"

const QueryForm = observer((props: IQueryFormProps) => {
  const { className, ...other } = props
  return (
    <Card style={{ marginTop: "16px" }}>
      <DroppableWidget {...other} className={clx(className)}>
        {props.children}
      </DroppableWidget>
    </Card>
  )
})

export default QueryForm