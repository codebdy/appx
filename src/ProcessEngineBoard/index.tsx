import { Card, Tabs } from "antd"
import React from "react"
import { memo } from "react"
import { Kanban } from "./Kanban"
import "./style.less"

export const ProcessEngineBoard = memo(() => {
  return (
    <div className="process-border-paper">
      <Tabs
        defaultActiveKey="2"
        items={[
          {
            label: `配置`,
            key: '1',
            children: `Content of Tab Pane 1`,
          },
          {
            label: `看板`,
            key: '2',
            children: <Kanban />,
          },
          {
            label: `流程`,
            key: '3',
            children: `Content of Tab Pane 2`,
          },
          {
            label: `决策`,
            key: '4',
            children: `Content of Tab Pane 3`,
          },
        ]}
      />
    </div>
  )
})