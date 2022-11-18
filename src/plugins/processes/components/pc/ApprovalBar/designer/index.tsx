import { DnFC, DroppableWidget } from '@designable/react'
import { ApprovalBar, IApprovalBarProps } from '../view'
import { observer } from '@formily/reactive-react'
import React from 'react'

export const ApprovalBarDesigner: DnFC<IApprovalBarProps> = observer((props: IApprovalBarProps) => {
  return (
    <ApprovalBar {...props} />
  )
})

