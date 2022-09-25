import React from "react"
import { memo } from "react"
import AppRoot from "../shared/AppRoot"
import { FrameDesignerInner } from "./FrameDesignerInner"

export const FrameDesigner = memo(() => {
  return (
    <AppRoot>
      <FrameDesignerInner />
    </AppRoot>
  )
})