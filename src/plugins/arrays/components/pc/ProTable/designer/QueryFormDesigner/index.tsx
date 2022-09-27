import React, { memo } from "react"
import { DnFC } from '@designable/react'
import { DroppableWidget } from "@designable/react"
import { QueryForm } from "../../view/QueryForm"

export const QueryFormDesigner: DnFC<React.ComponentProps<typeof QueryForm>> = memo((
  props
) => {
  const { children, ...rest } = props;
  return (
    <QueryForm {...rest}>
      {
        children ? children : <DroppableWidget />
      }
    </QueryForm>
  )
}) 
