import { observer } from "@formily/reactive-react"
import { Space } from "antd"
import React from "react"
import clx from "classnames"

export interface IHeaderActionsProps {
  className?: string,
  children?: React.ReactNode
}

const PageHeaderActions = observer((props: IHeaderActionsProps) => {
  const { className, ...other } = props;
  return (
    <Space className={clx("rx-page-header-actions", className)} {...other}>
      {props.children}
    </Space>
  )
})

export default PageHeaderActions