import React from "react"
import { memo } from "react"
import { DESIGNER_TOKEN_NAME } from "../consts"
import AppRoot from "../shared/AppRoot"
import { FrameDesignerInner } from "./FrameDesignerInner"

export const FrameDesigner = memo(() => {
  return (
    <AppRoot tokenName={DESIGNER_TOKEN_NAME}>
      <FrameDesignerInner />
    </AppRoot>
  )
})