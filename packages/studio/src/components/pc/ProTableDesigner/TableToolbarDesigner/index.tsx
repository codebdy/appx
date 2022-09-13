import React from "react"
import './locales'
import './schema'
import { DnFC, useTreeNode, TreeNodeWidget } from '@designable/react'
import { TableToolbar } from "../../ProTable/TableToolbar"
import { observer } from "@formily/reactive-react"
import { findNodeByComponentPath } from "../../../common/shared"
import { TableToolbarShell } from "../../ProTable/TableToolbar/TableToolbarShell"

export const TableToolbarDesigner: DnFC<React.ComponentProps<typeof TableToolbar>> = observer((props) => {
  const { hasContent = true, hasActions = true, ...other } = props;
  const node = useTreeNode()
  const content = findNodeByComponentPath(node, [
    'ProTable.Toolbar',
    'ProTable.ToolbarContent',
  ])

  const actions = findNodeByComponentPath(node, [
    'ProTable.Toolbar',
    'ProTable.ToolbarActions',
  ])

  return (
    <TableToolbarShell
      {...other}
      content={hasContent && content && <TreeNodeWidget node={content} />}
      actions={hasActions && actions && <TreeNodeWidget node={actions} />}
    />
  )
})
