import React from "react"
import { memo } from "react"
import { Outlet } from "react-router-dom"
import { ListConentLayout } from "../common/ListConentLayout"

export const AppEngines = memo(()=>{
  return (
    <ListConentLayout>
      <Outlet />
    </ListConentLayout>
  )
})