import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import './locales'
import './schema'
import clx from "classnames"
import { IQueryFormProps } from "../../ProTable/QueryForm"

const QueryForm = observer((props: IQueryFormProps) => {
  const {className, ...other} = props
  return (
    <DroppableWidget {...other} className = {clx(className)}>
      {props.children}
    </DroppableWidget>
  )
})

export default QueryForm