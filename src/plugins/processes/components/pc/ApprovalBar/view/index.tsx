import { observer } from "@formily/reactive-react"
import React from "react"
import cls from "classnames"
import "./style.less"
import { Space } from "antd"

export interface IApprovalBarProps {
  className?: string,
  children?: React.ReactNode,
}

export const ApprovalBar = observer((props: IApprovalBarProps) => {
  const { className, children, ...other } = props;

  return (
    <Space className={cls("appx-arroval-bar", className)} {...other}>
      {
        children
      }
    </Space>
  )
})