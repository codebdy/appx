import React, { memo } from "react"
import './locales'
import './schema'
import { DnFC } from '@designable/react'
import { DroppableWidget } from "@designable/react"

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
