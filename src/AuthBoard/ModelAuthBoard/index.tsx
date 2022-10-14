import React from "react"
import { memo } from "react"
import { ListConentLayout } from "../../common/ListConentLayout"
import { ModelTable } from "./ModelTable"
import { RoleList } from "../RoleList"
import "./style.less"
import { Breadcrumb } from "antd"

export const ModelAuthBoard = memo(() => {
  return (
    <ListConentLayout
      listWidth={200}
      list={
        <RoleList />
      }
    >
      <Breadcrumb style={{ padding: "8px 16px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>An Application</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ flex: 1, overflow: "auto" }}>
        <ModelTable />
      </div>
    </ListConentLayout>
  )
})