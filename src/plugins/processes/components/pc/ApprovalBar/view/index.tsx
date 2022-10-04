import { observer } from "@formily/reactive-react"
import React from "react"

export interface IApprovalBarProps {
  children?: React.ReactNode,
}

export const ApprovalBar = observer((props: IApprovalBarProps) => {
  const { children, ...other } = props;

  return (
    <div {...other}>
      {
        children
      }
    </div>
  )
})