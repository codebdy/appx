import { observer } from "@formily/reactive-react"
import React from "react"
import cls from "classnames"
import "./style.less"
import { Button, Space, Typography } from "antd"
import { CheckOutlined, CloseOutlined, MoreOutlined } from "@ant-design/icons"

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
          <div>
            <Typography.Text type="secondary">状态</Typography.Text>
            <Typography.Title level={3} style={{ margin: 0 }}>
              费用待批
            </Typography.Title>
          </div>
        </div>
        <Space>
          <Button icon={<CloseOutlined />}>驳回</Button>
          <Button type="primary" icon={<CheckOutlined />}>通过</Button>
          <Button icon={<MoreOutlined />}></Button>
        </Space>
      </Space>
    </div>
  )
})