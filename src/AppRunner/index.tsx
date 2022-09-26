import React from "react"
import { memo } from "react"
import AppRoot from "../shared/AppRoot"
import RunnerEngine from "./RunnerEngine"

const AppRunner = memo(() => {

  return (
    <AppRoot>
      <RunnerEngine />
    </AppRoot>
  )
})

export default AppRunner