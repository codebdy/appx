import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import { ITableToolbarContentProps, TableToolbarContent } from "../../ProTable/TableToolbarContent"
import './locales'
import './schema'

export const TableToolbarContentDesigner = observer((props: ITableToolbarContentProps) => {
  return (
    props.children
      ?
      <TableToolbarContent {...props}>
        {props.children}
      </TableToolbarContent>
      :
      <DroppableWidget>
        {props.children}
      </DroppableWidget>
  )
})
