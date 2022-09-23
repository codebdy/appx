import React, { memo } from "react"
import './locales'
import './schema'
import { DnFC } from '@designable/react'
import { QueryForm } from "../../ProTable/QueryForm"
import { DroppableWidget } from "@designable/react"

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