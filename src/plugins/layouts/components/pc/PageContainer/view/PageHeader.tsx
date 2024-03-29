import React from "react"
import { PageHeader as AntdPageHeader, PageHeaderProps } from "antd"
import clx from "classnames"
import { useParseLangMessage } from "@rxdrag/plugin-sdk"

export const PageHeader = (props: PageHeaderProps) => {
  const { className, title, subTitle, children, ...other } = props
  const p = useParseLangMessage();
  return (
    <AntdPageHeader
      className={clx(className, "rx-page-header-responsive")}
      title={title}
      subTitle={p(subTitle as any)}
      {...other}
    >{children}
    </AntdPageHeader>
  )
}