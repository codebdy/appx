import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import { ITableToolbarActionsProps, TableToolbarActions } from "../../view/TableToolbarActions"

export const TableToolbarActionsDesigner = observer((props: ITableToolbarActionsProps) => {
  return (
    props.children
      ?
      <TableToolbarActions {...props}>
        {props.children}
      </TableToolbarActions>
      :
      <DroppableWidget>
        {props.children}
      </DroppableWidget>
  )
})
