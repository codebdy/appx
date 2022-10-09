import { Card } from "antd"
import React from "react"
import { memo } from "react"

export const Kanban = memo(() => {
  return (
    <div className="kanban-layout">
      <div className="process-summary">
        <Card>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    </div>
  )
})