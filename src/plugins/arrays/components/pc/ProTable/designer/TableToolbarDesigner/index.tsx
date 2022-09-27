import React from "react"
import './locales'
import './schema'
import { DnFC, useTreeNode, TreeNodeWidget } from '@designable/react'
import { observer } from "@formily/reactive-react"
import { TableToolbar } from "../../view/TableToolbar"
import { findNodeByComponentPath } from "../../../../../../../plugin-sdk"
import { TableToolbarShell } from "../../view/TableToolbar/TableToolbarShell"

export const TableToolbarDesigner: DnFC<React.ComponentProps<typeof TableToolbar>> = observer((props) => {
  const { hasActions = true, ...other } = props;
  const node = useTreeNode()

  const actions = findNodeByComponentPath(node, [
    'ProTable.Toolbar',
    'ProTable.ToolbarActions',
  ])

  return (
    <TableToolbarShell
      {...other}
      actions={hasActions && actions && <TreeNodeWidget node={actions} />}
    >
      {
        node.children?.filter(child => child.id !== actions.id).map(child => {
          return <TreeNodeWidget key={child.id} node={child} />
        })
      }
    </TableToolbarShell>
  )
})
