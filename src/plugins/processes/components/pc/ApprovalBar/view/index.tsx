import { observer } from "@formily/reactive-react"
import React from "react"
import cls from "classnames"
import "./style.less"
import { Button, Space } from "antd"

export interface IApprovalBarProps {
  className?: string,
  children?: React.ReactNode,
}

export const ApprovalBar = observer((props: IApprovalBarProps) => {
  const { className, children, ...other } = props;

  return (
    <div className={cls("appx-arroval-bar", className)} {...other}>
      <Space direction="vertical" size="large">
        <div>状态:未启动</div>
        <Space>
          <Button>通过</Button>
          <Button>驳回</Button>
          <Button>更多操作</Button>
        </Space>
      </Space>
    </div>
  )
})