import React from "react"
import { memo } from "react"
import { ListConentLayout } from "../../common/ListConentLayout"
import { RoleList } from "./RoleList"
import "./style.less"

export const ModelAuthBoard = memo(() => {
  return (
    <ListConentLayout
      listWidth={200}
      list={
        <RoleList />
      }
    >
      hehe
    </ListConentLayout>
  )
})