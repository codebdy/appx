import React from "react"
import './locales'
import './schema'
import { DnFC } from '@designable/react'
import TableToolbar from "../../ProTable/TableToolbar"
import { observer } from "@formily/reactive-react"

export const TableToolbarDesigner: DnFC<React.ComponentProps<typeof TableToolbar>> = observer((props)=>{
  const {onNew, ...other} = props; 
  return (
    <TableToolbar {...other}/>
  )
})
