import React from "react"
import { memo } from "react"
import { ListConentLayout } from "../../common/ListConentLayout"
import { RoleList } from "../RoleList"

export const PageAuthBoard = memo(() => {
  return (
    <ListConentLayout
      listWidth={200}
      list={
        <RoleList />
      }
    >
      PageAuthBoard
    </ListConentLayout>
  )
})