import React from 'react'
import { observer } from '@formily/reactive-react'
import { useWorkbench } from "@designable/react"
import { Workspace } from './Workspace'

export const Workbench: React.FC = observer((props) => {
  const workbench = useWorkbench()
  return (
    <Workspace id={workbench.currentWorkspace?.id}>{props.children}</Workspace>
  )
})
