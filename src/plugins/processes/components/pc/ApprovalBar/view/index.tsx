import { observer } from "@formily/reactive-react"
import React from "react"
import cls from "classnames"
import "./style.less"
import { Button, Space, Typography } from "antd"

export interface IApprovalBarProps {
  className?: string,
  children?: React.ReactNode,
}

export const ApprovalBar = observer((props: IApprovalBarProps) => {
  const { className, children, ...other } = props;

  return (
    <div className={cls("appx-arroval-bar", className)} {...other}>
      <Space direction="vertical" size="large">
        <div style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
          <Typography.Text type="secondary">状态:</Typography.Text>
          <Typography.Title level={3} style={{ margin: 0 }}>
            未启动
          </Typography.Title>
        </div>
        <Space>
          <Button>通过</Button>
          <Button>驳回</Button>
          <Button>更多操作</Button>
        </Space>
      </Space>
    </div>
  )
})