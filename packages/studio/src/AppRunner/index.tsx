import React from "react"
import { memo } from "react"
import AppRoot from "../shared/AppRoot"
import Layout from "./Layout"

const AppRunner = memo(() => {

  return (
    <AppRoot>
      <Layout />
    </AppRoot>
  )
})

export default AppRunner