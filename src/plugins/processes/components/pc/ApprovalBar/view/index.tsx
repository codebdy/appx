import { observer } from "@formily/reactive-react"
import React from "react"
import cls from "classnames"
import "./style.less"

export interface IApprovalBarProps {
  className?: string,
  children?: React.ReactNode,
}

export const ApprovalBar = observer((props: IApprovalBarProps) => {
  const { className, children, ...other } = props;

  return (
    <div className={cls("appx-arroval-bar", className)} {...other}>
      {
        children
      }
    </div>
  )
})