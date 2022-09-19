import React, { memo } from "react"

export const AppPlugins = memo(() => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        style={{
          width: 800,
          marginTop: 16,
        }}
      >
        app AppPlugins
      </div>
    </div>
  )
})