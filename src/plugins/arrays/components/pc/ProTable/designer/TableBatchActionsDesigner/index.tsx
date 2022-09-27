import React, { memo } from "react"
import { DnFC } from '@designable/react'
import { DroppableWidget } from "@designable/react"
import { TableBatchActions } from "../../view/TableBatchActions"
import { BatchActionsContainer } from "../../view/TableBatchActions/BatchActionsContainer"

export const TableBatchActionsDesigner: DnFC<React.ComponentProps<typeof TableBatchActions>> = memo((
  props
) => {
  const { children, ...rest } = props;
  return (
    <BatchActionsContainer {...rest}>
      {
        children ? children : <DroppableWidget />
      }
    </BatchActionsContainer>
  )
}) 
