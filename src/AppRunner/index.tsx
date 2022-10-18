import React from "react"
import { memo } from "react"
import { DESIGNER_TOKEN_NAME } from "../consts"
import AppRoot from "../shared/AppRoot"
import RunnerEngine from "./RunnerEngine"

const AppRunner = memo(() => {

  return (
    <AppRoot tokenName={DESIGNER_TOKEN_NAME}>
      <RunnerEngine />
    </AppRoot>
  )
})

export default AppRunner