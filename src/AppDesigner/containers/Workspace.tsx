import React, { useMemo, useRef, Fragment } from 'react'
import { WorkspaceContext, useDesigner } from "@designable/react"

export interface IWorkspaceProps {
  id?: string
  title?: string
  description?: string
}

export const Workspace: React.FC<IWorkspaceProps> = ({
  id,
  title,
  description,
  ...props
}) => {
  const oldId = useRef<string>()
  const designer = useDesigner()
  const workspace = useMemo(() => {
    if (!designer) return
    if (oldId.current && oldId.current !== id) {
      const old = designer.workbench.findWorkspaceById(oldId.current)
      if (old) old.viewport.detachEvents()
    }
    const workspace = {
      id: id || 'index',
      title,
      description,
    }
    designer.workbench.ensureWorkspace(workspace)
    oldId.current = workspace.id
    return workspace
  }, [designer, id, title, description])
  return (
    <Fragment>
      <WorkspaceContext.Provider value={workspace}>
        {props.children}
      </WorkspaceContext.Provider>
    </Fragment>
  )
}