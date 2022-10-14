import React from "react"
import { memo } from "react"
import { ListConentLayout } from "../../common/ListConentLayout"
import { RoleList } from "../ModelAuthBoard/RoleList"

export const MenuAuthBoard = memo(() => {
  return (
    <ListConentLayout
      listWidth={200}
      list={
        <RoleList />
      }
    >
      hehe2
    </ListConentLayout>
  )
})