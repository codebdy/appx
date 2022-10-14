import React from "react"
import { memo } from "react"
import { ListConentLayout } from "../../common/ListConentLayout"
import { ModelTable } from "./ModelTable"
import { RoleList } from "../RoleList"
import "./style.less"

export const ModelAuthBoard = memo(() => {
  return (
    <ListConentLayout
      listWidth={200}
      list={
        <RoleList />
      }
    >
      <div style={{ flex: 1, overflow: "auto" }}>
        <ModelTable />
      </div>
    </ListConentLayout>
  )
})