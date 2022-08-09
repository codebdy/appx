import React, { memo } from "react";
import { Workspace } from "../../containers";
import { ViewportPanel, WorkspacePanel } from "../../panels";

const MenuWorkSpace = memo(()=>{
  return (
    <Workspace id="menu">
    <WorkspacePanel>
      <ViewportPanel style={{ height: '100%' }}>
        呵呵呵
      </ViewportPanel>
    </WorkspacePanel>
  </Workspace>
  )
})

export default MenuWorkSpace;