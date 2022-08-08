import React from "react"
import { PageHeader as AntdPageHeader, PageHeaderProps } from "antd"
import clx from "classnames"

export const PageHeader = (props: PageHeaderProps) => {
  const { className, children, ...other } = props
  return (
    <AntdPageHeader className={clx(className, "rx-page-header-responsive")}
      {...other}>{children}
    </AntdPageHeader>
  )
}