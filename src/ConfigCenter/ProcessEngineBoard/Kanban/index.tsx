import { Card, Progress } from "antd"
import React from "react"
import { memo } from "react"

export const Kanban = memo(() => {
  return (
    <div className="kanban-layout">
      <div className="process-summary">
        <Card>
          <div className="total-title">
            共有1个正在执行的流程实例
          </div>
          <Progress percent={100} />
          <div className="sub-title">
            <div>
              带事件的流程实例
            </div>
            <div>
              活动的流程实例
            </div>
          </div>
        </Card>
      </div>
      <div className="process-categories">
        <div className="category-item" style={{ paddingRight: 8 }}>
          <Card
            title="按名称分组的流程实例"
          >
            ddd
          </Card>
        </div>
        <div className="category-item" style={{ paddingLeft: 8 }}>
          <Card
            title="按错误消息分组的流程事件"
          >
            sss
          </Card>
        </div>
      </div>
    </div>
  )
})