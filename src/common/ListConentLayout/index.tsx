import React from "react"
import { memo } from "react"
import { ResizableColumn } from "../ResizableColumn";
import "./style.less"

export const ListConentLayout = memo((
  props: {
    listWidth?: number,
    list?: React.ReactNode,
    children?: React.ReactNode,
  }
) => {
  const { listWidth, list, children } = props;
  return (
    <div className="appx-list-content-layout">
      <ResizableColumn minWidth={50} maxWidth={500} width={listWidth}>
        {list}
      </ResizableColumn>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexFlow: "column",
        }}
      >
        {children}
      </div>
    </div>
  )
})