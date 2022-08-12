import React from "react"
import { memo } from "react"
import AppRoot from "../shared/AppRoot"
import RunnerDistributer from "./RunnerDistributer"

const AppRunner = memo(() => {

  return (
    <AppRoot>
      <RunnerDistributer />
    </AppRoot>
  )
})

export default AppRunner